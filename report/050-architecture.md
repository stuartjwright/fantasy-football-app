\newpage
# Design

Some elements of the design process were carried out prior to development beginning. These included:

* High level architecture - identifying the different components required to form a complete web application, and how they will communicate with each other.
* Data modelling - identifying which entity classes were required, which fields they would contain, and their relationships to each other.

Other elements were left until after the development process was already underway. For example, the first sketches of the user interface for the auction were not drawn until after a large part of the server side development had been completed.

## High Level Architecture

The first choice was to decide which of the following two approaches to take:

* The traditional approach, which involves most of the application logic being performed on the server, with appropriate HTML returned to be displayed in the browser.
* The 'Single Page Application' (SPA) approach, which allows for most of the user interface logic to be handled by client-side code which simply consumes data from the server.

An article on Microsoft's website[@spa_traditional] states that the traditional approach is better suited to websites with simple client-side requirements, and that SPAs are better suited to applications which require more complex user interface functionalities than what basic HTML forms can offer. Given the requirements of this application, the SPA approach was selected.

This decision meant that the server would be responsible simply for providing the client with the appropriate data, rather than returning HTML pages to display. Although the specific needs of this application meant that real-time bi-direction communication was a requirement, it was also necessary to consider more traditional requests. For example, a user logging in, or requesting a list of available leagues to join. For this reason, it was decided to implement a REST API on the backend in addition to whichever means of facilitating real-time bi-directional communication was chosen.

API stands for Application Programming Interface - a set of rules which allow programs to talk to each other. REST stands for Representational State Transfer. A REST (or RESTful) API is an API which follows a particular set of rules - it receives requests from client programs, and sends a response. There are different types of request for different purposes. A GET request typically involves the client program making a request for data from the server. In this application for example, that might be a user requesting to see a list of available leagues. A POST request will typically involve the client sending some new data to be written to the server's database. In this application, a user creating a new league would be an example of something for which a POST request would be appropriate.

Regardless of the request type, a REST API typically sends a response containing some form of data. There are a number of different data formats which can be chosen, but JSON (JavaScript Object Notation) is by far the most popular data format for exchange of information in web applications, so this is what was selected.

A diagram showing this high-level architecture can be seen in figure XYZ.

<!-- diagram here -->

## Data Modelling

The following entity classes were identified as necessary in order to build an application which fulfilled the requirements:

* **User** - A user of the application.
* **Player** - A real-life football player.
* **League** - A fantasy league created by a user.
* **Event** - A round of fixtures in real-life football.
* **Auction** - A separate entity for the league's auction, to prevent **League** from becoming excessively complex.

While designing the **Auction** class, it became clear that it would need to be composed of other smaller entities:

* **AuctionUser** - One particular user in the auction.
* **LiveAuctionItem** - The auction item (a player) which users can currently bid on.
* **SoldAuctionItem** - A sold auction item (a player) which has been auctioned off.
* **Bid** - A bid on an auction item.
* **SquadItem** - A player which has been added to an auction user's squad.

Finally, two other entities were added quite late in the development process, as they were not considered during the design phase. They are included here for completeness:

* **PostAuctionUser** - For any data relating to a user in a league after the auction is completed (e.g. how many points they have scored).
* **FinalSquadItem** - Similar to **SquadItem** above, but amended for the post-auction phase of the game (again, the abilty to score points was an important factor).

An entity-relationship diagram modelling the relationships between these entities can be seen in figure ZZZ.