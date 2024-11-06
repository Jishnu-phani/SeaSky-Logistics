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
    const [results] = await db.query(
      `
      SELECT b.Booking_ID as bookingId, tl.Origin as origin, tl.Destination as destination, tl.Date as date, 
             tl.Mode_of_Transport as modeOfTransport, tl.Start_time as startTime, 
             tl.Actual_end_time as actualEndTime
      FROM travel_log tl
      JOIN books b ON tl.Log_ID = b.Log_ID
      JOIN passenger p ON b.Passenger_ID = p.Passenger_ID
      WHERE p.User_ID = ?
      `,
      [userId]
    );

    // Format dates and times correctly
    const formattedBookings = results.map((booking) => ({
      ...booking,
      date: new Date(booking.date).toLocaleDateString(), // Date formatting
      startTime: new Date(`1970-01-01T${booking.startTime}Z`).toLocaleTimeString(), // Start time formatting
      actualEndTime: new Date(booking.actualEndTime).toLocaleTimeString(), // End time formatting
    }));

    return NextResponse.json({ bookings: formattedBookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving bookings' }, { status: 500 });
  }
}