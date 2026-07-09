import { useState } from "react";

/**
 * ChargingDashboard — a member's charging-history view. In production this reads
 * the signed-in member's sessions from Wix; here it renders a representative
 * dataset so the loyalty experience is visible end-to-end.
 */
const fmtBRL = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const sessions = [
  { date: "Sat 21 Jun", station: "Pinheiros Garden", kwh: 38, cost: 61, saved: 41 },
  { date: "Wed 18 Jun", station: "Vila Madalena Flagship", kwh: 22, cost: 35, saved: 24 },
  { date: "Mon 16 Jun", station: "Itaim Bibi Center", kwh: 30, cost: 48, saved: 32 },
  { date: "Fri 13 Jun", station: "Pinheiros Garden", kwh: 26, cost: 42, saved: 28 },
  { date: "Tue 10 Jun", station: "Moema Park", kwh: 32, cost: 51, saved: 34 },
];
const monthly = [92, 108, 131, 120, 145, 148]; // kWh last 6 months
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const maxKwh = Math.max(...monthly);

export default function ChargingDashboard({ name = "there", email = "", tier = "Commuter" }: { name?: string; email?: string; tier?: string }) {
  const [member] = useState({ name, email, tier, sessionsThisMonth: 12, kwhThisMonth: 148, spent: 238, saved: 190 });
  const tierMax = 20;
  const progress = Math.min(100, Math.round((member.sessionsThisMonth / tierMax) * 100));

  return (
    <div className="card p-6 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white font-display font-bold" aria-hidden="true">{(member.name || "?").charAt(0).toUpperCase()}</span>
          <div>
            <p className="font-display font-bold text-lg leading-tight">Olá, {member.name}</p>
            <p className="text-xs text-mute">{member.email ? `${member.email} · ` : ""}{member.tier} member</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:color-mix(in_srgb,var(--color-amber)_25%,transparent)] text-amber-deep">{member.tier}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Sessions", value: member.sessionsThisMonth },
          { label: "kWh", value: member.kwhThisMonth },
          { label: "Spent", value: fmtBRL(member.spent) },
          { label: "Saved vs gas", value: fmtBRL(member.saved), accent: true },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 border border-rule">
            <p className={`font-display font-bold text-xl ${s.accent ? "text-primary" : ""}`}>{s.value}</p>
            <p className="text-xs text-mute uppercase tracking-wide mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Energy used — last 6 months</span>
          <span className="text-mute">{member.kwhThisMonth} kWh this month</span>
        </div>
        <div className="spark" role="img" aria-label="Monthly energy use trending up from 92 to 148 kWh">
          {monthly.map((v, i) => <div key={i} style={{ height: `${Math.round((v / maxKwh) * 100)}%` }} title={`${months[i]}: ${v} kWh`}></div>)}
        </div>
        <div className="flex justify-between text-[0.65rem] text-mute mt-1">{months.map((m) => <span key={m}>{m}</span>)}</div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Progress to Fleet perks</span>
          <span className="text-mute">{member.sessionsThisMonth}/{tierMax} sessions</span>
        </div>
        <div className="calc-bar"><span style={{ width: `${progress}%` }}></span></div>
      </div>

      <div>
        <p className="font-medium text-sm mb-3">Recent sessions</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-mute text-xs uppercase tracking-wide">
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Station</th>
                <th className="py-2 pr-4 font-medium text-right">kWh</th>
                <th className="py-2 pr-4 font-medium text-right">Cost</th>
                <th className="py-2 font-medium text-right">Saved</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} className="border-t border-rule">
                  <td className="py-2.5 pr-4 whitespace-nowrap">{s.date}</td>
                  <td className="py-2.5 pr-4">{s.station}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{s.kwh}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtBRL(s.cost)}</td>
                  <td className="py-2.5 text-right tabular-nums text-primary">{fmtBRL(s.saved)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
