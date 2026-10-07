import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Management | Prasine International",
  description:
    "The management team at Prasine International Ltd — Managing Director and Directors of a Bangladeshi apparel buying house and garment manufacturing partner.",
};

type Member = {
  name: string;
  title: string;
  phones: string[];
  email: string;
  photo: string;
  /** Shifts the crop window down past each photo's headroom. */
  position: string;
  width: number;
  height: number;
};

const management: Member[] = [
  {
    name: "Md. Nuruzzaman Sarker Shameem",
    title: "Managing Director & Business Head",
    phones: ["+880 1707-691 256", "+880 1907-691 256"],
    email: "shamem@prasineint.com",
    photo: "/images/management/nuruzzaman-sarker-shameem.webp",
    position: "center 5%",
    width: 1086,
    height: 1448,
  },
  {
    name: "Md. Nazrul Islam",
    title: "Director",
    phones: ["+880 1712-414 457"],
    email: "nazrul@prasineint.com",
    photo: "/images/management/nazrul-islam.webp",
    position: "center 16%",
    width: 1100,
    height: 1430,
  },
  {
    name: "Md. Nazmul Haque",
    title: "Director",
    phones: ["+880 1934-901 088"],
    email: "nazmul@prasineint.com",
    photo: "/images/management/nazmul-haque.webp",
    position: "center 16%",
    width: 1099,
    height: 1431,
  },
];

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

function Contact({ m }: { m: Member }) {
  return (
    <ul className="mgmnt-contact">
      {m.phones.map((p) => (
        <li key={p}>
          <a className="mgmnt-contact-link" href={telHref(p)}>
            {p}
          </a>
        </li>
      ))}
      <li>
        <a className="mgmnt-contact-link" href={`mailto:${m.email}`}>
          {m.email}
        </a>
      </li>
    </ul>
  );
}

export default function ManagementPage() {
  return (
    <>
      <section
        id="top"
        style={{ background: "linear-gradient(165deg, #FDF6EC 0%, #FBFAF7 46%, #F4F6F1 100%)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "88px 28px 96px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 7px)",
                gridTemplateRows: "repeat(2, 7px)",
                gap: "3px",
                flexShrink: 0,
              }}
            >
              <div style={{ background: "#3E8E4A" }} />
              <div style={{ background: "#7FBF4D" }} />
              <div style={{ background: "#7FBF4D" }} />
              <div style={{ background: "#3E8E4A" }} />
            </div>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B8863B",
                fontWeight: 600,
              }}
            >
              Our Management
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Archivo', Helvetica, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(34px, 4.4vw, 60px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              margin: "0 0 24px",
              maxWidth: "18ch",
            }}
          >
            The people behind the order
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.62,
              color: "#4A4E48",
              margin: 0,
              maxWidth: "520px",
              textWrap: "pretty",
            }}
          >
            Development, production and quality sit in the same building, so a problem is raised early rather than at inspection. Reach the team directly below.
          </p>
        </div>
      </section>

      {/* Bottom padding mirrors the 96px top padding: the card grid and the
          closing CTA row must not run into the footer's border-top, and the
          footer's own 76px top padding sits below this. */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "96px 28px 96px" }}>
        <div className="mgmnt-grid">
          {management.map((m, i) => (
            <article key={m.email} className="mgmnt-card">
              <div className="mgmnt-photo">
                <img
                  src={m.photo}
                  alt={m.name}
                  width={m.width}
                  height={m.height}
                  style={{ objectPosition: m.position }}
                />
              </div>

              <div className="mgmnt-body">
                <span className="mgmnt-index">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mgmnt-name">{m.name}</h2>
                <p className="mgmnt-title">{m.title}</p>
                <Contact m={m} />
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "56px" }}>
          <Link href="/#quote" className="prasine-btn" style={{ padding: "16px 26px" }}>
            Request a Quote
          </Link>
          <Link href="/production-facilities/woven" className="prasine-btn-outline" style={{ padding: "16px 26px" }}>
            Production Facilities
          </Link>
        </div>
      </section>

      </>
  );
}