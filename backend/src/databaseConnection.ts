// index.ts
import { Pool } from 'pg';
import dbConfig from '../dbconfig';


const pool = new Pool(dbConfig);

export default pool;
