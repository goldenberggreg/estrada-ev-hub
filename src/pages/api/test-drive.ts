import type { APIRoute } from "astro";
import { insertItem, json, str } from "../../lib/forms";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const b = await request.json();
    const name = str(b.name, 120);
    const email = str(b.email, 160);
    if (!name || !email) return json({ ok: false, error: "Name and email are required." }, 400);
    await insertItem("TestDriveRequest", {
      name,
      email,
      phone: str(b.phone, 40),
      vehicle: str(b.vehicle, 120),
      preferredDate: str(b.preferredDate, 40),
      preferredTime: str(b.preferredTime, 40),
      licenseFile: str(b.licenseFile, 300),
      status: "new",
    });
    return json({ ok: true });
  } catch (err) {
    console.error("[api:test-drive]", err);
    return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
  }
};
