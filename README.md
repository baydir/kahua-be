# Modetika Backend

## Pre-requisites
- [Node and npm](https://nodejs.org/en/)

## Install it and run (development):
- Make a copy of `.env.local.default` and remove the `.default` extension
- In the newly created `.env.local` file, add valid values to the variables
- Run `npm i` to install dependencies
- Run `npm run dev` to run development environment

## Build it and run (production)
- Run `npm i` to install dependencies
- Run `npm start` to start and run production build

## Code distribution
```sh
  .github/
    workflows/
      lint.yml
  bin/
    www.js
  config/
    auth.js
  handlers/
    ...
  helpers/
    ...
  models/
    ...
  routes/
    ...
  scripts/
    ...
  app.js
```

#### - `github/`
All the github actions configuration
#### - `bin/`
Folder to hold `www.js`. This is the transpiled production version of the server
#### - `config/`
All the configuration scripts necessary to run the application
#### - `handlers/`
Functions configured to handle specific routes within the server. Every handler receives a `request` and `response` parameter to interact with the HTTP request as per the [`express.js` routing](https://expressjs.com/en/guide/routing.html). Handlers will usually interact with models if there's any database interaction for the route.
#### - `helpers/`
Helper functions usable all throughout the application
#### - `models/`
Mongoose models that both define the Mongo database schema and offer ORM functionalities to interact with it.
#### - `routes/`
Route configuration. Here all the routes and their HTTP methods are configured and added a handler function
#### - `scripts/`
Reusable scripts to run various tasks. Some examples are the `bulkInsert` script and the `insertColors` and `insertActions` scripts. These scripts are designed to be used as terminal tooling to run repetitive tasks, like imports. They do not run with the Backend server.
#### - `app.js`
Entry point for the server. The Express.js server is initialised here and the routes configured.

## Useful resources
[Express.js Documentation](https://expressjs.com/en/5x/api.html)
[MongoDB Documentation](https://docs.mongodb.com/)
[Mongoose Documentation (ODM interface)](https://mongoosejs.com/)