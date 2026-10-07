export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic size — width/height attributes only, to avoid layout shift. */
  width: number;
  height: number;
};

export type Facility = {
  slug: string;
  nav: string;
  title: string;
  eyebrow: string;
  lead: string;
  body: string[];
  points: { k: string; v: string }[];
  gallery: GalleryImage[];
  galleryTitle?: string;
};


const WOVEN_GALLERY: GalleryImage[] = [
  {
    src: "/images/facilities/woven/cutting_section.webp",
    alt: "Woven cutting section with fabric laid out for marker cutting",
    caption: "Marker cutting",
    width: 1754,
    height: 1164,
  },
  {
    src: "/images/facilities/woven/lock_stitch_machine.webp",
    alt: "Lockstitch machine running on the woven sewing floor",
    caption: "Lockstitch assembly",
    width: 1746,
    height: 1164,
  },
  {
    src: "/images/facilities/woven/sewing_section.webp",
    alt: "Woven sewing floor with operators at stitching stations",
    caption: "Sewing floor",
    width: 1574,
    height: 1138,
  },
  {
    src: "/images/facilities/woven/woven_finishing_section.webp",
    alt: "Finishing section where woven garments are pressed",
    caption: "Finishing and pressing",
    width: 1684,
    height: 1150,
  },
];

const SWEATER_GALLERY: GalleryImage[] = [
  {
    src: "/images/facilities/sweater/sweater_1.webp",
    alt: "Sweater knitwear on the sweater production floor",
    width: 1700,
    height: 999,
  },
  {
    src: "/images/facilities/sweater/sweater_2.webp",
    alt: "Wide view of the sweater knitwear production line",
    width: 3000,
    height: 1368,
  },
  {
    src: "/images/facilities/sweater/sweater_3.webp",
    alt: "Sweater panels before linking and assembly",
    width: 1700,
    height: 1232,
  },
  {
    src: "/images/facilities/sweater/sweater_4.webp",
    alt: "Cut-and-sew sweater assembly in progress",
    width: 1700,
    height: 1237,
  },
  {
    src: "/images/facilities/sweater/sweater_5.webp",
    alt: "Fully fashioned sweater panel held for inspection",
    width: 1700,
    height: 1684,
  },
  {
    src: "/images/facilities/sweater/sweater_6.webp",
    alt: "Finished sweater knitwear before packing",
    width: 1700,
    height: 1212,
  },
];

const KNIT_GALLERY: GalleryImage[] = [
  {
    src: "/images/facilities/knit/apparel-development.webp",
    alt: "Knit garment development on the knit floor",
    caption: "Knit floor development",
    width: 700,
    height: 403,
  },
  {
    src: "/images/facilities/knit/cutting_section.webp",
    alt: "Knit cutting section with panels laid out for cutting",
    caption: "Knit panel cutting",
    width: 1744,
    height: 1200,
  },
  {
    src: "/images/facilities/knit/finishing_section.webp",
    alt: "Steam finishing section for knitted garments",
    caption: "Steam finishing",
    width: 1400,
    height: 968,
  },
];

/* cad1 and cad4 are the only portrait frames in the set (0.78:1 and 0.77:1);
   the rest run 1.36:1 to 2.18:1. The square mount absorbs all of them without
   cropping, so no per-image tuning is required. cad8 is the widest at 2.09:1,
   so it bands most heavily across the mount. */
const SAMPLE_CAD_GALLERY: GalleryImage[] = [
  {
    src: "/images/facilities/sample-cad/cad1.webp",
    alt: "Sample room with graded patterns and development tools",
    width: 896,
    height: 1151,
  },
  {
    src: "/images/facilities/sample-cad/cad2.webp",
    alt: "Wide view of the sample and development room",
    width: 1336,
    height: 614,
  },
  {
    src: "/images/facilities/sample-cad/cad3.webp",
    alt: "Tech pack being read against the sample",
    width: 1276,
    height: 802,
  },
  {
    src: "/images/facilities/sample-cad/cad4.webp",
    alt: "Proto sample on a form ahead of fit approval",
    width: 1136,
    height: 1480,
  },
  {
    src: "/images/facilities/sample-cad/cad5.webp",
    alt: "Fit sample checked on a live model",
    width: 1394,
    height: 860,
  },
  {
    src: "/images/facilities/sample-cad/cad6.webp",
    alt: "Pre-production sample set laid out for approval",
    width: 1600,
    height: 1162,
  },
  {
    src: "/images/facilities/sample-cad/cad7.webp",
    alt: "Size set graded from the approved fit sample",
    width: 1260,
    height: 924,
  },
  {
    src: "/images/facilities/sample-cad/cad8.webp",
    alt: "Digital garment design rendered from the approved tech pack",
    width: 1754,
    height: 838,
  },
];

/* wash2 is the widest frame anywhere on the site at 2.50:1, so it bands the
   most heavily across the square mount — roughly 232px of photo in a 580px
   content box. Still preferable to cropping it. */
const WASH_GALLERY: GalleryImage[] = [
  {
    src: "/images/facilities/wash/wash1.webp",
    alt: "Garment wash section with barrels loaded for a batch",
    width: 1700,
    height: 1069,
  },
  {
    src: "/images/facilities/wash/wash2.webp",
    alt: "Wide view across the wash and drying area",
    width: 2930,
    height: 1174,
  },
  {
    src: "/images/facilities/wash/wash3.webp",
    alt: "Washed garments hung to dry before finishing",
    width: 1744,
    height: 1094,
  },
];

export const facilities: Facility[] = [
  {
    slug: "woven",
    nav: "Woven",
    title: "Woven production",
    eyebrow: "Production Facilities",
    lead: "Shirting, suiting, trousers, jackets and lightweight outerwear produced on wide-width looms.",
    body: [
      "Woven capacity runs from fine poplin and lightweight cotton through to heavier twills and technical fabrics. We match the mill to the product rather than forcing the product onto an available machine.",
      "Cutting, fusing and stitching are handled as one line so shade continuity and pattern consistency hold across the full order.",
    ],
    points: [
      { k: "Construction", v: "Poplin · Twill · Denim · Canvas" },
      { k: "Finishing", v: "Softener · Peach finish · Pressing" },
      { k: "Order profile", v: "Small → Large" },
    ],
    gallery: WOVEN_GALLERY,
  },
  {
    slug: "knit",
    nav: "Knit",
    title: "Knit production",
    eyebrow: "Production Facilities",
    lead: "Circular and flat-knitted jersey, interlock, rib and fleece produced on a dedicated knit floor.",
    body: [
      "Knit is scheduled separately from woven so a full programme does not compete for the same machines. Yarn is booked against the same dye lot to keep recovery consistent across panels.",
      "Steam finishing, linking and garment assembly sit on one floor, which keeps the transfer time between operations short.",
    ],
    points: [
      { k: "Construction", v: "Jersey · Interlock · Rib · Fleece" },
      { k: "Finishing", v: "Steam · Compaction · Silicone wash" },
      { k: "Order profile", v: "Small → Large" },
    ],
    gallery: KNIT_GALLERY,
  },
  {
    slug: "sweater",
    nav: "Sweater",
    title: "Sweater production",
    eyebrow: "Production Facilities",
    lead: "Fully fashioned and cut-and-sew knitwear in cotton, wool, cashmere and blended yarn.",
    body: [
      "Fully fashioned knitting is used where the buyer wants a shaped panel and lower seam allowance; cut-and-sew covers fully-fashioned looks on a shorter lead time.",
      "Yarn count, gauge and tension are confirmed at the sample stage and held through the run, which is the usual cause of sleeve-length drift on a knit programme.",
    ],
    points: [
      { k: "Construction", v: "Fully fashioned · Cut-and-sew" },
      { k: "Yarn", v: "Cotton · Wool · Cashmere · Blend" },
      { k: "Order profile", v: "Small → Large" },
    ],
    gallery: SWEATER_GALLERY,
  },
  {
    slug: "sample-cad",
    nav: "Sample & CAD",
    title: "Sample & CAD",
    eyebrow: "Development",
    lead: "Tech packs, graded patterns, 3D development and the sample room where fit is approved.",
    body: [
      "A tech pack is read against the target cost before anything is cut. Where the spec and the price target conflict, the change is raised at development rather than at inspection.",
      "Proto, fit sample and size-set are produced in-house. Fit is approved on a live model before pre-production is released to the factory floor.",
    ],
    points: [
      { k: "Development", v: "Tech pack · Grading · 3D" },
      { k: "Samples", v: "Proto · Fit · PP sample" },
      { k: "Approval", v: "On live model" },
    ],
    gallery: SAMPLE_CAD_GALLERY,
  },
  {
    slug: "wash",
    nav: "Wash",
    title: "Wash & finishing",
    eyebrow: "Production Facilities",
    lead: "Garment washing, dyeing and finishing routed through audited partner units under our supervision.",
    body: [
      "Wash is the step most likely to move a fit, so it runs last in development rather than last on a calendar. Every wash recipe is locked before the bulk cut.",
      "Units are audited for effluent handling and worker safety before the first order is routed. The washed lot is re-inspected against the approved sample on return.",
    ],
    points: [
      { k: "Processes", v: "Garment wash · Dye · Enzyme" },
      { k: "Finish", v: "Softener · Resin · Silicone" },
      { k: "Supervision", v: "Audited partner units" },
    ],
    gallery: WASH_GALLERY,
  },
];

export const facilitySlugs = facilities.map((f) => f.slug);

export const getFacility = (slug: string) =>
  facilities.find((f) => f.slug === slug);
