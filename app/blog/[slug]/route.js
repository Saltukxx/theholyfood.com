import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'app', 'blog', 'posts', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(content);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}
