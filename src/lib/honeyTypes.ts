// src/lib/honeyTypes.ts

// ─────────────────────────────────────────────────────────────
// Honey Types — Single Source of Truth
// The `value` MUST match the DB honey_type column exactly
// ─────────────────────────────────────────────────────────────

export const HONEY_TYPES = [
  {
    value: "Jamun",
    label: "Jamun Honey",
    icon: "🫐",
    image: "/images/PI Jamun Honey 1.jpg.jpeg",
  },
  {
    value: "Sidr",
    label: "Sidr Honey",
    icon: "🌿",
    image: "/images/PI Apple Sidr Honey 1.jpg.jpeg",
  },
  {
    value: "Forest",
    label: "Forest Honey",
    icon: "🌳",
    image: "/images/PI Forest Honey 1.jpg.jpeg",
  },
  {
    value: "Mustard",
    label: "Mustard Honey",
    icon: "🌻",
    image: "/images/PI Mustard Honey 1.jpg.jpeg",
  },
  {
    value: "Tulsi",
    label: "Tulsi Honey",
    icon: "🌱",
    image: "/images/PI Tulsi Honey 1.jpg.jpeg",
  },
  {
    value: "Raw Honey",
    label: "Raw Honey",
    icon: "🐝",
    image: "/images/Believe Honey One A.jpg.jpeg",
  },
  {
    value: "Wild Honey",
    label: "Wild Honey",
    icon: "🍃",
    image: "/images/Believe Honey One B.jpg.jpeg",
  },
  {
    value: "Multifloral",
    label: "Multifloral Honey",
    icon: "🌸",
    image: "/images/Believe Honey One C.jpg.jpeg",
  },
] satisfies { value: string; label: string; icon: string; image: string }[];

// ─────────────────────────────────────────────────────────────
// Strong Type Support
// ─────────────────────────────────────────────────────────────

export type HoneyType = (typeof HONEY_TYPES)[number]["value"];

// ─────────────────────────────────────────────────────────────
// Local fallback images grouped by honey type
// Used when DB image is missing
// ─────────────────────────────────────────────────────────────

export const LOCAL_IMAGES: Record<string, string[]> = {
  jamun: [
    "/images/PI Jamun Honey 1.jpg.jpeg",
    "/images/PI Jamun Honey 2.jpg.jpeg",
    "/images/PI Jamun Honey 3.jpg.jpeg",
  ],

  sidr: [
    "/images/PI Apple Sidr Honey 1.jpg.jpeg",
    "/images/PI Apple Sidr Honey 2.jpg.jpeg",
    "/images/PI Apple Sidr Honey 3.jpg.jpeg",
  ],

  forest: [
    "/images/PI Forest Honey 1.jpg.jpeg",
    "/images/PI Forest Honey 2.jpg.jpeg",
    "/images/PI Forest Honey 3.jpg.jpeg",
  ],

  mustard: [
    "/images/PI Mustard Honey 1.jpg.jpeg",
    "/images/PI Mustard Honey 2.jpg.jpeg",
    "/images/PI Mustard Honey 3.jpg.jpeg",
  ],

  tulsi: [
    "/images/PI Tulsi Honey 1.jpg.jpeg",
    "/images/PI Tulsi Honey 2.jpg.jpeg",
    "/images/PI Tulsi Honey 3.jpg.jpeg",
  ],

  raw: [
    "/images/Believe Honey One A.jpg.jpeg",
    "/images/Believe Honey One D.jpg.jpeg",
    "/images/Believe Honey One E.jpg.jpeg",
  ],

  wild: [
    "/images/Believe Honey One B.jpg.jpeg",
    "/images/Believe Honey One C.jpg.jpeg",
    "/images/Kulkarni Apiary.jpg.jpeg",
  ],

  multifloral: [
    "/images/Believe Honey One C.jpg.jpeg",
    "/images/Believe Honey One D.jpg.jpeg",
    "/images/Believe Honey One E.jpg.jpeg",
  ],

  default: [
    "/images/Believe Honey One A.jpg.jpeg",
    "/images/Believe Honey One B.jpg.jpeg",
    "/images/Believe Honey One C.jpg.jpeg",
    "/images/Believe Honey One D.jpg.jpeg",
    "/images/Believe Honey One E.jpg.jpeg",
  ],
};

// ─────────────────────────────────────────────────────────────
// Product Types
// ─────────────────────────────────────────────────────────────

export interface ProductImageData {
  images?: string[] | null;
  image_url?: string | null;
  honey_type?: HoneyType | string | null;
  category_id?: string | null;
}

// ─────────────────────────────────────────────────────────────
// Get best image for product
// Priority:
// 1. images[] from DB
// 2. image_url from DB
// 3. local fallback by honey type
// 4. default image
// ─────────────────────────────────────────────────────────────

export function getProductImage(
  product: ProductImageData,
  idx = 0
): string {
  // 1. Supabase images array
  const firstArrayImage = product.images?.[0];

  if (
    firstArrayImage &&
    (firstArrayImage.startsWith("http") ||
      firstArrayImage.startsWith("/"))
  ) {
    return firstArrayImage;
  }

  // 2. Legacy single image_url support
  if (
    product.image_url &&
    (product.image_url.startsWith("http") ||
      product.image_url.startsWith("/"))
  ) {
    return product.image_url;
  }

  // 3. Fallback by honey type
  const type = (
    product.honey_type ||
    product.category_id ||
    ""
  )
    .toLowerCase()
    .trim();

  for (const [key, imgs] of Object.entries(LOCAL_IMAGES)) {
    if (key === "default") continue;

    // "raw honey" should match "raw"
    if (type === key || type.startsWith(key) || type.includes(key)) {
      return imgs[idx % imgs.length];
    }
  }

  // 4. Default fallback
  return LOCAL_IMAGES.default[
    idx % LOCAL_IMAGES.default.length
  ];
}

// ─────────────────────────────────────────────────────────────
// Get honey type metadata
// Useful for badges, icons, labels
// ─────────────────────────────────────────────────────────────

export function getHoneyTypeMeta(type?: string | null) {
  if (!type) return null;

  return HONEY_TYPES.find(
    (t) => t.value.toLowerCase() === type.toLowerCase()
  );
}

// ─────────────────────────────────────────────────────────────
// Get default image for honey type
// Used in admin auto-fill
// ─────────────────────────────────────────────────────────────

export function defaultImageForType(type?: string | null): string {
  if (!type) {
    return LOCAL_IMAGES.default[0];
  }

  const normalized = type.toLowerCase().trim();

  for (const [key, imgs] of Object.entries(LOCAL_IMAGES)) {
    if (key === "default") continue;

    if (
      normalized === key ||
      normalized.startsWith(key) ||
      normalized.includes(key)
    ) {
      return imgs[0];
    }
  }

  return LOCAL_IMAGES.default[0];
}

// ─────────────────────────────────────────────────────────────
// Format INR price
// ─────────────────────────────────────────────────────────────

export function formatPrice(
  value: number | string | null | undefined
): string {
  if (value == null || value === "") {
    return "—";
  }

  const num =
    typeof value === "string"
      ? parseFloat(value)
      : value;

  if (Number.isNaN(num)) {
    return "—";
  }

  return `₹${Math.round(num).toLocaleString("en-IN")}`;
}