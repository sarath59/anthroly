'use client';

import { useMemo, useState } from 'react';

/** Inverse standard normal CDF (Acklam's rational approximation, |rel err| < 1.15e-9). */
function zQuantile(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) return -zQuantile(1 - p);
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

const fmt = (x: number) => (Number.isFinite(x) ? x.toLocaleString('en-US') : '—');
const clamp01 = (x: number) => Math.min(0.999, Math.max(0.001, x));

function Field({ label, value, onChange, step = 1, min, max, suffix }: { label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number; suffix?: string }) {
  return (
    <label className="block">
      <span className="text-[14px] text-ink-muted">{label}</span>
      <span className="mt-1 flex items-center gap-2">
        <input
          type="number"
          className="w-full rounded border border-rule bg-transparent px-3 py-2 text-[16px]"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        {suffix && <span className="text-[14px] text-ink-muted">{suffix}</span>}
      </span>
    </label>
  );
}

export function SampleSizeCalculator() {
  const [conf, setConf] = useState(95);
  const [p, setP] = useState(70);
  const [moe, setMoe] = useState(3);
  const [pop, setPop] = useState(0);
  const [p1, setP1] = useState(70);
  const [p2, setP2] = useState(75);
  const [power, setPower] = useState(80);
  const [nObs, setNObs] = useState(500);
  const [acc, setAcc] = useState(70);

  const z = zQuantile(1 - (1 - conf / 100) / 2);

  const single = useMemo(() => {
    const pp = clamp01(p / 100);
    const e = moe / 100;
    if (e <= 0) return NaN;
    const n0 = (z * z * pp * (1 - pp)) / (e * e);
    const n = pop > 0 ? n0 / (1 + (n0 - 1) / pop) : n0;
    return Math.ceil(n);
  }, [z, p, moe, pop]);

  const twoArm = useMemo(() => {
    const a = clamp01(p1 / 100);
    const b = clamp01(p2 / 100);
    if (a === b) return NaN;
    const zb = zQuantile(power / 100);
    const pbar = (a + b) / 2;
    const num = z * Math.sqrt(2 * pbar * (1 - pbar)) + zb * Math.sqrt(a * (1 - a) + b * (1 - b));
    return Math.ceil((num * num) / ((a - b) * (a - b)));
  }, [z, p1, p2, power]);

  const wilson = useMemo(() => {
    const n = Math.max(1, Math.round(nObs));
    const ph = Math.min(1, Math.max(0, acc / 100));
    const z2 = z * z;
    const center = (ph + z2 / (2 * n)) / (1 + z2 / n);
    const half = (z / (1 + z2 / n)) * Math.sqrt((ph * (1 - ph)) / n + z2 / (4 * n * n));
    return [Math.max(0, center - half) * 100, Math.min(1, center + half) * 100];
  }, [z, nObs, acc]);

  return (
    <div className="space-y-14">
      <div>
        <label className="block max-w-xs">
          <span className="text-[14px] text-ink-muted">Confidence level</span>
          <select className="mt-1 w-full rounded border border-rule bg-transparent px-3 py-2" value={conf} onChange={(e) => setConf(Number(e.target.value))}>
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
        <p className="mt-2 text-[13px] text-ink-faint">z = {z.toFixed(3)}</p>
      </div>

      <section>
        <h2 className="font-serif text-[1.9rem]">1. Items needed to estimate accuracy within ±E</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Field label="Expected accuracy p" value={p} onChange={setP} suffix="%" min={0} max={100} />
          <Field label="Margin of error E" value={moe} onChange={setMoe} step={0.5} suffix="± pts" min={0.1} />
          <Field label="Pool size N (0 = unlimited)" value={pop} onChange={setPop} min={0} />
        </div>
        <p className="mt-5 text-[20px]"><strong>{fmt(single)}</strong> labeled eval items</p>
        <p className="mt-2 text-[14px] text-ink-muted">n₀ = z²·p(1−p)/E²; with a finite pool, n = n₀ / (1 + (n₀−1)/N).</p>
      </section>

      <section>
        <h2 className="font-serif text-[1.9rem]">2. Items per model to detect a difference between two models</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Field label="Model A accuracy" value={p1} onChange={setP1} suffix="%" />
          <Field label="Model B accuracy" value={p2} onChange={setP2} suffix="%" />
          <Field label="Power" value={power} onChange={setPower} suffix="%" min={50} max={99} />
        </div>
        <p className="mt-5 text-[20px]"><strong>{fmt(twoArm)}</strong> items per model (independent samples, two-sided)</p>
        <p className="mt-2 text-[14px] text-ink-muted">
          n = [z₁₋α/₂·√(2p̄(1−p̄)) + z₁₋β·√(p₁(1−p₁)+p₂(1−p₂))]² / (p₁−p₂)², p̄ = (p₁+p₂)/2. If both models answer the same items, a paired analysis (McNemar test) usually needs fewer items; this figure is conservative.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-[1.9rem]">3. Confidence interval for an observed score (Wilson)</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Items evaluated n" value={nObs} onChange={setNObs} min={1} />
          <Field label="Observed accuracy" value={acc} onChange={setAcc} suffix="%" step={0.1} />
        </div>
        <p className="mt-5 text-[20px]"><strong>{wilson[0].toFixed(1)}% – {wilson[1].toFixed(1)}%</strong></p>
        <p className="mt-2 text-[14px] text-ink-muted">Wilson score interval: (p̂ + z²/2n ± z·√(p̂(1−p̂)/n + z²/4n²)) / (1 + z²/n).</p>
      </section>
    </div>
  );
}
