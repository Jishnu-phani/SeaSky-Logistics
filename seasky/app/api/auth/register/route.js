// app/api/auth/register/route.js
import db from '../db'; // Adjust path if necessary
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid'; // Import nanoid

export async function POST(request) {
  try {
    const { firstName, lastName, email, contact, password } = await request.json();

    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);

    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random 10-character User_ID
    const userId = nanoid(10);

    // Insert into the User table
    const query = `
      INSERT INTO Users (User_ID, Password, Contact_Number, First_Name, Last_Name, Email)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [userId, hashedPassword, contact, firstName, lastName, email];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        throw new Error('User registration failed');
      }
      console.log('User registered successfully:', results);
    });

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
