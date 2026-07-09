import { useMemo, useState } from "react";

export interface MapStation {
  id: string;
  name: string;
  neighborhood: string;
  slug: string;
  lat: number;
  lng: number;
  availableNow: number;
  chargerCount: number;
}

/**
 * StationMapEmbed — a lightweight facade (SVG pin map). Hydrated client:visible:
 * the heavy interactive Google Maps iframe only loads when the user taps
 * "Load interactive map", keeping the initial payload small.
 */
export default function StationMapEmbed({ stations }: { stations: MapStation[] }) {
  const [live, setLive] = useState(false);

  const pins = useMemo(() => {
    const lats = stations.map((s) => s.lat);
    const lngs = stations.map((s) => s.lng);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const pad = 0.08;
    const nx = (lng: number) => ((lng - minLng) / (maxLng - minLng || 1)) * (1 - 2 * pad) + pad;
    const ny = (lat: number) => (1 - (lat - minLat) / (maxLat - minLat || 1)) * (1 - 2 * pad) + pad;
    return stations.map((s) => ({ ...s, x: nx(s.lng) * 100, y: ny(s.lat) * 100 }));
  }, [stations]);

  if (live) {
    return (
      <div className="map-embed-wrap">
        <iframe
          title="Estrada EV Hub stations across São Paulo"
          src="https://www.google.com/maps?q=São+Paulo,+SP,+Brazil&z=12&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    );
  }

  return (
    <div className="map-facade" role="group" aria-label="Station map">
      <svg viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true" className="map-bg">
        {/* stylised city grid */}
        <rect width="100" height="62" fill="#E4F0EC" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 12} y1="0" x2={i * 12} y2="62" stroke="#C2D9D3" strokeWidth="0.3" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 12} x2="100" y2={i * 12} stroke="#C2D9D3" strokeWidth="0.3" />
        ))}
        <path d="M0 44 Q30 34 55 42 T100 38" fill="none" stroke="#9CC3B8" strokeWidth="1.2" opacity="0.7" />
      </svg>
      {pins.map((p) => {
        const free = p.availableNow > 0;
        return (
          <a
            key={p.id}
            className="map-pin"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
            target="_blank"
            rel="noopener"
            title={`${p.name} — ${p.availableNow}/${p.chargerCount} free`}
            aria-label={`${p.name} in ${p.neighborhood}, ${p.availableNow} of ${p.chargerCount} chargers free`}
          >
            <span className={`pin-dot ${free ? "pin-free" : "pin-busy"}`} />
            <span className="pin-label">{p.neighborhood}</span>
          </a>
        );
      })}
      <button type="button" className="map-load-btn btn-cta" onClick={() => setLive(true)}>
        Load interactive map
      </button>
    </div>
  );
}
