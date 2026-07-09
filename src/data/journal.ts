export interface Post {
  slug: string;
  title: string;
  date: string;      // ISO
  category: "Market news" | "Charging tips" | "Driver stories";
  readMins: number;
  excerpt: string;
  author: string;
  body: string[];    // paragraphs
}

export const posts: Post[] = [
  {
    slug: "sao-paulo-ev-lane-exemption",
    title: "São Paulo's EV lane rules: what the rodízio exemption really means",
    date: "2025-06-18",
    category: "Market news",
    readMins: 4,
    author: "Marina Estrada",
    excerpt:
      "Electric vehicles skip the rotational driving restriction across the expanded center. Here is what qualifies, what does not, and how to prove it at a checkpoint.",
    body: [
      "The rodízio municipal — São Paulo's rotational driving restriction — keeps roughly a fifth of the city's cars off central roads during peak hours. Fully electric vehicles are exempt, and that exemption is one of the quietest but most valuable perks of going electric in this city.",
      "Qualifying is simpler than the paperwork suggests. A battery-electric vehicle registered in the state, with plates ending in any digit, may drive the restricted zone during peak windows. Plug-in hybrids are treated as combustion cars once the battery is depleted, so they do not qualify.",
      "Keep your registration document in the glovebox. Enforcement is largely camera-based and tied to your plate, but a physical copy settles any roadside question in seconds. For fleet operators, the time saved across a week of deliveries is the single line item that most often tips the math toward electric.",
    ],
  },
  {
    slug: "ccs2-vs-type-2",
    title: "CCS2 or Type 2? Reading the charger that fits your day",
    date: "2025-06-02",
    category: "Charging tips",
    readMins: 5,
    author: "Jorge Estrada",
    excerpt:
      "Fast is not always the answer. A quick guide to matching the connector to how long you actually plan to stay — and your battery's health.",
    body: [
      "Every Estrada bay offers at least CCS2 and Type 2, and the right choice depends less on the car than on your afternoon. CCS2 is DC fast charging: 20% to 80% in 30 to 45 minutes for most models. It is the connector you want when you are grabbing a coffee and leaving.",
      "Type 2 is AC charging: slower, gentler, and ideal when you are settling in for a few hours of co-working. A full charge takes four to six hours, and the slower rate is marginally kinder to long-term battery health.",
      "A practical rule: if you will be at the station under an hour, take CCS2. If you are here to work, plug into Type 2, claim a desk, and let the car sip while you get things done.",
    ],
  },
  {
    slug: "courier-electric-year",
    title: "From 6 vans to 60: a courier's first electric year",
    date: "2025-05-20",
    category: "Driver stories",
    readMins: 6,
    author: "Thiago Mendes",
    excerpt:
      "A local delivery company switched six vans to electric as a test. Twelve months later the whole fleet is turning over. The founder walks through the numbers.",
    body: [
      "We did not set out to electrify the fleet. We set out to test six vans for a year and see whether the maintenance savings were real. They were — dramatically so, once you stop paying for oil changes, timing belts, and the slow bleed of a combustion drivetrain.",
      "The unlock was predictable charging. Estrada handles the logistics: our drivers end routes at whichever station is nearest, plug in, and the session lands on a single monthly invoice. No fuel cards, no receipts, no reconciliation.",
      "The rodízio exemption was the surprise. Our central deliveries used to route around peak restrictions. Now they go straight through. That alone recovered close to an hour a day per van.",
    ],
  },
  {
    slug: "pix-at-the-plug",
    title: "Pix at the plug: how paying for a charge works in 2025",
    date: "2025-05-05",
    category: "Charging tips",
    readMins: 3,
    author: "Marina Estrada",
    excerpt:
      "No app download, no membership required. Scan, charge, pay — with the same Pix you already use for lunch.",
    body: [
      "You do not need a membership to charge at Estrada. Walk up, plug in, and scan the QR code on the charger. Pay with Pix or a credit card, and the session starts.",
      "Members get a lower per-kWh rate and priority access during peak hours, but the pay-as-you-go path is deliberately frictionless — because the worst moment to force a signup is when someone's battery is at 8%.",
      "Receipts arrive by email instantly. For fleet accounts, individual sessions roll up into one monthly statement instead.",
    ],
  },
  {
    slug: "weekend-range-road-trips",
    title: "Weekend range: three EV road trips from São Paulo",
    date: "2025-04-22",
    category: "Charging tips",
    readMins: 5,
    author: "Jorge Estrada",
    excerpt:
      "Campos do Jordão, Santos, and Ilhabela — all comfortably within reach of a modern EV, with a charging plan for each.",
    body: [
      "Range anxiety is mostly a planning problem. Three classic paulistano getaways are well inside the range of any current EV, provided you leave with a full battery.",
      "Campos do Jordão (about 170 km) is a single-charge round trip for most cars — top up before you climb the serra. Santos (about 80 km) barely dents the battery. Ilhabela adds a ferry, so charge in São Sebastião before you cross.",
      "Leave Vila Madalena at 100% and you will spend more time choosing a café than worrying about kilometers.",
    ],
  },
  {
    slug: "why-every-station-has-a-mural",
    title: "Why every Estrada station has a mural",
    date: "2025-04-08",
    category: "Driver stories",
    readMins: 4,
    author: "Marina Estrada",
    excerpt:
      "Our first wall drew foot traffic before the first car ever plugged in. Here is how the neighborhood-artist program became part of the business.",
    body: [
      "The first mural was almost an accident. We had a blank concrete wall behind the Vila Madalena bays and a neighbor — Ana Luiza Ortiz — who painted. We asked. She said yes. People started stopping to look before a single car had charged.",
      "Now every station carries a commissioned piece by an artist from that neighborhood. It is not decoration; it is the reason the space feels like somewhere you want to linger, not a parking garage you tolerate.",
      "We pay artists properly and we let them choose the subject. The only brief is the wall.",
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug) ?? null;
export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
