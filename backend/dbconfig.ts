import dotenv from "dotenv";

dotenv.config();

// database details required to establish connection
export default {
  user: process.env.OPERATOR || 'user',
  host: process.env.HOST || 'host',
  database: process.env.DATABASE || 'database',
  password: process.env.PASSWORD || 'password',
  port: parseInt(process.env.PORT || '5432'),  // Provide a default port (e.g., 5432)
};
