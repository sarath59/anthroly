import { getCitationDiagram } from '@/lib/guides/citation-diagrams';
import { renderGuideDiagramImage } from '@/components/guides/renderGuideDiagram';

export const runtime = 'edge';
export const revalidate = 86400;

export function GET() {
  return renderGuideDiagramImage(getCitationDiagram(null));
}
