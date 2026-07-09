import { useState } from "react";
import { logout } from "@wix/authentication";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className={className || "text-sm font-medium hover:text-primary transition-colors"}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try { await logout(); } catch { /* ignore */ }
        window.location.assign("/");
      }}
    >
      {busy ? "…" : "Log out"}
    </button>
  );
}
