import db from '../db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

const SECRET_KEY = 'your_secret_key';

export async function POST(req) {
    try {
        const { passportNumber, fromCity, toCity, travelDate } = await req.json();

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
        const bookingId = nanoid(10);
        const passengerId = nanoid(10);
        const logId = nanoid(15);

        const formattedTravelDate = new Date(travelDate).toISOString().split('T')[0];

        const [results] = await db.query('SELECT * FROM no_fly WHERE Passport_Number = ?', [passportNumber]);
        if (results.length > 0) {
            return new Response(JSON.stringify({ message: 'Passenger is in the no-fly list' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await db.query(
            'INSERT INTO passenger (Passenger_ID, Passport_Number, User_ID) VALUES (?, ?, ?)',
            [passengerId, passportNumber, userId || null]
        );

        await db.query(
            'INSERT INTO booking (Booking_ID, Departure_Date, Status) VALUES (?, ?, ?)',
            [bookingId, formattedTravelDate, 'Booked']
        );

        const startTime = new Date(travelDate);
        startTime.setHours(startTime.getHours() + Math.floor(Math.random() * 5));
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 2 + Math.floor(Math.random() * 3));

        const formattedStartTime = startTime.toISOString().replace('T', ' ').slice(0, 19);
        const formattedEndTime = endTime.toISOString().replace('T', ' ').slice(0, 19);

        await db.query(
            'INSERT INTO travel_log (Log_ID, Travel_Status, Origin, Destination, Date, Mode_of_Transport, ETA, Actual_end_time, Start_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [logId, 'Scheduled', fromCity, toCity, formattedTravelDate, 'Flight', formattedTravelDate, formattedEndTime, formattedStartTime]
        );

        await db.query(
            'INSERT INTO books (Passenger_ID, Booking_ID, Log_ID) VALUES (?, ?, ?)',
            [passengerId, bookingId, logId]
        );

        return new Response(JSON.stringify({ message: 'Booked successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Booking error:", error);
        return new Response(JSON.stringify({ message: 'An error occurred while booking. Please try again.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
