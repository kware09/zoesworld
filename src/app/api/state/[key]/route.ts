import { NextRequest, NextResponse } from 'next/server';
import { getValue, setValue } from '@/lib/server/json-store';

// Matches global keys (zw_profiles, zw_parent_config) and
// profile-namespaced keys (zw_{profileId}_player, etc.)
const VALID_KEY_PATTERN = /^zw_([a-z0-9]+_)?(player|sessions|mastery|decorations|parent_config|current_session|profiles)$/;

function isValidKey(key: string): boolean {
  return VALID_KEY_PATTERN.test(key);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!isValidKey(key)) {
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
  if (!isValidKey(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  const body = await request.json();
  await setValue(key, body.value);

  return NextResponse.json({ ok: true });
}
