\newpage
# Implementation

## Technology Stack

The MERN Stack was chosen to develop this application:

* **M**ongoDB - a NoSQL database management system.
* **E**xpress - a Node.js web application framework.
* **R**eact - a JavaScript library for building user interfaces.
* **N**ode.js - a JavaScript runtime capable of executing JavaScript on a server.

In addition, the Socket.IO library was selected in order to facilitate the required real-time bi-directional communication between client and server.

Part of the motivation for choosing this stack was its popularity. There are several benefits to choosing a popular techonology stack:

* If a stack has become popular, it is likely that the technologies work well together.
* If any problems are encountered, it is likely that somebody else has encountered the same problem before.
* Libraries and documentation are likely to be regularly maintained.

That said, some further research was conducted to ensure that this was the right stack for this particular application, and the findings follow.

### React

The author was already comfortable with React prior to beginning this project, and was satisfied that it would fulfil the requirements. Therefore, no alternatives were researched. React user interfaces are composed of components which are updated when the data changes, which is exactly what was needed here. For example, when a new bid is made during the auction, the entire page should not update, but only those elements which are relevant.

React is a library, as opposed to a fully-fledged framework (such as Angular). It does not make assumptions about the rest of the technology stack[@react_home]. This was particularly attractive in this case, as there were unlikely to be any problems integrating whichever libraries were required for real-time bi-directional communication.

### Node.js

The most obvious benefit to choosing Node.js for the backend is the convenience factor of writing the same language for server-side code as used for client-side code. Switching between languages involves some cognitive overhead on the part of the developer, and avoiding this should lead to a more efficient development process.

Using Node.js in web applications also opens up the possibiliy for code re-use across different parts of the application. For example, in this application it seemed likely that both client and server side code might have to perform a function such as filtering a list of players down to only those which haven't been auctioned off yet.

In the previous section, JSON (JavaScript Object Notation) was identified as the format for data transfer. This makes Node.js a particularly convenient choice - as the name suggests, JSON can easily be converted to JavaScript objects (and vice versa). The developer can spend less time worrying about the appropriate data structure to represent the data, and more time thinking about how to implement the business logic.

The above reasons made choosing Node.js attractive from a developer experience standpoint, but most importantly, research also showed that Node.js was a popular choice for applications which require constantly updated data such as chat rooms and games. Requests are processed asynchronously without blocking the thread, which means that it is capable of short response times, a necessity for this application.

The main drawback to choosing Node.js seemed to be that it could experience performance bottlenecks for computationally heavy tasks, but this was not a concern for this application.[@nodejs_good_bad]

### Socket.IO

Upon learning about Socket.IO, it was clear that this was exactly the library for use in this application. It offers support for event-driven real-time bi-directional communication between the client and server, and abstracts away the underlying complexity of implementing WebSockets. This seemed like a good choice, as implementing the appropriate business logic would be complex enough without also worrying about the low-level details.

### Express

Express is the most popular web framework which runs on Node.js, and it is featured in an example in the Socket.IO documentation.[@socketio_express] With support for Socket.IO integretation and the ability to rapidly develop REST APIs, there was little need to explore alternatives to Express.

### MongoDB

While this application could have been successfully developed with a traditional relational database instead, MongoDB seemed like the more appropriate choice for two reasons. 

Firstly, MongoDB is particularly convenient to work with in JavaScript applications. Objects stored in a MongoDB collection are very similar to plain JavaScript Objects in their structure, thus there is no impedence mismatch when representing data from the database in the application.

Secondly, nested data structures seemed more appropriate than tables for the entities required for this application. For example, the idea of an auction containing an array of auction users, and each auction user containing an array of players they've won, made more sense conceptually than having these entities spread across different tables in a relational database.

## Development Process

The development process involved taking one user story at a time, and implementing all that was required to make some minimal functional version of that user story a reality. This would typically involve working with the database, backend application logic and the user interface. At this point, some testing was carried out to ensure the feature was working as intended, and usually a few more similar cycles would follow before the feature could be considered to be working as intended.

Work was completed in approximately the following order:

* Login system for users to create account, log in and log out.
* Funtionality to allow users to create and join leagues.
* The auction.
* The post-auction section.

For each feature, work was typically done on the backend first so that each endpoint was returning to correct data for each type of request it might receive. This made development of the frontend significantly easier.

Some user stories required significantly more work than others. Building a basic login system was relatively straightforward, but building a real-time auction was not. As a result, the more complex user stories would be broken into smaller more manageable chunks - for example, first adding the functionality to allow a user to select a player to be auctioned off, and then only once this feature was working as intended, then beginning work to allow others to make counter bids.

## Development Tools

### Git/Github

Git was used for version control. Typically, code was committed to the repository once any milestone was reached. Sometimes these milestones would relate to a user story, but other times they would relate to a bug fix or some refactoring.

Github offered a centralised storage solution for the Git repository, which made it easy to work on this project on different machines. This was particularly useful when it was time to deploy the application to a production server.

### Visual Studio Code



### Postman

Postman is a tool which can be used to test REST API endpoints. For example, once the server side code had been written to allow the user to create a league, Postman was used to send a request to the server in the same format as the one that the client would send. It could then be verified that the league was created correctly in the database, and the correct response sent to the client, before work would begin on the client side code.

### Yarn

Yarn is a package manager for Node.js projects. Most Node.js projects, including this one, involve the use of several libraries. Yarn helps the developer to keep track of which depencies are required, so that when the code is deployed on a new machine, the process of installing these depencies is automated. NPM (Node Package Manager) is very similar and would have been a suitable alternative here.

### Babel

Babel is a JavaScript transpiler, which allows the developer to write code using the latest JavaScript features without worrying about compatibility issues. Babel will transpile modern JavaScript into a backwards compatible version of JavaScript. This significantly improves the development experience, as several useful features have been added to JavaScript in recent years. 

## Backend

The server side program consists of a REST API


## Frontend

