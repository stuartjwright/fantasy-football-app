\newpage
# Testing

No formal unit testing was conducted, as it did not seem practical given the nature of the application. However, various other forms of testing were conducted as appropriate.

## REST API Testing

The REST API testing was conducted using the **Postman** application. This allows the developer to create HTTP requests which mimic those expected from the client. Every endpoint was tested to ensure that the correct JSON data was returned. In addition, bad requests were deliberately created to ensure that errors were returned as expected. For example, a request relating to data for a specific league should only be successful if the **JSON Web Token** used for authorisation belongs to a user who is registered in that league.

This was especially helpful during the early stages of development, as the frontend for some features did not yet exist. The frontend could be built with confidence that the data it was consuming was correct.

## Edge Case Testing

Several potential edge cases which may not be immediately obvious were considered and tested. Sometimes these tests would fail and the feature in question would require further development. Other times the application would behave as expected. Any tests which initially failed resulted in some further development work until the tests passed. Edge cases considered and now successfully tested were:

* Multiple users bidding at the same time. The logic behind this was covered in more detail in the backend implementation section.
* A bid which comes in as the countdown timer hits 0 seconds. No issues were encountered here in several tests.
* The user has more budget left than the current high bid, but not enough to increase by the minimum increment (usually £500k). The solution was to allow the user to bid there entire budget only in this specific situation.
* An event starts before an auction has completed (or started). Users are immediately informed that their league has been cancelled.
* A user's budget is depleted before they have filled their squad. This is not a problem, as the player list is suitably large compared to the maximum squad size and number of users allowed in a league, that the user is permitted to fill their squad with players costing £0.
* The various constraints relating to which users can bid on which players were also successfully tested.

## User Acceptance Testing

All parts of the application were subject to user acceptance testing at numerous different stages, and the feedback gathered led to some important changes, particularly with regard to the user interface.

One important feature added after feedback from this testing was a 1 second block on new bids immediately after each successful bid. Before this change, it was too easy for a user to bid more than they intended to. For example:

* The current high bid is £5M.
* Alice wants to bid £5.5M.
* In the milliseconds it takes Alice to react, a bid for £7M from Bob is successully registered.
* Alice accidentally hits the button to bid £7.5M when she only intended to bid £5.5M.

By adding the 1 second delay, the above scenario would now play out with Alice being blocked from making a bid for 1 second, and she can then decide whether she wants to make a higher bid.
