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
  // Return orders sorted by date desc
  const sorted = [...db.orders].sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDb();

    const orderRef = body.reference || `GA-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      reference: orderRef,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      client: {
        name: body.client?.name || 'Walk-in Client',
        email: body.client?.email || 'walkin@example.com',
        phone: body.client?.phone || '+92 300 1234567',
        address: body.client?.address || 'Lahore, Pakistan',
        city: body.client?.city || 'Lahore'
      },
      payment: {
        method: body.payment?.method || 'cod',
        status: body.payment?.method === 'bank' ? 'Awaiting Verification' : 'Pending'
      },
      items: body.items || [], // array of { product: Product, quantity: number }
      subtotal: Number(body.subtotal) || 0,
      shipping: Number(body.shipping) || 0,
      total: Number(body.total) || Number(body.subtotal) || 0
    };

    db.orders.push(newOrder);
    await writeDb(db);

    return NextResponse.json({ success: true, order: newOrder });
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
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    const db = await readDb();
    const idx = db.orders.findIndex((o: any) => o.id === id);

    if (idx === -1) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    if (body.status !== undefined) {
      db.orders[idx].status = body.status;
    }
    if (body.paymentStatus !== undefined) {
      db.orders[idx].payment.status = body.paymentStatus;
    }

    await writeDb(db);
    return NextResponse.json({ success: true, order: db.orders[idx] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
