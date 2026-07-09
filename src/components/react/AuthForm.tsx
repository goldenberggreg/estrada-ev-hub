import { useState } from "react";
import { login, register } from "@wix/authentication";

type Mode = "login" | "register";
const TIERS = ["Starter", "Commuter", "Fleet"];

const errMsg = (e: unknown): string => {
  const code = (e as any)?.code ?? (e as any)?.errorCode;
  switch (code) {
    case "emailAlreadyExists": return "That email already has an account — switch to Log in.";
    case "invalidEmail": return "That email address looks invalid.";
    case "invalidPassword": return "Incorrect email or password.";
    case "resetPassword": return "Please reset your password before signing in.";
    case "missingCaptchaToken":
    case "invalidCaptchaToken": return "Security check failed — please try again.";
    default: return (e as any)?.message || "Something went wrong. Please try again.";
  }
};

export default function AuthForm({ initialMode = "register", preselect = "Commuter" }: { initialMode?: Mode; preselect?: string }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [state, setState] = useState<"idle" | "working" | "pending">("idle");
  const [error, setError] = useState("");
  const initialTier = TIERS.find((t) => t.toLowerCase() === preselect.toLowerCase()) ?? "Commuter";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    setError("");
    setState("working");
    try {
      if (mode === "register") {
        const firstName = String(fd.get("firstName") || "").trim();
        const res = await register(email, password, firstName ? { contactInfo: { firstName } } as any : undefined);
        // best-effort tier/neighborhood capture (non-blocking)
        try {
          await fetch("/api/join", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: firstName, email, tier: fd.get("tier"), neighborhood: fd.get("neighborhood") }),
          });
        } catch { /* ignore */ }
        if (res?.status === "PENDING") { setState("pending"); return; }
      } else {
        await login(email, password);
      }
      // Session cookie is set by the browser runtime. A hash-only change won't
      // re-run SSR, so force a full reload of the membership page.
      if (window.location.pathname === "/membership") {
        window.location.hash = "dashboard";
        window.location.reload();
      } else {
        window.location.assign("/membership#dashboard");
      }
    } catch (err) {
      setError(errMsg(err));
      setState("idle");
    }
  }

  if (state === "pending") {
    return (
      <div className="card p-8 text-center" role="status">
        <div className="text-4xl mb-3" aria-hidden="true">📩</div>
        <h3 className="font-display font-bold text-2xl">Almost there</h3>
        <p className="text-mute mt-2 max-w-md mx-auto">
          Your account needs email verification or owner approval before you can sign in.
          Check your inbox, then come back and log in.
        </p>
        <button type="button" className="btn-secondary mt-6" onClick={() => { setMode("login"); setState("idle"); }}>Go to log in</button>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8">
      <div role="tablist" aria-label="Account" className="flex gap-1 mb-6 p-1 rounded-full bg-cream w-fit">
        {(["register", "login"] as Mode[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${mode === m ? "bg-primary text-white" : "text-mute hover:text-ink"}`}
            onClick={() => { setMode(m); setError(""); }}
            type="button"
          >
            {m === "register" ? "Create account" : "Log in"}
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
        {mode === "register" && (
          <label className="field"><span>First name</span><input name="firstName" type="text" autoComplete="given-name" placeholder="Camila" /></label>
        )}
        <label className="field"><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
        <label className="field">
          <span>Password</span>
          <input name="password" type="password" required minLength={8} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder={mode === "register" ? "At least 8 characters" : ""} />
        </label>
        {mode === "register" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span>Membership tier</span>
              <select name="tier" defaultValue={initialTier}>{TIERS.map((t) => <option key={t} value={t}>{t}</option>)}</select>
            </label>
            <label className="field"><span>Home neighborhood</span><input name="neighborhood" type="text" placeholder="e.g. Pinheiros" /></label>
          </div>
        )}

        {error && <p className="text-[color:var(--color-error)] text-sm" role="alert">{error}</p>}

        <div className="flex items-center gap-4 flex-wrap">
          <button type="submit" className="btn-cta" disabled={state === "working"}>
            {state === "working" ? "Working…" : mode === "register" ? "Join the Hub" : "Log in"}
          </button>
          <p className="text-xs text-mute">
            {mode === "register" ? "Free to start · cancel anytime." : "Welcome back."}
          </p>
        </div>
      </form>
    </div>
  );
}
