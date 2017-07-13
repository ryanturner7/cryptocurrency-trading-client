# Bit Trader

Bit Trader is a RESTful API written in **Node.js**, created for a **simple**, yet effective user experience for managing and analyzing cryptocurrency **trades** on the back-end. This allows a user to create, read, update and destroy user objects while also creating coins with the ability to monitor their history and sell them.

## Staging and production

Using **Node.js**, we used the Node.js server, Node.http module, express middleware, and a mongo database to store our data. Once our code is ready for **production**, we push it onto our deployment branch to deploy onto Heroku.

Bit Trader uses http requests to allow for the user to receive a response to interact with the API.

## Route overview


Make a **POST** request to the server with *username* and *password* key value pairs in the body to create a user.
