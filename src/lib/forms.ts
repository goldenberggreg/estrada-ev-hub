import { items } from "@wix/data";
import { auth } from "@wix/essentials";

/** Insert one item into a CMS collection with elevated permissions (server only). */
export async function insertItem(collectionId: string, data: Record<string, unknown>) {
  const insert = auth.elevate(items.insert);
  return await insert(collectionId, data);
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
