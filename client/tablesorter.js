Session.setDefault('receivedData', false);
Session.setDefault('accountSearchFilter', '');
Session.setDefault('tableLimit', 20);
Session.setDefault('paginationCount', 1);
Session.setDefault('selectedPagination', 0);
Session.setDefault('skipCount', 0);

Meteor.autorun(function(){
  Meteor.subscribe('customerAccounts');
});

Template.miniMongoTable.customersList = function(){
  Session.set('receivedData', new Date());
  Session.set('paginationCount', Math.floor(CustomerAccounts.find().count() / Session.get('tableLimit')));
  return CustomerAccounts.find({
    LastName: { $regex: Session.get('accountSearchFilter'), $options: 'i' }
  },{limit: Session.get('tableLimit'), skip: Session.get('skipCount')});
}


Template.miniMongoTable.rendered = function(){
  $(this.find('#example')).tablesorter();

  Deps.autorun(function(){
    console.log(Session.get('receivedData'))
    setTimeout(function(){
      $("#example").trigger("update");
    }, 200);
  });
};


Template.miniMongoTable.events({
  'keyup #searchInput':function(){
    Session.set('accountSearchFilter', $('#searchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('tableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('tableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('tableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('selectedPagination', this.index);
    Session.set('skipCount', this.index * Session.get('tableLimit'));
  }
});


Template.miniMongoTable.getPaginationCount = function(){
  return Session.get('paginationCount');
}

Template.miniMongoTable.paginationButtonList = function(){
  var paginationArray = [];
  for (var i = 0; i < Session.get('paginationCount'); i++) {
    paginationArray[i] = {
      index: i
    };
  };
  return paginationArray;
};

Template.miniMongoTable.isTwentyActive = function(){
  if(Session.get('tableLimit') === 20){
    return "active";
  }
};
Template.miniMongoTable.isFiftyActive = function(){
  if(Session.get('tableLimit') === 50){
    return "active";
  }
};
Template.miniMongoTable.isHundredActive = function(){
  if(Session.get('tableLimit') === 100){
    return "active";
  }



Template.paginationButton.pageActive = function(){
  if(this.index === Session.get('selectedPagination')){
    return "active";
  }
}
Template.paginationButton.getPage = function(){
  return this.index + 1;
}


};
