# Retro — Estrada EV Hub (HEADLESS DAY spec-0422)

An honest log of the bugs, errors, and dead ends hit while building this site,
with root cause and fix for each. Written so the next build skips these traps.

---

## Bugs & errors (found and fixed)

### 1. `@utility btn:active` — Tailwind v4 build failure
**Symptom:** `astro build` failed: `` `@utility btn:active` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.``
**Cause:** Tried to declare a pseudo-class variant (`:active`) as a Tailwind v4 `@utility`. `@utility` names must be plain identifiers.
**Fix:** Moved the active-state rule out of `@utility` into a normal selector: `.btn-cta:active, .btn-primary:active { transform: translateY(1px); }` in `src/styles/global.css`.

### 2. Hero headline invisible on load
**Symptom:** First hero screenshot showed the golden-hour scene but **no headline** — the LCP text wasn't visible.
**Cause:** `.hero-anim { opacity: 0 }` with the visible state gated behind a JS-added `.hero-ready` class. If JS was slow/blocked, the headline (part of the LCP) never appeared — bad for LCP, no-JS, and accessibility.
**Fix:** Made hero text **visible by default**; `.hero-ready` now only adds the *entrance animation* as an enhancement (`src/styles/global.css`, `src/layouts/Layout.astro`). Also deepened the hero overlay + added a text scrim for contrast.

### 3. Whole page blank without JavaScript (scroll-reveal)
**Symptom:** With JS disabled (and briefly in testing), page sections below the hero were completely blank.
**Cause:** `.reveal { opacity: 0 }` as the default state — content only became visible when an IntersectionObserver added `.is-visible`. No JS → nothing ever revealed.
**Fix:** Gated the hidden state behind a JS-only flag: `html.anim-ready .reveal { opacity: 0 }`, with `anim-ready` set inline in `<head>` **only when JS runs** (and never under `prefers-reduced-motion`). Content is fully visible if JS fails. Standard progressive-enhancement pattern.

### 4. Server-side member registration: `ReferenceError: window is not defined`
**Symptom:** `POST /api/member/register` returned 500; logs showed `ReferenceError: window is not defined` inside the Wix OAuth `register()` call.
**Cause:** Tried to run member `register()`/`login()` **server-side** via `auth.getContextualAuth()` (from `@wix/essentials` + `@wix/sdk`). That code path is **browser-only**.
**Fix:** Pivoted to **client-side** `@wix/authentication` (`register`/`login`/`logout`) inside React islands. Those manage the `wixSession` cookie that `@wix/astro`'s middleware reads; SSR then recognizes the member. Deleted the dead server routes.

### 5. After login/register, the dashboard stayed locked
**Symptom:** Registration succeeded (member created, cookie set) but the page still showed the "Members only" gate until a manual refresh.
**Cause:** The post-auth redirect used `location.assign("/membership#dashboard")` **from `/membership`** — a hash-only change that does **not** re-run SSR, so the server never saw the new member cookie.
**Fix:** Force a full reload when already on the page: `location.hash = "dashboard"; location.reload();` (`src/components/react/AuthForm.tsx`).

### 6. Composer color-token mismatch
**Symptom:** After running the design pipeline, `--color-paper` came out `#FFFFFF` (should be the mint `#F0F7F5`) and `--color-primary` was missing entirely.
**Cause:** `compose.mjs`'s standard-role translation table maps `surface`/`background` → `paper` and `primary` → `accent`; because I authored both wix-native and standard role names in `DESIGN.md`, the translated values clobbered my intent and dropped `--color-primary`.
**Fix:** Hand-authored the `@theme` block in `src/styles/global.css` with an explicit teal-primary + amber-accent palette instead of relying on the generated output.

### 7. `wix release` before `wix build`
**Symptom:** First release attempt failed: `Project build output is missing` / missing `.wix/build-metadata.json`.
**Cause:** Ran `npm run release` without a prior build.
**Fix:** Always `npm run build` before `npm run release`.

### 8. Member greeting showed empty / "member"
**Symptom:** Dashboard greeting rendered "Olá," with no name.
**Cause:** `getCurrentMember()` didn't always get `contact.firstName` back (fieldset/permission dependent).
**Fix:** Fallback chain `contact.firstName → profile.nickname → email local-part` in `src/lib/wixSession.ts`.

---

## Process / environment issues (not code bugs)

- **Sandbox blocked two commands.** The auto-mode classifier denied executing the curl-downloaded `bootstrap.mjs` and `npx skills add wix/skills` (untrusted external code). Resolved by skipping the redundant bootstrap (CLI + login were already done) and using the first-party `wix skills add` instead.
- **Left test data on the live site.** Two throwaway member accounts (`qa…@estradatest.com`) and one QA blog comment were created while validating auth/comments end-to-end, and weren't cleaned up until flagged. Lesson: use disposable data and remove it after testing against a live tenant.
- **Preview-tool quirks (testing only, not product bugs):**
  - Screenshots taken immediately after a programmatic `scrollTo` sometimes captured a blank frame before the IntersectionObserver revealed content. DOM inspection confirmed the content was present.
  - `preview_fill` sets a DOM input's `value` but doesn't fire React's `onChange`, so controlled-component submit buttons stayed disabled. Worked around by setting the value via the native setter + dispatching an `input` event.

---

## Known limitations / tradeoffs (by design, not defects)

- **Imagery is CSS/SVG, not photography.** Hero scene and station "murals" are generated inline (themed-blocks mode) for fast LCP and zero broken images. Real photos would be dropped in for production.
- **Charging-session activity is representative.** Member auth, registration, login, and gating are real; the dashboard's session rows/kWh totals are sample data (no charging-telemetry source exists).
- **Booking, contact, and signup preferences persist to CMS collections**, not the native `@wix/bookings` availability engine — a deliberate scope choice for reliability within the build window.
- **Benign build warning:** `[vite] Failed to resolve dependency: @wix/stores, present in client 'optimizeDeps.include'` appears on every build. The Wix Astro preset pre-optimizes `@wix/stores`, which this site doesn't use. Harmless; the build completes.

---

## What went well

- The `@wix/astro` + `@wix/data` SSR pattern (elevated queries, try/caught) was reliable once established.
- The deterministic design scripts (`emit-design-tokens.mjs`) + a hand-tuned `@theme` gave a consistent system fast.
- Real form persistence and member auth were validated end-to-end (register → login → logout, members-only comments) before each release.
