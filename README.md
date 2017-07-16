# Bit Trader

[![Build Status](https://travis-ci.org/ryanturner7/cryptocurrency-trading-client.svg?branch=master)](https://travis-ci.org/ryanturner7/cryptocurrency-trading-client)

Bit Trader is a RESTful API written in **Node.js**, created for a **simple**, yet effective user experience for managing and analyzing cryptocurrency **trades** on the back-end. This allows a user to create, read, update and destroy user objects while also creating coins with the ability to monitor their history and sell them.

### Staging and production

With **Node.js** we used the Node.js server, Node.http module, express middleware, and a mongo database to store our data. Once our code is ready for **production**, we push it onto our deployment branch to deploy onto Heroku.

* Bit Trader uses http requests to allow for the user to receive a response to interact with the API.

### Middleware

Express middleware was used to provide us with base routing abilities.

## Route overview

#### POST /api/auth/register

* Provide username, password, and email as JSON.

This route creates a new user by providing the data listed above, into the body of the request. Creating a new user is the first required step to using this API, as it also creates a profile and allows you to store and access data.

* To create a basic user, the user must send the following data as a request:
{"username":"TESTUSER","password":"pwd","email":"testw@gma.com"}

Once signed up, a token is returned to the user that is used only to login via the ```api/auth/login``` route. Once signed in, a new token will be received to refer to all future routes.

* Example response:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiJiNWE5ZTk2MDdlYjRkY2JjNjdhNWQzNmU3MThlZGFmNzJmNDlkY2UwNDI1NDJiZDk4MDdkYjdkODBlN2QzMmU3IiwiaWF0IjoxNDk5OTg3Mzg3fQ.jV2OC1hu48YZ3fbAapdMPlvEC_vjNG1LIaIKQ_9b0t
```

#### GET /api/login

* In order for a user to be authenticated, this route requires an authorization header which includes the key value pair of *username* and *password* that are specific to the current user.
* Signing in returns a new token to the user for future ID reference.

* Example response:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiJiNWE5ZTk2MDdlYjRkY2JjNjdhNWQzNmU3MThlZGFmNzJmNDlkY2UwNDI1NDJiZDk4MDdkYjdkODBlN2QzMmU3IiwiaWF0IjoxNDk5OTg3Mzg3fQ.jV2OC1hu48YZ3fbAapdMPlvEC_vjNG1LIaIKQ_9b0tM
```

#### GET /api/auth/delete

* For whatever the reason may be, there is always a need to delete users which is made possible by this route. In order to do so, the ID of the desired user to be deleted must be specified.

#### POST /api/profile/create

* Once a user is created, a profile is able to be instantiated using a POST route.
* In order to create a profile, a user must send a username, userID, tokenseed, and a profile photo as a request to receive a profile in response.

#### GET /api/profile/profile

* In order to view other profiles, a user is required to provide a token that they received from bearer auth when the user created the profile.

#### PUT /api/profile/profile

* Updating a profile is made possible with this PUT request.
* In order to update a profile, a user must already have created a profile.
* To update a profile, the user is require to provide a token.

#### POST /api/coin

* Creating a coin is possible by sending type, askingPrice, and userId as a request to receive a coin in response.

#### PUT /api/coin

* Once a user is in possession of coins, they can update the coin by sending a put request.
* The seller ID, date and price will be updated.

#### GET /api/coin

* A user can basically view the life of each coin by sending a get request, which will respond with the history of that specified coin.

#### DELETE /api/coin
* Since we create coins, we can also delete them. This is made possible by sending a findByIdAndRemove delete request on the specified coin.
## About Us
&nbsp;

### **Ryan Turner**
![Ryan Turner](temp-assets/ryan.png)
My name is Ryan and I'm a hackaholic. I have always been a  
problem solver with the passion to help others which led me to  
software because a single developer can have such an impact on a  
massive number of people throughout the world. Coding is love, coding  
is life.
&nbsp;

### **Oscar Cauich**
![Oscar Cauich](temp-assets/oscar.jpg)
Fullstack javascript developer with a background in computer  
networks.  6 years experience working in the IT Field before  
switching gears to software development. Fascinated with the  
amount of  knowledge that is spread in the world wide web.
&nbsp;

### **Michael Stuart**
![Michael Stuart](temp-assets/michael.jpg)
Fullstack javascript developer with a background in  
military intelligence, tech support and customer  
service.  Ever curious, obsessed with efficiency and  
fluid design. Writer of beautiful code and lord of user  
experience.
&nbsp;


### **Devin Griswold**
![Devin Griswold](temp-assets/devin.jpg)
An U.S. Army veteran of 6 years with a broad background  
in IT.  With a intense love for AR/VR and all manners of  
gadgets, I have a dream that the future of humanity includes  
a world where the natural state of the human body and  
technology are completely merged.  The best way to be a part  
of that movement forward is to actually contribute to that  
software.  It also is a great way for me to do my part in  
making sure Humanity isn't lost in this next phase of our  
evolution.  A believer in that Node.js will be in the  
beginning, if not the front, of the line in creating that  
future.
&nbsp;
