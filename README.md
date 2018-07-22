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

* [Application overview](#application-overview)

* [Backend with Express and MongoDB](#backend-with-express-and-mongodb)
  * [Backend structure](#backend-structure)
  * [Setting up the project](#setting-up-the-project)
  * [Preparing the server](#preparing-the-server)
  * [User model](#user-model)
  * [User CRUD API](#user-crud-api)
  * [User auth and protected routes](#user-auth-and-protected-routes)
  * [Checking the standalone backend](#checking-the-standalone-backend)

* [Frontend with React](#frontend-with-react)
  * [Frontend structure](#frontend-structure)
  * [Setting up development with React, React Router and Material-UI](#setting-up-development-with-react,-react-router-and-material-ui)
  * [Backend user API integration](#backend-user-api-integration)
  * [Auth integration](#auth-integration)
  * [The views](#the-views)
  * [Navigation menu](#navigation-menu)
  * [Basic server-side rendering](#basic-server-side-rendering)


## Application overview

The skeleton application will encapsulate rudimentary features and a workflow repeated for most MERN applications.

We will build the skeleton essentially as a basic but fully functioning MERN web application with user CRUD, and authentication-authorization (auth) capabilities, which will also lay out how to develop, organize, and run code for general web applications built using this stack.

The aim is to keep the skeleton as simple as possible so it is easy to extend, and can be used as a base application for developing different MERN applications.


### Folder and file structure

The MERN skeleton has the following folder structure:

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

  | -- frontend/

  | -- node_modules/

  | -- .babelrc
  | -- .gitignore
  | -- nodemon.json
  | -- package.json
  | -- template.js
  | -- webpack.config.backend.js
```


---


## Backend with Express and MongoDB

### Overview

We will focus on building a working backend for the skeleton application with Node, Express, and MongoDB. The completed backend will be a standalone server-side application that can handle HTTP requests to create a user, list all users, and view, update, or delete a user in the database while taking user authentication and authorization into consideration.

We will produce a functioning, standalone server-side application.

To start developing the backend part of the MERN skeleton, we will first set up the project folder, install and configure the necessary npm modules, and then prepare the run scripts to aid development and run the code.

Then, we will go through the code step by step to implement the user model, API endpoints, and JWT-based auth.

#### User model

The user model will define user details to be stored in the MongoDB database, and also handle user-related business logic such as password encryption and user data validation. The user model for this skeletal version will be basic with support for the following attributes:

name (String) Required field to store user's name

email (String) Required unique field to store user's email and identify each account (only one account allowed per unique email)

password (String) Required field for authentication, the database will store the encrypted password and not the actual string for security purposes

created (Date) Automatically generated timestamp when a new user account is created

updated (Date) Automatically generated timestamp when existing user details are updated


#### API endpoints for user CRUD

To enable and handle user CRUD operations on the user database, the backend will implement and expose API endpoints that the frontend can utilize in the views, as follows:

| Operation | API route | HTTP method |
| --------- | --------- | ----------- |
| Create a user | `/api/users` | POST |
| List all users | `/api/users` | GET |
| Fetch a user | `/api/users/:userId` | GET |
| Update a user | `/api/users/:userId` | PUT |
| Delete a user | `/api/users/:userId` | DELETE |
| User sign-in | `/auth/signin` | POST |
| User sign-out (optional) | `/auth/signout` | GET |


Some of these user CRUD operations will have protected access, which will require the requesting client to be either authenticated, authorized, or both. The last two routes are for authentication and will allow the user to sign in and sign out.


#### Auth with JSON Web Tokens

To restrict and protect access to the user API endpoints according to the skeleton features, the backend will need to incorporate authentication and authorization mechanisms. There are a number of options when it comes to implementing user auth for web applications. The most common and time tested option is the use of sessions to store user state on both the client and server side. But a newer approach is the use of JSON Web Token (JWT) as a stateless authentication mechanism that does not require storing user state on the server side.


Both approaches have strengths for relevant real-world use cases. However, because it pairs well with the MERN stack, we will use JWT for auth implementation. Additionally, additional security improvements can be made.

**How JWT works**

When a user successfully signs in using their credentials, the server side generates a JWT signed with a secret key and a unique user detail. Then, this token is returned to the requesting client to be saved locally either in localStorage, sessionStorage, or a cookie in the browser, essentially handing over the responsibility of maintaining user state to the client side:

(JWT auth flow)

For HTTP requests made following a successful sign-in, specially requests for API endpoints that are protected and have restricted access, the client side has to attach this token to the request. More specifically, the JSON Web Token must be included in the request Authorization header as a Bearer.

`Authorization: Bearer <JSON Web Token>`

When the server receives a request for a protected API endpoint, it checks the Authorization header of the request for a valid JWT, then verifies the signature to identify the sender and ensures the request data was not corrupted. If the token is valid, the requesting client is given access to the associated operation or resource, otherwise an authorization error is returned.

In the skeleton application, when a user signs in with email and password, the backend will generate a signed JWT with the user's ID and with a secret key available only on the server. This token will then be required for verification when a user tries to view any user profiles, update their account details, or delete their user account.

Implementing the user model to store and validate user data, then integrating it with APIs to perform CRUD operations based on auth with JWT, will produce a functioning standalone backend. In the rest of the chapter, we will look at how to achieve this in the MERN stack and setup.




### Backend structure

The following folder structure only shows the files that are relevant for the MERN skeleton backend. With these files, we will produce a functioning, standalone server-side application:

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
        filename: "backend.generated.js",
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
* Webpack starts bundling from the server folder with server.js, then outputs the bundled code in backend.generated.js in the dist folder.

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
  "exec": "webpack --mode=development --config webpack.config.backend.js && node ./dist/backend.generated.js"
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
> `NODE_ENV=production node ./dist/backend.generated.js`


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

**Attention**

In order to use MongoDB we need to have it up and running available to the app. This is easy with Docker running in your machine:

`docker run -d --name mongodb -v /home/vval/code/data/mongodb:/data/db -p 27017:27017 mongo:latest`

* `docker run` - Creating and running a container
* `-d` - Running in detached mode (no output in terminal)
* `--name mongodb` - The container name
* `-v /home/vval/code/data/mongodb:/data/db` - Local persistence for the mongo running in the container
* `-p 27017:27017` - localPort : containerPort
* `mongo:latest` - Latest version of the official image for MongoDB (v4.0)



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

The auth controller functions in server/controllers/auth.controller.js will not only handle requests to the sign-in and sign-out routes, but also provide JWT and express-jwt functionality to enable authentication and authorization for protected user API endpoints.

#### Sign-in

The password authentication method defined in the UserSchema is used to verify the password received in the req.body from the client.

If the password is successfully verified, the JWT module is used to generate a JWT signed using a secret key and the user's _id value.

Install jsonwebtoken to use it in the controller:

`npm install jsonwebtoken --save`

Then, the signed JWT is returned to the authenticated client along with user details.

( * ) Optionally, we can also set the token to a cookie in the response object so it is available to the client side if cookies is the chosen form of JWT storage. On the client side, this token must be attached as an Authorization header when requesting protected routes from the server.

#### Sign-out

The signout function clears the response cookie containing the signed JWT. This is an optional endpoint and not really necessary for auth purposes if cookies are not used at all in the frontend.

With JWT, user state storage is the client's responsibility, and there are multiple options for client-side storage besides cookies. On sign-out, the client needs to delete the token on the client side to establish that the user is no longer authenticated

#### Protecting routes with express-jwt

To protect access to the read, update, and delete routes, the server will need to check that the requesting client is actually an authenticated and authorized user.

To check if the requesting user is signed in and has a valid JWT when a protected route is accessed, we will use the express-jwt module.

The `express-jwt` module is middleware that validates JSON Web Tokens. Run `npm install express-jwt --save`

**Requiring sign-in**

The `requireSignin` method in auth.controller.js uses express-jwt to verify that the incoming request has a valid JWT in the Authorization header. If the token is valid, it appends the verified user's ID in an 'auth' key to the request object, otherwise it throws an authentication error.

We can add `requireSignin` to any route that should be protected against unauthenticated access.

**Authorizing signed in users**

For some of the protected routes such as update and delete, on top of checking for authentication we also want to make sure the requesting user is only updating or deleting their own user information.

To achieve this, the `hasAuthorization` function defined in auth.controller.js checks if the authenticated user is the same as the user being updated or deleted before the corresponding CRUD controller function is allowed to proceed.

**Protecting user routes**

We will add `requireSignin` and `hasAuthorization` to the user route declarations that need to be protected with authentication and also authorization.

The route to read a user's information only needs authentication verification, whereas the update and delete routes should check for both authentication and authorization before these CRUD operations are executed.

**Auth error handling for express-jwt**

To handle the auth-related errors thrown by express-jwt when it tries to validate JWT tokens in incoming requests, we need to add the following error-catching code to the Express app configuration in mern-skeleton/server/express.js, near the end of the code, after the routes are mounted and before the app is exported:



### Checking the standalone backend

With user auth implemented for protecting routes, we have covered all the desired features of a working backend for the skeleton MERN application.

Now, we will look at how we can check if this standalone backend is functioning as desired without implementing a frontend.

We are using ARC extension from Google Chrome (Advanced Rest Client) to create a user, list users, signin, and get signed user.


---


## Frontend with React

We will use React to add an interactive user interface to the basic user and auth features implemented for the backend of the MERN skeleton application that we started building in the previous section.

We will add the following user interface components to our base application:

* Home page: A view that renders at the root URL to welcome users to the web application
* User list page: A view that fetches and shows a list of all the users in the database, and also links to individual user profiles
* Sign-up page: A view with a form for user sign-up, allowing new users to create a user account and redirecting them to a sign in page when successfully created
* Sign-in page: A view with a sign-in form that allows existing users to sign in so they have access to protected views and actions
* Profile page: A component that fetches and displays an individual user's information, is only accessible by signed-in users, and also contains edit and delete options, which are visible only if the signed-in user is looking at their own profile
* Edit profile page: A form that fetches the user's information in the form, allows them to edit the information, and is accessible only if the logged-in user is trying to edit their own profile
* Delete user component: An option that allows the signed-in user to delete only their own profile after confirming their intent
* Menu navigation bar: A component that lists all the available and relevant views to the user, and also helps to indicate the user's current location in the application


The following React component tree diagram shows all the React components we will develop to build out the views for this base application:

* Main Router
  * Menu
  * Home
  * SignUp
  * SignIn
  * Users
  * Profile
    * Delete User
  * Edit Profile

MainRouter will be the root React component that contains all the other custom React views in the application. Home, Signup, Signin, Users, Profile, and EditProfile will render at individual routes declared with React Router, whereas the Menu component will render across all these views, and DeleteUser will be a part of the Profile view.


### Frontend structure

The following folder structure shows the new folders and files to be added to the skeleton to complete it with a React frontend:

```
| mern-skeleton/
   | -- frontend/
      | --- assets/
         | ---- images/
      | --- auth/
         | ---- api-auth.js
         | ---- auth-helper.js
         | ---- PrivateRoute.js
         | ---- Signin.js
      | --- core/
         | ---- Home.js
         | ---- Menu.js
      | --- user/
         | ---- api-user.js
         | ---- DeleteUser.js
         | ---- EditProfile.js
         | ---- Profile.js
         | ---- Signup.js
         | ---- Users.js
      | --- App.js
      | --- main.js
      | --- MainRouter.js
  | -- server/
      | --- devBundle.js
  | -- webpack.config.frontend.js
  | -- webpack.config.frontend.production.js
```

The client folder will contain the React components, helpers, and frontend assets, such as images and CSS. Besides this folder and the Webpack config for compiling and bundling the client code, we will also modify some of the other existing files to integrate the complete skeleton.


### Setting up development with React, React Router and Material-UI

Before we can start developing with React in our existing skeleton code base, we first need to add configuration to compile and bundle the frontend code, add the React-related dependencies necessary to build the interactive interface, and tie it all together in the MERN development flow.

#### Configuring Babel and Webpack

To compile and bundle the client code to run it during development and also bundle it for production, we will update the configuration for Babel and Webpack.

**Babel**

For compiling React, first install the Babel React preset module as a development dependency:

`npm install babel-preset-react --save-dev`

Then, update .babelrc to include the module and also configure the react-hot-loader Babel plugin as required for the react-hot-loader module.

**Webpack**

To bundle client-side code after compiling it with Babel, and also to enable react-hot-loader for faster development, install the following modules:

`npm install --save-dev webpack-dev-middleware webpack-hot-middleware`

¿? `npm install --save-dev file-loader`

`npm install --save react-hot-loader`

Add webpack config files...



### Loading Webpack middleware for development

### Serving static files with Express

### Updating the template to load a bundled script


### Adding React dependencies

React

`npm install --save react react-dom`

React Router:

`npm install --save react-router react-router-dom`

Material UI

`npm install --save material-ui material-ui-icons`


### Backend user API integration



### Auth integration



### The Views



### Navigation menu



### Basic server-side rendering
