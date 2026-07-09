import type { APIRoute } from "astro";
import { insertItem, json, str } from "../../lib/forms";
import { getCurrentMember } from "../../lib/wixSession";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Login required: resolve the current member from the session.
    const member = await getCurrentMember();
    if (!member) return json({ ok: false, error: "Please log in to post a comment." }, 401);

    const b = await request.json();
    const postSlug = str(b.postSlug, 120);
    const body = str(b.body, 2000);
    if (!postSlug || !body) return json({ ok: false, error: "Say something first." }, 400);

    const created: any = await insertItem("BlogComment", {
      postSlug,
      memberId: member.id,
      authorName: member.firstName ?? member.email ?? "Member",
      body,
    });

    return json({
      ok: true,
      comment: {
        authorName: member.firstName ?? member.email ?? "Member",
        body,
        _id: created?._id ?? created?.dataItem?._id ?? "",
      },
    });
  } catch (err) {
    console.error("[api:comments]", err);
    return json({ ok: false, error: "Couldn't post your comment. Please try again." }, 500);
  }
};
