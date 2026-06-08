export type Room = {
  slug: string;
  name: string;
  hotel: string;
  price: number;
  guests: number;
  beds: number;
  image: string;
  badge?: string;
};

export const rooms: Room[] = [
  {
    slug: "deluxe-king",
    name: "Deluxe King Room",
    hotel: "Blue Origin Fams",
    price: 80,
    guests: 2,
    beds: 1,
    image: "/images/hero.jpg",
    badge: "Popular Choice",
  },
  {
    slug: "garden-suite",
    name: "Garden Suite",
    hotel: "Green Villa",
    price: 120,
    guests: 3,
    beds: 2,
    image: "/images/details/gallery-2.jpg",
  },
  {
    slug: "ocean-view",
    name: "Ocean View Room",
    hotel: "Coral Bay",
    price: 95,
    guests: 2,
    beds: 1,
    image: "/images/details/gallery-3.jpg",
  },
  {
    slug: "family-cottage",
    name: "Family Cottage",
    hotel: "Vinna Vill",
    price: 140,
    guests: 4,
    beds: 2,
    image: "/images/vinna-vill.png",
  },
  {
    slug: "premium-loft",
    name: "Premium Loft",
    hotel: "Modern",
    price: 160,
    guests: 2,
    beds: 1,
    image: "/images/modern.png",
    badge: "Popular Choice",
  },
  {
    slug: "standard-twin",
    name: "Standard Twin",
    hotel: "Boutiqe",
    price: 65,
    guests: 2,
    beds: 2,
    image: "/images/boutique.png",
  },
  {
    slug: "hillside-chalet",
    name: "Hillside Chalet",
    hotel: "Hilltop Cabin",
    price: 110,
    guests: 3,
    beds: 2,
    image: "/images/bobox.png",
  },
  {
    slug: "lakeside-studio",
    name: "Lakeside Studio",
    hotel: "Lake House",
    price: 90,
    guests: 2,
    beds: 1,
    image: "/images/top-view.png",
  },
];

/** Feature icons shown on every room card. */
export const roomFeatures = [
  { icon: "/icons/ic_bedroom.png", label: "Bed" },
  { icon: "/icons/ic_wifi.png", label: "Wifi" },
  { icon: "/icons/ic_ac.png", label: "AC" },
  { icon: "/icons/ic_tv.png", label: "TV" },
];
