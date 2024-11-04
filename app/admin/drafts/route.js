import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const draftsDir = path.join(process.cwd(), 'drafts'); // Adjust this if drafts are in a different directory

    if (!fs.existsSync(draftsDir)) {
      return NextResponse.json([]); // Return an empty array if no drafts are available
    }

    const files = fs.readdirSync(draftsDir);
    const drafts = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(draftsDir, file), 'utf8');
        return JSON.parse(content);
      })
      .filter(post => post.isDraft === true) // Include only drafts
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(drafts);
  } catch (error) {
    console.error('Error in drafts route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
