import express from 'express';
import router from './routes'
import cors from 'cors';

//initialize the express app and port number
const app = express();
const PORT : number = 2000;

// CORS options
const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || origin === 'http://localhost') {
      // Allow requests with no origin (e.g., mobile apps, Postman) or from localhost
      callback(null, true);
    } else {
      // Block all other origins
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', router);

//start the server and listen on port 2000
app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`);
})
