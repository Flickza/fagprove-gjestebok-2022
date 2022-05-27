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
import "./config/passport.js";


//routes
import authRoutes from './routes/auth.js';
import homeRoute from './routes/home.js';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.use(express.json({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(express.urlencoded({ limit: '50mb', extended: true }));

const sessionStore = new MongoStore({
  mongoUrl: process.env.CONN_URL, collection: 'sessions'
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static("./" + 'src'));



app.use('/', homeRoute);


app.use('/auth', authRoutes);
app.use('/posts', postRoutes);


const CONNECTION_URL = process.env.CONN_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
