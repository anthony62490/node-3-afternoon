const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const port = process.env.SERVER_PORT || 3002;

//Middleware
const { checkForSession } = require('./middlewares/checkForSession');

//Controllers
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

const app = express();
app.use(json());
app.use(session(
  {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
app.use(checkForSession);

//Endpoints
//getSwag
app.get('/api/swag', swagController.read);
//Authorization endpoints
app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signOut);
//Cart endpoints
app.post('/api/cart/', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.remove);
//Search endpoints
app.get('/api/search', searchController.search)

//Backend loop
app.listen(port, () => console.log(`Listening for requests on port ${port}`));