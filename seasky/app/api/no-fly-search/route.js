import db from '../auth/db';

const SECRET_KEY = 'your_secret_key';

export async function POST(req) {
    const { passportNumber } = await req.json();
    const [results] = await db.query('SELECT * FROM no_fly WHERE Passport_Number = ?', [passportNumber]);
    
    if (results.length > 0) {
        const user = results[0];

        return new Response(JSON.stringify({
            message: 'Passenger found',
            passportNumber: user.Passport_Number,
            reason: user.Reason,
            dateAdded: user.Date_Added, 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Passenger not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
