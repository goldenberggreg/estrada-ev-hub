import { useState } from "react";

/**
 * CommentForm — members-only. Rendered only for logged-in members (the page
 * shows a login prompt to visitors). On success it prepends the new comment to
 * the server-rendered list so no reload is needed.
 */
export default function CommentForm({ postSlug, authorName }: { postSlug: string; authorName: string }) {
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const initial = (authorName || "?").charAt(0).toUpperCase();

  function prepend(body: string) {
    const list = document.getElementById("comment-list");
    if (!list) return;
    const empty = document.getElementById("comment-empty");
    if (empty) empty.remove();
    const li = document.createElement("li");
    li.className = "border-t border-rule py-4";
    li.innerHTML = `
      <div class="flex items-center gap-2 mb-1">
        <span class="w-7 h-7 rounded-full bg-primary text-white text-xs inline-flex items-center justify-center" style="font-family:var(--font-display);font-weight:700">${initial}</span>
        <span class="font-medium text-sm"></span>
        <span class="text-xs text-mute">just now</span>
      </div>
      <p class="text-mute text-sm"></p>`;
    (li.querySelector(".font-medium") as HTMLElement).textContent = authorName;
    (li.querySelector("p") as HTMLElement).textContent = body;
    list.prepend(li);
    const count = document.getElementById("comment-count");
    if (count) count.textContent = String((parseInt(count.textContent || "0", 10) || 0) + 1);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = value.trim();
    if (!body) return;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug, body }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      prepend(body);
      setValue("");
      setState("idle");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <div className="flex items-start gap-3">
        <span className="flex-none w-9 h-9 rounded-full bg-primary text-white font-display font-bold inline-flex items-center justify-center" aria-hidden="true">{initial}</span>
        <label className="field flex-1">
          <span className="sr-only">Your comment</span>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Commenting as ${authorName}…`}
            rows={3}
            maxLength={2000}
            required
          />
        </label>
      </div>
      {state === "error" && <p className="text-[color:var(--color-error)] text-sm" role="alert">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary !py-2.5 text-sm" disabled={state === "sending" || !value.trim()}>
          {state === "sending" ? "Posting…" : "Post comment"}
        </button>
      </div>
    </form>
  );
}
