import express from 'express';
import router from './routes'
import cors from 'cors';


const app = express();
const PORT : number = 2000;

app.use(cors());
app.use(express.json());

app.use('/users', router);


app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`);
})
