import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasine International | Apparel Sourcing & Manufacturing · Bangladesh",
  description: "Prasine International operates as both an apparel buying house and garment manufacturing partner in Bangladesh, handling roughly US$20M in annual turnover.",
  icons: {
    icon: "/assets/844fc14a-38b8-4ea1-98d4-6e6b4a2fb083.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body style={{ margin: 0, padding: 0, background: "#FBFAF7", color: "#1B1D1A" }}>
        {children}
      </body>
    </html>
  );
}
