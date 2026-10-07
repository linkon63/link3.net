"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { facilities } from "@/lib/facilities";

const NAV = [
  { href: "/", id: "top", label: "Home" },
  { href: "/#who-we-are", id: "about", label: "About" },
  { href: "/management", id: "management", label: "Management" },
  { href: "/#capabilities", id: "capabilities", label: "Services" },
  {
    href: "/production-facilities/woven",
    id: "facilities",
    label: "Production Facilities",
    children: facilities,
  },
  { href: "/#products", id: "products", label: "Production Gallery" },
  { href: "/#quality", id: "quality", label: "Quality and Compliance" },
];

const SPY_SECTIONS = [
  { id: "top", nav: "top" },
  { id: "who-we-are", nav: "about" },
  { id: "capabilities", nav: "capilities" },
  { id: "products", nav: "products" },
  { id: "quality", nav: "quality" },
  { id: "about", nav: "about" },
  { id: "certifications", nav: "quality" },
  { id: "sustainability", nav: "quality" },
  { id: "quote", nav: "quote" },
];

type NavAnchorProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">;

function NavAnchor({ href, className, children, ...rest }: NavAnchorProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

const noopSubscribe = () => () => {};

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState("");
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const itemHref = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      if (pathname !== "/") {
        setActive(
          pathname.startsWith("/production-facilities")
            ? "facilities"
            : pathname === "/management"
              ? "management"
              : "",
        );
        return;
      }
      const scrollPos = window.scrollY + 180;
      for (let i = SPY_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SPY_SECTIONS[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActive(SPY_SECTIONS[i].nav);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const close = useCallback(() => setDrawerOpen(false), []);
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, close]);

  useEffect(() => {
    if (drawerOpen) {
      closeRef.current?.focus();
    }
  }, [drawerOpen]);

  const closeAndRestoreFocus = useCallback(() => {
    setDrawerOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <header
      data-site-header="1"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(251,250,247,0.96)" : "rgba(251,250,247,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #DCD8CE" : "1px solid #E7E4DC",
        boxShadow: scrolled ? "0 8px 30px rgba(27, 29, 26, 0.08)" : "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: scrolled ? "10px 28px" : "16px 28px",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          justifyContent: "space-between",
          transition: "padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <NavAnchor href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/assets/844fc14a-38b8-4ea1-98d4-6e6b4a2fb083.png"
            alt="Prasine International Ltd."
            style={{
              height: scrolled ? "46px" : "54px",
              width: "auto",
              display: "block",
              mixBlendMode: "multiply",
              transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </NavAnchor>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <div data-desktop-nav="1" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {NAV.map((item) => (
              <div key={item.id} className="nav-submenu-wrap">
                {item.children ? (
                  <>
                    <Link
                      href={item.href}
                      className={`navbar-link ${active === item.id ? "active" : ""}`}
                      id={`nav-${item.id}`}
                    >
                      {item.label}
                      <span className="navbar-caret" aria-hidden="true" />
                      <span className="navbar-indicator" style={{ width: active === item.id ? "100%" : "0%" }} />
                    </Link>
                    <div className="nav-submenu" aria-labelledby={`nav-${item.id}`}>
                      <span className="nav-submenu-label">Production Facilities</span>
                      {item.children.map((child) => {
                        const childPath = `/production-facilities/${child.slug}`;
                        const isCurrent = pathname === childPath;
                        return (
                          <Link
                            key={child.slug}
                            href={childPath}
                            className={`nav-submenu-link ${isCurrent ? "current" : ""}`}
                            aria-current={isCurrent ? "page" : undefined}
                          >
                            {child.nav}
                            <span className="nav-submenu-arrow" aria-hidden="true">
                              ›
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <NavAnchor
                    href={itemHref(item.href)}
                    className={`navbar-link ${active === item.id ? "active" : ""}`}
                  >
                    {item.label}
                    <span className="navbar-indicator" style={{ width: active === item.id ? "100%" : "0%" }} />
                  </NavAnchor>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            ref={toggleRef}
            data-nav-toggle="1"
            className="nav-hamburger"
            aria-label="Menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span className={`nav-hamburger-bars ${drawerOpen ? "open" : ""}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>

          <div data-header-cta="1">
            <NavAnchor
              href={itemHref("/#quote")}
              className="prasine-btn"
              style={{
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: "600",
                padding: scrolled ? "11px 20px" : "13px 22px",
                display: "inline-block",
              }}
            >
              Request a Quote
            </NavAnchor>
          </div>
        </nav>
      </div>


      {mounted &&
        createPortal(
          <div
            id="mobile-nav-drawer"
            data-nav-drawer="1"
            className={`nav-drawer ${drawerOpen ? "open" : ""}`}
            aria-hidden={!drawerOpen}
          >
            <button
              type="button"
              className="nav-drawer-scrim"
              aria-label="Close menu"
              onClick={closeAndRestoreFocus}
            />

            <div className="nav-drawer-panel" role="dialog" aria-label="Site menu">
              <div className="nav-drawer-top">
                <span className="nav-drawer-label">Menu</span>
                <button
                  type="button"
                  ref={closeRef}
                  className="nav-drawer-close"
                  aria-label="Close menu"
                  onClick={closeAndRestoreFocus}
                >
                  <span className="nav-hamburger-bars open" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </button>
              </div>

              <div className="nav-drawer-inner">
                {NAV.map((item) => (
                  <div key={item.id} className="nav-drawer-group">
                    <NavAnchor
                      href={itemHref(item.href)}
                      className="nav-drawer-link"
                      onClick={closeAndRestoreFocus}
                    >
                      {item.label}
                    </NavAnchor>
                    {item.children && (
                      <div className="nav-drawer-sub">
                        {item.children.map((child) => {
                          const childPath = `/production-facilities/${child.slug}`;
                          return (
                            <Link
                              key={child.slug}
                              href={childPath}
                              className={`nav-drawer-sublink ${pathname === childPath ? "current" : ""}`}
                              aria-current={pathname === childPath ? "page" : undefined}
                              onClick={closeAndRestoreFocus}
                            >
                              {child.nav}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="nav-drawer-cta">
                <NavAnchor
                  href={itemHref("/#quote")}
                  className="prasine-btn"
                  onClick={closeAndRestoreFocus}
                >
                  Request a Quote
                </NavAnchor>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
