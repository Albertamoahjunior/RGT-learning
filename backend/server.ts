import express from 'express';
import router from './src/routes'
import cors from 'cors';


//initialize the express app and port number
const app = express();
const PORT : number = 2000;


app.use(cors());
app.use(express.json());

app.use('/tasks', router);

//start the server and listen on port 2000
app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`);
})
