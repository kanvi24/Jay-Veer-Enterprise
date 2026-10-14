import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Box,
  Home,
  Factory,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Layers
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import CTA from "../components/CTA";
import { companyData } from "../data/companyData";
import { productsData } from "../data/productsData";

export default function ApplicationsPage({ onOpenQuoteModal }) {
  useEffect(() => {
    document.title = "Industrial Applications | Jay Veer Enterprise - Plastic Granules";
  }, []);

  const getAppIcon = (iconName) => {
    switch (iconName) {
      case "Package":
        return <Package size={30} />;
      case "Box":
        return <Box size={30} />;
      case "Home":
        return <Home size={30} />;
      case "Factory":
        return <Factory size={30} />;
      case "Cpu":
        return <Cpu size={30} />;
      default:
        return <Layers size={30} />;
    }
  };

  const suitabilityData = [
    {
      app: "Blown Films & Carry Bags",
      filler: "High (Cost Reduction)",
      ld: "Excellent (Base Polymer)",
      repro: "Medium (Garbage Sacks)",
      masterbatch: "High (Color Tint)",
      custom: "Brand Hues"
    },
    {
      app: "Injection Molded Household Items",
      filler: "High (Stiffness)",
      ld: "Medium (Flexibility)",
      repro: "High (Buckets/Crates)",
      masterbatch: "Excellent (Bright Colors)",
      custom: "Target Shades"
    },
    {
      app: "Woven Sacks & Raffia Tapes",
      filler: "Excellent (CaCO3 Loading)",
      ld: "Low",
      repro: "Medium",
      masterbatch: "High (White/Color)",
      custom: "Brand Bags"
    },
    {
      app: "Blow Molded Bottles & Containers",
      filler: "Medium",
      ld: "High (Squeeze Bottles)",
      repro: "Non-Food Drums",
      masterbatch: "High (High Opacity)",
      custom: "Cosmetic Colors"
    },
    {
      app: "Industrial Pipes & Conduits",
      filler: "High",
      ld: "Low",
      repro: "Excellent (Agricultural/Drainage)",
      masterbatch: "Black Masterbatch",
      custom: "Industrial Coding"
    }
  ];

  return (
    <div className="applications-page">
      {/* Banner */}
      <section
        className="applications-page-banner"
        style={{
          background: "linear-gradient(135deg, #091a33 0%, #0c2340 100%)",
          color: "#ffffff",
          padding: "4rem 0 3.5rem"
        }}
      >
        <div className="container">
          <div className="badge-tag badge-orange" style={{ marginBottom: "1rem" }}>
            Conversion Technologies & Use Cases
          </div>
          <h1 style={{ fontSize: "2.75rem", color: "#ffffff", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Industrial <span style={{ color: "var(--color-orange)" }}>Applications</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.5" }}>
            Tailored plastic raw materials and granules engineered to meet the structural, thermal, and aesthetic requirements of diverse conversion sectors.
          </p>
        </div>
      </section>

      {/* 5 Core Application Categories */}
      <section className="section-py bg-light-alt">
        <div className="container" style={{ maxWidth: "1600px" }}>
          <SectionTitle
            tagline="Sector Breakdown"
            title="Where Jay Veer Polymers Are Deployed"
            description="Our versatile product lineup provides processors with balanced melt viscosity, cost-saving mineral loading, and bright color consistency."
            centered
          />

          <div className="applications-five-grid">
            {companyData.applications.map((app) => (
              <div key={app.id} className="applications-five-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-orange-subtle)",
                      color: "var(--color-orange)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {getAppIcon(app.icon)}
                  </div>
                  <span className="badge-tag badge-blue" style={{ fontSize: "0.65rem", padding: "0.25rem 0.5rem", textAlign: "right", lineHeight: "1.2" }}>
                    {app.category}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.15rem", color: "var(--color-text-blue)", marginBottom: "0.65rem", lineHeight: 1.25, fontWeight: 700 }}>
                  {app.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "1.25rem", flexGrow: 1 }}>
                  {app.desc}
                </p>

                <div
                  style={{
                    background: "var(--color-bg-light)",
                    padding: "0.85rem",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "3px solid var(--color-primary)",
                    marginBottom: 0
                  }}
                >
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
                    Recommended Granule Types:
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-blue)", lineHeight: "1.35" }}>
                    {app.recommendedMaterials.join(" • ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitability Matrix Table */}
      <section className="section-py">
        <div className="container">
          <SectionTitle
            tagline="Technical Guidance"
            title="Granule Compatibility & Suitability Matrix"
            description="Quick reference table for polymer selection based on manufacturing application and performance targets."
            centered
          />

          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "var(--color-primary)", color: "#ffffff" }}>
                    <th style={{ padding: "1.25rem 1.5rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Application Sector</th>
                    <th style={{ padding: "1.25rem 1rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Filler Granules</th>
                    <th style={{ padding: "1.25rem 1rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>LD Granules</th>
                    <th style={{ padding: "1.25rem 1rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Reprocessed</th>
                    <th style={{ padding: "1.25rem 1rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Color Masterbatch</th>
                    <th style={{ padding: "1.25rem 1.5rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Custom Colors</th>
                  </tr>
                </thead>
                <tbody>
                  {suitabilityData.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "var(--color-bg-light)",
                        borderBottom: "1px solid var(--color-border)"
                      }}
                    >
                      <td style={{ padding: "1.2rem 1.5rem", fontWeight: 700, color: "var(--color-text-blue)" }}>
                        {row.app}
                      </td>
                      <td style={{ padding: "1.2rem 1rem", color: "var(--color-text-main)" }}>{row.filler}</td>
                      <td style={{ padding: "1.2rem 1rem", color: "var(--color-text-main)" }}>{row.ld}</td>
                      <td style={{ padding: "1.2rem 1rem", color: "var(--color-text-main)" }}>{row.repro}</td>
                      <td style={{ padding: "1.2rem 1rem", color: "var(--color-text-main)" }}>{row.masterbatch}</td>
                      <td style={{ padding: "1.2rem 1.5rem", color: "var(--color-orange)", fontWeight: 600 }}>{row.custom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
}
