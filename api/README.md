# Backend Application

## Disclaimer

The structure of the server-side project, along with some boilerplate code, was copied from the following course created by Scott Moss for FrontEndMasters:

https://github.com/FrontendMasters/api-design-node-v3

Specifically, the code relating to authentication in **auth.js** and the **resources/user** directory is copied from the above repository with minimal edits, and I make no attempt to pass it off as my own. Authentication was not the focus of this project, so I saw no need to reinvent the wheel.

The remaining (significantly more complex) portions of the application were written by me.

## Source Code

The source code can be found in the **src** directory, and the vast majority of it within the **resources** subdirectory. Within the **resources** directory, there are further directories for each top-level entity stored in the database:

 * **user**
 * **player**
 * **league**
 * **event**

There is nothing of particular interest inside the **user** and **player** directories. The bulk of the business logic occurs in either **league** or **event**.

### League

Some of the more interesting files contained here are:

* The **league.controllers.js** file contains the code which is responsible for handling bids, checking constraints in the process.
* The **league.model.js** file shows one of the more complex schemas in the application, and demonstrates two different techniques for modelling relationships.
* Inside the **auction/utils** subfolder there is some further auction-related logic, including the countdown timer and completion of player sale in the **auction.js** file.
* In the **postAuction/utils** subfolder is the code for updating player points based on information received from the event model.

### Event

The **playerPoints.js** file contains the code for simulating events with random points scored, with messages pushed to subscribed leagues.

### Socket.IO

The code for setting up the Socket.IO namespace and rooms is on line 20 of **server.js**. Sockets created here can be imported to other files as necessary. For example, it is imported on line 4 of **auction.js**, and on line 30 an event is emitted on this socket.

## How to Run

The frontend code should first be built and placed in the `public` folder of the server-side project.

Install MongoDB and ensure that it is running on localhost (default port). The `events.json` and `playersDump.json` should also be imported to the database.

Install the latest versions of [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/cli/install) package manager. Then, from the same folder containing this README, run command:

`yarn install`

Yarn should read the dependencies from `package.json` and install the required libraries. The application can then be started by running the command:

`yarn build && yarn start`.
