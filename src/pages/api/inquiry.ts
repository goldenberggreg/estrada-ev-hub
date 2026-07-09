import type { APIRoute } from "astro";
import { insertItem, json, str } from "../../lib/forms";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const b = await request.json();
    const name = str(b.name, 120);
    const email = str(b.email, 160);
    const message = str(b.message, 4000);
    if (!name || !email || !message) return json({ ok: false, error: "Name, email and message are required." }, 400);
    await insertItem("Inquiry", {
      name,
      email,
      company: str(b.company, 160),
      fleetSize: str(b.fleetSize, 60),
      message,
      topic: str(b.topic, 60),
    });
    return json({ ok: true });
  } catch (err) {
    console.error("[api:inquiry]", err);
    return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
  }
};
