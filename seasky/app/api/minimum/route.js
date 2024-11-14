import db from '../auth/db';  // Adjust the import to your database setup
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Query to get all details of the suggestion with the minimum price
    const [result] = await db.query(`
      SELECT * FROM shipment_suggestions
      WHERE price = (SELECT MIN(price) FROM shipment_suggestions);
    `);

    // if (result.rows.length === 0) {
    //   return new Response(JSON.stringify({ message: 'No suggestions found' }), { status: 404 });
    // }

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching minimum price suggestion:", error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
