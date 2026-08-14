/**
 * DataFast custom goals.
 * Names must be lowercase, max 64 chars. Avoid reserved payment-provider names.
 * @see https://datafa.st/docs/goals
 */

export const DATAFAST_GOALS = {
  bookCall: 'book_call',
  aeoReport: 'aeo_report',
  tryAgent: 'try_agent',
  citationNeighborhood: 'citation_neighborhood',
  aiVisibilityAudit: 'ai_visibility_audit',
  emailContact: 'email_contact',
} as const;

export type DataFastGoalName = (typeof DATAFAST_GOALS)[keyof typeof DATAFAST_GOALS];

export type DataFastParams = Record<string, string>;

declare global {
  interface Window {
    datafast?: ((goal: string, params?: DataFastParams) => void) & {
      q?: unknown[];
    };
  }
}

function sanitizeParams(params?: DataFastParams): DataFastParams | undefined {
  if (!params) return undefined;
  const entries = Object.entries(params)
    .filter(([key, value]) => key && value)
    .slice(0, 10)
    .map(([key, value]) => [
      key.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0, 64),
      String(value).slice(0, 255),
    ]);
  return Object.fromEntries(entries);
}

export function trackGoal(goal: string, params?: DataFastParams): void {
  if (typeof window === 'undefined') return;
  const name = goal.toLowerCase().slice(0, 64);
  if (!name) return;
  window.datafast?.(name, sanitizeParams(params));
}

export function currentPageParam(): string {
  if (typeof window === 'undefined') return '/';
  return `${window.location.pathname}${window.location.hash}`.slice(0, 255);
}
