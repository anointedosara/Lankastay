// Client-side persistence backed by localStorage. All functions are
// browser-only and no-op safely during SSR.

export type Role = "user" | "owner";

export type Account = {
  id: string;
  role: Role;
  name: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  country?: string;
  nic?: string;
  // Owner-only profile fields
  hotelName?: string;
  registrationNo?: string;
  address?: string;
  facilities?: string;
};

export type StoredBooking = {
  id: string;
  hotelSlug: string;
  name: string;
  location: string;
  image: string;
  price: number;
  dates: string;
  days: number;
  address: string;
  status: "Confirmed" | "Pending";
};

export type Listing = {
  id: string;
  ownerId: string;
  kind: "hotel" | "room";
  slug: string;
  name: string;
  location: string;
  price: number;
  image: string; // cover image, data URL
  gallery?: string[]; // extra images for the details page, data URLs
  facilities?: string;
};

const ACCOUNTS = "lankastay:accounts";
const SESSION = "lankastay:session";
const BOOKINGS = "lankastay:bookings"; // { [accountId]: StoredBooking[] }
const LISTINGS = "lankastay:listings"; // Listing[] (owner-added hotels/rooms)

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

/* ---- accounts ---- */

export function listAccounts(): Account[] {
  return read<Account[]>(ACCOUNTS, []);
}

export function createAccount(data: Omit<Account, "id">): Account {
  const accounts = listAccounts();
  const account: Account = { ...data, id: newId() };
  write(ACCOUNTS, [...accounts, account]);
  return account;
}

export function findByLogin(username: string, password: string): Account | undefined {
  return listAccounts().find(
    (a) => a.username === username && a.password === password
  );
}

export function updateAccount(id: string, patch: Partial<Account>): Account | null {
  const accounts = listAccounts();
  let updated: Account | null = null;
  const next = accounts.map((a) => {
    if (a.id !== id) return a;
    updated = { ...a, ...patch, id: a.id, role: a.role };
    return updated;
  });
  write(ACCOUNTS, next);
  return updated;
}

/* ---- session ---- */

export function setSession(id: string) {
  write(SESSION, id);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION);
}

export function getCurrentAccount(): Account | null {
  const id = read<string | null>(SESSION, null);
  if (!id) return null;
  return listAccounts().find((a) => a.id === id) ?? null;
}

/* ---- bookings (per account) ---- */

type BookingMap = Record<string, StoredBooking[]>;

export function getBookings(accountId: string): StoredBooking[] {
  return read<BookingMap>(BOOKINGS, {})[accountId] ?? [];
}

export function setBookings(accountId: string, list: StoredBooking[]) {
  const map = read<BookingMap>(BOOKINGS, {});
  map[accountId] = list;
  write(BOOKINGS, map);
}

export function addBooking(accountId: string, booking: Omit<StoredBooking, "id">): StoredBooking {
  const list = getBookings(accountId);
  const full: StoredBooking = { ...booking, id: newId() };
  setBookings(accountId, [full, ...list]);
  return full;
}

export function removeBooking(accountId: string, id: string) {
  setBookings(accountId, getBookings(accountId).filter((b) => b.id !== id));
}

export function updateBooking(accountId: string, id: string, patch: Partial<StoredBooking>) {
  setBookings(
    accountId,
    getBookings(accountId).map((b) => (b.id === id ? { ...b, ...patch } : b))
  );
}

/* ---- listings (owner-added hotels / rooms) ---- */

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function listListings(): Listing[] {
  return read<Listing[]>(LISTINGS, []);
}

export function getOwnerListings(ownerId: string): Listing[] {
  return listListings().filter((l) => l.ownerId === ownerId);
}

export function addListing(data: Omit<Listing, "id" | "slug">): Listing {
  const listings = listListings();
  const listing: Listing = {
    ...data,
    id: newId(),
    slug: `${slugify(data.name)}-${listings.length + 1}`,
  };
  write(LISTINGS, [listing, ...listings]);
  return listing;
}

export function updateListing(id: string, patch: Partial<Listing>): Listing | null {
  let updated: Listing | null = null;
  const next = listListings().map((l) => {
    if (l.id !== id) return l;
    updated = { ...l, ...patch, id: l.id, ownerId: l.ownerId, slug: l.slug };
    return updated;
  });
  write(LISTINGS, next);
  return updated;
}

export function getListing(id: string): Listing | undefined {
  return listListings().find((l) => l.id === id);
}

export function removeListing(id: string) {
  write(LISTINGS, listListings().filter((l) => l.id !== id));
}
