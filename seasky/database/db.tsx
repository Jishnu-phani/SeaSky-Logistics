import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',  // or your database host
  user: 'root',
  password: '87654321',
  database: 'Seasky_Logistics',
});

export default pool;
