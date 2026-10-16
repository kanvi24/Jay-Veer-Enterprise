import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  Truck,
  ArrowRight,
  Info,
  Loader2
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import CTA from "../components/CTA";
import { useCompany } from "../context/CompanyContext";
import { useProducts } from "../context/ProductsContext";
import { companyData } from "../data/companyData";
import { getMediaUrl } from "../services/api";

export default function AboutPage({ onOpenQuoteModal }) {
  const { company } = useCompany();
  const { products, loading: productsLoading } = useProducts();

  useEffect(() => {
    document.title = "About Us | Jay Veer Enterprise - Plastic Raw Materials";
  }, []);

  const companyName = company?.company_name || companyData.name;
  const companyTagline = company?.tagline || companyData.tagline;
  const companyDescription = company?.description || "A dependable polymer compounding and raw material partner dedicated to high-grade granules, competitive factory rates, and reliable bulk logistics.";
  const companyAbout = company?.about || "We specialize in supplying foundational plastic raw materials and functional plastic granules tailored to exact industrial requirements. From high-purity filler compounding to virgin LDPE supplies and custom masterbatches, our focus is on ensuring smooth extrusion, dimensional stability, and minimized rejection rates for your production lines.";
  const companyMission = company?.mission || "To supply superior, batch-consistent plastic raw materials and specialized granules that enable our manufacturing partners to lower unit production costs, maximize extruder uptime, and deliver superior finished plastic goods to their end consumers.";
  const companyVision = company?.vision || "To be recognized across India's industrial manufacturing hubs as the benchmark for unadulterated polymer granules, ethical B2B trade, and responsive customer-centric raw material compounding.";

  return (
    <div className="about-page">
      {/* Subpage Banner Header */}
      <section
        className="about-page-banner subpage-banner"
        style={{
          color: "#ffffff",
          padding: "4rem 0 3.5rem"
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="badge-tag badge-orange" style={{ marginBottom: "1rem" }}>
            Company Profile &amp; Values
          </div>
          <h1 style={{ fontSize: "2.75rem", color: "#ffffff", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            About <span style={{ color: "var(--color-orange)" }}>{companyName}</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.5" }}>
            {companyDescription}
          </p>
        </div>
      </section>

      {/* 1. WHO WE ARE */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <SectionTitle
                tagline="Who We Are"
                title="Committed to Polymer Quality &amp; Industrial Trust"
                description={companyTagline}
              />

              <p style={{ color: "var(--color-text-main)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1.25rem" }}>
                {companyAbout}
              </p>

              {/* Corporate profile note */}
              <div
                style={{
                  background: "rgba(254, 105, 30, 0.08)",
                  border: "1px solid rgba(254, 105, 30, 0.25)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem"
                }}
              >
                <Info size={20} style={{ color: "#FE691E", flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-dark)", lineHeight: "1.5" }}>
                  <strong>Corporate Profile Notice:</strong> Profile details are directly synchronized with our administrative management system:
                  <div style={{ marginTop: "0.5rem" }}>
                    <span className="placeholder-pill">
                      Location: {company?.city || "Gujarat"}, {company?.country || "India"}
                    </span>{" "}
                    <span className="placeholder-pill">
                      Direct Executive Sales Active
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onOpenQuoteModal}
                >
                  <span>Request Corporate Quote</span>
                  <ArrowRight size={16} />
                </button>
                <Link to="/products" className="btn btn-outline-primary">
                  <span>Browse Granule Portfolio</span>
                </Link>
              </div>
            </div>

            {/* Visual reference & Brand shield */}
            <div>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-xl)",
                  padding: "0.45rem",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--color-border)"
                }}
              >
                <img
                  src="/assets/branding/poster.png"
                  alt="Jay Veer Enterprise Manufacturing & Compounding Facility"
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    minHeight: "520px",
                    maxHeight: "580px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    display: "block"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE PROVIDE */}
      <section className="section-py bg-light-alt">
        <div className="container">
          <SectionTitle
            tagline="Comprehensive Supply"
            title="What We Provide to Converters &amp; Molders"
            description="Our primary product lineup addresses cost reduction, flexibility, mechanical strength, and aesthetic color consistency."
            centered
          />

          {productsLoading && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <Loader2 size={30} className="spinner-icon" style={{ margin: "0 auto 0.5rem", color: "var(--color-orange)" }} />
              <p style={{ color: "var(--color-text-muted)" }}>Loading active product lines...</p>
            </div>
          )}

          {!productsLoading && products.length > 0 && (
            <div className="about-provide-grid">
              {products.map((item) => {
                const itemSlug = item.slug || item.id;
                const itemImg = getMediaUrl(item.image, item.slug);
                return (
                  <div
                    key={item.id}
                    className="about-provide-card"
                    style={{
                      background: "#ffffff",
                      padding: "1.5rem",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <div style={{ width: "100%", aspectRatio: "16/10", marginBottom: "1rem", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                      <img
                        src={itemImg}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/products/placeholder-granules.svg";
                        }}
                      />
                    </div>
                    <h3 style={{ fontSize: "1.1rem", color: "var(--color-text-blue)", marginBottom: "0.4rem" }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1rem", flexGrow: 1 }}>
                      {item.short_description || item.description || "High purity polymer material for superior processing."}
                    </p>
                    <Link
                      to={`/products/${itemSlug}`}
                      style={{ fontSize: "0.85rem", color: "var(--color-orange)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      <span>Details</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. OUR BUSINESS APPROACH: "WE DELIVER TRUST, YOU GROW" */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <SectionTitle
                tagline="Our Core Philosophy"
                title="“We Deliver Trust, You Grow”"
                description="We believe in sustainable B2B partnerships built upon transparent communication, uncompromised product consistency, and prompt fulfillment."
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-orange-subtle)",
                      color: "var(--color-orange)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.05rem", color: "var(--color-text-blue)", marginBottom: "0.25rem" }}>
                      Direct Executive Accountability
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                      Every inquiry and bulk dispatch is handled directly by experienced leaders—<strong>Vijay Patel</strong> and <strong>Chetan Patel</strong>—ensuring rapid quotes and clear turnaround times.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-primary-subtle)",
                      color: "var(--color-text-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Truck size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.05rem", color: "var(--color-text-blue)", marginBottom: "0.25rem" }}>
                      Zero Downtime Supply Chain
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                      With buffer inventory maintenance and efficient transport coordination, your plant machinery stays supplied with consistent polymer feedstock.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-orange-subtle)",
                      color: "var(--color-orange)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.05rem", color: "var(--color-text-blue)", marginBottom: "0.25rem" }}>
                      Reliable Melt Flow Assurance
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                      Continuous batch inspection ensures your injection moulds and blown film extruders achieve balanced pressure profiles and flawless surface gloss.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership box */}
            <div>
              <div
                style={{
                  background: "linear-gradient(135deg, #091a33 0%, #0c2340 100%)",
                  borderRadius: "var(--radius-xl)",
                  padding: "2.5rem",
                  color: "#ffffff",
                  boxShadow: "var(--shadow-xl)"
                }}
              >
                <span style={{ color: "var(--color-orange)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Key Leadership
                </span>
                <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "0.5rem", marginBottom: "1rem" }}>
                  Hands-On Industrial Leadership
                </h3>
                <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                  At {companyName}, we maintain an accessible leadership structure. When you partner with us for your plastic granule requirements, you interface directly with decision-makers who understand polymer economics and processing parameters.
                </p>

                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.15)", paddingTop: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "var(--color-orange)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontWeight: 800
                      }}
                    >
                      JV
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>Vijay Patel &amp; Chetan Patel</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-orange)" }}>{companyName} Leadership</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="section-py bg-light-alt">
        <div className="container">
          <SectionTitle
            tagline="Guiding Principles"
            title="Our Mission &amp; Vision"
            description="Clear strategic focus on polymer reliability, customer growth, and industrial excellence."
            centered
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-primary-subtle)",
                  color: "var(--color-text-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem"
                }}
              >
                <Target size={30} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                Our Mission
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7" }}>
                {companyMission}
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-orange-subtle)",
                  color: "var(--color-orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem"
                }}
              >
                <Eye size={30} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                Our Vision
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.7" }}>
                {companyVision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
}
