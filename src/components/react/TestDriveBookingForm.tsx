import { useMemo, useState } from "react";

interface VehicleOpt { model: string; slug: string; }

/** Next N Saturdays as ISO date strings (computed in-browser). */
function nextSaturdays(count: number): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 6) {
      const value = d.toISOString().slice(0, 10);
      out.push({ value, label: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) });
    }
  }
  return out;
}

const TIME_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

export default function TestDriveBookingForm({ vehicles, preselect = "" }: { vehicles: VehicleOpt[]; preselect?: string }) {
  const saturdays = useMemo(() => nextSaturdays(8), []);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const initialVehicle = vehicles.find((v) => v.slug === preselect)?.model ?? vehicles[0]?.model ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const licenseFile = fd.get("license") as File | null;
    if (!licenseFile || licenseFile.size === 0) { setState("error"); setErrorMsg("Please attach your driver's license."); return; }
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          vehicle: fd.get("vehicle"),
          preferredDate: fd.get("preferredDate"),
          preferredTime: fd.get("preferredTime"),
          licenseFile: `${licenseFile.name} (${Math.round(licenseFile.size / 1024)} KB)`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setState("done");
      form.reset();
      setLicenseName("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="card p-8 text-center" role="status">
        <div className="text-4xl mb-3" aria-hidden="true">⚡</div>
        <h3 className="font-display font-bold text-2xl">You're booked in</h3>
        <p className="text-mute mt-2 max-w-md mx-auto">
          We'll confirm your Saturday slot by email within one business day, with directions to the Vila Madalena flagship.
          Bring the license you uploaded and a government-issued ID.
        </p>
        <button type="button" className="btn-secondary mt-6" onClick={() => setState("idle")}>Book another</button>
      </div>
    );
  }

  return (
    <form className="card p-6 md:p-8 flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field">
          <span>Full name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Camila Reyes" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+55 11 90000-0000" />
        </label>
        <label className="field">
          <span>Vehicle</span>
          <select name="vehicle" required defaultValue={initialVehicle}>
            {vehicles.map((v) => <option key={v.slug} value={v.model}>{v.model}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field">
          <span>Preferred Saturday</span>
          <select name="preferredDate" required>
            {saturdays.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Preferred time</span>
          <select name="preferredTime" required>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Driver's license (photo or PDF)</span>
        <input
          name="license"
          type="file"
          accept="image/*,application/pdf"
          required
          onChange={(e) => setLicenseName(e.currentTarget.files?.[0]?.name ?? "")}
        />
        {licenseName && <small className="text-mute">Attached: {licenseName}</small>}
      </label>

      {state === "error" && <p className="text-[color:var(--color-error)] text-sm" role="alert">{errorMsg}</p>}

      <div className="flex items-center gap-4 flex-wrap">
        <button type="submit" className="btn-cta" disabled={state === "sending"}>
          {state === "sending" ? "Booking…" : "Book my test drive"}
        </button>
        <p className="text-xs text-mute">Free · 30-minute route · insurance included · no purchase obligation.</p>
      </div>
    </form>
  );
}
