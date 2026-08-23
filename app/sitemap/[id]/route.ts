import { NextResponse } from 'next/server';
import { absoluteUrl } from '@/lib/site';

/**
 * Legacy split sitemaps (/sitemap/0 … /sitemap/9) from the ~35k / ~150k era.
 * robots.txt now lists only /sitemap.xml. Redirect so Google does not keep
 * an old, conflicting URL list.
 */
export async function GET() {
  return NextResponse.redirect(absoluteUrl('/sitemap.xml'), 301);
}

export function generateStaticParams() {
  return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((id) => ({ id }));
}
