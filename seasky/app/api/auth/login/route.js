import db from '../db'; // Adjust the path if necessary
import bcrypt from 'bcryptjs'; // Use bcryptjs as it's often used with Next.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export async function POST(req) {
    const { email, password } = await req.json(); // Get the request body

    // Query the database to find the user by email
    const [results] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);

    // Check if the user exists
    if (results.length === 0) {
        return new Response(JSON.stringify({ message: 'User not found' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user = results[0];

    // Check the password
    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.User_ID }, SECRET_KEY, { expiresIn: '1h' });

    // Respond with success message and token
    return new Response(JSON.stringify({ message: 'Login successful', token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}