import Stripe from 'stripe';

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

/** DataFast first-party cookies used for revenue attribution. */
export const DATAFAST_VISITOR_COOKIE = 'datafast_visitor_id';
export const DATAFAST_SESSION_COOKIE = 'datafast_session_id';

export function datafastMetadataFromRequest(request: {
  cookies: { get(name: string): { value: string } | undefined };
}): Record<string, string> {
  const visitorId = request.cookies.get(DATAFAST_VISITOR_COOKIE)?.value?.trim() || '';
  const sessionId = request.cookies.get(DATAFAST_SESSION_COOKIE)?.value?.trim() || '';
  const metadata: Record<string, string> = {};
  if (visitorId) metadata.datafast_visitor_id = visitorId.slice(0, 500);
  if (sessionId) metadata.datafast_session_id = sessionId.slice(0, 500);
  return metadata;
}
