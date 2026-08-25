import { ImageResponse } from 'next/og';

export const GUIDE_OG_SIZE = { width: 1200, height: 630 };
export const GUIDE_OG_CONTENT_TYPE = 'image/png';

export function renderGuideOgImage(title: string, eyebrow = 'Founder AI citations') {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050505',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#34d399',
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: title.length > 70 ? 48 : 56,
            lineHeight: 1.15,
            color: 'white',
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 28, color: '#9ca3af' }}>Anthroly</div>
          <div style={{ fontSize: 22, color: '#6ee7b7' }}>$216 Founder Growth Diagnostic</div>
        </div>
      </div>
    ),
    { ...GUIDE_OG_SIZE }
  );
}
