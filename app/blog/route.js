import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Change the path to match your structure
    const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
      console.log('Created posts directory');
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(postsDir);
    console.log('Files in directory:', files);

    if (files.length === 0) {
      console.log('No files found in posts directory');
      return NextResponse.json([]);
    }

    const posts = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
          return JSON.parse(content);
        } catch (e) {
          console.error(`Error reading ${file}:`, e);
          return null;
        }
      })
      .filter(Boolean)
      .filter(post => !post.isDraft)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('Found posts:', posts);

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in blog route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}