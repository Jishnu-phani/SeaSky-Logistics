// // /pages/api/travel-log/[logId].js
// import pool from '../../auth/db';

// export default async function handler(req, res) {
//   const { logId } = req.query;

//   if (req.method === 'PUT') {
//     const { Travel_Status } = req.body;

//     try {
//       await pool.query(
//         `UPDATE travel_log SET Travel_Status = ? WHERE Log_ID = ?`,
//         [Travel_Status, logId]
//       );
//       res.status(200).json({ message: 'Travel status updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to update travel status' });
//     }
//   } else {
//     res.setHeader('Allow', ['PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// app/api/travel-log/[logId]/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/api/auth/db';

export async function PUT(request, { params }) {
  try {
    const logId = params.logId;
    const { Travel_Status } = await request.json();

    if (!logId || !Travel_Status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE travel_log SET Travel_Status = ? WHERE Log_ID = ?`,
      [Travel_Status, logId]
    );

    return NextResponse.json(
      { message: 'Travel status updated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating travel status:', error);
    return NextResponse.json(
      { error: 'Failed to update travel status' },
      { status: 500 }
    );
  }
}