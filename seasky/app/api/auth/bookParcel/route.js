import db from '../db';
import { nanoid } from 'nanoid';

export async function POST(req) {
    try {
        const {
            trackingNumber,
            senderAddress,
            receiverDetails,
            weight,
            volume,
            isFragile,
            description,
            category,
            shippingDate,
            selectedOption
        } = await req.json();

        const shipmentId = nanoid(10);
        const senderId = nanoid(10);
        const receiverId = nanoid(10);
        const packageId = nanoid(10);
        const logId = nanoid(15);

        const formattedShippingDate = new Date(shippingDate).toISOString().split('T')[0];

        await db.query(
            'INSERT INTO sender (Sender_ID, Street, City, State, Country, Company, User_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                senderId,
                senderAddress.street,
                senderAddress.city,
                senderAddress.state,
                senderAddress.country,
                'Meta', 
                null
            ]
        );

        await db.query(
            'INSERT INTO Receiver (Receiver_ID, First_Name, Last_Name, Street, City, State, Country) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                receiverId,
                receiverDetails.firstName,
                receiverDetails.lastName,      
                receiverDetails.street,
                receiverDetails.city,
                receiverDetails.state,
                receiverDetails.country
            ]
        );

        await db.query(
            'INSERT INTO shipment (Shipment_ID, Booking_Date, Departure_Date, Shipment_Status) VALUES (?, CURRENT_TIMESTAMP, ?, ?)',
            [
                shipmentId,
                formattedShippingDate,
                'Booked'
            ]
        );

        await db.query(
            'INSERT INTO goods (Package_ID, Weight, Volume, Regulation_Status, Category, Fragile, Description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                packageId,
                weight,
                volume,
                'Unverified',
                category,
                isFragile === 'yes' ? 'Yes' : 'No',
                description || null
            ]
        );

        const startTime = new Date(shippingDate);
        startTime.setHours(startTime.getHours() + Math.floor(Math.random() * 5));
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + (selectedOption.estimatedDays * 24));

        const formattedStartTime = startTime.toISOString().replace('T', ' ').slice(0, 19);
        const formattedEndTime = endTime.toISOString().replace('T', ' ').slice(0, 19);
        const formattedStartTimeOnly = startTime.toTimeString().slice(0, 8);

        await db.query(
            'INSERT INTO travel_log (Log_ID, Travel_Status, Origin, Destination, Date, Mode_of_Transport, ETA, Actual_end_time, Start_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                logId,
                'Yet to be verified',
                `${senderAddress.city}, ${senderAddress.country}`,
                `${receiverDetails.city}, ${receiverDetails.country}`,
                formattedShippingDate,
                'Flight',
                formattedEndTime,
                formattedEndTime,
                formattedStartTimeOnly
            ]
        );

        await db.query(
            'INSERT INTO ships (Sender_ID, Shipment_ID, Package_ID, Log_ID, Receiver_ID) VALUES (?, ?, ?, ?, ?)',
            [
                senderId,
                shipmentId,
                packageId,
                logId,
                receiverId
            ]
        );

        return new Response(JSON.stringify({
            message: 'Shipment booked successfully',
            trackingNumber: trackingNumber,
            shipmentId: shipmentId
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Shipping booking error:", error);
        return new Response(JSON.stringify({
            message: 'An error occurred while booking the shipment. Please try again.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}