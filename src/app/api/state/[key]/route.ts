import { NextRequest, NextResponse } from 'next/server';
import { getValue, setValue } from '@/lib/server/json-store';

const VALID_KEYS = [
  'zw_player',
  'zw_sessions',
  'zw_mastery',
  'zw_decorations',
  'zw_parent_config',
  'zw_current_session',
];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  const value = await getValue(key);
  return NextResponse.json({ value: value ?? null });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  const body = await request.json();
  await setValue(key, body.value);

  return NextResponse.json({ ok: true });
}
