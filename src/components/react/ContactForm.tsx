import { useState } from "react";

export default function ContactForm({ topic = "" }: { topic?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          fleetSize: fd.get("fleetSize"),
          message: fd.get("message"),
          topic,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setState("done");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="card p-8" role="status">
        <div className="text-3xl mb-3" aria-hidden="true">✅</div>
        <h3 className="font-display font-bold text-xl">Message received</h3>
        <p className="text-mute mt-2">
          We will get back to you within one business day with station options and pricing.
        </p>
      </div>
    );
  }

  return (
    <form className="card p-6 md:p-8 flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Name</span><input name="name" type="text" required autoComplete="name" /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Company <em className="text-mute not-italic font-normal">(optional)</em></span><input name="company" type="text" autoComplete="organization" /></label>
        <label className="field"><span>Fleet size <em className="text-mute not-italic font-normal">(optional)</em></span><input name="fleetSize" type="text" inputMode="numeric" placeholder="e.g. 12 vehicles" /></label>
      </div>
      <label className="field"><span>Message</span><textarea name="message" required placeholder="Tell us about your charging needs…"></textarea></label>

      {state === "error" && <p className="text-[color:var(--color-error)] text-sm" role="alert">{errorMsg}</p>}

      <div className="flex items-center gap-4 flex-wrap">
        <button type="submit" className="btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send a message"}
        </button>
        <p className="text-xs text-mute max-w-xs">No spam, no mailing list. This form goes straight to our partnerships team.</p>
      </div>
    </form>
  );
}
