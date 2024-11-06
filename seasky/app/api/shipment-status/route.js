import pool from '../auth/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT s.Shipment_ID, s.Package_ID, tl.Log_ID, tl.Travel_Status, tl.Origin, tl.Destination, tl.Date, 
             tl.Mode_of_Transport, tl.ETA, tl.Actual_end_time, tl.Start_time, g.Category
      FROM travel_log tl
      JOIN ships s ON tl.Log_ID = s.Log_ID
      JOIN goods g ON s.Package_ID = g.Package_ID;
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