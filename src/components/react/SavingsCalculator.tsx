import { useMemo, useState } from "react";

/**
 * SavingsCalculator (bonus) — compares monthly/annual fuel vs. electric cost
 * from a daily commute distance, using São Paulo-realistic defaults in BRL.
 */
const fmtBRL = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function SavingsCalculator() {
  const [kmPerDay, setKmPerDay] = useState(30);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [memberRate, setMemberRate] = useState(true);

  // Assumptions (editable-in-code, shown to user as footnotes)
  const FUEL_PRICE = 5.89;      // R$/L gasoline
  const FUEL_KM_PER_L = 11;     // typical compact
  const EV_KWH_PER_100 = 15;    // typical compact EV
  const RATE_MEMBER = 1.6;      // R$/kWh Commuter rate
  const RATE_PAYG = 1.95;       // R$/kWh pay-as-you-go

  const r = useMemo(() => {
    const kmPerMonth = kmPerDay * daysPerWeek * 4.33;
    const fuelMonthly = (kmPerMonth / FUEL_KM_PER_L) * FUEL_PRICE;
    const kwhMonthly = (kmPerMonth / 100) * EV_KWH_PER_100;
    const evMonthly = kwhMonthly * (memberRate ? RATE_MEMBER : RATE_PAYG);
    const saveMonthly = Math.max(0, fuelMonthly - evMonthly);
    return {
      kmPerMonth: Math.round(kmPerMonth),
      fuelMonthly, evMonthly, saveMonthly,
      saveYear: saveMonthly * 12,
      pct: fuelMonthly > 0 ? Math.round((saveMonthly / fuelMonthly) * 100) : 0,
    };
  }, [kmPerDay, daysPerWeek, memberRate]);

  return (
    <div className="card p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="field">
            <span>Daily commute: <strong className="text-primary">{kmPerDay} km</strong></span>
            <input type="range" min={5} max={150} step={5} value={kmPerDay} onChange={(e) => setKmPerDay(+e.target.value)} aria-label="Daily commute distance in kilometres" />
          </div>
          <div className="field">
            <span>Days per week: <strong className="text-primary">{daysPerWeek}</strong></span>
            <input type="range" min={1} max={7} step={1} value={daysPerWeek} onChange={(e) => setDaysPerWeek(+e.target.value)} aria-label="Driving days per week" />
          </div>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={memberRate} onChange={(e) => setMemberRate(e.target.checked)} style={{ width: 18, height: 18 }} />
            <span>Use the Commuter member rate ({fmtBRL(RATE_MEMBER)}/kWh)</span>
          </label>
          <p className="text-xs text-mute leading-relaxed">
            Assumes {FUEL_KM_PER_L} km/L at {fmtBRL(FUEL_PRICE)}/L for gas, and {EV_KWH_PER_100} kWh/100 km for the EV.
            About {r.kmPerMonth.toLocaleString("pt-BR")} km/month.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5 bg-ink text-on-dark">
            <p className="text-on-dark/70 text-sm">You'd save about</p>
            <p className="font-display font-bold text-4xl text-amber mt-1">{fmtBRL(r.saveMonthly)}<span className="text-lg text-on-dark/70 font-body font-normal">/mo</span></p>
            <p className="text-on-dark/70 text-sm mt-1">{fmtBRL(r.saveYear)} a year · {r.pct}% cheaper to drive</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4 border border-rule">
              <p className="text-xs text-mute uppercase tracking-wide">Gasoline</p>
              <p className="font-display font-bold text-xl mt-1">{fmtBRL(r.fuelMonthly)}<span className="text-sm text-mute font-body font-normal">/mo</span></p>
            </div>
            <div className="rounded-xl p-4 border border-primary bg-[color:color-mix(in_srgb,var(--color-primary)_8%,transparent)]">
              <p className="text-xs text-primary uppercase tracking-wide">Electric</p>
              <p className="font-display font-bold text-xl mt-1 text-primary-deep">{fmtBRL(r.evMonthly)}<span className="text-sm text-mute font-body font-normal">/mo</span></p>
            </div>
          </div>
          {/* comparison bars */}
          <div className="flex flex-col gap-2 mt-1" aria-hidden="true">
            <div className="calc-bar"><span style={{ width: "100%", background: "var(--color-mute)" }}></span></div>
            <div className="calc-bar"><span style={{ width: `${r.fuelMonthly > 0 ? Math.round((r.evMonthly / r.fuelMonthly) * 100) : 0}%` }}></span></div>
          </div>
          <a href="/membership#join" className="btn-cta self-start mt-1">Lock in the member rate</a>
        </div>
      </div>
    </div>
  );
}
