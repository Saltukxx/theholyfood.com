import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { slug } = await request.json();
    
    // Read draft
    const draftPath = path.join(process.cwd(), 'drafts', `${slug}.json`);
    const publishPath = path.join(process.cwd(), 'posts', `${slug}.json`);
    
    if (!fs.existsSync(draftPath)) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    // Read draft content
    const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
    
    // Update date and remove draft status
    draft.date = new Date().toISOString();
    draft.isDraft = false;

    // Save to posts directory
    fs.writeFileSync(publishPath, JSON.stringify(draft, null, 2));
    
    // Remove from drafts
    fs.unlinkSync(draftPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error publishing draft:', error);
    return NextResponse.json(
      { error: 'Error publishing draft' },
      { status: 500 }
    );
  }
}