import { useState } from "react";

const TIERS = ["Starter", "Commuter", "Fleet"];

export default function JoinForm({ preselect = "Commuter" }: { preselect?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const initial = TIERS.find((t) => t.toLowerCase() === preselect.toLowerCase()) ?? "Commuter";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), tier: fd.get("tier"), neighborhood: fd.get("neighborhood") }),
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
      <div className="card p-8 text-center" role="status">
        <div className="text-4xl mb-3" aria-hidden="true">⚡</div>
        <h3 className="font-display font-bold text-2xl">Welcome to the Hub</h3>
        <p className="text-mute mt-2 max-w-md mx-auto">
          Check your inbox — we've sent your membership card and a link to set your dashboard PIN.
          Your lower per-kWh rate is active at every station immediately.
        </p>
        <button type="button" className="btn-secondary mt-6" onClick={() => setState("idle")}>Register another</button>
      </div>
    );
  }

  return (
    <form className="card p-6 md:p-8 flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Full name</span><input name="name" type="text" required autoComplete="name" /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field">
          <span>Membership tier</span>
          <select name="tier" defaultValue={initial} required>
            {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="field"><span>Home neighborhood</span><input name="neighborhood" type="text" placeholder="e.g. Pinheiros" /></label>
      </div>
      {state === "error" && <p className="text-[color:var(--color-error)] text-sm" role="alert">{errorMsg}</p>}
      <div className="flex items-center gap-4 flex-wrap">
        <button type="submit" className="btn-cta" disabled={state === "sending"}>
          {state === "sending" ? "Joining…" : "Join the Hub"}
        </button>
        <p className="text-xs text-mute">Free to start. Cancel anytime from your dashboard.</p>
      </div>
    </form>
  );
}
