import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import homeRoute from './routes/home.js';

const app = express();

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(express.static("./" + 'src'));



app.use('/', homeRoute);
app.use('/auth', authRoutes);
// app.use('/posts', postRoutes);


const CONNECTION_URL = process.env.CONN_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
