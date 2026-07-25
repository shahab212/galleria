import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save path inside public/uploads folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate safe unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = path.join(uploadDir, filename);

    // Write file to local disk
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      filePath: `/uploads/${filename}`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
