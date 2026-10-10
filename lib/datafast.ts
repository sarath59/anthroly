/**
 * DataFast custom goals.
 * Names must be lowercase, max 64 chars. Avoid reserved payment-provider names.
 * @see https://datafa.st/docs/goals
 */

export const DATAFAST_GOALS = {
  /** Intake form completed and handed off to Cal.com */
  intakeSubmit: 'intake_submit',
  bookCall: 'book_call',
  emailContact: 'email_contact',
  /** Interactive click (button, link, control) with from/to params */
  click: 'click',
  /** Section entered the viewport */
  sectionView: 'section_view',
  /** Time spent in a section when the visitor leaves it */
  sectionTime: 'section_time',
  /** 25 / 50 / 75 / 100 page scroll milestones */
  scrollDepth: 'scroll_depth',
  /** In-site or outbound navigation with from → to */
  nav: 'nav',
  formSubmit: 'form_submit',
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
