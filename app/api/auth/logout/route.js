import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Remove the admin token cookie
  cookies().delete('adminToken');
  
  return NextResponse.json({ success: true });
}