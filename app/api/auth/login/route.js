import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Check credentials (replace with your actual admin credentials)
    if (username === "admin" && 
        password === "123") {
      
      // Create token
      const token = sign({ username }, SECRET_KEY, { expiresIn: '24h' });
      
      // Set cookie
      cookies().set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}