import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facilitySlugs, getFacility } from "@/lib/facilities";

export function generateStaticParams() {
  return facilitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const facility = getFacility(slug);
  if (!facility) return { title: "Prasine International" };
  return {
    title: `${facility.title} | Prasine International`,
    description: facility.lead,
  };
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = getFacility(slug);

  if (!facility) notFound();

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
              <div style={{ background: "#3E8E4A", borderRadius: "1px" }} />
              <div style={{ background: "#7FBF4D", borderRadius: "1px" }} />
              <div style={{ background: "#7FBF4D", borderRadius: "1px" }} />
              <div style={{ background: "#3E8E4A", borderRadius: "1px" }} />
            </div>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B8863B",
                fontWeight: "600",
              }}
            >
              {facility.eyebrow}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Archivo', Helvetica, sans-serif",
              fontWeight: "600",
              fontSize: "clamp(34px, 4.4vw, 60px)",
              lineHeight: "1.04",
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              margin: "0 0 24px",
              maxWidth: "18ch",
            }}
          >
            {facility.title}
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.62",
              color: "#4A4E48",
              margin: "0",
              maxWidth: "520px",
              textWrap: "pretty",
            }}
          >
            {facility.lead}
          </p>
        </div>
      </section>

      {/* Bottom padding mirrors the 88px top padding so the last row of square
          mounts clears the footer's border-top instead of abutting it. */}
      <section id="gallery" style={{ maxWidth: "1320px", margin: "0 auto", padding: "88px 28px 88px" }}>
        <div className="fac-gallery-head">
          <h2 className="fac-gallery-title">
            {facility.galleryTitle ?? "Where the order gets made"}
          </h2>
          <span className="fac-gallery-count">
            01 — {String(facility.gallery.length).padStart(2, "0")}
          </span>
        </div>

        <div className="fac-gallery-grid">
          {facility.gallery.map((img, i) => (
            <figure key={`${img.src}-${i}`} className="fac-gallery-item">
              <div className="fac-gallery-frame">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              {img.caption && (
                <figcaption className="fac-gallery-caption">{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      </>
  );
}
