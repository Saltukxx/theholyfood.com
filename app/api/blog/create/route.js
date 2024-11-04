import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import slugify from 'slugify';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const excerpt = formData.get('excerpt');
    const category = formData.get('category');
    const tags = JSON.parse(formData.get('tags'));
    const isDraft = formData.get('isDraft') === 'true';
    const image = formData.get('image');

    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });

    // Handle image upload if present
    let imagePath = '';
    if (image) {
      const buffer = await image.arrayBuffer();
      const imageDir = path.join(process.cwd(), 'public', 'blog-images');
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      imagePath = `/blog-images/${slug}.jpg`;
      const fullImagePath = path.join(process.cwd(), 'public', imagePath);

      await sharp(Buffer.from(buffer))
        .resize(1200, 800, { fit: 'inside' })
        .jpeg({ quality: 80 })
        .toFile(fullImagePath);
    }

    // Create post data
    const post = {
      title,
      slug,
      content,
      excerpt,
      category,
      tags,
      image: imagePath,
      date: new Date().toISOString(),
      isDraft
    };

    // Save to appropriate directory
    const baseDir = path.join(process.cwd(), isDraft ? 'drafts' : 'posts');
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    const filePath = path.join(baseDir, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2));

    return NextResponse.json({ 
      success: true, 
      slug,
      isDraft
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Error creating blog post' }, 
      { status: 500 }
    );
  }
}