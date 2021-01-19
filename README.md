# Jumga eCommerce Platform
>e-commerce market place.


## Features

- Full featured shopping cart
- Product search feature
- User registration 
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method Powered by Flutterwave)
- Database seeder (products & users)

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

You can also install and setup Babel if you would like

### Env Variables

We make use of the environment variable for configuration on the server, cd into the backend folder Create a .env file in then root and add the following

```
PORT=5000
MONGO_URI="DB_URL"
JWT_SECRET=@jumpa2020
API_KEY="Flutterwave Test API API_KEY"
NODE_ENV=production
```



### Install Dependencies (frontend & backend)

```
cd backend //to change into backend directory
npm install
cd client //to change into frontend directory
npm install
```



### Run Application (frontend & backend)

```
cd backend //to change into backend directory
npm run dev  //to start backend server

cd client //to change into frontend directory
npm  start //to Start frontend 

```


### API Documentation
Below is the Public Documentation of the Backend API

> https://documenter.getpostman.com/view/438555/TVt2bNqX
