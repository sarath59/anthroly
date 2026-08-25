import type { ReactNode } from 'react';
import { ImageResponse } from 'next/og';
import type { CitationDiagram } from '@/lib/guides/citation-diagrams';
import { GUIDE_DIAGRAM_SIZE } from '@/lib/guides/citation-diagrams';

const W = GUIDE_DIAGRAM_SIZE.width;
const H = GUIDE_DIAGRAM_SIZE.height;

export const GUIDE_DIAGRAM_CONTENT_TYPE = 'image/png';

function Frame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: W,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        background: '#050505',
        padding: '44px 48px 40px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#34d399',
            fontWeight: 600,
          }}
        >
          Anthroly · Founder AI citations
        </div>
        <div style={{ fontSize: 18, color: '#6ee7b7' }}>$216 diagnostic</div>
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: 'white',
          marginBottom: 28,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flex: 1 }}>{children}</div>
      <div style={{ marginTop: 20, fontSize: 16, color: '#6b7280' }}>
        Qualitative liftability from Anthroly diagnostics — not a panel survey
      </div>
    </div>
  );
}

function Bars({ spec }: { spec: CitationDiagram }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
      {(spec.bars ?? []).map((bar) => (
        <div key={bar.label} style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontSize: 22, color: 'white', fontWeight: 600 }}>{bar.label}</div>
            <div style={{ fontSize: 18, color: '#9ca3af' }}>{bar.note}</div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 28,
              background: '#111827',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${bar.pct}%`,
                height: 28,
                background: bar.pct >= 50 ? '#34d399' : '#f59e0b',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Cards({ spec }: { spec: CitationDiagram }) {
  const items = spec.cards ?? [];
  const row1 = items.slice(0, 2);
  const row2 = items.slice(2, 4);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
      {[row1, row2].map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
          {row.map((card) => (
            <div
              key={card.title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 532,
                background: '#111827',
                border: '1px solid #1f2937',
                borderRadius: 16,
                padding: 22,
              }}
            >
              <div style={{ fontSize: 22, color: '#34d399', fontWeight: 700, marginBottom: 10 }}>
                {card.title}
              </div>
              <div style={{ fontSize: 20, color: '#d1d5db', lineHeight: 1.35 }}>{card.body}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Flow({ spec }: { spec: CitationDiagram }) {
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      {(spec.steps ?? []).map((step) => (
        <div
          key={step.n}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
            background: '#111827',
            borderRadius: 16,
            padding: 20,
            border: '1px solid #1f2937',
          }}
        >
          <div style={{ fontSize: 20, color: '#34d399', fontWeight: 700, marginBottom: 8 }}>{step.n}</div>
          <div style={{ fontSize: 22, color: 'white', fontWeight: 700, marginBottom: 8 }}>{step.title}</div>
          <div style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.35 }}>{step.body}</div>
        </div>
      ))}
    </div>
  );
}

export function renderGuideDiagramImage(spec: CitationDiagram) {
  let body: ReactNode;
  if (spec.kind === 'bars') body = <Bars spec={spec} />;
  else if (spec.kind === 'flow') body = <Flow spec={spec} />;
  else body = <Cards spec={spec} />;

  return new ImageResponse(<Frame title={spec.title}>{body}</Frame>, {
    width: W,
    height: H,
  });
}
