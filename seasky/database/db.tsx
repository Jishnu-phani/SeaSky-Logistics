import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',  // Or your database server
  database: 'Seasky_Logistics',
  password: 'your_db_password',
  port: 5432,         // Default PostgreSQL port
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
