import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

async function readDb() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { products: [], orders: [] };
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDb();

    const newProduct = {
      id: `p-${Date.now()}`,
      name: body.name || 'Untitled Canvas',
      category: body.category || 'abstract',
      type: body.type || 'Textured Canvas',
      pricePKR: Number(body.pricePKR) || 25000,
      rating: Number(body.rating) || 4.8,
      image: body.image || '/shop/image11.jpg',
      desc: body.desc || 'Premium gallery-curated artwork.',
      discountPercent: body.discountPercent !== undefined ? Number(body.discountPercent) : 0
    };

    db.products.push(newProduct);
    await writeDb(db);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || body.id;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    const db = await readDb();
    const idx = db.products.findIndex((p: any) => p.id === id);

    if (idx === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    db.products[idx] = {
      ...db.products[idx],
      name: body.name !== undefined ? body.name : db.products[idx].name,
      category: body.category !== undefined ? body.category : db.products[idx].category,
      type: body.type !== undefined ? body.type : db.products[idx].type,
      pricePKR: body.pricePKR !== undefined ? Number(body.pricePKR) : db.products[idx].pricePKR,
      rating: body.rating !== undefined ? Number(body.rating) : db.products[idx].rating,
      image: body.image !== undefined ? body.image : db.products[idx].image,
      desc: body.desc !== undefined ? body.desc : db.products[idx].desc,
      discountPercent: body.discountPercent !== undefined ? Number(body.discountPercent) : (db.products[idx].discountPercent || 0)
    };

    await writeDb(db);
    return NextResponse.json({ success: true, product: db.products[idx] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    const db = await readDb();
    const initialLength = db.products.length;
    db.products = db.products.filter((p: any) => p.id !== id);

    if (db.products.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await writeDb(db);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
