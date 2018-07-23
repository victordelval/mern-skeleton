# MERN skeleton


## Table of contents

* [Overview](#overview)
* [Application structure](#application-structure)
* [Running the application](#running-the-application)
* [Backend with Express and MongoDB](#backend-with-express-and-mongodb)
* [Frontend with React and Material UI](#frontend-with-react-and-material-ui)



## Overview

Skeleton MERN application that will function as a base for full-featured applications. The aim is to keep the skeleton as simple as possible so it is easy to extend.

With user CRUD and Auth capabilities, which will also lay out how to develop, organize, and run code for general web applications built using this stack.

Backend includes:
* User model
* API endpoints for user CRUD
* Auth with JSON Web Tokens (JWT)
* Server-side rendering

Frontend also includes:
* Compoments and tree components
* Routes and views
* Responsive and Material Design style


The entire stack is composed of the following main technologies:

| Tech | Scope |
| ---- | ----- |
| React | *Frontend* |
| Material UI | *Frontend* |
| Express | *Backend* |
| MongoDB | *Backend* |
| Webpack | *Shared* |
| Babel | *Shared* |


The Node version used is `10.3.0`



## Application structure

The MERN skeleton has the following folder and file structure:

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
    | --- devBundle.js
    | --- express.js
    | --- server.js

  | -- config/
    | --- config.js

  | -- dist/
    | --- backend.generated.js

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

  | -- node_modules/
    | ...

  | -- .babelrc
  | -- .gitignore
  | -- nodemon.json
  | -- package-lock.json
  | -- package.json
  | -- README.md
  | -- template.js
  | -- webpack.config.backend.js
  | -- webpack.config.frontend.js
  | -- webpack.config.frontend.production.js

```


## Running the application

Allowed scripts to execute the project from terminal (`npm run ...`):

### `devel`

> `nodemon`


### `build`

> `webpack --config webpack.config.frontend.production.js && webpack --mode=production --config webpack.config.backend.js`


### `start`

> `NODE_ENV=production node ./dist/backend.generated.js`



### Setting up a local MongoDB

In order to use MongoDB we need to have it up and running available to the app. This is easy with Docker running in your machine:

`docker run -d --name mongodb -v /home/vval/code/data/mongodb:/data/db -p 27017:27017 mongo:latest`

* `docker run` - Creating and running a container
* `-d` - Running in detached mode (no output in terminal)
* `--name mongodb` - The container name
* `-v /home/vval/code/data/mongodb:/data/db` - Local persistence for the mongo running in the container
* `-p 27017:27017` - localPort : containerPort
* `mongo:latest` - Latest version of the official image for MongoDB (v4.0)



## Backend with Express and MongoDB

### User model

The user model will define user details to be stored in the MongoDB database, and also handle user-related business logic such as password encryption and user data validation. The user model for this skeletal version will be basic with support for the following attributes:

* **name** (String) Required field to store user's name

* **email** (String) Required unique field to store user's email and identify each account (only one account allowed per unique email)

* **password** (String) Required field for authentication, the database will store the encrypted password and not the actual string for security purposes

* **created** (Date) Automatically generated timestamp when a new user account is created

* **updated** (Date) Automatically generated timestamp when existing user details are updated


### API endpoints for user CRUD

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


### Auth with JSON Web Tokens

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




### Checking the standalone backend

With user auth implemented for protecting routes, we have covered all the desired features of a working backend for the skeleton MERN application.

Now, we will look at how we can check if this standalone backend is functioning as desired without implementing a frontend.

We are using ARC extension from Google Chrome (Advanced Rest Client) to create a user, list users, signin, and get signed user.



## Frontend with React and Material UI

We will use React to add an interactive user interface to the basic user and auth features implemented for the backend of the MERN skeleton application that we started building in the previous section.

### Components and views

We will add the following user interface components to our base application.

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

