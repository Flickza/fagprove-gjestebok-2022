//Server
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//database
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

//passport
import passport from 'passport';

import pathfinderUI from 'pathfinder-ui';

//routes
import authRoutes from './routes/user.js';
import homeRoute from './routes/index.js';
import postRoutes from './routes/posts.js';


//error handler for api errors
import { apiError } from './error/apiError.js';


//create express app
const app = express();

//import environment variables
dotenv.config();

import "./middleware/passport.js";

//set view engine to EJS
app.set('view engine', 'ejs');

//set json data limit to 50mb
app.use(express.json({ limit: '50mb', extended: true }));

//start cookie parser
app.use(cookieParser());

//urlencoded data parser
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//set mongodb as session storage
const sessionStore = new MongoStore({
  mongoUrl: process.env.CONN_URL, collection: 'sessions'
});

//set cookie middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

//start passport middleware
app.use(passport.initialize());
app.use(passport.session());


//set static folder location route
app.use(express.static("./" + 'src'));

//home routes
app.use('/', homeRoute);

//authentication routes
app.use('/auth', authRoutes);

//posts routes
app.use('/posts', postRoutes, apiError);

//templates
app.use('/templates', express.static('./views/templates'));


//pathfinder lib makes a visualization of API ROUTES
//used for documentation of backend
app.use('/pathfinder', function (req, res, next) {
  pathfinderUI(app);
  next();
}, pathfinderUI.router);


//set mongodb connection url and port for server to run on
const CONNECTION_URL = process.env.CONN_URL;
const PORT = process.env.PORT;

//connect mongodb 
mongoose.connect(CONNECTION_URL)
  //start server if mongodb connection succeeds
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
