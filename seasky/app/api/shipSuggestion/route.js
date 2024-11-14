import db from '../auth/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { suggestions } = await req.json();

        const queries = suggestions.map(suggestion => (
            db.query(
                'INSERT INTO shipment_suggestions (Carrier, Service_Type, Price) VALUES (?, ?, ?)',
                [suggestion.carrier, suggestion.serviceType, suggestion.price]
            )
        ));
        await Promise.all(queries);

        return NextResponse.json(
            { message: 'Shipment suggestions added successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error("Shipment display:", error);
        return new Response(JSON.stringify({ message: 'An error occurred' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}