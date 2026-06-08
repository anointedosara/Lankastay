export type Hotel = {
  slug: string;
  name: string;
  location: string;
  /** Price in USD, used per night on cards and per day in booking. */
  price: number;
  image: string;
  badge?: string;
  /** Featured hotels render in the large "Most Picked" tiles. */
  featured?: boolean;
  /** Extra hotels only appear on the Hotels page, not the home grids. */
  extra?: boolean;
};

export const hotels: Hotel[] = [
  {
    slug: "blue-origin-fams",
    name: "Blue Origin Fams",
    location: "Galle, Sri Lanka",
    price: 50,
    image: "/images/blue-origin.png",
    featured: true,
  },
  {
    slug: "ocean-land",
    name: "Ocean Land",
    location: "Trincomalee, Sri Lanka",
    price: 22,
    image: "/images/ocean-land.png",
    featured: true,
  },
  {
    slug: "stark-house",
    name: "Stark House",
    location: "Dehiwala, Sri Lanka",
    price: 856,
    image: "/images/stark-house.png",
    featured: true,
  },
  {
    slug: "vinna-vill",
    name: "Vinna Vill",
    location: "Beruwala, Sri Lanka",
    price: 62,
    image: "/images/vinna-vill.png",
    featured: true,
  },
  {
    slug: "bobox",
    name: "Bobox",
    location: "Kandy, Sri Lanka",
    price: 72,
    image: "/images/bobox.png",
    featured: true,
  },
  {
    slug: "shangri-la",
    name: "Shangri-La",
    location: "Colombo, Sri Lanka",
    price: 120,
    image: "/images/shangri-la.jpg",
    badge: "Popular Choice",
  },
  {
    slug: "top-view",
    name: "Top View",
    location: "Hikkaduwe, Sri Lanka",
    price: 95,
    image: "/images/top-view.png",
  },
  {
    slug: "green-villa",
    name: "Green Villa",
    location: "Kandy, Sri Lanka",
    price: 80,
    image: "/images/green-villa.png",
  },
  {
    slug: "wodden-pit",
    name: "Wodden Pit",
    location: "Ambalangode, Sri Lanka",
    price: 65,
    image: "/images/wodden-pit.jpg",
  },
  {
    slug: "boutiqe",
    name: "Boutiqe",
    location: "Kandy, Sri Lanka",
    price: 110,
    image: "/images/boutique.png",
  },
  {
    slug: "modern",
    name: "Modern",
    location: "Nuwereliya, Sri Lanka",
    price: 140,
    image: "/images/modern.png",
  },
  {
    slug: "silver-rain",
    name: "Silver Rain",
    location: "Dehiwala, Sri Lanka",
    price: 99,
    image: "/images/silver-rain.jpg",
  },
  {
    slug: "cashville",
    name: "Cashville",
    location: "Ampara, Sri Lanka",
    price: 88,
    image: "/images/cashville.png",
    badge: "Popular Choice",
  },
  {
    slug: "lake-house",
    name: "Lake House",
    location: "Nuwara Eliya, Sri Lanka",
    price: 130,
    image: "/images/details/green-lake.png",
    extra: true,
  },
  {
    slug: "coral-bay",
    name: "Coral Bay",
    location: "Mirissa, Sri Lanka",
    price: 150,
    image: "/images/details/snorkeling.png",
    extra: true,
  },
  {
    slug: "hilltop-cabin",
    name: "Hilltop Cabin",
    location: "Ella, Sri Lanka",
    price: 105,
    image: "/images/image-5.png",
    extra: true,
  },
  {
    slug: "city-lodge",
    name: "City Lodge",
    location: "Colombo, Sri Lanka",
    price: 70,
    image: "/images/details/labour-and-wait.png",
    extra: true,
  },
  {
    slug: "riverside",
    name: "Riverside",
    location: "Kitulgala, Sri Lanka",
    price: 92,
    image: "/images/details/dog-clubs.png",
    extra: true,
  },
];

export const mostPicked = hotels.filter((h) => h.featured);
export const popular = hotels.filter((h) => !h.featured && !h.extra);
/** Every hotel, for the dedicated Hotels listing page. */
export const allHotels = hotels;

export function getHotel(slug: string): Hotel | undefined {
  return hotels.find((h) => h.slug === slug);
}

/** What a hotel can accommodate — derived from its price tier. */
export type Capacity = {
  bedrooms: number;
  maxGuests: number;
  ac: boolean;
  wifiMbps: number;
};

export function getCapacity(hotel: Hotel): Capacity {
  const p = hotel.price;
  const bedrooms = p >= 130 ? 5 : p >= 90 ? 4 : p >= 65 ? 3 : p >= 40 ? 2 : 1;
  return {
    bedrooms,
    maxGuests: bedrooms * 2,
    ac: p >= 60,
    wifiMbps: p >= 100 ? 50 : p >= 60 ? 25 : 10,
  };
}

export type HotelFilters = {
  location?: string;
  guests?: number;
  rooms?: number;
  ac?: boolean;
};

/** Filter hotels by location and by what they can accommodate. */
export function filterHotels(filters: HotelFilters): Hotel[] {
  return allHotels.filter((h) => {
    const cap = getCapacity(h);
    if (filters.location && h.location !== filters.location) return false;
    if (filters.guests && cap.maxGuests < filters.guests) return false;
    if (filters.rooms && cap.bedrooms < filters.rooms) return false;
    if (filters.ac && !cap.ac) return false;
    return true;
  });
}

/** Amenities shown on the details page — shared across every hotel. */
export const amenities = [
  { icon: "/icons/ic_bedroom.png", value: 1, label: "bedroom" },
  { icon: "/icons/ic_livingroom.png", value: 1, label: "living room" },
  { icon: "/icons/ic_bathroom.png", value: 1, label: "bathroom" },
  { icon: "/icons/ic_diningroom.png", value: 1, label: "dining room" },
  { icon: "/icons/ic_wifi.png", value: 10, label: "mbp/s" },
  { icon: "/icons/ic_ac.png", value: 7, label: "unit ready" },
  { icon: "/icons/ic_kulkas.png", value: 1, label: "refrigator" },
  { icon: "/icons/ic_tv.png", value: 2, label: "television" },
];

/** Gallery images shown on the details page — shared across every hotel. */
export const gallery = [
  "/images/details/gallery-1.png",
  "/images/details/gallery-2.jpg",
  "/images/details/gallery-3.jpg",
];

/** "Treasure to Choose" recommendations — shared across every hotel. */
export const treasures = [
  { name: "Green Lake", type: "Nature", image: "/images/details/green-lake.png" },
  { name: "Dog Clubs", type: "Pool", image: "/images/details/dog-clubs.png" },
  {
    name: "Labour and Wait",
    type: "Shopping",
    image: "/images/details/labour-and-wait.png",
    badge: "Popular Choice",
  },
  { name: "Snorkeling", type: "Beach", image: "/images/details/snorkeling.png" },
];

export const aboutText = [
  "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
  "Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.",
];
