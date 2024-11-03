import db from '../db'; // Adjust the path if necessary
import { nanoid } from 'nanoid';

export async function POST(req) {
    try {
        const { passportNumber, userId, fromCity, toCity, travelDate } = await req.json();
        const bookingId = nanoid(10);
        const passengerId = nanoid(10);
        const logId = nanoid(15);

        const formattedTravelDate = new Date(travelDate).toISOString().split('T')[0];

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
