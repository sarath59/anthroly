import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import {
  CONNECT_FEE_LABEL,
  DIAGNOSTIC_NAME,
  SITE_URL,
  STRIPE_PAYMENT_LINK,
} from '@/lib/site';
import { datafastMetadataFromRequest, getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|pagespeed|gptbot|claudebot|anthropic|perplexity|bytespider|applebot/i;

function isBot(request: NextRequest): boolean {
  return BOT_UA.test(request.headers.get('user-agent') || '');
}

/**
 * Method 1 — Stripe Checkout API + DataFast cookies as session metadata.
 * DataFast attributes revenue from these keys; no webhook setup on our side.
 * @see https://datafa.st/docs/stripe-checkout-api
 */
async function createCheckout(request: NextRequest): Promise<NextResponse> {
  if (isBot(request)) {
    return NextResponse.redirect(new URL('/#pricing', SITE_URL), 302);
  }

  const stripe = getStripe();
  if (!stripe) {
    console.warn(
      'STRIPE_SECRET_KEY is missing. Falling back to Payment Link (no DataFast visitor metadata).'
    );
    return NextResponse.redirect(STRIPE_PAYMENT_LINK, 302);
  }

  const metadata = datafastMetadataFromRequest(request);
  const priceId = process.env.STRIPE_DIAGNOSTIC_PRICE_ID;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = priceId
    ? [{ price: priceId, quantity: 1 }]
    : [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 21600,
            product_data: {
              name: `${CONNECT_FEE_LABEL} ${DIAGNOSTIC_NAME}`,
              description:
                'Start fee to claim a slot and begin building both AI agents (1,000 emails/day + 24/7 backlinks). Only 10 slots. $1,000 go-live fee when you are happy. Then $500/month to run them with daily updates. Not happy? We refund the $1,000 go-live fee.',
            },
          },
        },
      ];

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${SITE_URL}/diagnostic/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/#pricing`,
      metadata,
      payment_intent_data: {
        metadata,
      },
      client_reference_id: metadata.datafast_visitor_id || undefined,
      customer_creation: 'always',
      billing_address_collection: 'auto',
      allow_promotion_codes: false,
    });

    if (!session.url) {
      return NextResponse.redirect(STRIPE_PAYMENT_LINK, 302);
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('Stripe checkout create failed', error);
    return NextResponse.redirect(STRIPE_PAYMENT_LINK, 302);
  }
}

export async function GET(request: NextRequest) {
  return createCheckout(request);
}

export async function POST(request: NextRequest) {
  return createCheckout(request);
}
