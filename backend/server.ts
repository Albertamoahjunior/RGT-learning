import express from 'express';
import router from './src/routes/routes'
import authRouter from './src/routes/authRoutes'
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:8000', 'http://localhost:2000'], // Allow requests from both origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
//initialize the express app and port number
const app = express();
const PORT : number = 2000;

//middleware to be applied to incoming request
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//insitialize routes to be used
app.use('/tasks', router);
app.use('/', authRouter);

//start the server and listen on port 2000
app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`);
})
