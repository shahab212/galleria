import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

async function readDb() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { products: [], orders: [], heroSlides: [], teamMembers: [], patrons: [] };
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.patrons || []);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { patrons } = body;

    if (!Array.isArray(patrons)) {
      return NextResponse.json({ success: false, error: 'Patrons must be an array' }, { status: 400 });
    }

    const db = await readDb();
    db.patrons = patrons;
    await writeDb(db);

    return NextResponse.json({ success: true, patrons: db.patrons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
