import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Adjusted path to match your directory structure for blog posts
    const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');
    
    // Check if the directory exists; create if it doesn't
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
      console.log('Created posts directory');
      return NextResponse.json([]); // Return an empty array if no posts are available
    }

    // Read all files in the posts directory
    const files = fs.readdirSync(postsDir);
    console.log('Files in directory:', files); // Debugging log

    // Filter and process the post files
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
      .filter(Boolean) // Remove any null values due to read errors
      .filter(post => !post.isDraft) // Exclude drafts
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

    return NextResponse.json(posts); // Return the posts data as JSON
  } catch (error) {
    console.error('Error in blog route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
