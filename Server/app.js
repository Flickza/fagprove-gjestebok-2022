//Server
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//passport
import cookieParser from 'cookie-parser';
import passport from 'passport';

//routes
import authRoutes from './routes/auth.js';
import homeRoute from './routes/home.js';

const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(express.static("./" + 'src'));



app.use('/', homeRoute);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
// app.use('/posts', postRoutes);


const CONNECTION_URL = process.env.CONN_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
