import Link from "next/link";
import { brand, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ShadeWheel } from "@/components/ShadeWheel";
import { Newsletter } from "@/components/Newsletter";
import { HeroCinema } from "@/components/HeroCinema";

export default function HomePage() {
  const featured = products.slice(0, 4);
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden px-4 py-24 md:px-6">
        <HeroCinema video={brand.heroVideo} image={brand.heroImage} className="opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#f0d4a833,transparent_50%)]" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center text-center">
          <div className="glass max-w-2xl px-8 py-12 md:px-14 md:py-16 animate-rise">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7090]">Liquid glass ritual</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              <span className="text-shimmer">{brand.name}</span>
            </h1>
            <p className="mt-4 text-lg text-[#2a2430]/80">{brand.tagline}</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-[#2a2430]/60">{brand.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link className="btn-primary" href="/shade">Find your shade</Link>
              <Link className="btn-ghost" href="/shop">{brand.cta}</Link>
            </div>
          </div>
          <div className="mt-10 grid w-full max-w-3xl gap-4 stagger-children md:grid-cols-3">
            {brand.stats.slice(0, 3).map(([n, l]) => (
              <div key={l} className="glass px-4 py-5">
                <p className="font-display text-3xl">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#9a7090]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="glass p-6 md:p-10">
          <ShadeWheel />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <h2 className="font-display text-4xl">Soft focus favorites</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <div key={p.id} className="glass overflow-hidden rounded-2xl">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
