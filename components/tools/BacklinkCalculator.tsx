'use client';

import { useState } from 'react';

export function BacklinkCalculator() {
  const [links, setLinks] = useState(10);
  const [avgValue, setAvgValue] = useState(50);
  const [conversionRate, setConversionRate] = useState(2);

  const trafficPerLink = 20;
  const estimatedTraffic = links * trafficPerLink;
  const estimatedConversions = (estimatedTraffic * conversionRate) / 100;
  const estimatedValue = estimatedConversions * avgValue;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Number of backlinks</label>
          <input
            type="number"
            value={links}
            onChange={(e) => setLinks(Math.max(0, Number(e.target.value) || 0))}
            min={0}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Avg. value per conversion ($)</label>
          <input
            type="number"
            value={avgValue}
            onChange={(e) => setAvgValue(Math.max(0, Number(e.target.value) || 0))}
            min={0}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Traffic → conversion %</label>
          <input
            type="number"
            value={conversionRate}
            onChange={(e) => setConversionRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
            min={0}
            max={100}
            step={0.5}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-teal-500"
          />
        </div>
      </div>
      <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">Estimated ROI (illustrative)</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-teal-400">{estimatedTraffic.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Est. monthly traffic</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-400">{estimatedConversions.toFixed(1)}</div>
            <div className="text-xs text-gray-500">Est. conversions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-400">${Math.round(estimatedValue).toLocaleString()}</div>
            <div className="text-xs text-gray-500">Est. value/mo</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">Assumes ~20 visits per link per month. Adjust inputs for your niche.</p>
      </div>
    </div>
  );
}
