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
      SELECT s.Shipment_ID as shipmentId, s.Sender_ID as senderId, s.Receiver_ID as receiverId,
             tl.Origin as origin, tl.Destination as destination, tl.Mode_of_Transport as modeOfTransport,
             tl.ETA as eta, tl.Actual_end_time as actualEndTime
      FROM ships s
      JOIN travel_log tl ON s.Log_ID = tl.Log_ID
      JOIN sender se ON se.Sender_ID = s.Sender_ID
      WHERE se.User_ID = ?
      `,
      [userId]
    );

    // Format dates correctly
    const formattedShipments = results.map((shipment) => ({
      ...shipment,
      eta: new Date(shipment.eta).toLocaleString(),
      actualEndTime: new Date(shipment.actualEndTime).toLocaleString(),
    }));

    return NextResponse.json({ shipments: formattedShipments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving shipments' }, { status: 500 });
  }
}