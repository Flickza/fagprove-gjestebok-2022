//Server
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//passport
import passport from 'passport';

//routes
import authRoutes from './routes/auth.js';
import homeRoute from './routes/home.js';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(express.static("./" + 'src'));



app.use('/', homeRoute);


app.use('/auth', authRoutes);
app.use('/posts', postRoutes);


const CONNECTION_URL = process.env.CONN_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
