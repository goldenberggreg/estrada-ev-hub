# Estrada EV Hub

> Charge forward, drive cleaner

**HEADLESS DAY brief spec-0422** · Category: **Vehicles & Auto** · Difficulty: **medium**

An electric vehicle charging station network and EV consultation center in Sao Paulo, Brazil that pairs fast-charging stops with co-working lounges and local coffee bars. Each station has a live mural painted by a neighborhood artist, and the company offers free EV test drives every Saturday from their flagship location in Vila Madalena.

---

## Requirements

Your build is judged against these. All of them.

- [ ] Station locator page with map, charger types, real-time availability indicators, and amenity listings
- [ ] Test drive booking system with vehicle selection, preferred date/time, and license upload
- [ ] Blog with EV news for the Brazilian market, charging tips, and driver testimonials
- [ ] Membership registration for loyalty program with tiered benefits and charging history dashboard
- [ ] Mobile-first responsive design

## Art direction

| | |
|---|---|
| Mood | sustainable · modern · optimistic · urban |
| Primary color | `#00695C` |
| Accent color | `#FFAB40` |

Treat the palette as a starting point - interpret the mood, don't paint by numbers.

## Bonus challenge

Add a savings calculator that compares fuel vs. electric costs based on the user's daily commute distance

---

# Creative brief

A richer brief to build from - structure, content, design, SEO, and performance. Hit the requirements above; let this guide how.

## Audience & voice

**Audience.** Urban Brazilian commuters and early EV adopters aged 25-45 who want dependable charging infrastructure, compare ownership costs obsessively, and treat a Saturday test drive as both research and weekend entertainment

**Voice.** confident · plainspoken · forward-looking · warm · informative

**Avoid.** greenwashing jargon, corporate softness, guilt-trip environmentalism, hedging qualifiers, exclamation-point hype

## Hero

**Headline.** Charge your car while you grab a coffee

**Layout.** Full-bleed photographic hero with text overlay

**Focal / LCP element.** A single high-resolution photograph of the Vila Madalena flagship station at golden hour, served as responsive AVIF/WebP with fetchpriority=high

**Treatment.** Headline in Space Grotesk Bold 700 at 56px desktop / 32px mobile, white text on a dark gradient overlay (bottom 60% of the hero image fading from transparent to rgba(13,27,24,0.75)). Kicker in Outfit SemiBold 600 uppercase letterspaced 0.08em in amber #FFAB40 above the headline

**On load.** Image loads instantly as the LCP element. Kicker fades in at 200ms, headline translates up 20px and fades in at 400ms, subtitle at 600ms, CTA button scales from 0.95 to 1.0 at 800ms. prefers-reduced-motion: all elements visible at final position immediately, no translate or scale

**Atmosphere.** Full-bleed station photograph with a CSS linear-gradient overlay from transparent at top to dark teal-black at bottom, ensuring text legibility without a solid color block

**Primary CTA.** Book a test drive

**Mobile.** Image crops to center-right (keeping the car and mural visible), headline drops to 32px, kicker to 12px. CTA button becomes full-width at the bottom of the viewport. The gradient overlay deepens to 85% opacity for legibility on smaller screens

**The one thing they'll remember.** The mural-covered charging station bathed in golden hour light — it looks like a place you would actually want to stop, not a parking garage obligation

## Sitemap (7 pages)

| Page | Route | Purpose | CTA |
|---|---|---|---|
| Home | `/` | Establish the network, show nearest station, and push to book a test drive | Book a test drive |
| Stations | `/stations` | CMS-driven station locator with charger types, amenities, and neighborhood mural photos | Get directions |
| Test Drives | `/test-drives` | Saturday test drive booking form via @wix/bookings with vehicle selection and preferred time | Book a test drive |
| EV Journal | `/blog` | Blog posts on Brazilian EV market news, charging tips, and driver stories via @wix/blog | Book a test drive |
| About | `/about` | Origin story, the Vila Madalena flagship, mural program, and team | Find a station |
| Membership | `/membership` | Member registration and login via @wix/members, tiered benefits overview, charging history dashboard | Join the Hub |
| Contact | `/contact` | Flagship address, phone, email, map, and inquiry form for corporate fleet partnerships | Send a message |

## Homepage flow

1. **Hero** - Full-bleed photo of the Vila Madalena station at golden hour with a mural-covered wall, a car plugged in, and a person holding coffee. Headline over the image with a single amber CTA button Image: Wide shot of the Vila Madalena flagship station at dusk: a compact EV plugged into a branded green charger, a colorful neighborhood mural covering the back wall, string lights overhead, a customer walking toward the co-working lounge with a takeaway cup
2. **How it works** - Three-column icon cards: (1) Find a station on the map, (2) Plug in and grab a coffee, (3) Get a notification when your car is ready. Each card has a teal icon and a one-line description Image: Three simple line icons on teal circles: a map pin, a charging plug, and a phone notification bell
3. **Station highlights** - Three side-by-side cards, each showing a station name, neighborhood, charger count, amenities (co-working, coffee, kids area), and a photo of the station mural. A 'View all stations' link below Image: Card 1: Close-up of a geometric mural in blues and greens covering a charging bay wall in Pinheiros. Card 2: A barista behind a small espresso bar inside a bright Vila Olímpia station. Card 3: Overhead shot of two EVs charging side by side in Moema, green cables against dark asphalt
4. **Test drive Saturdays** - Split layout: left side is a photo of a driver pulling out of the flagship in a compact EV; right side lists three available models with a booking button. Amber CTA: 'Book a test drive' Image: A person in a casual linen shirt gripping the steering wheel of a compact white EV, pulling out of the Vila Madalena station, the mural visible through the rear window, morning light on the dashboard
5. **Membership tiers** - Three pricing cards stacked horizontally: Starter (free, basic charging access), Commuter (R$49/mo, priority charging + co-working), Fleet (custom, corporate volume pricing). Each card lists three benefits and has a teal 'Join' button Image: Abstract illustration of three ascending bar-chart columns in teal, mid-green, and amber, each topped with a small EV icon, on a white background
6. **From the EV Journal** - Two blog post preview cards side by side, each with a thumbnail, title, date, and a two-line excerpt. A 'Read more' ghost link below each Image: Card 1: An aerial photo of São Paulo traffic with one green-highlighted EV lane. Card 2: Close-up of hands plugging a CCS2 connector into a sedan's charging port
7. **Driver testimonials** - Three quote cards with driver name, membership tier, and a one-sentence endorsement. Each card has a small avatar circle and a star rating Image: Small circular portrait photos: a woman in her 30s leaning on a silver hatchback EV, a man in his 40s at a laptop in the co-working lounge, a young courier next to an electric motorcycle
8. **FAQ** - Six expandable accordion rows covering charging times, payment methods, membership cancellation, vehicle compatibility, station safety, and test drive eligibility
9. **Footer** - Four-column footer: (1) Estrada EV Hub logo, tagline, and contact block — hello@estradaevhub.com.br, +55 11 3456-7890, Rua Aspicuelta 322, Vila Madalena, São Paulo – SP, 05433-010. (2) Quick links to all main pages: Home, Stations, Test Drives, EV Journal, Membership, About, Contact. (3) Social icons linking to @estradaevhub on Instagram and @estradaev on Twitter/X. (4) Legal links: Privacy Policy, Terms & Conditions. Bottom bar: © 2025 Estrada EV Hub. Powered by Wix Headless link to https://www.wix.com/lp-en/headless

## Content to create

Seed these into the CMS - counts and sample rows are the minimum bar.

- **10x ChargingStation** (on Stations) - fields: name, neighborhood, address, chargerTypes, chargerCount, amenities, muralArtist, status
  - e.g. Vila Madalena Flagship | Vila Madalena | Rua Aspicuelta 322 | CCS2, Type 2, CHAdeMO | 8 chargers | Co-working lounge, espresso bar, kids play corner, bike repair stand | Mural by Ana Luiza Ortiz: a 12-meter tropical canopy in greens and golds wrapping the entire charging bay wall | Open 24h
  - e.g. Pinheiros Garden | Pinheiros | Rua dos Pinheiros 980 | CCS2, Type 2 | 4 chargers | Coffee kiosk, shaded reading benches, public Wi-Fi | Mural by Rafael Sliks: abstract calligraphy in black and teal across the entrance arch | Open 6am–11pm
- **3x Testimonial** (on Home) - fields: name, membershipTier, quote, detail
  - e.g. Camila Reyes | Commuter | 'I charge at Pinheiros every morning while I answer emails in the lounge. Forty minutes and my car and my inbox are both full.' | Drives a compact EV, member since 2024
  - e.g. Thiago Mendes | Fleet | 'We switched six delivery vans to electric last year. Estrada handles the charging logistics so we handle the routes.' | Fleet manager for a local courier company
- **1x StoryBlock** (on About) - fields: heading, body
  - e.g. Estrada EV Hub started in 2022 when Marina and Jorge Estrada parked their first EV in Vila Madalena and discovered the nearest fast charger was forty minutes away. The math was simple: if São Paulo was going electric, the city needed charging stations that felt like somewhere you would actually want to stop. They leased a corner lot on Rua Aspicuelta, installed eight CCS2 chargers, added a small espresso bar and a row of desks with fast Wi-Fi, and commissioned Ana Luiza Ortiz to paint the back wall. The first mural drew foot traffic before the first car even plugged in. Twelve stations later, each one carries a mural by a neighborhood artist and a short menu from a local roaster. The idea has not changed: charging your car should be the most productive or pleasant thirty minutes of your day, not dead time in a parking garage.
- **4x TestDriveVehicle** (on Test Drives) - fields: model, type, range, seats, description
  - e.g. BYD Dolphin | Compact hatchback | 427 km | 5 seats | The city car that makes sense: small enough for Pinheiros side streets, enough range for a weekend trip to Campos do Jordão, and a trunk that fits a week of groceries without the origami.
  - e.g. GWM Ora 03 | Compact coupe | 400 km | 5 seats | Low, quiet, and quicker off the line than it looks. The retro-round headlights get compliments at every traffic light on Avenida Paulista.

## Design system

**Aesthetic direction.** Tropical modernism — clean geometric grids softened by lush organic photography and warm amber accents, reflecting São Paulo's tension between concrete infrastructure and green canopy. The teal-and-amber palette nods to traffic signals and tropical foliage without resorting to cliché leaf patterns

**Spatial composition.** Generous white-space grid with asymmetric image bleeds: station photos break out of their columns to overlap into adjacent whitespace, creating depth without clutter. Cards sit on a strict 12-column grid but hero and testimonial sections use off-center splits (60/40) to avoid monotony

**Typography.** Display: `Space Grotesk` · Body: `Outfit` · Space Grotesk Bold 700 for headlines and section titles against Outfit Regular 400 for body text, with Outfit Medium 500 for UI labels and navigation
_Source:_ Both via Google Fonts
_Why:_ Space Grotesk's squared terminals and slightly technical character echo the EV and infrastructure theme without feeling cold; Outfit's geometric warmth and generous x-height keep body text friendly and highly readable at 16px, matching the optimistic brand voice

**Color system** - paste into your Tailwind v4 `@theme`:

```css
@theme {
  --color-background: #F0F7F5;
  --color-surface: #FFFFFF;
  --color-text: #0D1B18;
  --color-text-muted: #3D5A52;
  --color-border: #C2D9D3;
  --color-primary: #00695C;
  --color-accent: #FFAB40;
  --color-dark: #0D1B18;
  --color-on-dark: #F0F7F5;
}
```

**Signature device.** A subtle amber charge-level indicator bar that fills horizontally across station cards and section dividers as the user scrolls, echoing a battery charging from 0% to 100% — the accent color sweeping left to right like a progress bar

**Motion.** CSS-first and restrained: the charge-bar fill uses scroll-driven animation via CSS scroll-timeline, station cards fade up with a staggered 100ms delay on intersection. No parallax, no autoplay video. prefers-reduced-motion: all elements render at final state, charge bars filled, cards visible

**Imagery.** Warm natural-light photography with slightly lifted shadows and a green-gold color grade. Station exteriors shot at golden hour or blue hour to emphasize the murals and ambient lighting. Interior shots bright and airy with visible greenery Station exteriors with murals clearly visible and at least one car plugged in. People using the co-working lounges: laptops open, coffee in hand. Close-ups of hands plugging in CCS2 connectors. A driver adjusting mirrors before a test drive. The espresso bar counter with a barista and a customer. Aerial neighborhood shots showing the station in urban context with tree canopy

**Avoid in imagery.** generic stock photos of anonymous white EVs on empty roads · dark parking garage interiors · heavy HDR processing · isolated product shots of chargers without human context · blue-tinted futuristic glows or sci-fi aesthetics · guilt-driven environmental imagery (dead trees, pollution)

## Conversion & forms

**Primary action.** Book a free Saturday test drive - via @wix/bookings (Wix Bookings for Saturday test drive scheduling). Additional services: @wix/blog (EV Journal posts), @wix/members (membership registration, charging history, tiered benefits dashboard) -> `/test-drives`

**Repeat at.** hero · test drive Saturdays section · mobile sticky bar · footer

**Secondary (ghost).** Find a station

**Form fields.** name, email, company (optional), fleetSize (optional), message

**Success message.** Message received. We will get back to you within one business day with station options and pricing

**Reassurance.** No spam, no mailing list. This form goes straight to our partnerships team

## FAQ

Real questions to answer on the site (and feed FAQPage JSON-LD).

**How long does a full charge take?**

On a CCS2 fast charger, most EVs go from 20% to 80% in about 30 to 45 minutes. A full charge on a Type 2 AC charger takes 4 to 6 hours, which works well for an afternoon of co-working.

**Do I need a membership to charge?**

No. Any driver can plug in and pay per session with a credit card or Pix. Members get lower per-kWh rates, priority access during peak hours, and free co-working lounge use.

**What vehicles are available for test drives?**

We rotate four models every month, usually a compact hatchback, a mid-size sedan, an SUV, and a light commercial van. Check the Test Drives page for the current lineup.

**Is the test drive really free?**

Yes. Bring a valid driver's license and a government-issued ID. We handle insurance for the 30-minute route. No purchase obligation, no sales pitch at the end.

**Can my company set up a fleet charging account?**

Yes. Fleet accounts get volume pricing, consolidated monthly billing, and a dedicated dashboard to track charging sessions across all vehicles. Use the contact form or email hello@estradaevhub.com.br.

**Are the stations safe at night?**

Every station has 24-hour camera monitoring, well-lit bays, and an emergency call button on each charger. The Vila Madalena flagship is staffed until midnight.

## SEO

**Primary keyword.** EV charging São Paulo

**Secondary.** electric vehicle test drive São Paulo · charging station Vila Madalena · EV charging membership Brazil · fast charging CCS2 São Paulo

**Schema.org type.** `AutomotiveBusiness`

**JSON-LD per page.** AutomotiveBusiness (Home) · ItemList (Stations) · Service (Test Drives) · Blog (EV Journal) · FAQPage (FAQ)

**Business facts.** São Paulo, SP, Brazil · Stations open 24/7; flagship staffed Mon–Sat 7am–10pm; test drives Sat 9am–5pm · $$ · est. 2022

**Differentiators.** Each station features a commissioned mural by a neighborhood artist; co-working lounges and local coffee bars at every location; free weekly test drives of current EV models

**Socials.** @estradaevhub · @estradaev

## Performance & accessibility

**LCP element.** Hero photograph of the Vila Madalena flagship station at golden hour

**Top moves.**
- Serve the hero image as responsive AVIF/WebP with explicit width/height and fetchpriority=high, preloaded in the <head>
- Preload Space Grotesk Bold and Outfit Regular as woff2 subsets with font-display:swap to avoid FOIT
- Drive the charge-bar scroll animation with CSS scroll-timeline instead of JavaScript scroll listeners

**Hydration plan.**
- `MobileStickyBookingBar` -> `client:load` (Above-fold per-visitor conversion control that must be tappable immediately on mobile)
- `NavBookingButton` -> `client:load` (Primary CTA in the header, needs to be interactive on first paint)
- `StationMapEmbed` -> `client:visible` (Map only needs interactivity when scrolled into view, heavy embed deferred)
- `TestDriveBookingForm` -> `client:idle` (Below-fold booking form can hydrate after the main thread is free)

**Defer as facades.** Station map loaded as a static image facade showing pin locations, swaps to interactive Google Maps embed on click · Blog post comment sections loaded as placeholder cards until user taps 'Show comments'

**Targets.** LCP < 2.5s · INP < 200ms · CLS < 0.1 · Lighthouse mobile >= 90

**Accessibility baseline.** Text contrast 4.5:1 · UI 3:1 · 44px tap targets · visible focus · honor reduced-motion · alt text required · semantic landmarks

---

# How to build this with Wix Headless

Internal Wix employees: run the setup skill first to configure npm registry and Wix login:
https://github.com/hanag-wix/Headless-setup-skill-internal/blob/main/SKILL.md

Then follow the build skill for project setup, business solution wiring, and deployment:
https://wix-headless.dev/skill.md

Build this using https://wix.com/headless/skill.md
