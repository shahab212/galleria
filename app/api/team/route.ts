import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

async function readDb() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { products: [], orders: [], heroSlides: [], teamMembers: [] };
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.teamMembers || []);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { members } = body;

    if (!Array.isArray(members)) {
      return NextResponse.json({ success: false, error: 'Members must be an array' }, { status: 400 });
    }

    const db = await readDb();
    db.teamMembers = members;
    await writeDb(db);

    return NextResponse.json({ success: true, teamMembers: db.teamMembers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
