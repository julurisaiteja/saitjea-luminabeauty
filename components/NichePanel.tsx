"use client";

import Link from "next/link";
import { ShadeWheel } from "./ShadeWheel";

export function NichePanel() {
  return (
    <section className="border-y border-brand-border bg-brand-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <ShadeWheel compact />
        <Link href="/shade" className="btn-primary mt-8 inline-flex">Open shade desk</Link>
      </div>
    </section>
  );
}
