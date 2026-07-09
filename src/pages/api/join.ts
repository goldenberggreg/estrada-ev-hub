import type { APIRoute } from "astro";
import { insertItem, json, str } from "../../lib/forms";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const b = await request.json();
    const name = str(b.name, 120);
    const email = str(b.email, 160);
    if (!name || !email) return json({ ok: false, error: "Name and email are required." }, 400);
    await insertItem("MemberSignup", {
      name,
      email,
      tier: str(b.tier, 40),
      neighborhood: str(b.neighborhood, 120),
    });
    return json({ ok: true });
  } catch (err) {
    console.error("[api:join]", err);
    return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
  }
};
