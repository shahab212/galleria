import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

async function readDb() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { products: [], orders: [], heroSlides: [], teamMembers: [], instaPosts: [] };
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.instaPosts || []);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { posts } = body;

    if (!Array.isArray(posts)) {
      return NextResponse.json({ success: false, error: 'Posts must be an array' }, { status: 400 });
    }

    const db = await readDb();
    db.instaPosts = posts;
    await writeDb(db);

    return NextResponse.json({ success: true, instaPosts: db.instaPosts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
