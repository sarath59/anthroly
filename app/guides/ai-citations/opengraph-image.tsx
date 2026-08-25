import { citationPillar } from '@/lib/guides/citations-cluster';
import { GUIDE_OG_CONTENT_TYPE, GUIDE_OG_SIZE, renderGuideOgImage } from '@/components/guides/renderGuideOg';

export const runtime = 'edge';
export const alt = citationPillar.h1;
export const size = GUIDE_OG_SIZE;
export const contentType = GUIDE_OG_CONTENT_TYPE;

export default function Image() {
  return renderGuideOgImage(citationPillar.h1);
}
