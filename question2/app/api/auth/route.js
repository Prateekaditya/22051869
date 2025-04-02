import { getAuthToken } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getAuthToken();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
