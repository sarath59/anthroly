import { notFound } from 'next/navigation';
import { getCitationSpoke } from '@/lib/guides/citations-cluster';
import { GUIDE_OG_CONTENT_TYPE, GUIDE_OG_SIZE, renderGuideOgImage } from '@/components/guides/renderGuideOg';
import { readParams } from '@/lib/next-params';

export const runtime = 'edge';
export const alt = 'Anthroly AI citation guide';
export const size = GUIDE_OG_SIZE;
export const contentType = GUIDE_OG_CONTENT_TYPE;

export default async function Image({ params: rawParams }: { params: { slug: string } }) {
  const params = await readParams(rawParams);
  const page = getCitationSpoke(params.slug);
  if (!page) notFound();
  return renderGuideOgImage(page.h1);
}
