/**
 * content.ts — typed read access to the Estrada EV Hub CMS collections.
 * Every query is elevated (collection permissions vary) and try/caught so a
 * failed SSR query renders an empty section instead of truncating the response.
 */
import { items } from "@wix/data";
import { auth } from "@wix/essentials";

export interface Station {
  _id: string;
  name: string;
  slug: string;
  neighborhood: string;
  address: string;
  chargerTypes: string;
  chargerCount: number;
  availableNow: number;
  amenities: string;
  muralArtist: string;
  status: string;
  lat: number;
  lng: number;
  pricePerKwh: number;
  sortOrder: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  membershipTier: string;
  quote: string;
  detail: string;
  rating: number;
  sortOrder: number;
}

export interface StoryBlock {
  _id: string;
  heading: string;
  body: string;
  sortOrder: number;
}

export interface Vehicle {
  _id: string;
  model: string;
  slug: string;
  type: string;
  rangeKm: number;
  seats: number;
  description: string;
  sortOrder: number;
}

async function queryAll<T>(collectionId: string, sortField = "sortOrder"): Promise<T[]> {
  try {
    const elevated = auth.elevate(items.query);
    const { items: results } = await elevated(collectionId).ascending(sortField).limit(100).find();
    return results as unknown as T[];
  } catch (err) {
    console.error(`[cms:${collectionId}] query failed:`, err);
    return [];
  }
}

export interface Comment {
  _id: string;
  postSlug: string;
  authorName: string;
  body: string;
  _createdDate?: string | Date;
}

export async function getComments(postSlug: string): Promise<Comment[]> {
  try {
    const elevated = auth.elevate(items.query);
    const { items: results } = await elevated("BlogComment")
      .eq("postSlug", postSlug)
      .descending("_createdDate")
      .limit(100)
      .find();
    return results as unknown as Comment[];
  } catch (err) {
    console.error("[cms:BlogComment] query failed:", err);
    return [];
  }
}

export const getStations = () => queryAll<Station>("ChargingStation");
export const getTestimonials = () => queryAll<Testimonial>("Testimonial");
export const getVehicles = () => queryAll<Vehicle>("TestDriveVehicle");

export async function getStory(): Promise<StoryBlock | null> {
  const rows = await queryAll<StoryBlock>("StoryBlock");
  return rows[0] ?? null;
}

export async function getStationBySlug(slug: string): Promise<Station | null> {
  try {
    const elevated = auth.elevate(items.query);
    const { items: results } = await elevated("ChargingStation").eq("slug", slug).limit(1).find();
    return (results[0] as unknown as Station) ?? null;
  } catch (err) {
    console.error(`[cms:ChargingStation] getStationBySlug failed:`, err);
    return null;
  }
}

// ── small shared helpers ──────────────────────────────────────────────────────
export const splitList = (s: string | undefined): string[] =>
  (s ?? "").split(",").map((x) => x.trim()).filter(Boolean);

export function availability(s: Pick<Station, "availableNow" | "chargerCount">) {
  const avail = s.availableNow ?? 0;
  const total = s.chargerCount ?? 0;
  if (avail <= 0) return { label: "Busy", tone: "busy", avail, total };
  if (avail <= Math.max(1, Math.floor(total * 0.34))) return { label: "Limited", tone: "limited", avail, total };
  return { label: "Available", tone: "open", avail, total };
}
