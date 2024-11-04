// app/api/blog/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Define the directory where blog posts are stored
    const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
      console.log('Created posts directory');
      return NextResponse.json([]); // Return an empty array if no posts are available
    }

    // Read all files in the posts directory
    const files = fs.readdirSync(postsDir);
    console.log('Files in directory:', files);

    if (files.length === 0) {
      console.log('No files found in posts directory');
      return NextResponse.json([]);
    }

    // Filter and process JSON files, excluding drafts and sorting by date
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

    console.log('Found posts:', posts);

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in blog route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
