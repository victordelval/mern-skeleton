# MERN skeleton

Skeleton MERN application that will function as a base for full-featured applications.

The entire stack is composed of the following technologies:

* Webpack, Babel, Nodemon
* Express
* MongoDB
* Mongoose
* React
* Material UI

## Table of contents

* [Folder and file structure](#folder-and-file-structure)
* [Steps implementing the skeleton backend](#steps-implementing-the-skeleton-backend)
  * [Setting up the project](#setting-up-the-project)
* []()
* []()
* []()


## Folder and file structure

```
| mern-skeleton/
   | -- config/
      | --- config.js
   | -- server/
      | --- controllers/
         | ---- auth.controller.js
         | ---- user.controller.js
      | --- helpers/
         | ---- dbErrorHandler.js
      | --- models/
         | ---- user.model.js
      | --- routes/
         | ---- auth.routes.js
         | ---- user.routes.js
      | --- express.js
      | --- server.js
  | -- .babelrc
  | -- nodemon.json
  | -- package.json
  | -- template.js
  | -- webpack.config.server.js
```
## Steps implementing the skeleton backend

### Setting up the project
#### Init package.json
#### Development dependencies
##### Babel
##### Webpack
##### Nodemon

#### Config variables

* `env`: To differentiate between development and production mode
* `port`: To define the listening port for the server
* `jwtSecret`: The secret key to be used to sign JWT
* `mongoUri`: The location of the MongoDB database for the project


#### Running scripts

Allowed scripts to execute the project from terminal:

##### `development`
>`nodemon`
##### `build`
> `webpack --config webpack.config.frontend.production.js && webpack --mode=production --config webpack.config.backend.js`
#### `start`
> `NODE_ENV=production node ./dist/server.generated.js`


### Preparing the server
#### Configuring the server
#### Starting the server
#### Setting up Mongoose and connecting to MongoDB
#### Serving an HTML template at a root URL

### User model
#### User schema definition
#### Password for auth
#### Mongoose error handling

### User CRUD API
#### User routes
#### User controller
...

### User auth and protected routes
#### Auth routes
#### Auth controller
#### Sign-in
#### Sign-out
#### Protecting routes with express-jwt




