import { NextResponse } from 'next/server';
import {
  getCitationDiagram,
  isCitationSpokeDiagram,
} from '@/lib/guides/citation-diagrams';
import { renderGuideDiagramImage } from '@/components/guides/renderGuideDiagram';
import { readParams } from '@/lib/next-params';

export const runtime = 'edge';
export const revalidate = 86400;

export async function GET(
  _request: Request,
  { params: rawParams }: { params: { slug: string } }
) {
  const params = await readParams(rawParams);
  if (!isCitationSpokeDiagram(params.slug)) {
    return new NextResponse('Not found', { status: 404 });
  }
  return renderGuideDiagramImage(getCitationDiagram(params.slug));
}
