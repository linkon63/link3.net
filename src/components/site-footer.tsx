"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";


export default function SiteFooter() {
  const pathname = usePathname();


  const itemHref = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;

  return (
    <footer style={{ "background": "#FBFAF7", "padding": "76px 0 36px", "borderTop": "1px solid #E7E4DC" }}>
      <div style={{ "maxWidth": "1320px", "margin": "0 auto", "padding": "0 28px" }}>
        <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(240px, 1fr))", "gap": "48px", "paddingBottom": "48px", "borderBottom": "1px solid #E7E4DC" }}>
          <div>
            <img src="/assets/844fc14a-38b8-4ea1-98d4-6e6b4a2fb083.png" alt="Prasine International Ltd." style={{ "height": "74px", "width": "auto", "display": "block", "mixBlendMode": "multiply", "marginBottom": "18px" }} />
            <p style={{ "fontSize": "14px", "lineHeight": "1.6", "color": "#6B6F68", "margin": "0", "maxWidth": "260px" }}>Apparel buying house and garment manufacturing partner, active in the industry since 2019.</p>
          </div>

          <div>
            <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "18px", "fontWeight": "600" }}>Navigate</div>
            <div style={{ "display": "grid", "gap": "12px" }}>
              <a href={itemHref("/#top")} className="footer-link">
                <ChevronRight className="footer-link-icon" />
                <span>Home</span>
              </a>
              <a href={itemHref("/#about")} className="footer-link">
                <ChevronRight className="footer-link-icon" />
                <span>About Us</span>
              </a>
              <a href={itemHref("/#capabilities")} className="footer-link">
                <ChevronRight className="footer-link-icon" />
                <span>Our Services</span>
              </a>
              <a href={itemHref("/#products")} className="footer-link">
                <ChevronRight className="footer-link-icon" />
                <span>Production Gallery</span>
              </a>
              <a href={itemHref("/#quality")} className="footer-link">
                <ChevronRight className="footer-link-icon" />
                <span>Quality and Compliance</span>
              </a>
              <a href={itemHref("/#quote")} className="footer-link">
                <ChevronRight className="footer-link-icon" />
                <span>Request a Quote</span>
              </a>
            </div>
          </div>

          <div>
            <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "18px", "fontWeight": "600" }}>Offices</div>
            <div style={{ "display": "grid", "gap": "18px" }}>
              <div style={{ "display": "flex", "gap": "10px", "alignItems": "flex-start" }}>
                <MapPin style={{ "width": "18px", "height": "18px", "color": "#1E5B34", "flexShrink": 0, "marginTop": "2px" }} />
                <p style={{ "fontSize": "14px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "0" }}>
                  <span style={{ "display": "block", "fontSize": "11px", "letterSpacing": "0.12em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "4px", "fontWeight": "600" }}>Corporate</span>
                  Plot No. 14, Road No. 13,<br />Sector No. 04, Uttara Model Town,<br />Dhaka-1230, Bangladesh
                </p>
              </div>
              <div style={{ "display": "flex", "gap": "10px", "alignItems": "flex-start" }}>
                <MapPin style={{ "width": "18px", "height": "18px", "color": "#1E5B34", "flexShrink": 0, "marginTop": "2px" }} />
                <p style={{ "fontSize": "14px", "lineHeight": "1.6", "color": "#4A4E48", "margin": "0" }}>
                  <span style={{ "display": "block", "fontSize": "11px", "letterSpacing": "0.12em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "4px", "fontWeight": "600" }}>Chittagong</span>
                  House #53, 5th Floor, Road #05,<br />O/R Nizam Road,<br />Chattogram-4212, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <div>
            <div style={{ "fontSize": "11px", "letterSpacing": "0.2em", "textTransform": "uppercase", "color": "#8A8E86", "marginBottom": "18px", "fontWeight": "600" }}>Contact</div>
            <div style={{ "display": "grid", "gap": "14px" }}>
              <a href="mailto:shameem@prasineint.com" className="footer-link">
                <Mail style={{ "width": "16px", "height": "16px", "color": "#1E5B34", "flexShrink": 0 }} />
                <span>shameem@prasineint.com</span>
              </a>
              <a href="tel:+8801707691256" className="footer-link">
                <Phone style={{ "width": "16px", "height": "16px", "color": "#1E5B34", "flexShrink": 0 }} />
                <span>+8801707-691256</span>
              </a>
              <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "fontSize": "13px", "color": "#8A8E86" }}>
                <MessageSquare style={{ "width": "14px", "height": "14px", "color": "#7FBF4D" }} />
                <span>Phone / WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Brand Row */}
        <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "24px", "flexWrap": "wrap", "padding": "24px 0 20px" }}>
          <span style={{ "fontFamily": "'Archivo', Helvetica, sans-serif", "fontSize": "12px", "letterSpacing": "0.18em", "textTransform": "uppercase", "color": "#1B1D1A", "fontWeight": "600" }}>
            Prasine International Ltd.
          </span>
          <span style={{ "display": "flex", "alignItems": "center", "gap": "12px", "fontSize": "12px", "letterSpacing": "0.24em", "textTransform": "uppercase", "color": "#B8863B" }}>
            <span style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 6px)", "gridTemplateRows": "repeat(2, 6px)", "gap": "2px" }}>
              <span style={{ "background": "#3E8E4A", "borderRadius": "1px" }}></span>
              <span style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></span>
              <span style={{ "background": "#7FBF4D", "borderRadius": "1px" }}></span>
              <span style={{ "background": "#B8863B", "borderRadius": "1px" }}></span>
            </span>
            Fashioning You
          </span>
        </div>

        {/* Bottom Copyright Section */}
        <div style={{ "borderTop": "1px solid #E7E4DC", "paddingTop": "22px", "textAlign": "center" }}>
          <p style={{ "fontSize": "13px", "color": "#767A73", "margin": "0" }}>
            © {new Date().getFullYear()} Prasine International Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}