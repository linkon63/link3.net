"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  PencilRuler,
  Scissors,
  Factory,
  ClipboardCheck,
  Ship,
  Scaling,
  BadgeCheck,
  Clock,
  Workflow,
  Search,
  ClipboardList,
  ScanSearch,
  Shirt,
  Settings2,
  Ruler,
  PackageCheck,
  Boxes,
  Building2,
  CalendarDays,
  LucideProps
} from "lucide-react";

// Dynamic Lucide icon mapping with precise styling
function DynamicLucideIcon({ name, style, ...props }: { name: string; style?: React.CSSProperties } & LucideProps) {
  const iconProps: LucideProps = {
    style: { display: "block", ...style },
    strokeWidth: (style as any)?.strokeWidth ?? 1.5,
    ...props
  };

  switch (name) {
    case "layers": return <Layers {...iconProps} />;
    case "pencil-ruler": return <PencilRuler {...iconProps} />;
    case "scissors": return <Scissors {...iconProps} />;
    case "factory": return <Factory {...iconProps} />;
    case "clipboard-check": return <ClipboardCheck {...iconProps} />;
    case "ship": return <Ship {...iconProps} />;
    case "scaling": return <Scaling {...iconProps} />;
    case "badge-check": return <BadgeCheck {...iconProps} />;
    case "clock": return <Clock {...iconProps} />;
    case "workflow": return <Workflow {...iconProps} />;
    case "search": return <Search {...iconProps} />;
    case "clipboard-list": return <ClipboardList {...iconProps} />;
    case "scan-search": return <ScanSearch {...iconProps} />;
    case "shirt": return <Shirt {...iconProps} />;
    case "settings-2": return <Settings2 {...iconProps} />;
    case "ruler": return <Ruler {...iconProps} />;
    case "package-check": return <PackageCheck {...iconProps} />;
    case "boxes": return <Boxes {...iconProps} />;
    case "building-2": return <Building2 {...iconProps} />;
    case "calendar-days": return <CalendarDays {...iconProps} />;
    default: return <Boxes {...iconProps} />;
  }
}


// Animated number counter
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const startVal = value > 1000 ? value - 60 : 0;

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (value - startVal) * ease);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}{count > 0 ? count : (value > 1000 ? value - 60 : 0)}{suffix}
    </span>
  );
}

export default function Home() {
  const [cats, setCats] = useState<string[]>([]);
  const [qty, setQty] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const show = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.setAttribute("data-revealed", "1");
    };

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show(entry.target as HTMLElement);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "120px" }
      );

      elements.forEach((el) => {
        el.style.transition = "opacity 0.7s cubic-bezier(.22,.61,.36,1), transform 0.7s cubic-bezier(.22,.61,.36,1)";
        if (el.getBoundingClientRect().top < (window.innerHeight || 800) * 1.1) {
          show(el);
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(18px)";
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    } else {
      elements.forEach(show);
    }
  }, []);

  const chip = (active: boolean): React.CSSProperties => ({
    border: "1px solid " + (active ? "#1E5B34" : "#DCD8CE"),
    background: active ? "#1E5B34" : "#FFFFFF",
    color: active ? "#FBFAF7" : "#4A4E48",
    padding: "10px 15px",
    fontSize: "13px",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  });

  const categories = [
    "Knit & Woven", "Sweaters", "Denim", "Sleepwear", "Intimates",
    "Sportswear", "Swimwear", "Outerwear", "Kidswear",
    "Uniform & Workwear", "Leather / PU", "Accessories"
  ];

  const categoryChips = categories.map((c) => ({
    label: c,
    style: chip(cats.includes(c)),
    toggle: () => setCats((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]),
  }));

  const qtyChips = ["Small", "Medium", "Large", "Not sure"].map((q) => ({
    label: q,
    style: Object.assign(chip(qty === q), { minWidth: "92px", textAlign: "center" as const }),
    select: () => setQty(q),
  }));

  const submit = () => setSubmitted(true);

  const stats = [
    { v: "2019", l: "Established" },
    { v: "$20M", l: "Annual Turnover" },
    { v: "35+", l: "Team" },
  ];

  const steps = [
    { n: "01", icon: "layers", t: "Fabric & Raw Materials", d: "Sourcing knit, woven and specialty fabrics, trims and accessories against your specification and price target." },
    { n: "02", icon: "pencil-ruler", t: "Product Development", d: "Translating a sketch, tech pack or reference garment into a manufacturable product." },
    { n: "03", icon: "scissors", t: "Sampling", d: "Proto, fit, size-set and pre-production samples, revised until the fit and hand-feel are approved." },
    { n: "04", icon: "factory", t: "Manufacturing", d: "Allocated to the factory in our network best suited to the product type and quantity." },
    { n: "05", icon: "clipboard-check", t: "Quality Assurance", d: "In-line and end-line inspection to AQL 1.5 / 2.5 across every production stage." },
    { n: "06", icon: "ship", t: "Compliance & Shipment", d: "Documentation, compliance checks and coordinated handover for on-time shipment." },
  ];

  const products = [
    { t: "Knit & Woven", d: "Tops and bottoms across weights, from jersey basics to structured wovens.", src: "/assets/a7482ae5-99cd-44a1-a76a-ed716bbdda2e.png", slot: "p-knit", ph: "Knit & woven garment" },
    { t: "Sweaters", d: "Sweaters, cardigans and pullovers in a range of gauges and yarns.", src: "/assets/9d24c472-1359-411b-a4fb-b1a31c2a2f3e.png", slot: "p-sweater", ph: "Sweater / knitwear" },
    { t: "Denim", d: "Denim bottoms and jackets with washes developed to your reference.", src: "/assets/bc390561-a8f5-459d-a625-ee03ccc76b6a.png", slot: "p-denim", ph: "Denim product shot" },
    { t: "Sportswear & Activewear", d: "Performance, yoga and activewear in technical and blended fabrics.", src: "/assets/9cda57d2-2be0-4f82-8ceb-7ef04d711c1c.png", slot: "p-sport", ph: "Activewear editorial" },
    { t: "Outerwear", d: "Jackets and overcoats, including padded and lined constructions.", src: "/assets/7a814689-cbf4-4e41-bb38-b1c9d1c20d65.png", slot: "p-outer", ph: "Outerwear / jacket" },
    { t: "Sleepwear & Loungewear", d: "Soft comfort styles for everyday and seasonal loungewear ranges.", src: "/assets/1369f167-7e22-480d-962c-ef5cb33bcf8f.png", slot: "p-sleep", ph: "Loungewear set" },
  ];

  const moreProducts = [
    "Intimates & Lingerie", "Swimwear", "Kidswear", "Uniform & Workwear", "Leather & PU", "Accessories & Handicrafts"
  ];

  const values = [
    { icon: "scaling", t: "Flexible Quantities", d: "From small quantity trial runs to large repeat programmes." },
    { icon: "badge-check", t: "Consistent Quality", d: "Strong QA/QC processes with inspection at multiple production stages." },
    { icon: "clock", t: "On-Time Delivery", d: "A process built around reliable production and delivery dates." },
    { icon: "workflow", t: "End-to-End Support", d: "From material sourcing and development to manufacturing and shipment." },
  ];

  const qc = [
    { n: "01", icon: "search", t: "Analysis", d: "Review specs, samples and buyer requirements." },
    { n: "02", icon: "clipboard-list", t: "Production Checklist", d: "Set standards and prepare stage-by-stage checklists." },
    { n: "03", icon: "scan-search", t: "Fabric Inspection", d: "Check fabric quality, colour and defects on arrival." },
    { n: "04", icon: "shirt", t: "Pre-Production Check", d: "Verify samples and fit before bulk begins." },
    { n: "05", icon: "settings-2", t: "During Production Check", d: "Monitor workmanship and measurements on the line." },
    { n: "06", icon: "ruler", t: "Pre-Final Inspection", d: "Full check before the final audit." },
    { n: "07", icon: "package-check", t: "Final Random Inspection", d: "Random checks on packed goods before shipment." },
  ];

  const certs = [
    { src: "/assets/ac86153f-b87f-419d-9a20-c04e1421f54f.png", alt: "Accord on Fire and Building Safety in Bangladesh", label: "Accord" },
    { src: "/assets/c9aa3394-38ec-4586-9747-0fce0cc09dd3.png", alt: "Alliance for Bangladesh Worker Safety", label: "Alliance" },
    { src: "/assets/814ac5cf-cdb3-451c-993d-974a107e2f66.png", alt: "LEED", label: "LEED" },
    { src: "/assets/dbcf4355-a983-4635-8d2c-5fc1abc38bc0.png", alt: "amfori BSCI", label: "amfori BSCI" },
    { src: "/assets/b7149302-c41f-4d8e-a04c-60e653530691.png", alt: "ISO 9001:2015", label: "ISO 9001:2015" },
    { src: "/assets/9222deda-ba9e-46f7-ace5-8a52cde3ed1b.png", alt: "Global Organic Textile Standard", label: "GOTS" },
    { src: "/assets/2adf4bfe-c6b6-43b4-9895-a92d79c445ad.png", alt: "Better Cotton Initiative", label: "BCI" },
    { src: "/assets/ac051a10-4d5d-4570-ae64-3ef1a91f0c50.png", alt: "Global Recycled Standard", label: "Global Recycled Standard" },
    { src: "/assets/f3beea89-1335-4866-80f2-6fe07cd845f4.png", alt: "Organic 100 Content Standard", label: "OCS 100" },
    { src: "/assets/449c9078-b162-4297-b010-fe94b7780056.png", alt: "Organic Blended Content Standard", label: "OCS Blended" },
    { src: "/assets/12a0151c-a537-4dbb-8357-cc39fb1a30b9.png", alt: "Recycled 100 Claim Standard", label: "RCS 100" },
    { src: "/assets/af648cb4-a920-482d-95e2-4e525ea3e9a8.png", alt: "Workplace Conditions Assessment", label: "WCA" },
    { src: "/assets/d943f928-d7f0-4124-82d7-de214a41cf6e.png", alt: "OEKO-TEX Standard 100", label: "OEKO-TEX Standard 100" },
    { src: "/assets/1ae32b21-dc78-4daa-a784-e6a0adafb24d.png", alt: "WRAP", label: "WRAP" },
    { src: "/assets/32c99726-6575-4cc5-9ae6-f9f2c9e671a6.png", alt: "Sedex", label: "Sedex" },
    { src: "/assets/dffb1032-ca1b-4cca-af40-127c57f36c0d.png", alt: "C-TPAT", label: "C-TPAT" },
  ];

  const rawClients = [
    { src: "/assets/bb13478e-9813-4760-a6fa-c42776fef796.png", alt: "Coca" },
    { src: "/assets/19f8b2c2-7052-4743-913f-6ad7bc2d4a94.png", alt: "Zara" },
    { src: "/assets/2c549f26-8d8a-41c7-9977-11a7ead4e681.png", alt: "Initiative" },
    { src: "/assets/56300d5c-c87c-48b3-b581-5fa8ddac008b.png", alt: "Tam Fashion" },
    { src: "/assets/3784fcd0-c641-4949-9544-ec02b081c563.png", alt: "Tim Hortons" },
    { src: "/assets/6354b1b4-24a0-495d-bdba-5c12a9ffcb0c.png", alt: "Aeon" },
    { src: "/assets/58c45082-f17e-4cb4-9e1f-a2be9e8bcc58.png", alt: "Icono" },
    { src: "/assets/355f5bdc-43d8-42f6-967f-f8eb06d355ba.png", alt: "Workman" },
    { src: "/assets/4e53f507-1922-48f8-884f-9517493df1b1.png", alt: "Hailys" },
    { src: "/assets/4f7a600a-bf38-478a-828d-604aaa06a209.png", alt: "Toyoshima" },
    { src: "/assets/f63b6fd5-7501-4066-a569-024a94aedaa9.png", alt: "Crazy Line" },
    { src: "/assets/03cbfeb4-bfcf-4c4b-9dc6-4e0d8422952d.png", alt: "Offtex Switzerland" },
    { src: "/assets/a56447e1-8e6a-4778-ad15-0d5b0090daa1.png", alt: "Cody James" },
  ];

  const clientsLoop = [...rawClients, ...rawClients];

  const sustain = [
    "Organic cotton", "Recycling", "Natural-friendly materials", "Worker safety", "Continuous improvement"
  ];

  const credibility = [
    { l: "In the apparel industry since", v: "2019" },
    { l: "Business model", v: "Buying house + manufacturing" },
    { l: "Annual turnover", v: "Approx. US$20M" },
    { l: "Team", v: "35 people" },
    { l: "Quality standard", v: "AQL 1.5 / 2.5" },
  ];

  return (
<div style={{ "fontFamily": "'Instrument Sans', Helvetica, Arial, sans-serif", "color": "#1B1D1A", "background": "#FBFAF7", "overflowX": "hidden" }}>

  <header style={{ "position": "sticky", "top": "0", "zIndex": "50", "background": "rgba(251,250,247,0.92)", "backdropFilter": "blur(10px)", "borderBottom": "1px solid #E7E4DC" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "14px 28px", "display": "flex", "alignItems": "center", "gap": "28px", "justifyContent": "space-between" }}>
      <a href="#top" style={{ "display": "flex", "alignItems": "center", "flexShrink": "0" }}>
        <img src="/assets/844fc14a-38b8-4ea1-98d4-6e6b4a2fb083.png" alt="Prasine International Ltd." style={{ "height": "54px", "width": "auto", "display": "block", "mixBlendMode": "multiply" }} />
      </a>
      <nav style={{ "display": "flex", "alignItems": "center", "gap": "30px", "flexWrap": "wrap", "justifyContent": "flex-end" }}>
        <div data-desktop-nav="1" style={{ "display": "flex", "alignItems": "center", "gap": "30px" }}>
            <a href="#top" style={{ "fontSize": "13px", "letterSpacing": "0.09em", "textTransform": "uppercase", "color": "#1B1D1A", "fontWeight": "500" }}>Home</a>
            <a href="#about" style={{ "fontSize": "13px", "letterSpacing": "0.09em", "textTransform": "uppercase", "color": "#1B1D1A", "fontWeight": "500" }}>About Us</a>
            <a href="#capabilities" style={{ "fontSize": "13px", "letterSpacing": "0.09em", "textTransform": "uppercase", "color": "#1B1D1A", "fontWeight": "500" }}>Our Services</a>
            <a href="#products" style={{ "fontSize": "13px", "letterSpacing": "0.09em", "textTransform": "uppercase", "color": "#1B1D1A", "fontWeight": "500" }}>Production Gallery</a>
            <a href="#quality" style={{ "fontSize": "13px", "letterSpacing": "0.09em", "textTransform": "uppercase", "color": "#1B1D1A", "fontWeight": "500" }}>Quality and Compliance</a>
        </div>
        <a href="#quote" className="prasine-btn" style={{ "background": "#1E5B34", "color": "#FBFAF7", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "13px 22px", "display": "inline-block", "transition": "background 0.25s ease" }}>Request a Quote</a>
      </nav>
    </div>
  </header>

  <section id="top" style={{ "background": "linear-gradient(165deg, #FDF6EC 0%, #FBFAF7 46%, #F4F6F1 100%)" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px" }}>
    <div data-reveal="1" style={{ "padding": "64px 0 0" }}>
      <div style={{ "display": "flex", "alignItems": "center", "gap": "12px", "marginBottom": "22px" }}>
        <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 7px)", "gridTemplateRows": "repeat(2, 7px)", "gap": "3px", "flexShrink": "0" }}>
          <div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div>
          <div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div>
          <div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div>
          <div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div>
        </div>
        <span style={{ "fontSize": "11px", "letterSpacing": "0.22em", "textTransform": "uppercase", "color": "#B8863B", "fontWeight": "600" }}>Apparel Sourcing &amp; Manufacturing · Bangladesh</span>
      </div>
      <div style={{ "display": "flex", "alignItems": "flex-end", "justifyContent": "space-between", "gap": "40px", "flexWrap": "wrap" }}>
        <h1 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(40px, 6.4vw, 92px)", "lineHeight": "0.96", "letterSpacing": "-0.035em", "textTransform": "uppercase", "margin": "0", "maxWidth": "15ch", "textWrap": "balance" }}>Masters of apparel <span style={{ "color": "#1E5B34" }}>manufacturing</span></h1>
        <div style={{ "display": "flex", "gap": "14px", "paddingBottom": "14px", "flexShrink": "0" }}>
          <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 13px)", "gridTemplateRows": "repeat(2, 13px)", "gap": "4px" }}>
            <div style={{ "background": "#1E5B34", "borderRadius": "1px" }}></div><div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div><div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div><div style={{ "background": "#1E5B34", "borderRadius": "1px" }}></div>
          </div>
          <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 13px)", "gridTemplateRows": "repeat(2, 13px)", "gap": "4px" }}>
            <div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div><div style={{ "background": "#B8863B", "borderRadius": "1px" }}></div><div style={{ "background": "#B8863B", "borderRadius": "1px" }}></div><div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div>
          </div>
          <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 13px)", "gridTemplateRows": "repeat(2, 13px)", "gap": "4px" }}>
            <div style={{ "background": "#D6CFC0", "borderRadius": "1px" }}></div><div style={{ "background": "#C9C5BA", "borderRadius": "1px" }}></div><div style={{ "background": "#C9C5BA", "borderRadius": "1px" }}></div><div style={{ "background": "#D6CFC0", "borderRadius": "1px" }}></div>
          </div>
        </div>
      </div>
    </div>

    <div data-hero-grid="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "28px", "alignItems": "start", "padding": "44px 0 56px" }}>
      <div data-reveal="1" style={{ "minWidth": "0" }}>
        <div style={{ "height": "460px", "position": "relative", "overflow": "hidden", "borderRadius": "0" }}>
          <img src="/assets/a0f0581d-2baf-4976-936f-db7c98965d0a.webp" alt="Editorial apparel / finished garment shot" style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
        </div>
        <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "36px", "paddingTop": "40px" }}>
          {stats.map((s, idx) => (

            <div key={idx} style={{ "minWidth": "0" }}>
              <div style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "clamp(30px, 3vw, 44px)", "fontWeight": "600", "letterSpacing": "-0.03em", "lineHeight": "1", "color": "#1B1D1A" }}>{s.v}</div>
              <div style={{ "fontSize": "11px", "letterSpacing": "0.16em", "textTransform": "uppercase", "color": "#6B6F68", "marginTop": "10px" }}>{s.l}</div>
            </div>
          
))}
        </div>
      </div>

      <div data-reveal="1" data-hero-offset="1" style={{ "minWidth": "0" }}>
        <div style={{ "position": "relative" }}>
          <div style={{ "height": "460px", "position": "relative", "overflow": "hidden", "borderRadius": "0" }}>
            <img src="/assets/6fa84e0a-d4f8-4ddd-ad5b-a964b43de2e8.webp" alt="Fabric texture close-up" style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
          </div>
          <div style={{ "position": "absolute", "top": "-46px", "right": "-34px", "width": "116px", "height": "116px", "borderRadius": "50%", "background": "#14331F", "display": "flex", "alignItems": "center", "justifyContent": "center", "boxShadow": "0 10px 30px rgba(20,51,31,0.28)" }}>
            <div style={{ "position": "absolute", "inset": "0", "animation": "prasine-spin 18s linear infinite" }}>
              <svg viewBox="0 0 116 116" style={{ "width": "100%", "height": "100%", "display": "block" }}>
                <defs><path id="prasine-badge-arc" d="M 58,58 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"></path></defs>
                <text fill="#C79A4A" style={{ "fontFamily": "'Instrument Sans', sans-serif", "fontSize": "10.5px", "letterSpacing": "0.24em", "textTransform": "uppercase", "fontWeight": "600" }}>
                  <textPath href="#prasine-badge-arc" startOffset="0%">Ethical · Compliant · On Time · </textPath>
                </text>
              </svg>
            </div>
            <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 10px)", "gridTemplateRows": "repeat(2, 10px)", "gap": "3px" }}>
              <div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div><div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div><div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div><div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div>
            </div>
          </div>
        </div>
        <div style={{ "display": "flex", "alignItems": "center", "gap": "10px", "paddingTop": "26px" }}>
          <div style={{ "width": "34px", "height": "1px", "background": "#C9C5BA" }}></div>
          <span style={{ "fontSize": "11px", "letterSpacing": "0.18em", "textTransform": "uppercase", "color": "#8A8E86" }}>AQL 1.5 / 2.5 inspection</span>
        </div>
        <p style={{ "fontSize": "16px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "22px 0 26px", "textWrap": "pretty" }}>From fabric sourcing and product development to manufacturing, quality assurance and shipment — end-to-end apparel solutions for global buyers.</p>
        <div style={{ "display": "flex", "gap": "12px", "flexWrap": "wrap" }}>
          <a href="#quote" className="prasine-btn" style={{ "background": "#1E5B34", "color": "#FBFAF7", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 26px", "transition": "background 0.25s ease" }}>Request a Quote</a>
          <a href="#products" style={{ "border": "1px solid #C9C5BA", "color": "#1B1D1A", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 26px", "transition": "border-color 0.25s ease" }}>Our Products</a>
        </div>
      </div>

    </div>
    </div>
  </section>

  <section id="who-we-are" style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "88px 28px 0" }}>
    <div data-reveal="1" style={{ "display": "flex", "alignItems": "baseline", "justifyContent": "center", "gap": "16px", "borderBottom": "1px solid #E7E4DC", "paddingBottom": "22px", "marginBottom": "48px", "textAlign": "center" }}>
      
      <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(24px, 2.8vw, 36px)", "lineHeight": "1.1", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0" }}>Apparel development &amp; custom garment manufacturing</h2>
    </div>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(340px, 1fr))", "gap": "56px", "alignItems": "start" }}>
      <div style={{ "display": "grid", "gridTemplateColumns": "1fr", "gap": "12px", "minWidth": "0" }}>
        <div style={{ "height": "380px", "position": "relative", "minWidth": "0", "overflow": "hidden" }}>
          
        <img src="/assets/0fa502cf-e7bf-4e9c-becb-382ae1582786.webp" alt="Team / studio / production floor" style={{ "width": "100%", "height": "100%", "objectFit": "contain", "display": "block" }} /></div>
      </div>
      <div style={{ "minWidth": "0" }}>
        <p style={{ "fontSize": "17px", "lineHeight": "1.62", "color": "#4A4E48", "margin": "0 0 34px", "maxWidth": "520px", "textWrap": "pretty" }}>A Bangladesh-based buying house and garment manufacturer, developing and producing apparel for global brands since 2019.</p>
        <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(150px, 1fr))", "gap": "26px", "paddingBottom": "32px", "borderBottom": "1px solid #E7E4DC", "marginBottom": "32px" }}>
          <div style={{ "minWidth": "0" }}>
            <div style={{ "display": "flex", "alignItems": "center", "gap": "10px" }}>
              <DynamicLucideIcon name="calendar-days" style={{"width": "22px", "height": "22px", "color": "#1E5B34", "strokeWidth": 1.5}} />
              <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "26px", "fontWeight": "600", "letterSpacing": "-0.02em" }}>2019</span>
            </div>
            <div style={{ "fontSize": "13px", "color": "#6B6F68", "marginTop": "6px" }}>In the industry since</div>
          </div>
          <div style={{ "minWidth": "0" }}>
            <div style={{ "display": "flex", "alignItems": "center", "gap": "10px" }}>
              <DynamicLucideIcon name="boxes" style={{"width": "22px", "height": "22px", "color": "#1E5B34", "strokeWidth": 1.5}} />
              <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "26px", "fontWeight": "600", "letterSpacing": "-0.02em" }}>Small → Large</span>
            </div>
            <div style={{ "fontSize": "13px", "color": "#6B6F68", "marginTop": "6px" }}>Order quantities</div>
          </div>
          <div style={{ "minWidth": "0" }}>
            <div style={{ "display": "flex", "alignItems": "center", "gap": "10px" }}>
              <DynamicLucideIcon name="badge-check" style={{"width": "22px", "height": "22px", "color": "#1E5B34", "strokeWidth": 1.5}} />
              <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "26px", "fontWeight": "600", "letterSpacing": "-0.02em" }}>AQL 1.5 / 2.5</span>
            </div>
            <div style={{ "fontSize": "13px", "color": "#6B6F68", "marginTop": "6px" }}>Inspection standard</div>
          </div>
        </div>
        <div style={{ "display": "grid", "gap": "18px", "marginBottom": "30px" }}>
          <div style={{ "display": "grid", "gridTemplateColumns": "24px 1fr", "gap": "14px", "alignItems": "start" }}>
            <DynamicLucideIcon name="building-2" style={{"width": "20px", "height": "20px", "color": "#B8863B", "strokeWidth": 1.5, "marginTop": "3px"}} />
            <p style={{ "fontSize": "15px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "0" }}><strong style={{ "fontWeight": "600", "color": "#1B1D1A" }}>Who we are</strong> — an apparel buying house and garment manufacturer based in Dhaka, Bangladesh.</p>
          </div>
          <div style={{ "display": "grid", "gridTemplateColumns": "24px 1fr", "gap": "14px", "alignItems": "start" }}>
            <DynamicLucideIcon name="shirt" style={{"width": "20px", "height": "20px", "color": "#B8863B", "strokeWidth": 1.5, "marginTop": "3px"}} />
            <p style={{ "fontSize": "15px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "0" }}><strong style={{ "fontWeight": "600", "color": "#1B1D1A" }}>What we do</strong> — knit &amp; woven, sweaters, denim, sleepwear, intimates, sportswear, swimwear, outerwear, kidswear, workwear, leather / PU and accessories.</p>
          </div>
          <div style={{ "display": "grid", "gridTemplateColumns": "24px 1fr", "gap": "14px", "alignItems": "start" }}>
            <DynamicLucideIcon name="workflow" style={{"width": "20px", "height": "20px", "color": "#B8863B", "strokeWidth": 1.5, "marginTop": "3px"}} />
            <p style={{ "fontSize": "15px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "0" }}><strong style={{ "fontWeight": "600", "color": "#1B1D1A" }}>How we do it</strong> — fabric sourcing › development › sampling › manufacturing › inspection › compliance › shipment.</p>
          </div>
        </div>
        <a href="#capabilities" style={{ "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "color": "#1E5B34", "borderBottom": "1px solid #C9C5BA", "paddingBottom": "3px" }}>Learn More →</a>
      </div>
    </div>
  </section>

  <section id="capabilities" style={{ "background": "#F3F1EA", "marginTop": "88px", "padding": "88px 0" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px" }}>
      <div data-reveal="1" style={{ "textAlign": "center", "maxWidth": "640px", "margin": "0 auto 52px" }}>
        
        <div style={{ "fontSize": "11px", "letterSpacing": "0.22em", "textTransform": "uppercase", "color": "#B8863B", "fontWeight": "600", "marginBottom": "18px" }}>Full Service</div>
        <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 46px)", "lineHeight": "1.04", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0 0 18px" }}>From source to shipment</h2>
        <p style={{ "fontSize": "16px", "lineHeight": "1.62", "color": "#4A4E48", "margin": "0 auto 30px", "maxWidth": "480px", "textWrap": "pretty" }}>One accountable partner from the first fabric enquiry to the loaded container.</p>
        <a href="#quote" style={{ "border": "1px solid #1B1D1A", "color": "#1B1D1A", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "15px 26px", "display": "inline-block", "transition": "background 0.25s ease, color 0.25s ease" }}>Discuss Your Requirements</a>
      </div>
      <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(390px, 1fr))", "gap": "22px", "alignItems": "stretch" }}>
        {steps.map((st, idx) => (

          <div key={idx} style={{ "background": "#FFFFFF", "padding": "40px 36px 44px", "minWidth": "0", "transition": "transform 0.3s ease, box-shadow 0.3s ease" }}>
            <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "30px" }}>
              <DynamicLucideIcon name={st.icon} style={{"width": "34px", "height": "34px", "color": "#1E5B34", "strokeWidth": 1.5}} />
              <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "12px", "letterSpacing": "0.14em", "color": "#C0BCB1", "fontWeight": "600" }}>{st.n}</span>
            </div>
            <h3 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "19px", "fontWeight": "600", "letterSpacing": "-0.005em", "textTransform": "uppercase", "margin": "0 0 12px" }}>{st.t}</h3>
            <p style={{ "fontSize": "15px", "lineHeight": "1.6", "color": "#6B6F68", "margin": "0", "textWrap": "pretty" }}>{st.d}</p>
          </div>
        
))}
      </div>
    </div>
  </section>

  <section style={{ "marginTop": "88px", "borderTop": "1px solid #E7E4DC", "borderBottom": "1px solid #E7E4DC", "padding": "44px 0", "overflow": "hidden" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto 28px", "padding": "0 28px", "textAlign": "center", "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86" }}>Brands we produce for</div>
    <div style={{ "position": "relative", "overflow": "hidden", "WebkitMaskImage": "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)", "maskImage": "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)" }}>
      <div className="prasine-marquee-track" style={{ "display": "flex", "width": "max-content", "animation": "prasine-marquee 42s linear infinite" }}>
        {clientsLoop.map((cl, idx) => (

          <div key={idx} style={{ "width": "190px", "height": "62px", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "0 22px", "flexShrink": "0" }}>
            <img className="prasine-logo-item" src={cl.src} alt={cl.alt} title={cl.alt} style={{ "maxWidth": "100%", "maxHeight": "62px", "objectFit": "contain", "display": "block", "filter": "grayscale(1)", "opacity": "0.62" }} />
          </div>
        
))}
      </div>
    </div>
  </section>

  <section id="products" style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "96px 28px 0" }}>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))", "gap": "40px", "alignItems": "end", "marginBottom": "48px" }}>
      <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 48px)", "lineHeight": "1.05", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0" }}>Apparel, developed<br />for your market</h2>
      <p style={{ "fontSize": "16px", "lineHeight": "1.62", "color": "#4A4E48", "margin": "0", "maxWidth": "460px", "textWrap": "pretty" }}>From everyday essentials to performance wear and outerwear, we source and manufacture a diverse range of apparel for global buyers.</p>
    </div>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(310px, 1fr))", "gap": "22px" }}>
      {products.map((p, idx) => (

        <a key={idx} href="#quote" style={{ "display": "block", "color": "#1B1D1A", "transition": "opacity 0.3s ease" }}>
          <div style={{ "position": "relative", "height": "340px", "overflow": "hidden", "background": "#EFEDE6" }}>
            <img src={p.src} alt={p.ph} style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
          </div>
          <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "baseline", "gap": "16px", "padding": "18px 2px 6px", "borderBottom": "1px solid #E7E4DC" }}>
            <h3 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "19px", "fontWeight": "600", "letterSpacing": "-0.005em", "textTransform": "uppercase", "margin": "0" }}>{p.t}</h3>
            <span style={{ "fontSize": "12px", "letterSpacing": "0.1em", "textTransform": "uppercase", "color": "#1E5B34", "fontWeight": "600", "whiteSpace": "nowrap" }}>Explore →</span>
          </div>
          <p style={{ "fontSize": "14px", "lineHeight": "1.55", "color": "#6B6F68", "margin": "12px 2px 0" }}>{p.d}</p>
        </a>
      
))}
    </div>
    <div data-reveal="1" style={{ "marginTop": "46px", "borderTop": "1px solid #E7E4DC", "paddingTop": "26px" }}>
      <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#6B6F68", "marginBottom": "18px" }}>Also produced</div>
      <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "10px" }}>
        {moreProducts.map((m, idx) => (

          <a key={idx} href="#quote" style={{ "border": "1px solid #DCD8CE", "padding": "11px 18px", "fontSize": "13px", "letterSpacing": "0.04em", "color": "#1B1D1A", "transition": "border-color 0.25s ease, background 0.25s ease" }}>{m}</a>
        
))}
      </div>
    </div>
  </section>

  <section style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "96px 28px 0" }}>
    <div data-reveal="1" style={{ "marginBottom": "48px" }}>
      <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 48px)", "lineHeight": "1.05", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0" }}>Built around what buyers need</h2>
    </div>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(250px, 1fr))", "gap": "0 44px", "borderTop": "1px solid #1B1D1A" }}>
      {values.map((v, idx) => (

        <div key={idx} style={{ "padding": "34px 44px 44px 0", "borderRight": "1px solid #E7E4DC", "minWidth": "0" }}>
          <DynamicLucideIcon name={v.icon} style={{"width": "32px", "height": "32px", "color": "#1E5B34", "strokeWidth": 1.5, "marginBottom": "24px"}} />
          <h3 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "17px", "fontWeight": "600", "letterSpacing": "0.02em", "textTransform": "uppercase", "margin": "0 0 12px" }}>{v.t}</h3>
          <p style={{ "fontSize": "15px", "lineHeight": "1.6", "color": "#6B6F68", "margin": "0", "textWrap": "pretty" }}>{v.d}</p>
        </div>
      
))}
    </div>
  </section>

  <section id="quality" style={{ "background": "#14231A", "color": "#F2F0E9", "marginTop": "88px", "padding": "92px 0" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px" }}>
      <div data-reveal="1" style={{ "marginBottom": "56px" }}>
        <div style={{ "maxWidth": "720px", "margin": "0 auto", "textAlign": "center", "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
          <div style={{ "display": "flex", "alignItems": "center", "gap": "12px", "marginBottom": "22px" }}>
            <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 7px)", "gridTemplateRows": "repeat(2, 7px)", "gap": "3px", "flexShrink": "0" }}>
            <div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div>
            <div style={{ "background": "#C9A25E", "borderRadius": "1px" }}></div>
            <div style={{ "background": "#C9A25E", "borderRadius": "1px" }}></div>
            <div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div>
          </div>
            <span style={{ "fontSize": "11px", "letterSpacing": "0.22em", "textTransform": "uppercase", "color": "#C9A25E", "fontWeight": "600" }}>Quality &amp; Compliance</span>
          </div>
          <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 46px)", "lineHeight": "1.04", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0 0 20px" }}>Quality is built into every stage</h2>
          <p style={{ "fontSize": "16px", "lineHeight": "1.65", "color": "#B9BFB4", "maxWidth": "560px", "margin": "0 0 26px", "textWrap": "pretty" }}>From fabric arrival to the final random check we inspect at every step, so issues are found early and corrected while production can still absorb them.</p>
          <p style={{ "fontSize": "14px", "lineHeight": "1.6", "color": "#8D9389", "maxWidth": "560px", "margin": "0 0 30px" }}>On buyer request we work with third-party institutes including SGS, ITS and Hohenstein, and guide factories towards compliance.</p>
          <a href="#quote" style={{ "border": "1px solid #4A5A4E", "color": "#F2F0E9", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 28px", "display": "inline-block", "transition": "background 0.25s ease, border-color 0.25s ease" }}>Explore Quality &amp; Compliance</a>
        </div>
      </div>

      <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(255px, 1fr))", "gap": "16px", "alignItems": "stretch" }}>
        {qc.map((q, idx) => (

          <div key={idx} style={{ "background": "#1B2E22", "border": "1px solid #2C4234", "padding": "30px 26px 32px", "minWidth": "0", "transition": "border-color 0.3s ease, transform 0.3s ease" }}>
            <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "26px" }}>
              <DynamicLucideIcon name={q.icon} style={{"width": "30px", "height": "30px", "color": "#C9A25E", "strokeWidth": 1.5}} />
              <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "12px", "letterSpacing": "0.14em", "color": "#5E7064", "fontWeight": "600" }}>{q.n}</span>
            </div>
            <h3 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "16px", "fontWeight": "600", "letterSpacing": "0.02em", "textTransform": "uppercase", "margin": "0 0 10px", "lineHeight": "1.25" }}>{q.t}</h3>
            <p style={{ "fontSize": "14px", "lineHeight": "1.55", "color": "#97A099", "margin": "0", "textWrap": "pretty" }}>{q.d}</p>
          </div>
        
))}
        <div style={{ "background": "#C9A25E", "color": "#14231A", "padding": "30px 26px 32px", "minWidth": "0", "display": "flex", "flexDirection": "column" }}>
          <div style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "30px", "fontWeight": "600", "letterSpacing": "-0.015em", "marginBottom": "12px" }}>AQL 1.5 / 2.5</div>
          <p style={{ "fontSize": "14px", "lineHeight": "1.55", "color": "#33422F", "margin": "0 0 20px" }}>Acceptable quality levels applied to inspection across production stages.</p>
          <div style={{ "display": "grid", "gap": "9px", "marginTop": "auto" }}>
            <span style={{ "fontSize": "13px", "letterSpacing": "0.1em", "textTransform": "uppercase", "fontWeight": "600" }}>Quality</span>
            <span style={{ "fontSize": "13px", "letterSpacing": "0.1em", "textTransform": "uppercase", "fontWeight": "600" }}>Safety</span>
            <span style={{ "fontSize": "13px", "letterSpacing": "0.1em", "textTransform": "uppercase", "fontWeight": "600" }}>Compliance</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="about" style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "96px 28px 0" }}>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(320px, 1fr))", "gap": "56px", "alignItems": "center" }}>
      <div style={{ "height": "440px", "position": "relative", "minWidth": "0", "overflow": "hidden" }}>
        <img src="/assets/beeb822d-d97f-41b6-80dc-7947fbaab3e5.webp" alt="Factory floor / production line" style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
      </div>
      <div>
        <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 46px)", "lineHeight": "1.05", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0 0 22px" }}>Production partners you can trust</h2>
        <p style={{ "fontSize": "16px", "lineHeight": "1.65", "color": "#4A4E48", "margin": "0 0 18px", "maxWidth": "520px", "textWrap": "pretty" }}>Prasine works with a network of cooperative factories selected for the product types they do best — knits, wovens, sweaters, denim, outerwear and more — and manages the order on the buyer's behalf from development through shipment.</p>
        <p style={{ "fontSize": "16px", "lineHeight": "1.65", "color": "#4A4E48", "margin": "0 0 26px", "maxWidth": "520px", "textWrap": "pretty" }}>Our factories are certified by multiple internationally recognized organizations. A commitment to worker safety has enabled 100% certification by the RMG Sustainability Council (Accord) and Nirapon (Alliance).</p>
        <div style={{ "marginBottom": "30px" }}></div>
        <div style={{ "display": "flex", "gap": "14px", "flexWrap": "wrap" }}>
          <a href="#quote" className="prasine-btn" style={{ "background": "#1E5B34", "color": "#FBFAF7", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 28px", "transition": "background 0.25s ease" }}>Explore Our Factory Network</a>
          <a href="#quote" style={{ "border": "1px solid #C9C5BA", "color": "#1B1D1A", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 28px", "transition": "border-color 0.25s ease" }}>Discuss Your Requirements</a>
        </div>
      </div>
    </div>
  </section>

  <section id="certifications" style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "96px 28px 0" }}>
    <div data-reveal="1" style={{ "textAlign": "center", "marginBottom": "56px" }}>
      <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 9px)", "gridTemplateRows": "repeat(2, 9px)", "gap": "4px", "width": "max-content", "margin": "0 auto 22px" }}><div style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></div><div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div><div style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></div><div style={{ "background": "#B8863B", "borderRadius": "1px" }}></div></div>
      <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(28px, 3.2vw, 42px)", "lineHeight": "1.08", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0 0 14px" }}>Our Certifications</h2>
      <p style={{ "fontSize": "16px", "lineHeight": "1.62", "color": "#6B6F68", "margin": "0 auto", "maxWidth": "560px", "textWrap": "pretty" }}>Standards held across our cooperative factory network, covering quality systems, worker safety, chemical compliance and responsible materials.</p>
    </div>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(190px, 1fr))", "gap": "52px 32px" }}>
      {certs.map((c, idx) => (

        <div key={idx} className="prasine-cert-item" style={{ "height": "92px", "display": "flex", "alignItems": "center", "justifyContent": "center", "minWidth": "0", "cursor": "pointer" }}>
          <img src={c.src} alt={c.alt} title={c.alt} style={{ "maxWidth": "100%", "maxHeight": "92px", "objectFit": "contain", "display": "block" }} />
        </div>
      
))}
    </div>
  </section>

  <section id="sustainability" style={{ "background": "#F1F4EE", "marginTop": "96px", "padding": "92px 0" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px" }}>
      <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))", "gap": "48px", "alignItems": "end", "marginBottom": "52px" }}>
        <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 46px)", "lineHeight": "1.05", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0" }}>Making apparel with a more responsible approach</h2>
        <p style={{ "fontSize": "16px", "lineHeight": "1.65", "color": "#4A4E48", "margin": "0", "maxWidth": "440px", "textWrap": "pretty" }}>A steady direction rather than a claim: better materials, less waste, safer workplaces, reviewed order by order.</p>
      </div>
      <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(280px, 1fr))", "gap": "22px", "marginBottom": "40px" }}>
        <div style={{ "height": "300px", "position": "relative", "minWidth": "0", "overflow": "hidden" }}>
          <img src="/assets/e11a0eec-032f-41fd-830b-b8d83cc39f7f.webp" alt="Organic cotton / raw material" style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
        </div>
        <div style={{ "height": "300px", "position": "relative", "minWidth": "0", "overflow": "hidden" }}>
          <img src="/assets/37390a98-6dd0-4c7a-88c0-b3fa2387ed02.webp" alt="Natural fabric texture" style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
        </div>
        <div style={{ "display": "grid", "gap": "0", "alignContent": "start", "borderTop": "1px solid #CBD5C4" }}>
          {sustain.map((su, idx) => (

            <div key={idx} style={{ "padding": "15px 0", "borderBottom": "1px solid #CBD5C4", "fontSize": "16px", "letterSpacing": "0.01em", "display": "flex", "alignItems": "center", "gap": "14px" }}>
              <span style={{ "width": "7px", "height": "7px", "background": "#1E5B34", "display": "inline-block", "flexShrink": "0" }}></span>
              {su}
            </div>
          
))}
        </div>
      </div>
      <a data-reveal="1" href="#quote" style={{ "border": "1px solid #1E5B34", "color": "#1E5B34", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 28px", "display": "inline-block", "transition": "background 0.25s ease, color 0.25s ease" }}>Our Approach to Sustainability</a>
    </div>
  </section>

  <section style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "96px 28px 0" }}>
    <div data-reveal="1" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))", "gap": "56px", "alignItems": "start" }}>
      <div>
        <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(30px, 3.4vw, 46px)", "lineHeight": "1.05", "letterSpacing": "-0.02em", "textTransform": "uppercase", "margin": "0 0 22px" }}>Trusted by global apparel buyers</h2>
        <p style={{ "fontSize": "17px", "lineHeight": "1.65", "color": "#4A4E48", "margin": "0", "maxWidth": "520px", "textWrap": "pretty" }}>Active in the apparel industry since 2019, Prasine International operates as both a buying house and a garment manufacturing partner, handling roughly US$20M in annual turnover with a team of 35 across sourcing, merchandising and quality.</p>
      </div>
      <div style={{ "borderTop": "1px solid #1B1D1A" }}>
        {credibility.map((c, idx) => (

          <div key={idx} style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "baseline", "gap": "24px", "padding": "18px 0", "borderBottom": "1px solid #E7E4DC" }}>
            <span style={{ "fontSize": "15px", "color": "#4A4E48" }}>{c.l}</span>
            <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "15px", "fontWeight": "600", "letterSpacing": "0.02em", "textTransform": "uppercase", "textAlign": "right" }}>{c.v}</span>
          </div>
        
))}
        <p style={{ "fontSize": "13px", "lineHeight": "1.6", "color": "#8A8E86", "margin": "20px 0 0" }}>Buyer references and factory certification documents are shared directly on request.</p>
      </div>
    </div>
  </section>

  <section id="quote" style={{ "background": "#1B1D1A", "color": "#F2F0E9", "marginTop": "96px", "padding": "92px 0", "position": "relative", "overflow": "hidden" }}>
    <div aria-hidden="true" style={{ "position": "absolute", "top": "-60px", "right": "-60px", "display": "grid", "gridTemplateColumns": "repeat(2, 150px)", "gridTemplateRows": "repeat(2, 150px)", "gap": "22px", "pointerEvents": "none" }}><div style={{ "background": "rgba(126,191,77,0.05)", "borderRadius": "6px" }}></div><div style={{ "background": "rgba(126,191,77,0.03)", "borderRadius": "6px" }}></div><div style={{ "background": "rgba(126,191,77,0.03)", "borderRadius": "6px" }}></div><div style={{ "background": "rgba(184,134,59,0.05)", "borderRadius": "6px" }}></div></div>
    <div style={{ "position": "relative", "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px", "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(320px, 1fr))", "gap": "60px", "alignItems": "start" }}>
      <div data-reveal="1">
        <h2 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontWeight": "600", "fontSize": "clamp(34px, 4vw, 56px)", "lineHeight": "1.02", "letterSpacing": "-0.025em", "textTransform": "uppercase", "margin": "0 0 24px" }}>Ready to develop your next product?</h2>
        <p style={{ "fontSize": "17px", "lineHeight": "1.65", "color": "#A9ADA4", "maxWidth": "460px", "margin": "0 0 36px", "textWrap": "pretty" }}>Tell us what you're looking to manufacture and our team will get back to you.</p>
        <div style={{ "borderTop": "1px solid #34372F", "paddingTop": "26px", "display": "grid", "gap": "14px", "maxWidth": "460px" }}>
          <div style={{ "display": "flex", "gap": "16px", "fontSize": "15px", "color": "#D7D4CB" }}><span style={{ "color": "#7F8379", "minWidth": "74px", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase" }}>Email</span><a href="mailto:shameem@prasineint.com" style={{ "color": "#D7D4CB" }}>shameem@prasineint.com</a></div>
          <div style={{ "display": "flex", "gap": "16px", "fontSize": "15px", "color": "#D7D4CB" }}><span style={{ "color": "#7F8379", "minWidth": "74px", "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase" }}>WhatsApp</span><a href="tel:+8801707691256" style={{ "color": "#D7D4CB" }}>+8801707-691256</a></div>
        </div>
      </div>

      <div data-reveal="1" style={{ "background": "#FBFAF7", "color": "#1B1D1A", "padding": "38px 34px 34px" }}>
        {submitted ? (
          <div style={{ "padding": "40px 0", "textAlign": "left" }}>
            <div style={{ "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "width": "54px", "height": "54px", "borderRadius": "50%", "background": "#E8F4EC", "color": "#1E5B34", "marginBottom": "18px" }}>
              <svg style={{ "width": "28px", "height": "28px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" style={{ "animation": "checkmark-draw 0.6s ease-in-out forwards" }} />
              </svg>
            </div>
            <div style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "24px", "fontWeight": "600", "textTransform": "uppercase", "letterSpacing": "-0.01em", "marginBottom": "14px" }}>Thank you — enquiry received</div>
            <p style={{ "fontSize": "15px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "0" }}>Our sourcing team will reply to your business email shortly.</p>
          </div>
        ) : (
      
          <div>
            <h3 style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "22px", "fontWeight": "600", "letterSpacing": "0.01em", "textTransform": "uppercase", "margin": "0 0 28px" }}>Request a Quote</h3>

            <div style={{ "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "color": "#6B6F68", "marginBottom": "12px" }}>What are you looking to manufacture?</div>
            <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "8px", "marginBottom": "26px" }}>
              {categoryChips.map((ch, idx) => (

                <button key={idx} type="button" className="prasine-chip" onClick={ch.toggle} style={ch.style}>{ch.label}</button>
              
))}
            </div>

            <div style={{ "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "color": "#6B6F68", "marginBottom": "12px" }}>Estimated order quantity</div>
            <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "8px", "marginBottom": "26px" }}>
              {qtyChips.map((q, idx) => (

                <button key={idx} type="button" className="prasine-chip" onClick={q.select} style={q.style}>{q.label}</button>
              
))}
            </div>

            <div style={{ "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "color": "#6B6F68", "marginBottom": "10px" }}>Tell us about your requirement</div>
            <textarea rows={4} placeholder="Product type, fabric, target price, quantity, delivery window…" style={{ "width": "100%", "border": "1px solid #DCD8CE", "background": "#FFFFFF", "padding": "13px 14px", "fontSize": "15px", "color": "#1B1D1A", "resize": "vertical", "marginBottom": "22px", "outline": "none" }}></textarea>

            <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(180px, 1fr))", "gap": "12px", "marginBottom": "26px" }}>
              <input placeholder="Name" style={{ "border": "1px solid #DCD8CE", "background": "#FFFFFF", "padding": "13px 14px", "fontSize": "15px", "outline": "none" }} />
              <input placeholder="Company" style={{ "border": "1px solid #DCD8CE", "background": "#FFFFFF", "padding": "13px 14px", "fontSize": "15px", "outline": "none" }} />
              <input placeholder="Business email" style={{ "border": "1px solid #DCD8CE", "background": "#FFFFFF", "padding": "13px 14px", "fontSize": "15px", "outline": "none" }} />
              <input placeholder="Phone / WhatsApp" style={{ "border": "1px solid #DCD8CE", "background": "#FFFFFF", "padding": "13px 14px", "fontSize": "15px", "outline": "none" }} />
              <input placeholder="Country" style={{ "border": "1px solid #DCD8CE", "background": "#FFFFFF", "padding": "13px 14px", "fontSize": "15px", "outline": "none", "gridColumn": "1 / -1" }} />
            </div>

            <div style={{ "display": "flex", "gap": "14px", "flexWrap": "wrap", "alignItems": "center" }}>
              <button type="button" onClick={submit} className="prasine-btn" style={{ "background": "#1E5B34", "color": "#FBFAF7", "border": "none", "fontSize": "13px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "17px 32px", "cursor": "pointer", "transition": "background 0.25s ease" }}>Request a Quote</button>
              <a href="mailto:shameem@prasineint.com" style={{ "fontSize": "12px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "color": "#1B1D1A", "borderBottom": "1px solid #C9C5BA", "paddingBottom": "3px" }}>Talk to Our Team</a>
            </div>
          </div>
        
    )}
      </div>
    </div>
  </section>

  <footer style={{ "background": "#FBFAF7", "padding": "72px 0 40px" }}>
    <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px" }}>
      <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(240px, 1fr))", "gap": "48px", "paddingBottom": "48px", "borderBottom": "1px solid #E7E4DC" }}>
        <div>
          <img src="/assets/844fc14a-38b8-4ea1-98d4-6e6b4a2fb083.png" alt="Prasine International Ltd." style={{ "height": "74px", "width": "auto", "display": "block", "mixBlendMode": "multiply", "marginBottom": "18px" }} />
          <p style={{ "fontSize": "14px", "lineHeight": "1.6", "color": "#6B6F68", "margin": "0", "maxWidth": "260px" }}>Apparel buying house and garment manufacturing partner, active in the industry since 2019.</p>
        </div>
        <div>
          <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "18px" }}>Navigate</div>
          <div style={{ "display": "grid", "gap": "11px" }}>
            <a href="#top" style={{ "fontSize": "15px", "color": "#1B1D1A" }}>Home</a>
            <a href="#about" style={{ "fontSize": "15px", "color": "#1B1D1A" }}>About Us</a>
            <a href="#capabilities" style={{ "fontSize": "15px", "color": "#1B1D1A" }}>Our Services</a>
            <a href="#products" style={{ "fontSize": "15px", "color": "#1B1D1A" }}>Production Gallery</a>
            <a href="#quality" style={{ "fontSize": "15px", "color": "#1B1D1A" }}>Quality and Compliance</a>
            <a href="#quote" style={{ "fontSize": "15px", "color": "#1B1D1A" }}>Request a Quote</a>
          </div>
        </div>
        <div>
          <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "18px" }}>Offices</div>
          <p style={{ "fontSize": "15px", "lineHeight": "1.65", "color": "#4A4E48", "margin": "0 0 16px" }}><span style={{ "display": "block", "fontSize": "12px", "letterSpacing": "0.1em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "4px" }}>Corporate</span>House #13, 3rd Floor, Road #17/A,<br />Sector #12, Uttara,<br />Dhaka-1230, Bangladesh</p>
          <p style={{ "fontSize": "15px", "lineHeight": "1.65", "color": "#4A4E48", "margin": "0" }}><span style={{ "display": "block", "fontSize": "12px", "letterSpacing": "0.1em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "4px" }}>Chittagong</span>House #53, 5th Floor, Road #05,<br />O/R Nizam Road,<br />Chattogram-4212, Bangladesh</p>
        </div>
        <div>
          <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "18px" }}>Contact</div>
          <div style={{ "display": "grid", "gap": "11px" }}>
            <a href="mailto:shameem@prasineint.com" style={{ "fontSize": "15px" }}>shameem@prasineint.com</a>
            <a href="tel:+8801707691256" style={{ "fontSize": "15px" }}>+8801707-691256</a>
            <span style={{ "fontSize": "13px", "color": "#8A8E86" }}>Phone / WhatsApp</span>
          </div>
        </div>
      </div>
      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "24px", "flexWrap": "wrap", "paddingTop": "26px" }}>
        <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "12px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#1B1D1A" }}>Prasine International Ltd.</span>
        <span style={{ "display": "flex", "alignItems": "center", "gap": "12px", "fontSize": "12px", "letterSpacing": "0.24em", "textTransform": "uppercase", "color": "#B8863B" }}><span style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 6px)", "gridTemplateRows": "repeat(2, 6px)", "gap": "2px" }}><span style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></span><span style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></span><span style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></span><span style={{ "background": "#B8863B", "borderRadius": "1px" }}></span></span>Fashioning You</span>
      </div>
    </div>
  </footer>

  <div data-mobile-cta="1" style={{ "position": "fixed", "left": "0", "right": "0", "bottom": "0", "zIndex": "60", "background": "rgba(251,250,247,0.96)", "backdropFilter": "blur(10px)", "borderTop": "1px solid #E7E4DC", "padding": "12px 16px", "display": "flex", "gap": "12px" }}>
      <a href="#quote" style={{ "flex": "1", "textAlign": "center", "background": "#1E5B34", "color": "#FBFAF7", "fontSize": "13px", "letterSpacing": "0.12em", "textTransform": "uppercase", "fontWeight": "600", "padding": "16px 18px" }}>Request a Quote</a>
  </div>
  <div data-mobile-cta="1" style={{ "height": "76px" }}></div>

</div>


  );
}
