import productsA from "./products-a.json";
import productsB from "./products-b.json";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  badge: string | null;
  related: string[];
  faq: [string, string][];
  specs: Record<string, string>;
  variants: string[];
  [key: string]: unknown;
};

export const brand = {
  slug: "luminabeauty",
  name: "Lumina Beauty",
  tagline: "Skin that catches light.",
  niche: "Cosmetics / beauty",
  description: "Clean-feeling cosmetics and skincare for luminous everyday routines.",
  cta: "Shop radiance",
  checkoutNote: "Samples with every order over $50.",
  heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2400&q=80",
  heroVideo: "https://videos.pexels.com/video-files/3765112/3765112-uhd_2560_1440_25fps.mp4",
  categories: ["Skincare","Makeup","Hair","Fragrance","Kits"] as string[],
  isBooking: false,
  offer: {"code":"GLOWKIT","label":"Free mini Rose Mist with any kit","ends":"Limited bottles"},
  loyalty: "Lumina Ritual Rewards — samples with every third order",
  stats: [["Clean","feeling formulas"],["12","shade families"],["4.9","ritual rating"],["Derm","tested textures"]] as [string, string][],
  marquee: ["Shade finder ·","AM/PM routines ·","Ingredient glossaries ·","Soft focus ·","Dew skin ·"] as string[],
  reviews: [["Sofia D.",5,"Shade finder got Soft Focus Foundation perfect on the first try."],["Renee T.",5,"Dew Serum under makeup is unreal. No pilling."],["Ana B.",4,"Starter Kit is the right intro. Mist smells gentle."]] as [string, number, string][],
  ai: [["Dry skin morning routine?","Cleanse → Dew Serum → Rose Mist → Soft Focus if needed. Mist again midday."],["Find my shade?","Use Shade Finder: answer undertone + depth. We'll map to Soft Focus codes."],["Fragrance-free?","Core skincare is lightly scented with botanicals. Fragrance category is optional."],["Kit deal?","Lumina Starter Kit + GLOWKIT = free mini mist while supplies last."]] as [string, string][],
  blog: [["Layering serums without pilling","Rituals"],["Undertone vs overtone","Shade"],["Travel minis packing list","Guides"]] as [string, string][],
  stores: ["Lumina Counter — Westfield","Virtual shade appointments"] as string[],
  nicheKind: "beauty" as string,
};

export const products: Product[] = [...(productsA as Product[]), ...(productsB as Product[])];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function relatedProducts(p: Product) {
  return p.related.map(getProduct).filter(Boolean) as Product[];
}
