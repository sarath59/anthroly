import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isConfigured(): boolean {
  const key = process.env.CONTENT_API_KEY;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  return Boolean(key && key.length >= 32 && token && repo && /^[\w.-]+\/[\w.-]+$/.test(repo));
}

function serviceUnavailable() {
  return NextResponse.json(
    {
      ok: false,
      error: 'Content API not configured',
      hint: 'Set CONTENT_API_KEY (32+ chars), GITHUB_TOKEN, and GITHUB_REPO env vars to enable this endpoint.',
    },
    { status: 503 }
  );
}

export async function GET() {
  if (!isConfigured()) return serviceUnavailable();
  return NextResponse.json({
    ok: true,
    message: 'Content API is configured. See documentation for usage.',
    endpoints: {
      'GET /api/content': 'List all posts',
      'GET /api/content?slug=x': 'Get one post',
      'POST /api/content': 'Create or update a post',
      'DELETE /api/content?slug=x': 'Unpublish (set draft: true)',
      'DELETE /api/content?slug=x&hard=true': 'Delete from repo',
    },
  });
}

export async function POST() {
  if (!isConfigured()) return serviceUnavailable();
  return NextResponse.json(
    { ok: false, error: 'Full content API not implemented. Configure GitHub integration to enable writes.' },
    { status: 501 }
  );
}

export async function DELETE() {
  if (!isConfigured()) return serviceUnavailable();
  return NextResponse.json(
    { ok: false, error: 'Full content API not implemented. Configure GitHub integration to enable writes.' },
    { status: 501 }
  );
}
