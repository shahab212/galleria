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

async function getAdminCredentials() {
  const db = await readDb();
  if (db.admin && db.admin.username && db.admin.password) {
    return db.admin;
  }
  return { username: 'admin', password: 'admin123' };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const adminCreds = await getAdminCredentials();

    // Standard credential checking for local demonstration / development environment
    if (username === adminCreds.username && password === adminCreds.password) {
      return NextResponse.json({
        success: true,
        token: 'galleria-admin-session-token'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid credentials. Please enter admin username and password.'
    }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'Current password and new password are required.' }, { status: 400 });
    }

    const adminCreds = await getAdminCredentials();
    if (currentPassword !== adminCreds.password) {
      return NextResponse.json({ success: false, error: 'Incorrect current password.' }, { status: 401 });
    }

    const db = await readDb();
    db.admin = {
      username: adminCreds.username,
      password: newPassword
    };
    await writeDb(db);

    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

