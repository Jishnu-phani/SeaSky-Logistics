import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../auth/db';

const SECRET_KEY = 'your_secret_key';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = decoded.id;

  try {
    // Call the stored procedure
    const [results] = await db.query('CALL GetUserBookings(?)', [userId]);
    
    // Format dates and times correctly (results[0] because stored procedure returns array of result sets)
    const formattedBookings = results[0].map((booking) => ({
      ...booking,
      date: new Date(booking.date).toLocaleDateString(),
      startTime: new Date(`1970-01-01T${booking.startTime}Z`).toLocaleTimeString(),
      actualEndTime: new Date(booking.actualEndTime).toLocaleTimeString(),
    }));

    return NextResponse.json({ bookings: formattedBookings }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error retrieving bookings' }, { status: 500 });
  }
}