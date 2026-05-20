export interface MegaMenuProduct {
  label: string;
  href: string;
}

export interface MegaMenuLeaf {
  label: string;
  href: string;
  products: MegaMenuProduct[];
}

export interface MegaMenuGroup {
  label: string;
  href: string;
  children: MegaMenuLeaf[];
}

export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  childCategory: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  stock: number;
  hot: boolean;
  badge: string;
  image: string;
  description: string;
  fitment: string;
  specs: string[];
}

export interface StorefrontVideo {
  title: string;
  description: string;
  image: string;
  duration: string;
}

export const megaMenu: MegaMenuGroup[] = [
  {
    label: "Car Accessories",
    href: "/products?category=Car%20Accessories",
    children: [
      {
        label: "Mats",
        href: "/products?category=Car%20Accessories&sub=Mats",
        products: [
          { label: "Dash mats", href: "/products?search=dash%20mats" },
          { label: "Floor mats", href: "/products?search=floor%20mats" },
          { label: "9D luxury mats", href: "/products?search=9D%20mats" },
          { label: "Trunk mats", href: "/products?search=trunk%20mats" },
        ],
      },
      {
        label: "Interior Accessories",
        href: "/products?category=Car%20Accessories&sub=Interior",
        products: [
          { label: "Anti theft locks", href: "/products?search=anti%20theft" },
          { label: "Ashtrays", href: "/products?search=ashtray" },
          { label: "Console boxes", href: "/products?search=console" },
          { label: "Seat organizers", href: "/products?search=organizer" },
        ],
      },
      {
        label: "Exterior Accessories",
        href: "/products?category=Car%20Accessories&sub=Exterior",
        products: [
          { label: "Mud flaps", href: "/products?search=mud%20flaps" },
          { label: "Door guards", href: "/products?search=door%20guards" },
          { label: "Chrome trims", href: "/products?search=chrome" },
        ],
      },
    ],
  },
  {
    label: "Lighting",
    href: "/products?category=Lighting",
    children: [
      {
        label: "LED Lights",
        href: "/products?category=Lighting&sub=LED",
        products: [
          { label: "Headlamps", href: "/products?search=headlamp" },
          { label: "Fog lamps", href: "/products?search=fog%20lamp" },
          { label: "DRL kits", href: "/products?search=drl" },
        ],
      },
      {
        label: "Premium Assemblies",
        href: "/products?category=Lighting&sub=Premium",
        products: [
          { label: "Projector lamps", href: "/products?search=projector" },
          { label: "Tail lamps", href: "/products?search=tail%20lamp" },
          { label: "Indicator kits", href: "/products?search=indicator" },
        ],
      },
    ],
  },
  {
    label: "Performance",
    href: "/products?category=Performance",
    children: [
      {
        label: "Engine Upgrades",
        href: "/products?category=Performance&sub=Engine",
        products: [
          { label: "Air filters", href: "/products?search=air%20filter" },
          { label: "Exhaust kits", href: "/products?search=exhaust" },
          { label: "Cooling kits", href: "/products?search=cooling" },
        ],
      },
      {
        label: "Service Kits",
        href: "/products?category=Performance&sub=Service",
        products: [
          { label: "Brake kits", href: "/products?search=brake" },
          { label: "Oil packs", href: "/products?search=oil" },
          { label: "Suspension", href: "/products?search=strut" },
        ],
      },
    ],
  },
  {
    label: "Care & Detailing",
    href: "/products?category=Care%20%26%20Detailing",
    children: [
      {
        label: "Detailing",
        href: "/products?category=Care%20%26%20Detailing&sub=Detailing",
        products: [
          { label: "Ceramic sprays", href: "/products?search=ceramic" },
          { label: "Microfiber kits", href: "/products?search=microfiber" },
          { label: "Interior cleaners", href: "/products?search=cleaner" },
        ],
      },
      {
        label: "Protection",
        href: "/products?category=Care%20%26%20Detailing&sub=Protection",
        products: [
          { label: "Car covers", href: "/products?search=cover" },
          { label: "Paint protection", href: "/products?search=paint" },
          { label: "Dashboard polish", href: "/products?search=polish" },
        ],
      },
    ],
  },
];

export const storefrontProducts: StorefrontProduct[] = [
  {
    id: "sf-001",
    name: "MG HS 9D Floor Mats Horizontal Black Stitch Black With Black Grass 2020-2023",
    slug: "mg-hs-9d-floor-mats-horizontal-black-stitch-black-grass-2020-2023",
    category: "Car Accessories",
    subCategory: "Mats",
    childCategory: "Floor mats",
    price: 189,
    compareAt: 239,
    rating: 4.9,
    reviews: 184,
    stock: 42,
    hot: true,
    badge: "Hot seller",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80",
    description:
      "Premium fitted 9D floor mat set with black grass texture, raised edges and stitched finish for MG HS 2020-2023.",
    fitment: "MG HS 2020-2023",
    specs: ["Waterproof layered build", "Anti-slip backing", "Easy vacuum cleaning"],
  },
  {
    id: "sf-002",
    name: "Toyota Corolla 7D Floor Mats Carbon Texture 2019-2026",
    slug: "toyota-corolla-7d-floor-mats-carbon-texture-2019-2026",
    category: "Car Accessories",
    subCategory: "Mats",
    childCategory: "Floor mats",
    price: 142,
    compareAt: 179,
    rating: 4.8,
    reviews: 221,
    stock: 61,
    hot: true,
    badge: "Best value",
    image:
      "https://images.unsplash.com/photo-1600706432502-77a0e2e32724?auto=format&fit=crop&w=1000&q=80",
    description:
      "Custom-cut 7D mat package for Corolla with raised channels, stitched trim and premium heel pad.",
    fitment: "Toyota Corolla 2019-2026",
    specs: ["Custom fit", "Odor resistant", "Heel pad included"],
  },
  {
    id: "sf-003",
    name: "Honda Civic Dashboard Mat Velvet Black 2016-2021",
    slug: "honda-civic-dashboard-mat-velvet-black-2016-2021",
    category: "Car Accessories",
    subCategory: "Mats",
    childCategory: "Dash mats",
    price: 46,
    compareAt: 64,
    rating: 4.7,
    reviews: 94,
    stock: 118,
    hot: true,
    badge: "Sun protection",
    image:
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=1000&q=80",
    description:
      "Soft velvet dashboard cover designed to reduce heat, glare and dashboard fading in daily use.",
    fitment: "Honda Civic 2016-2021",
    specs: ["Laser-cut vents", "Low glare finish", "Velcro fixing kit"],
  },
  {
    id: "sf-004",
    name: "Universal Anti Theft Steering Lock Heavy Duty",
    slug: "universal-anti-theft-steering-lock-heavy-duty",
    category: "Car Accessories",
    subCategory: "Interior Accessories",
    childCategory: "Anti theft locks",
    price: 59,
    compareAt: 78,
    rating: 4.6,
    reviews: 143,
    stock: 90,
    hot: true,
    badge: "Security",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80",
    description:
      "High-visibility steering lock with reinforced bar, universal fit and smooth key mechanism.",
    fitment: "Universal fit",
    specs: ["Hardened steel", "Scratch-safe grip", "Twin key set"],
  },
  {
    id: "sf-005",
    name: "Luxury Console Storage Box With Cup Holder",
    slug: "luxury-console-storage-box-with-cup-holder",
    category: "Car Accessories",
    subCategory: "Interior Accessories",
    childCategory: "Console boxes",
    price: 72,
    rating: 4.5,
    reviews: 67,
    stock: 36,
    hot: false,
    badge: "Interior",
    image:
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1000&q=80",
    description:
      "Clean storage upgrade for compact cabins with cup holder, coin slot and soft-close lid.",
    fitment: "Universal compact sedan fit",
    specs: ["Soft-touch top", "Easy install", "Extra storage"],
  },
  {
    id: "sf-006",
    name: "Premium Car Ashtray With LED Lid",
    slug: "premium-car-ashtray-with-led-lid",
    category: "Car Accessories",
    subCategory: "Interior Accessories",
    childCategory: "Ashtrays",
    price: 24,
    compareAt: 34,
    rating: 4.4,
    reviews: 52,
    stock: 150,
    hot: false,
    badge: "Cabin",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80",
    description:
      "Compact illuminated ashtray with removable liner and sealed lid for cleaner cabin storage.",
    fitment: "Universal cup holder fit",
    specs: ["LED lid", "Washable insert", "Odor-control cap"],
  },
  {
    id: "sf-007",
    name: "LumaX LED Headlamp Assembly Ford Bronco 2021-2024",
    slug: "lumax-led-headlamp-assembly-ford-bronco-2021-2024",
    category: "Lighting",
    subCategory: "Premium Assemblies",
    childCategory: "Headlamps",
    price: 359,
    compareAt: 389,
    rating: 4.9,
    reviews: 241,
    stock: 26,
    hot: true,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80",
    description:
      "DOT-compliant LED headlamp assembly with DRL and projector beam pattern for Bronco upgrades.",
    fitment: "Ford Bronco 2021-2024",
    specs: ["DRL strip", "Plug-in harness", "Projector optics"],
  },
  {
    id: "sf-008",
    name: "AeroFlow Performance Air Filter Toyota Camry Honda Accord",
    slug: "aeroflow-performance-air-filter-toyota-camry-honda-accord",
    category: "Performance",
    subCategory: "Engine Upgrades",
    childCategory: "Air filters",
    price: 47,
    compareAt: 54,
    rating: 4.8,
    reviews: 312,
    stock: 248,
    hot: true,
    badge: "Performance",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80",
    description:
      "Reusable high-flow intake filter engineered for improved airflow and clean filtration.",
    fitment: "Camry 2018-2024 / Accord 2019-2024",
    specs: ["Reusable media", "High-flow design", "Easy service"],
  },
  {
    id: "sf-009",
    name: "TorqueLine Ceramic Brake Pad Kit Ford F-150 Silverado",
    slug: "torqueline-ceramic-brake-pad-kit-ford-f150-silverado",
    category: "Performance",
    subCategory: "Service Kits",
    childCategory: "Brake kits",
    price: 86,
    rating: 4.7,
    reviews: 188,
    stock: 94,
    hot: true,
    badge: "Fleet ready",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1000&q=80",
    description:
      "Low-dust ceramic pad kit with hardware for quiet stopping and daily fleet reliability.",
    fitment: "Ford F-150 / Silverado",
    specs: ["Low dust", "Hardware included", "Quiet compound"],
  },
  {
    id: "sf-010",
    name: "PulseSport Cat Back Exhaust Kit Mustang Charger",
    slug: "pulsesport-cat-back-exhaust-kit-mustang-charger",
    category: "Performance",
    subCategory: "Engine Upgrades",
    childCategory: "Exhaust kits",
    price: 629,
    rating: 4.9,
    reviews: 56,
    stock: 17,
    hot: true,
    badge: "Low stock",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    description:
      "Mandrel-bent stainless exhaust kit tuned for flow, tone and clean bolt-on installation.",
    fitment: "Mustang 2018-2024 / Charger 2017-2023",
    specs: ["Stainless steel", "Bolt-on kit", "Deep tone"],
  },
  {
    id: "sf-011",
    name: "Ceramic Detail Spray Hydrophobic Gloss 500ml",
    slug: "ceramic-detail-spray-hydrophobic-gloss-500ml",
    category: "Care & Detailing",
    subCategory: "Detailing",
    childCategory: "Ceramic sprays",
    price: 29,
    compareAt: 39,
    rating: 4.6,
    reviews: 81,
    stock: 200,
    hot: false,
    badge: "Gloss",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1000&q=80",
    description:
      "Fast hydrophobic gloss booster for paint, glass and trim between full detailing sessions.",
    fitment: "Universal",
    specs: ["Hydrophobic finish", "Safe on trim", "Quick wipe-off"],
  },
  {
    id: "sf-012",
    name: "All Weather Trunk Mat SUV Deep Tray",
    slug: "all-weather-trunk-mat-suv-deep-tray",
    category: "Car Accessories",
    subCategory: "Mats",
    childCategory: "Trunk mats",
    price: 88,
    compareAt: 115,
    rating: 4.8,
    reviews: 126,
    stock: 75,
    hot: false,
    badge: "SUV",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80",
    description:
      "Deep tray cargo liner for groceries, tools and luggage with raised spill protection.",
    fitment: "Universal SUV trim-to-fit",
    specs: ["Raised lip", "Flexible rubber", "Washable"],
  },
];

export const companyProjects = [
  {
    title: "Fleet refresh for 120 service vans",
    location: "Dallas",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Premium interior upgrade package",
    location: "Los Angeles",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Export container for mixed auto parts",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
  },
];

export const storefrontVideos: StorefrontVideo[] = [
  {
    title: "9D floor mat fitting process",
    description: "See how our team checks fitment, stitch quality and cabin finish.",
    duration: "2:14",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lighting upgrade before and after",
    description: "Premium LED assemblies with crisp beam pattern and factory-style install.",
    duration: "1:48",
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Warehouse quality control",
    description: "How orders move from SKU scan to packing, invoice and dispatch.",
    duration: "3:05",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  },
];

export const clientFeedback = [
  {
    name: "Mason Rivera",
    company: "Rivera Fleet Services",
    quote:
      "Their catalog team understands fitment. We get the right brake kits and mats without wasting service bay time.",
  },
  {
    name: "Sophia Bennett",
    company: "Coastal Collision Center",
    quote:
      "Premium lighting and mirror assemblies arrive packed properly with clear invoice details. That matters for insurance work.",
  },
  {
    name: "Omar Siddiqui",
    company: "DesertLine Auto Exports",
    quote:
      "Export quotes include the details we need: dimensions, HS code notes and realistic packing timelines.",
  },
];

export const faqs = [
  {
    question: "How do I confirm part compatibility?",
    answer:
      "Search by vehicle, SKU, category or product name. Each product page includes fitment notes and our support team can verify before dispatch.",
  },
  {
    question: "Do you support bulk and fleet orders?",
    answer:
      "Yes. Fleet, repair shop and wholesale accounts can request volume pricing, recurring orders and consolidated invoices.",
  },
  {
    question: "Can I export products internationally?",
    answer:
      "Yes. We support export inquiries with packing notes, commercial invoice structure, shipment readiness and freight coordination.",
  },
  {
    question: "What happens after checkout?",
    answer:
      "Your order moves through details, payment and confirmation. A support agent can then confirm fitment and shipping timeline.",
  },
  {
    question: "Can I return an incorrect item?",
    answer:
      "Returns depend on item condition and category. Fitment-verified items are handled faster because order notes are stored.",
  },
  {
    question: "Do you offer installation?",
    answer:
      "For selected cities we coordinate with partner garages for mats, lighting, accessories and performance kits.",
  },
];
