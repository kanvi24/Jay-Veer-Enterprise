import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Package,
  Truck,
  ArrowRight,
  TestTube,
  FileCheck2,
  Info
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import CTA from "../components/CTA";

export default function QualityPage({ onOpenQuoteModal }) {
  useEffect(() => {
    document.title = "Quality Assurance & Standards | Jay Veer Enterprise";
  }, []);

  return (
    <div className="quality-page">
      {/* Banner */}
      <section
        className="quality-page-banner subpage-banner"
        style={{
          color: "#ffffff",
          padding: "4rem 0 3.5rem"
        }}
      >
        <div className="container">
          <div
            className="badge-tag badge-orange"
            style={{
              marginBottom: "1rem",
              background: "transparent",
              border: "none",
              padding: 0
            }}
          >
            Quality Management System
          </div>
          <h1 style={{ fontSize: "2.75rem", color: "#ffffff", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Uncompromising <span style={{ color: "var(--color-orange)" }}>Quality Standards</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.5" }}>
            Ensuring high purity, uniform Melt Flow Index, consistent dispersion, and moisture protection across every batch.
          </p>
        </div>
      </section>

      {/* 1. QUALITY COMMITMENT */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <SectionTitle
                tagline="Our Promise"
                title="Commitment to Consistent Polymer Performance"
                description="In modern plastic manufacturing, variations in raw material flow rates or moisture content can halt extrusion lines and cause significant scrap rates."
              />

              <p style={{ color: "var(--color-text-main)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Jay Veer Enterprise is committed to strict lot-to-lot consistency. Whether you are running high-speed blown film machines with tight micron tolerances or heavy-duty injection molding cycles, our quality control procedures are engineered to maintain optimum process stability and structural integrity.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onOpenQuoteModal}
                >
                  <span>Request Quality Data / Samples</span>
                  <ArrowRight size={16} />
                </button>
                <Link to="/products" className="btn btn-outline-primary">
                  <span>View Tested Granules</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="quality-lab-card">
                <img
                  src="/assets/gallery/polymer-lab-analysis.jpg"
                  alt="Jay Veer Polymer Testing Lab"
                  className="quality-lab-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RAW MATERIAL QUALITY & 3. PRODUCT CONSISTENCY */}
      <section className="section-py bg-light-alt">
        <div className="container">
          <SectionTitle
            tagline="Core Pillars"
            title="Rigorous Quality Control Workflow"
            description="From incoming polymer feedstock to outbound dispatched sacks, our protocol adheres to strict industrial standards."
            centered
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem"
            }}
          >
            {/* Raw Material Quality Card */}
            <div
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-primary-subtle)",
                  color: "var(--color-text-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: "1.35rem", color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                Raw Material Quality & Screening
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                We procure raw polymer bases, calcium minerals, and pigments from verified, reputable petrochemical channels. Every incoming consignment is evaluated for:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--color-text-main)", fontSize: "0.9rem" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Base polymer purity and contamination absence</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Mineral particle size distribution (micronized CaCO3)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Moisture tolerance check prior to compounding</span>
                </li>
              </ul>
            </div>

            {/* Product Consistency Card */}
            <div
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-orange-subtle)",
                  color: "var(--color-orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <Cpu size={28} />
              </div>
              <h3 style={{ fontSize: "1.35rem", color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                Batch-to-Batch Product Consistency
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                Manufacturing consistency is maintained through precise temperature controls during extrusion, eliminating thermal degradation:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--color-text-main)", fontSize: "0.9rem" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Controlled melt index ensuring identical screw torque</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Uniform pellet sizing for smooth automatic feeder flow</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Spectrophotometric Delta E verification on color shades</span>
                </li>
              </ul>
            </div>

            {/* Quality Checking Protocol Card */}
            <div
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#ecfdf5",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <TestTube size={28} />
              </div>
              <h3 style={{ fontSize: "1.35rem", color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                Laboratory Quality Checking
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                Routine laboratory checks verify physical parameters before clearing any batch for packaging:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--color-text-main)", fontSize: "0.9rem" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Melt Flow Rate (MFR / MFI) testing</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Density measurement and ash content analysis</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--color-orange)" }} />
                  <span>Visual clarity and foreign particle screening</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PACKAGING & DELIVERY */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-xl)",
                  padding: "0.45rem",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--color-border)",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >
                <img
                  src="/assets/gallery/packaging-dispatch.jpg"
                  alt="Jay Veer Packaging & Dispatch"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "380px",
                    maxHeight: "460px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "var(--radius-lg)",
                    display: "block"
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <div className="badge-tag badge-orange" style={{ marginBottom: "0.75rem" }}>
                Safe Transit Assurance
              </div>
              <h2 style={{ fontSize: "2.2rem", color: "var(--color-text-blue)", marginBottom: "1rem" }}>
                Packaging & On-Time Delivery
              </h2>
              <div className="section-title-line" />
              <p style={{ color: "var(--color-text-main)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Granules must arrive dry, clean, and intact. Humidity absorption can lead to silver streaks (splay marks) in molded products. To prevent this, Jay Veer Enterprise employs:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Package size={20} style={{ color: "var(--color-orange)", marginTop: "3px" }} />
                  <div>
                    <strong>25 Kg Heavy-Duty Lined Bags:</strong> Standard HDPE woven bags with integrated poly liners preventing moisture ingress and puncture during manual handling.
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Truck size={20} style={{ color: "var(--color-orange)", marginTop: "3px" }} />
                  <div>
                    <strong>Palletized & Wrapped Bulk Shipments:</strong> For bulk truckload consignments, pallets are stretch-wrapped and securely strapped for safe freight transit.
                  </div>
                </div>
              </div>

              {/* Notice regarding exact standards */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px dashed var(--color-border-dark)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.85rem 1.25rem",
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Info size={16} />
                <span>
                  Exact third-party lab certification numbers and ISO audit credentials will be updated in official records: <span className="placeholder-pill">[ISO Certification: Placeholder]</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
}
