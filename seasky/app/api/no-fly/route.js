import db from '../auth/db';

export async function POST(req) {
    try {
        const {
            passportNumber,
            reason
        } = await req.json();

        await db.query(
            'INSERT INTO no_fly (Passport_Number, Reason) VALUES (?, ?)',
            [
                passportNumber,
                reason
            ]
        );

        return new Response(JSON.stringify({
            message: 'Added to No fly successfully',
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("No-fly error", error);
        return new Response(JSON.stringify({
            message: 'An error occurred while adding to No-fly list. Please try again.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}