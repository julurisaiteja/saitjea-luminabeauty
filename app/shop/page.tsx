"use client";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { brand, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

function ShopInner() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [cat, setCat] = useState(sp.get("cat") || "All");
  const [sort, setSort] = useState("featured");

  const cats = ["All", ...brand.categories];

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const okCat = cat === "All" || p.category === cat;
      const okQ = !q || (p.name + p.description + p.category).toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="glass px-6 py-8 md:px-10 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">Vanity shelf</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">
          <span className="text-shimmer">Shop</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm text-brand-muted">{brand.niche} — filter by ritual category, search formulas, sort by glow.</p>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            className="input lg:max-w-xs"
            placeholder="Search serums, kits, shades…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-2">
            <select className="input !w-auto !rounded-full md:max-w-[160px]" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top rated</option>
            </select>
            {(q || cat !== "All") && (
              <button
                type="button"
                className="shop-chip"
                onClick={() => { setQ(""); setCat("All"); }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="listbox" aria-label="Categories">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              role="option"
              aria-selected={cat === c}
              data-active={cat === c}
              className="shop-chip"
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
          Showing {list.length} of {products.length} formulas
          {cat !== "All" ? ` · ${cat}` : ""}
          {q ? ` · “${q}”` : ""}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <div key={p.id} className="glass overflow-hidden rounded-2xl">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {!list.length && (
        <p className="glass mt-10 px-6 py-10 text-center text-brand-muted">
          No matches — try another shade family or clear filters.
        </p>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-brand-muted">Loading shelf…</div>}>
      <ShopInner />
    </Suspense>
  );
}
