// /app/api/auth/db.js
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '87654321',
    database: 'Seasky_Logistics',
});

export default db;
