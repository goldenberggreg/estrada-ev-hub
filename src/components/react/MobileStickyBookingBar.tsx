import { useEffect, useState } from "react";

/**
 * MobileStickyBookingBar — above-fold conversion control on mobile.
 * Hydrated client:load so it is tappable immediately. Hides itself once the
 * user reaches the footer (so it never covers footer actions) and on the
 * booking page itself.
 */
export default function MobileStickyBookingBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/test-drives")) {
      setHidden(true);
      return;
    }
    const footer = document.querySelector("footer.site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="mobile-book-bar flex items-center justify-between gap-3">
      <div className="leading-tight">
        <p className="text-on-dark font-display font-bold text-sm">Free Saturday test drives</p>
        <p className="text-on-dark/70 text-xs">Vila Madalena flagship · 9am–5pm</p>
      </div>
      <a href="/test-drives" className="btn-cta !py-2.5 !px-4 text-sm whitespace-nowrap" data-cta="sticky-book">
        Book now
      </a>
    </div>
  );
}
