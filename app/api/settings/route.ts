import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

async function readDb() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { products: [], orders: [], heroSlides: [], teamMembers: [], globalDiscountPercent: 0 };
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json({
    globalDiscountPercent: db.globalDiscountPercent !== undefined ? db.globalDiscountPercent : 0
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { globalDiscountPercent } = body;

    if (typeof globalDiscountPercent !== 'number' || globalDiscountPercent < 0 || globalDiscountPercent > 100) {
      return NextResponse.json({ success: false, error: 'Invalid global discount value' }, { status: 400 });
    }

    const db = await readDb();
    db.globalDiscountPercent = globalDiscountPercent;
    await writeDb(db);

    return NextResponse.json({ success: true, globalDiscountPercent: db.globalDiscountPercent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
