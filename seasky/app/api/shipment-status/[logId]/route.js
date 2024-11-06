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

    if (Travel_Status === "Waiting to be picked up") {
      await pool.query(
        `UPDATE goods g
         JOIN ships s ON g.Package_ID = s.Package_ID
         SET g.Regulation_Status = 'Verified'
         WHERE s.Log_ID = ?`,
        [logId]
      );
    }

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