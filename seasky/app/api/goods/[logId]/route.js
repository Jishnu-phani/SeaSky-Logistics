import { NextResponse } from 'next/server';
import pool from '@/app/api/auth/db';

export async function PUT(request, { params }) {
  try {
    const logId = params.logId;
    const { Regulation_Status } = await request.json();

    if (!logId || !Regulation_Status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE goods SET Regulation_Status = ? WHERE Package_ID = (SELECT Package_ID from ships s where Log_ID=?) `,
      [Regulation_Status, logId]
    );

    return NextResponse.json(
      { message: 'Regulation status updated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating regulation status:', error);
    return NextResponse.json(
      { error: 'Failed to update regulation status' },
      { status: 500 }
    );
  }
}