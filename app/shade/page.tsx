"use client";

import { ShadeWheel } from "@/components/ShadeWheel";
import Link from "next/link";

export default function ShadePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">Signature ritual</p>
        <h1 className="font-display text-4xl md:text-5xl">Shade Wheel</h1>
        <p className="mt-3 text-brand-muted">
          Map depth and undertone on the wheel, then walk an AM/PM timeline built around your match — ingredient lists live on every PDP.
        </p>
      </div>
      <div className="mt-10">
        <ShadeWheel />
      </div>
      <p className="mt-10 text-sm text-brand-muted">
        Building a vanity tray? <Link href="/shop" className="font-semibold text-brand-primary hover:underline">Browse kits</Link> — code GLOWKIT adds a mini Rose Mist with any kit.
      </p>
    </div>
  );
}
