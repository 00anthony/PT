import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/site-config";

export const alt = `${siteConfig.name} — Roofing & Renovations in Greater Austin`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card, generated at build time — no static og-image file to keep in sync.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1f1d1a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 6, color: "#ccb78a" }}>
          <div style={{ width: 12, height: 12, background: "#ccb78a" }} />
          ROOFING &amp; RENOVATIONS · GREATER AUSTIN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "rgba(255,255,255,0.8)" }}>
            Roof repair &amp; replacement · Free roof inspections
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
          <span>{siteConfig.phone}</span>
          <span>ptroofingandrenovations.com</span>
        </div>
      </div>
    ),
    size
  );
}
