export const site = {
  name: "Estrada EV Hub",
  tagline: "Charge forward, drive cleaner",
  email: "hello@estradaevhub.com.br",
  phone: "+55 11 3456-7890",
  phoneHref: "+551134567890",
  address: {
    street: "Rua Aspicuelta 322",
    neighborhood: "Vila Madalena",
    city: "São Paulo",
    region: "SP",
    postalCode: "05433-010",
    country: "BR",
  },
  geo: { lat: -23.5546, lng: -46.689 },
  hours: "Stations open 24/7 · Flagship staffed Mon–Sat 7am–10pm · Test drives Sat 9am–5pm",
  priceRange: "$$",
  founded: "2022",
  socials: { instagram: "estradaevhub", twitter: "estradaev" },
  url: "https://estradaevhub.com.br",
};

export const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    tagline: "Pay as you charge",
    featured: false,
    benefits: [
      "Pay-per-session charging at every station",
      "Credit card or Pix, no signup at the plug",
      "Instant email receipts",
    ],
    cta: { label: "Join the Hub", href: "/membership?tier=starter" },
  },
  {
    name: "Commuter",
    price: "R$49",
    period: "/mo",
    tagline: "For the daily driver",
    featured: true,
    benefits: [
      "Lower per-kWh rate + priority peak access",
      "Free co-working lounge use",
      "Charging history dashboard",
    ],
    cta: { label: "Join the Hub", href: "/membership?tier=commuter" },
  },
  {
    name: "Fleet",
    price: "Custom",
    period: "",
    tagline: "For teams & couriers",
    featured: false,
    benefits: [
      "Volume pricing across all vehicles",
      "Consolidated monthly billing",
      "Dedicated fleet dashboard + support",
    ],
    cta: { label: "Talk to us", href: "/contact?topic=fleet" },
  },
];
