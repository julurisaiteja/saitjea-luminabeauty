"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products, formatPrice } from "@/lib/data";

const DEPTHS = ["Fair", "Light", "Medium", "Deep"] as const;
const TONES = ["Cool", "Neutral", "Warm"] as const;
const GOALS = ["Glow", "Soft focus", "Calm"] as const;

const WHEEL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function ShadeWheel({ compact }: { compact?: boolean }) {
  const [depth, setDepth] = useState<(typeof DEPTHS)[number]>("Light");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Warm");
  const [goal, setGoal] = useState<(typeof GOALS)[number]>("Glow");
  const [wheelIdx, setWheelIdx] = useState(2);

  const match = useMemo(() => {
    const makeup = products.filter((p) => p.category === "Makeup" || p.category === "Skincare");
    const dIdx = DEPTHS.indexOf(depth);
    const tIdx = TONES.indexOf(tone);
    return makeup[(dIdx + tIdx) % makeup.length] || products[0];
  }, [depth, tone]);

  const amSteps = ["Rose Mist", "Dew Serum", match.name];
  const pmSteps = ["Gentle Cleanse", "Dew Serum", "Barrier Cream"];

  return (
    <div className={compact ? "" : "grid gap-10 lg:grid-cols-[1.1fr_1fr]"}>
      <div className="flex flex-col items-center">
        <div className="relative h-64 w-64 md:h-72 md:w-72">
          <div className="shade-wheel-ring absolute inset-0 rounded-full opacity-90 shadow-inner" />
          <div className="absolute inset-4 rounded-full bg-brand-surface shadow-lg" />
          {WHEEL_ANGLES.map((deg, idx) => (
            <button
              key={deg}
              type="button"
              aria-label={`Shade position ${idx + 1}`}
              onClick={() => setWheelIdx(idx)}
              className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                wheelIdx === idx ? "border-brand-fg scale-125" : "border-white/80"
              }`}
              style={{
                left: `${50 + 42 * Math.cos((deg - 90) * (Math.PI / 180))}%`,
                top: `${50 + 42 * Math.sin((deg - 90) * (Math.PI / 180))}%`,
                background: `hsl(${28 + idx * 8}, ${42 + idx * 3}%, ${72 - idx * 6}%)`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] uppercase tracking-wider text-brand-muted">Match</p>
            <p className="font-display text-2xl">{match.name}</p>
            <p className="mt-1 text-xs text-brand-muted">{depth} · {tone}</p>
          </div>
        </div>
        {!compact && (
          <p className="mt-4 max-w-xs text-center text-xs text-brand-muted">
            Rotate through undertone families on the wheel, then confirm depth below. Science-forward, not guesswork.
          </p>
        )}
      </div>

      <div className="space-y-5">
        <div className="card-soft rounded-sm p-5">
          <p className="text-xs uppercase tracking-wider text-brand-muted">Depth</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEPTHS.map((d) => (
              <button key={d} type="button" onClick={() => setDepth(d)} className={`btn-ghost !py-2 text-xs ${depth === d ? "!border-brand-primary" : ""}`}>{d}</button>
            ))}
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-brand-muted">Undertone</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button key={t} type="button" onClick={() => setTone(t)} className={`btn-ghost !py-2 text-xs ${tone === t ? "!border-brand-accent" : ""}`}>{t}</button>
            ))}
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-brand-muted">Ritual goal</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <button key={g} type="button" onClick={() => setGoal(g)} className={`btn-ghost !py-2 text-xs ${goal === g ? "!border-brand-primary" : ""}`}>{g}</button>
            ))}
          </div>
        </div>

        <div className="card-soft rounded-sm p-5">
          <p className="font-display text-xl">AM / PM timeline</p>
          <p className="mt-1 text-xs text-brand-muted">{goal} focus · {formatPrice(match.price)} anchor product</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Morning</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-brand-muted">
                {amSteps.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">Evening</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-brand-muted">
                {pmSteps.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </div>
          </div>
          <Link href={`/product/${match.id}`} className="btn-primary mt-5 inline-flex">Shop your match</Link>
        </div>
      </div>
    </div>
  );
}
