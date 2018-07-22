# MERN skeleton

Skeleton MERN application that will function as a base for full-featured applications.

With user CRUD and Auth capabilities, which will also lay out how to develop, organize, and run code for general web applications built using this stack.

The aim is to keep the skeleton as simple as possible so it is easy to extend, and can be used as a base application for developing different MERN applications.

Backend includes:
*  User model
*  API endpoints for user CRUD
*  Auth with JSON Web Tokens (JWT)

Frontend includes:
*  ...

The entire stack is composed of the following technologies:

* Webpack, Babel, Nodemon
* Express
* MongoDB
* Mongoose
* React
* Material UI

The Node version used is `10.3.0`


## Table of contents

* [Folder and file structure](#folder-and-file-structure)
* [Steps implementing the skeleton backend](#steps-implementing-the-skeleton-backend)
  * [Setting up the project](#setting-up-the-project)
* []()
* []()
* []()


## Folder and file structure

The MERN skeleton will show the following folder structure:

```
| mern-skeleton/
  | -- backend/
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

  | -- config/
    | --- config.js

  | -- dist/
  | -- node_modules/

  | -- .babelrc
  | -- .gitignore
  | -- nodemon.json
  | -- package.json
  | -- template.js
  | -- webpack.config.backend.js
```

## Steps implementing the skeleton backend

We will produce a functioning, standalone server-side application.

To start developing the backend part of the MERN skeleton, we will first set up the project folder, install and configure the necessary npm modules, and then prepare the run scripts to aid development and run the code.

Then, we will go through the code step by step to implement the user model, API endpoints, and JWT-based auth to meet the specifications we defined earlier for the user-oriented features.


### Setting up the project

We will initialize `package.json` in the project folder, configure and install development dependencies, set configuration variables to be used in the code, and update `package.json` with run scripts to help develop and run the code.

#### Init package.json

We will need a `package.json` file to store meta information about the project, list the module dependencies with version numbers, and to define run scripts.

To initialize a `package.json` file in the project folder, go to the project folder from the command line and run `npm init`.

#### Development dependencies

In order to begin with development and to run the backend server code, we will configure and install Babel, Webpack, and Nodemon

##### Babel

Since we will be using ES6 to write the backend code, we will configure and install Babel modules to convert ES6.

First, we configure Babel in the `.babelrc` file with presets for the latest JS features and some stage-x features not currently covered under `babel-preset-env`.

```json
{
  "presets": [
    "env",
    "stage-2"
  ]
}
```

Next, we install the Babel modules as devDependencies from the command line:

`npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-stage-2`

##### Webpack

We will need Webpack to compile and bundle the server-side code using Babel, and for configuration we will create the `webpack.config.server.js` file.

```js
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './backend/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
}

module.exports = config
```

* Require nodeExternals
* The mode option is not set here explicitly but will be passed as required when running the Webpack commands with respect to running for development or building for production.
* Webpack starts bundling from the server folder with server.js, then outputs the bundled code in server.generated.js in the dist folder.

To install the webpack modules:

`npm install --save-dev webpack webpack-cli webpack-node-externals`

##### Nodemon

To automatically restart the Node server as we update the code during development, we will use Nodemon to monitor the server code for changes.

Create a `nodemon.json` file in your project folder, and add the following configuration. This configuration will set up nodemon to watch for changes in the server files during development, then execute compile and build commands as necessary.

```json
{
  "verbose": false,
  "watch": [
    "./backend"
  ],
  "exec": "webpack --mode=development --config webpack.config.backend.js && node ./dist/server.generated.js"
}
```

#### Config variables

In the config file we will define some server-side configuration related variables that will be used in the code, but should not be hardcoded as a best practice, as well as for security purposes.

```js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mongodb'
}

export default config
```

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

In this section, we will integrate Express, Node, and MongoDB to run a completely configured server before we start implementing the user specific features.


#### Configuring Express

To use Express, we will first install Express, then add and configure it in the `backend/express.js` file.

`npm install express --save`

To handle HTTP requests and serve responses properly, we will use the following modules to configure Express:

* `body-parser`: Body parsing middleware to handle the complexities of parsing streamable request objects, so we can simplify browser-server communication by exchanging JSON in the request body:
  * Install the `body-parser` module: `npm install body-parser --save`
  * Configure Express: `bodyParser.json()` and `bodyParser.urlencoded({ extended: true })`
* `cookie-parser`: Cookie parsing middleware to parse and set cookies in request objects: Install the `cookie-parser` module: `npm install cookie-parser --save`
* `compression`: Compression middleware that will attempt to compress response bodies for all requests that traverse through the middleware: Install the `compression` module: `npm install compression --save`
* `helmet`: A collection of middleware functions to help secure Express apps by setting various HTTP headers: Install the `helmet` module: `npm install helmet --save`
* `cors`: Middleware to enable **CORS** (Cross-origin resource sharing): Install the `cors` module: `npm install cors --save`


#### Starting the server

With the Express app configured to accept HTTP requests, we can go ahead and use it to implement the server to listen for incoming requests.

In the `mern-skeleton/backend/server.js` file.


#### Setting up Mongoose and connecting to MongoDB

We will be using the Mongoose module to implement the user model in this skeleton, and also all future data models for our MERN applications. Here, we will start by configuring Mongoose, and utilizing it to define a connection with the MongoDB database.

`npm install mongoose --save`

Then, update the `server.js` file to import the mongoose module, configure it to use native ES6 promises, and finally use it to handle the connection to the MongoDB database for the project.


#### Serving an HTML template at a root URL

With a Node, Express, and MongoDB enabled server now running, we can extend it to serve an HTML template in response to an incoming request at the root URL /.

In the template.js file, add a JS function that returns a simple HTML document that will render Hello World on the browser screen.

`mern-skeleton/template.js`

To serve this template at the root URL, update the express.js file to import this template, and send it in the response to a GET request for the '/' route.


### User model

We will implement the user model in the `server/backend/user.model.js` file, using Mongoose to define the schema with the necessary user data fields, to add built-in validation for the fields and to incorporate business logic such as password encryption, authentication, and custom validation.


#### User schema definition

We will begin by importing the mongoose module and use it to generate a UserSchema.

`mern-skeleton/backend/models/user.model.js`

The mongoose.Schema() function takes a schema definition object as a parameter to generate a new Mongoose schema object that can be used in the rest of the backend code.

The user schema definition object needed to generate the new Mongoose schema will declare all the user data fields and associated properties.

* Name
* Email
* Created
* Updated
* Hashed password + Salt


#### Password for auth

The password field is very crucial for providing secure user authentication in any application, and it needs to be encrypted, validated, and authenticated securely as a part of the user model.

**As a virtual field**

The password string provided by the user is not stored directly in the user document. Instead, it is handled as a virtual field.

When the password value is received on user creation or update, it is encrypted into a new hashed value and set to the hashed_password field, along with the salt value in the salt field.

**Encryption and authentication**

The encryption logic and salt generation logic, which are used to generate the hashed_password and salt values representing the password value, are defined as UserSchema methods.

Additionally, the authenticate method is also defined as a UserSchema method, which is used when a user supplied password must be authenticated for sign-in.

The crypto module in Node is used to encrypt the user-provided password string into a hashed_password with a randomly generated salt value. The hashed_password and the salt is stored in the user document when the user details are saved to the database on a create or update. Both the hashed_password and salt values are required in order to match and authenticate a password string provided during user sign-in, using the authenticate method defined previously.

**Password field validation**

To add validation constraints on the actual password string selected by the end user, we will need to add custom validation logic and associate it with the hashed_password field in the schema.

To ensure that a password value is indeed provided, and has a length of at least six characters when a new user is created or existing password is updated, custom validation is added to check the password value before Mongoose attempts to store the hashed_password value. If validation fails, the logic will return the relevant error message.

Once the UserSchema is defined, and all the password related business logic is added as discussed previously, we can finally export the schema at the bottom of the user.model.js file, in order to use it in other parts of the backend code.


#### Mongoose error handling

The validation constraints added to the user schema fields will throw error messages, if violated when user data is saved to the database. To handle these validation errors and other errors that the database may throw when we make queries to it, we will define a helper method to return a relevant error message that can be propagated in the request-response cycle as appropriate.

We will add the getErrorMessagehelper method in the `backend/helpers/dbErrorHandler.js` file. This method will parse and return the error message associated with the specific validation error or other error that occurred while querying MongoDB using Mongoose.

Errors that are not thrown because of a Mongoose validator violation will contain an error code and in some cases need to be handled differently. For example, errors caused due to a violation of the unique constraint will return a different error object than Mongoose validation errors. The unique option is not a validator but a convenient helper for building MongoDB unique indexes, and thus we will add another getUniqueErrorMessage method to parse the unique constraint related error object and construct an appropriate error message.

By using the getErrorMessage function exported from this helper file, we will add meaningful error messages when handling errors thrown by Mongoose operations performed for user CRUD.


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




