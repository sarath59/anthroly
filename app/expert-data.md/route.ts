import { expertDataMarkdown, markdownResponse } from '@/lib/agent-docs';

export const dynamic = 'force-static';

export function GET() {
  return markdownResponse(expertDataMarkdown(), '/expert-data');
}
