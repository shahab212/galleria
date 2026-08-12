import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Jimp, intToRGBA } from 'jimp';

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

    // 1. Load image into Jimp
    const image = await Jimp.read(buffer);

    // 2. Load Galleria Monogram watermark
    const watermarkPath = path.join(process.cwd(), 'public', 'images', 'monogram.png');
    const watermark = await Jimp.read(watermarkPath);

    // 3. Extract bottom-right corner region to analyze local background brightness
    const cornerW = Math.round(image.bitmap.width * 0.2);
    const cornerH = Math.round(image.bitmap.height * 0.2);
    const cornerX = image.bitmap.width - cornerW;
    const cornerY = image.bitmap.height - cornerH;

    const corner = image.clone().crop({
      x: cornerX,
      y: cornerY,
      w: cornerW,
      h: cornerH
    }).resize({ w: 1, h: 1 });

    const colorInt = corner.getPixelColor(0, 0);
    const { r, g, b } = intToRGBA(colorInt);

    // Relative luminance calculation
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const isLightCorner = brightness > 128;

    // 4. Invert watermark color if the background corner is dark
    if (!isLightCorner) {
      watermark.invert();
    }

    // 5. Scale watermark to 12% of the main image width (min 35px)
    const watermarkWidth = Math.max(35, Math.round(image.bitmap.width * 0.12));
    const watermarkHeight = Math.round(watermark.bitmap.height * (watermarkWidth / watermark.bitmap.width));
    watermark.resize({ w: watermarkWidth, h: watermarkHeight });

    // 6. Calculate position in the bottom-right corner with 4% margin
    const marginX = Math.round(image.bitmap.width * 0.04);
    const marginY = Math.round(image.bitmap.height * 0.04);
    const x = image.bitmap.width - watermark.bitmap.width - marginX;
    const y = image.bitmap.height - watermark.bitmap.height - marginY;

    // 7. Composite overlay with opacity
    watermark.opacity(0.75);
    image.composite(watermark, x, y);

    // 8. Convert to original mime-type and write file to local disk
    const mime = (image.mime || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/bmp' | 'image/tiff' | 'image/gif';
    const processedBuffer = await image.getBuffer(mime);
    await fs.writeFile(filePath, processedBuffer);

    return NextResponse.json({
      success: true,
      filePath: `/uploads/${filename}`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
