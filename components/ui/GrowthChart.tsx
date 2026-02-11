'use client';

import React from 'react';

export interface GrowthChartDataPoint {
  label: string;
  value: number;
}

interface GrowthChartProps {
  data: GrowthChartDataPoint[];
  title?: string;
  subtitle?: string;
  valueLabel?: string;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

export function GrowthChart({
  data,
  title = 'Visibility',
  subtitle,
  valueLabel = 'Visits',
  startLabel,
  endLabel,
  className = '',
}: GrowthChartProps) {
  if (!data.length) return null;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 600;
  const height = 280;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1 || 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  const firstVal = data[0]?.value ?? 0;
  const lastVal = data[data.length - 1]?.value ?? 0;

  return (
    <div className={`rounded-2xl bg-black/40 border border-gray-800 p-6 ${className}`}>
      {title && (
        <div className="mb-2">
          <h4 className="text-base font-semibold text-white">{title}</h4>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-2xl font-bold text-emerald-400">{lastVal.toLocaleString()}</span>
        <span className="text-sm text-gray-500">
          {startLabel || data[0]?.label} vs {endLabel || data[data.length - 1]?.label}
        </span>
      </div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[320px] h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#chartGradient)" />
          <path
            d={pathD}
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgb(16, 185, 129)" />
          ))}
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={padding.left + (i / (data.length - 1 || 1)) * chartWidth}
              y={height - 12}
              textAnchor="middle"
              className="fill-gray-500 text-[10px]"
            >
              {d.label}
            </text>
          ))}
        </svg>
      </div>
      <p className="text-xs text-gray-500 mt-2">{valueLabel} over time</p>
    </div>
  );
}
