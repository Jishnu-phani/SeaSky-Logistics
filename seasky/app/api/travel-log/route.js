// // /pages/api/travel-log/index.js
import pool from '../auth/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       // SQL query to join the three tables
//       const [rows] = await pool.query(`
//         SELECT p.Passport_Number, tl.Log_ID, tl.Travel_Status, tl.Origin, tl.Destination, tl.Date, 
//                tl.Mode_of_Transport, tl.ETA, tl.Actual_end_time, tl.Start_time,
//                b.Passenger_ID
//         FROM travel_log tl
//         JOIN books b ON tl.Log_ID = b.Log_ID
//         JOIN passenger p ON b.Passenger_ID = p.Passenger_ID;
//       `);
//       res.status(200).json(rows);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch travel log data' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// app/api/travel-log/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // SQL query to join the three tables
    const [rows] = await pool.query(`
      SELECT p.Passport_Number, tl.Log_ID, tl.Travel_Status, tl.Origin, tl.Destination, tl.Date, 
             tl.Mode_of_Transport, tl.ETA, tl.Actual_end_time, tl.Start_time,
             b.Passenger_ID
      FROM travel_log tl
      JOIN books b ON tl.Log_ID = b.Log_ID
      JOIN passenger p ON b.Passenger_ID = p.Passenger_ID;
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch travel log data' },
      { status: 500 }
    );
  }
}