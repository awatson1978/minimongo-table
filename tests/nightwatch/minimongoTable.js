// tests/leaderboard.js
module.exports = {
  "Leaderboard Walkthrough" : function (client) {
    client
    .url("http://localhost:3000")
    .waitForElementVisible('body', 1000)
    .pause(2000)

    // lets give it a long time, because we'll be running this on travis
    // and there are lots of customers to load
    .verify.elementPresent("#customersTable", 10000)

    // make sure we have all the main elements in the table
    .verify.elementPresent("#searchInput")
    .verify.elementPresent("#customersTable thead")
    .verify.elementPresent("#customersTable thead tr")
    .verify.elementPresent("#customersTable thead tr th")
    .verify.elementPresent("#customersTable thead tr th:nth-child(1)")
    .verify.containsText("#customersTable thead tr th:nth-child(1)", "First Name")
    .verify.containsText("#customersTable thead tr th:nth-child(2)", "Last Name")
    .verify.containsText("#customersTable thead tr th:nth-child(3)", "Company")
    .verify.containsText("#customersTable thead tr th:nth-child(4)", "Zip")
    .verify.containsText("#customersTable thead tr th:nth-child(5)", "Email")

    .verify.elementPresent("#customersTable tbody tr:nth-child(20)")

    // first row - make sure helpers and database queries are correct
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Essie")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Vaill")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Litronic Industries")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "99515")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "essie@vaill.com")

    // second row - make sure {{#each}} function is working
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Cruz")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Roudabush")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Meridian Products")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "85004")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "cruz@roudabush.com")

    // last row on first page of 20 people
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Cary")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Mccarney")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "William Scotsman")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "43215")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "cary@mccarney.com")

    // last row on first page of 20 people
    // pagination works
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21)")

    // make sure pageLimit buttons exist
    .verify.elementPresent("#twentyButton")
    .verify.elementPresent("#fiftyButton")
    .verify.elementPresent("#hundredButton")

    // lets check that pagination buttons are present
    .verify.elementPresent("#paginationButtonGroup")
    .verify.elementPresent("#pagination-btn-0")
    .verify.elementPresent("#pagination-btn-1")
    .verify.elementPresent("#pagination-btn-2")
    .verify.elementPresent("#pagination-btn-3")
    .verify.elementPresent("#pagination-btn-4")

    .click("#fiftyButton").pause(300)

    // verify there are now 50 user rows in the table
    .verify.elementPresent("#customersTable tbody tr:nth-child(21)")
    .verify.elementPresent("#customersTable tbody tr:nth-child(50)")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(51)")

    // lets check the 21st person, because we're going to test later with pagination
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21) tr td:nth-child(1)", "Haley")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21) tr td:nth-child(2)", "Rocheford")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21) tr td:nth-child(3)", "Davis, Robert L Esq")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21) tr td:nth-child(4)", "80111")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21) tr td:nth-child(5)", "haley@rocheford.com")

    // lets test the 50th person is who they are suppose to be
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(50) tr td:nth-child(1)", "Dorothy")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(50) tr td:nth-child(2)", "Alexy")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(50) tr td:nth-child(3)", "Fank Siviglia & Co")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(50) tr td:nth-child(4)", "96701")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(50) tr td:nth-child(5)", "dorthy@alexy.com")

    // there should only be two pagination buttons
    .verify.elementPresent("#pagination-btn-0")
    .verify.elementPresent("#pagination-btn-1")
    .verify.elementNotPresent("#pagination-btn-2")

    .click("#hundredButton").pause(300)

    // verify there are now 100 user rows in the table
    .verify.elementPresent("#customersTable tbody tr:nth-child(51)")
    .verify.elementPresent("#customersTable tbody tr:nth-child(100)")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(101)")

    // lets test the 100th person is who they are suppose to be
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Rosalia")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Kennemur")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Reagan, Thomas J Esq")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "71463")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "rosalia@kennemur.com")

    // there should only be one pagination buttons
    .verify.elementPresent("#pagination-btn-0")
    .verify.elementNotPresent("#pagination-btn-1")

    .click("#twentyButton").pause(300)

    // verify the twenty button actually works and we get back to 20 user rows
    .verify.elementPresent("#customersTable tbody tr:nth-child(20)")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21)")

    // lets check that pagination buttons are present
    .verify.elementPresent("#paginationButtonGroup")
    .verify.elementPresent("#pagination-btn-0")
    .verify.elementPresent("#pagination-btn-1")
    .verify.elementPresent("#pagination-btn-2")
    .verify.elementPresent("#pagination-btn-3")
    .verify.elementPresent("#pagination-btn-4")

    .click("#pagination-btn-1").pause(300)

    // lets check the 21st person is now the first person on our list
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Haley")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Rocheford")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Davis, Robert L Esq")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "80111")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "haley@rocheford.com")

    // and that we still have twenty rows in our table
    .verify.elementPresent("#customersTable tbody tr:nth-child(20)")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(21)")

    // lets click the first pagination button
    .click("#pagination-btn-0").pause(300)

    // and check we're back to where we started with Essie
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Essie")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Vaill")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Litronic Industries")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "99515")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "essie@vaill.com")

    // lets check user in the 8th row (who doesn't have "Va" in their name; used next)
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(1)", "Lashawn")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(2)", "Hasty")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(3)", "Kpff Consulting Engineers")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(4)", "91790")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(5)", "lashawn@hasty.com")

    // lets try some searching
    .clearValue('#searchInput')
    .setValue('#searchInput', "Va")

    // essie should still be there, because her last name is Vaill
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Essie")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Vaill")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Litronic Industries")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "99515")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "essie@vaill.com")

    // but there should only be 8 results
    .verify.elementNotPresent("##customersTable tbody tr:nth-child(9)")

    // with Vanessa being the last
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(1)", "Vanessa")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(2)", "Lewallen")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(3)", "Fargo Glass & Paint Co")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(4)", "43011")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(8) tr td:nth-child(5)", "vanessa@lewallen.com")

    // lets search for valerie
    .clearValue('#searchInput')
    .setValue('#searchInput', "Valerie")

    // there she is
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Valerie")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Pou")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Sea Port Record One Stop Inc")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "18087")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "valerie@pou.com")

    // and she's the only one
    .verify.elementNotPresent("##customersTable tbody tr:nth-child(2)")

    // clear our input, and we should be back to Essie
    .clearValue('#searchInput')
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(1)", "Essie")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(2)", "Vaill")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(3)", "Litronic Industries")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(4)", "99515")
    .verify.elementNotPresent("#customersTable tbody tr:nth-child(1) tr td:nth-child(5)", "essie@vaill.com")

    .end();
  }
}
