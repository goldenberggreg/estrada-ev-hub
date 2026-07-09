/**
 * NavBookingButton — primary header CTA.
 * Hydrated client:load: it must be tappable on first paint (per-visitor
 * conversion control), and it tracks a lightweight intent flag so the
 * booking page can greet a returning visitor.
 */
export default function NavBookingButton({ label = "Book a test drive" }: { label?: string }) {
  return (
    <a
      href="/test-drives"
      className="btn-cta !py-2.5 !px-5 text-sm"
      data-cta="nav-book"
      onClick={() => {
        try {
          sessionStorage.setItem("estrada:book-intent", "nav");
        } catch {
          /* storage may be unavailable in private mode — non-fatal */
        }
      }}
    >
      {label}
    </a>
  );
}
