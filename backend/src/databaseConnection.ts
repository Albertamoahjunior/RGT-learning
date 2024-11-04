// index.ts
import { Pool, Client } from 'pg';
import dbConfig from '../dbconfig';

// Configuration for connecting to the default "postgres" database
const defaultConfig = {
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'postgres', // Connect to "postgres" database for the initial check
  password: dbConfig.password,
  port: dbConfig.port,
};

const targetDatabase = dbConfig.database;

// Function to check and create the database if it doesn't exist
async function createDatabaseIfNotExists() {
  const client = new Client(defaultConfig);
  try {
    await client.connect();

    const dbCheckQuery = `
      SELECT 1 FROM pg_database WHERE datname = $1;
    `;
    const res = await client.query(dbCheckQuery, [targetDatabase]);

    if (res.rowCount === 0) {
      console.log(`Database ${targetDatabase} does not exist. Creating...`);
      await client.query(`CREATE DATABASE ${targetDatabase}`);
      console.log(`Database ${targetDatabase} created.`);
    } else {
      console.log(`Database ${targetDatabase} already exists.`);
    }
  } catch (error) {
    console.error("Error checking/creating database:", error);
  } finally {
    await client.end();
  }
}

// Pool configuration for the target database
const pool = new Pool(dbConfig);

// Function to create tables based on your sample schema
async function createTables() {
  const createTaskTableQuery = `
    CREATE TABLE IF NOT EXISTS public.task (
      id integer NOT NULL DEFAULT nextval('public.task_id_seq'::regclass),
      title character varying(50),
      task character varying(255),
      date timestamp without time zone DEFAULT CURRENT_DATE,
      complete boolean DEFAULT false,
      CONSTRAINT task_pkey PRIMARY KEY (id)
    );
  `;

  const createTaskIdSeqQuery = `
    CREATE SEQUENCE IF NOT EXISTS public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
  `;

  try {
    const client = await pool.connect();

    await client.query(createTaskIdSeqQuery);
    await client.query(createTaskTableQuery);

    console.log("Tables created or verified.");
    client.release();
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// Initialize the database setup
async function initDatabase() {
  await createDatabaseIfNotExists();
  await createTables();
  console.log("Database setup completed.");
}

initDatabase()
.then(() => {
  pool.end();
});


const pool_sec = new Pool(dbConfig);

export default pool_sec;
