# Bit Trader

Bit Trader is a RESTful API written in **Node.js**, created for a **simple**, yet effective user experience for managing and analyzing cryptocurrency **trades** on the back-end. This allows a user to create, read, update and destroy user objects while also creating coins with the ability to monitor their history and sell them.

### Staging and production

Using **Node.js**, we used the Node.js server, Node.http module, express middleware, and a mongo database to store our data. Once our code is ready for **production**, we push it onto our deployment branch to deploy onto Heroku.

Bit Trader uses http requests to allow for the user to receive a response to interact with the API.

### Middleware

Express middleware was used to provide us with base routing abilities.

## Route overview

### POST /api/auth/register

* Provide username, password, and email as JSON.

This route creates a new user by providing the data listed above, into the body of the request. Creating a new user is the first required step to using this API, as it also creates a profile and allows you to store and access data.

To create a basic user, the user must send the following data as a request: 
{"username":"TESTUSER","password":"pwd","email":"testw@gma.com"}

Once signed up, a token is returned to the user that is used only to login via the ```api/auth/login``` route. Once signed in, a new token will be received to refer to all future routes.

### GET /api/login

In order for a user to be authenticated, this route requires an authorization header which includes the key value pair of *username* and *password* that are specific to the current user. Once again, signing in returns a new token to the user for future ID reference.

### GET /api/auth/delete

For whatever the reason may be, there is always a need to delete users which is made possible by this route. In order to do so, the ID of the desired user to be deleted must be specified.

###
