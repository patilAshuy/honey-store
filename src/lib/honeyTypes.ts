// Single source of truth for honey types used across the app.
// The `value` stored in DB (honey_type column) must match these exactly.

export const HONEY_TYPES = [
  { value: "Jamun",     label: "Jamun Honey",    icon: "🫐", image: "/images/PI Jamun Honey 1.jpg.jpeg" },
  { value: "Sidr",      label: "Sidr Honey",     icon: "🌿", image: "/images/PI Apple Sidr Honey 1.jpg.jpeg" },
  { value: "Forest",    label: "Forest Honey",   icon: "🌳", image: "/images/PI Forest Honey 1.jpg.jpeg" },
  { value: "Mustard",   label: "Mustard Honey",  icon: "🌻", image: "/images/PI Mustard Honey 1.jpg.jpeg" },
  { value: "Tulsi",     label: "Tulsi Honey",    icon: "🌱", image: "/images/PI Tulsi Honey 1.jpg.jpeg" },
  { value: "Raw Honey", label: "Raw Honey",      icon: "🐝", image: "/images/Believe Honey One A.jpg.jpeg" },
  { value: "Wild Honey",label: "Wild Honey",     icon: "🍃", image: "/images/Believe Honey One B.jpg.jpeg" },
  { value: "Multifloral",label:"Multifloral",    icon: "🌸", image: "/images/Believe Honey One C.jpg.jpeg" },
] as const;

// All local images grouped by type — used as fallback in product cards
export const LOCAL_IMAGES: Record<string, string[]> = {
  jamun:    [
    "/images/PI Jamun Honey 1.jpg.jpeg",
    "/images/PI Jamun Honey 2.jpg.jpeg",
    "/images/PI Jamun Honey 3.jpg.jpeg",
  ],
  sidr:     [
    "/images/PI Apple Sidr Honey 1.jpg.jpeg",
    "/images/PI Apple Sidr Honey 2.jpg.jpeg",
    "/images/PI Apple Sidr Honey 3.jpg.jpeg",
  ],
  forest:   [
    "/images/PI Forest Honey 1.jpg.jpeg",
    "/images/PI Forest Honey 2.jpg.jpeg",
    "/images/PI Forest Honey 3.jpg.jpeg",
  ],
  mustard:  [
    "/images/PI Mustard Honey 1.jpg.jpeg",
    "/images/PI Mustard Honey 2.jpg.jpeg",
    "/images/PI Mustard Honey 3.jpg.jpeg",
  ],
  tulsi:    [
    "/images/PI Tulsi Honey 1.jpg.jpeg",
    "/images/PI Tulsi Honey 2.jpg.jpeg",
    "/images/PI Tulsi Honey 3.jpg.jpeg",
  ],
  raw:      [
    "/images/Believe Honey One A.jpg.jpeg",
    "/images/Believe Honey One D.jpg.jpeg",
    "/images/Believe Honey One E.jpg.jpeg",
  ],
  wild:     [
    "/images/Believe Honey One B.jpg.jpeg",
    "/images/Believe Honey One C.jpg.jpeg",
    "/images/Kulkarni Apiary.jpg.jpeg",
  ],
  default:  [
    "/images/Believe Honey One A.jpg.jpeg",
    "/images/Believe Honey One B.jpg.jpeg",
    "/images/Believe Honey One C.jpg.jpeg",
    "/images/Believe Honey One D.jpg.jpeg",
    "/images/Believe Honey One E.jpg.jpeg",
  ],
};

// Returns the best image for a product — stored image first, then type-based fallback
export function getProductImage(product: any, idx = 0): string {
  const stored = product.images?.[0];
  if (stored && (stored.startsWith("http") || stored.startsWith("/"))) return stored;

  const type = (product.honey_type || product.category_id || "").toLowerCase().trim();

  // Check each key — use startsWith so "raw honey" matches "raw"
  for (const [key, imgs] of Object.entries(LOCAL_IMAGES)) {
    if (key === "default") continue;
    if (type.startsWith(key) || type.includes(key)) return imgs[idx % imgs.length];
  }
  return LOCAL_IMAGES.default[idx % LOCAL_IMAGES.default.length];
}

// Format a number as Indian Rupees — prices are stored as plain INR integers
export function formatPrice(value: number | null | undefined): string {
  if (value == null) return "—";
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}
