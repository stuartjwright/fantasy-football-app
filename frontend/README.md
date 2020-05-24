# Frontend Application

## Disclaimer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The code in **src/contexts/AuthContext.js** is copied from [this](https://kentcdodds.com/blog/authentication-in-react-applications) blog post by Kent C Dodds. I came across it while researching patterns for handling authentication in the frontend, and I liked this approach. Since authentication was not the main focus of this project, I saw no need to reinvent the wheel.

Many of the UI components are adapted (usually significantly so) from code snippets in the Material UI documentation, such as [this](https://material-ui.com/components/app-bar/) one. I consider this to be the intended use of such libraries so I'm not sure if I'm required to mention this in the interests of academic integrity, but I'm doing so to be safe.

The remaining code in this repository is my own work.

## Source Code

The source code in the **src** directory contains **index.js** (the application's entry point), and the remainder of the code is split into other directories:

* **components** - UI building blocks.
* **constants** - hardcoded values which should not change.
* **contexts** - for global state management.
* **reducers** - a reducer is a function which receives the previous state and an action, and returns the new state.
* **requests** - contains all requests to the REST API made from the frontend.
* **sockets** - code for managing the real-time updates via Socket.IO.

The **components** directory is further split into sub-directories. For example, there is a sub-directory for **league**, and further sub-directories within league for components depending on whether they are needed before or after the auction.

## How to Run

Install the latest versions of [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/cli/install) package manager. Then, from the same folder containing this README, run command:

`yarn install`

Yarn should read the dependencies from `package.json` and install the required libraries. The application can then be started in development mode by running the command:

`yarn start`

To run in conjunction with the server-side code, instead run:

`yarn build`

And then move the resulting build from the **dist** folder into the **public** folder in the backend project.
