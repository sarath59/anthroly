# Anthroly

Marketing site for Anthroly, a data lab that buys, licenses and brokers operational data from US companies and supplies it to frontier AI labs.

## Stack

Next.js 14 (App Router), Tailwind CSS, Framer Motion, DataFast analytics.

## Structure

- `app/page.tsx`: landing page, composed from `components/home/*`
- `app/contact`: intake form that hands answers to Cal.com as prefill and metadata
- `app/learn`: guide hub and article template; content lives in `lib/learn/posts/*`
- `lib/site.ts`: site constants (contact email, Cal.com URL, AI lab logos)
- `public/brand/mark.png`: logo mask, rendered via `components/Mark.tsx` in `currentColor`

## Development

```bash
npm install
npm run dev
```

Contact: sharatth@anthroly.com
