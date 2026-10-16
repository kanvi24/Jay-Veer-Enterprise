import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  Users,
  Layers,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Check,
  FileText,
  Factory,
  Cog,
  Microscope,
  CheckCircle,
  Package,
  Box,
  Home,
  Wrench,
  Car,
  Clock,
  Loader2,
  AlertCircle
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import CTA from "../components/CTA";
import { useCompany } from "../context/CompanyContext";
import { useProducts } from "../context/ProductsContext";
import { companyData } from "../data/companyData";
import { getTelLink, getMailtoLink, getWhatsAppLink } from "../services/api";

export default function HomePage({ onOpenQuoteModal, onSelectProductForQuote }) {
  const { company, fullAddress } = useCompany();
  const { products, loading: productsLoading, error: productsError } = useProducts();

  useEffect(() => {
    document.title = "Jay Veer Enterprise | Quality Plastic Granules for Reliable Manufacturing";
  }, []);

  const handleEnquire = (product) => {
    if (onSelectProductForQuote) {
      onSelectProductForQuote(product);
    } else if (onOpenQuoteModal) {
      onOpenQuoteModal();
    }
  };

  const companyName = company?.company_name || companyData.name;
  const companyDesc =
    company?.description ||
    "Supplying high-purity Filler Granules, virgin LD Granules, eco Reprocessed Granules, vibrant Color Masterbatches, and Custom Plastic Color formulations to empower your plastic manufacturing processes.";

  const primaryPhone = company?.phone || companyData.contacts[0].displayPhone;
  const rawPrimaryPhone = company?.phone || companyData.contacts[0].phone;
  const secondaryPhone = companyData.contacts[1].displayPhone;
  const rawSecondaryPhone = companyData.contacts[1].phone;
  const secondaryWhatsapp = companyData.contacts[1].whatsapp;
  const companyEmail = company?.email || companyData.email;
  const displayAddress = fullAddress || companyData.address;
  const whatsappNumber = company?.whatsapp_number || companyData.contacts[0].whatsapp;
  const googleMapsUrl =
    company?.google_maps_url ||
    companyData.googleMapsUrl ||
    "https://maps.google.com/?q=Prarthana+Estate,+47,+C.T.M,+Amraiwadi,+Ahmedabad,+Gujarat+380026";
  const workingHours = company?.working_hours || companyData.workingHours || "Monday – Saturday: 9:00 AM – 7:00 PM IST";

  // 6 Professional Feature Blocks for "Why Choose Us"
  const whyChooseUsFeatures = [
    {
      id: "consistent-quality",
      title: "Consistent Quality",
      desc: "Batch-wise screening for melt flow index (MFI), density, and dispersion to guarantee smooth machine runnability.",
      icon: ShieldCheck,
    },
    {
      id: "reliable-supply",
      title: "Reliable Supply",
      desc: "Dependable raw material supply chains and warehouse inventory ensuring your plant machinery never faces unexpected downtime.",
      icon: Truck,
    },
    {
      id: "customer-support",
      title: "Customer Support",
      desc: "Responsive commercial assistance, honest communication, and prompt technical support tailored to your converter equipment.",
      icon: Users,
    },
    {
      id: "customized-solutions",
      title: "Customized Solutions",
      desc: "Custom color matching, tailored masterbatch formulations, and application-specific filler ratios designed to reduce per-ton costs.",
      icon: Layers,
    },
    {
      id: "quality-processing",
      title: "Quality-Focused Processing",
      desc: "Precision compounding extruders with fine mesh melt filtration that remove foreign matter and prevent nozzle clogging.",
      icon: Factory,
    },
    {
      id: "industrial-applications",
      title: "Industrial Applications",
      desc: "Wide polymer versatility engineered specifically for high-speed blown film, injection moulding, and blow moulding lines.",
      icon: Cog,
    },
  ];

  // Quality Workflow Steps
  const qualityWorkflowSteps = [
    {
      step: "01",
      title: "Raw Material",
      desc: "Strict screening of virgin base resins & calcium carbonate feeds for unadulterated purity."
    },
    {
      step: "02",
      title: "Processing",
      desc: "Controlled multi-zone thermal compounding for homogeneous dispersion & uniform melt."
    },
    {
      step: "03",
      title: "Quality Checking",
      desc: "Lot inspection for melt flow index (MFI), bulk density, and unmolten gel filtration."
    },
    {
      step: "04",
      title: "Final Product",
      desc: "Uniformly pelletized, moisture-controlled polymer granules ready for industrial usage."
    },
    {
      step: "05",
      title: "Customer Supply",
      desc: "Packed into 25kg moisture-barrier bags with prompt freight dispatch across India."
    }
  ];

  // Process / Manufacturing Steps
  const manufacturingSteps = [
    {
      number: "01",
      title: "Material Selection",
      desc: "Carefully sourced virgin polymers and mineral calcium carbonate screened for grade uniformity."
    },
    {
      number: "02",
      title: "Processing",
      desc: "High-torque multi-zone compounding extruders deliver thorough polymer-pigment homogenization."
    },
    {
      number: "03",
      title: "Quality Check",
      desc: "Screen filtration and melt index testing ensure no contaminants or processing variance enter pellets."
    },
    {
      number: "04",
      title: "Final Granules",
      desc: "Die-face cutting and fluid bed cooling produce consistent pellet geometries and clean bulk density."
    },
    {
      number: "05",
      title: "Supply",
      desc: "Tamper-evident 25kg HDPE woven bag packaging with dedicated dispatch logistics to converter facilities."
    }
  ];

  // 6 Industrial Application Categories
  const applicationCategories = [
    {
      id: "plastic-mfg",
      title: "Plastic Manufacturing",
      desc: "Ideal raw materials for molding buckets, storage crates, toys, caps, closures, and consumer utilities.",
      icon: Package
    },
    {
      id: "packaging",
      title: "Packaging",
      desc: "High-grade polymer resins providing puncture resistance and optical clarity for blown films and liners.",
      icon: Box
    },
    {
      id: "industrial-products",
      title: "Industrial Products",
      desc: "Durable polymers engineered for chemical drums, agricultural drainage pipes, and conduit fittings.",
      icon: Wrench
    },
    {
      id: "household-products",
      title: "Household Products",
      desc: "Vibrant and durable granules tailored for kitchenware, bathroom accessories, and storage containers.",
      icon: Home
    },
    {
      id: "automotive-components",
      title: "Automotive Components",
      desc: "Engineered compounds suitable for non-critical automotive shields, mudguards, and interior trim plastics.",
      icon: Car
    },
    {
      id: "custom-manufacturing",
      title: "Custom Manufacturing",
      desc: "Tailored melt indices for specialized high-speed extrusion lines and bespoke blow molding containers.",
      icon: Cog
    }
  ];

  return (
    <div className="home-page industrial-theme">
      {/* ----------------------------------------------------------------------
          1. HOME HERO (GPGPL-Style Full-Width Industrial Polymer Hero)
          ---------------------------------------------------------------------- */}
      <section className="hero-section hero-gpgpl-style">
        <div className="hero-gpgpl-overlay" />

        <div className="container hero-gpgpl-container">
          <div className="hero-gpgpl-content">
            <h1 className="hero-gpgpl-title">
              Jay Veer Enterprise
            </h1>

            <p className="hero-gpgpl-subtitle">
              LEADING MANUFACTURERS OF <br />
              PLASTIC GRANULES &amp; RAW MATERIALS
            </p>

            <div className="hero-gpgpl-actions">
              <button
                type="button"
                className="btn btn-hero-contact"
                onClick={onOpenQuoteModal}
              >
                <span>CONTACT NOW</span>
              </button>
              <Link to="/products" className="btn btn-hero-explore">
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Contact Info Bar (Covered by Hero Background) */}
        <div className="hero-contact-strip">
          <div className="container hero-strip-grid">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-strip-item"
            >
              <MapPin size={18} className="hero-strip-icon" />
              <div className="hero-strip-text">
                <span className="hero-strip-label">Location</span>
                <span className="hero-strip-val">{displayAddress}</span>
              </div>
            </a>

            <div className="hero-strip-item">
              <Phone size={18} className="hero-strip-icon" />
              <div className="hero-strip-text">
                <span className="hero-strip-label">Call Now</span>
                <div className="hero-strip-phones">
                  <a href={getTelLink(rawPrimaryPhone)} className="hero-strip-link">
                    {primaryPhone}
                  </a>
                  <span className="hero-strip-sep">/</span>
                  <a href={getTelLink(rawSecondaryPhone)} className="hero-strip-link">
                    {secondaryPhone}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={getMailtoLink(companyEmail)}
              className="hero-strip-item"
            >
              <Mail size={18} className="hero-strip-icon" />
              <div className="hero-strip-text">
                <span className="hero-strip-label">Email Us</span>
                <span className="hero-strip-val">{companyEmail}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          2. PRODUCT SECTION ("OUR PRODUCTS")
          ---------------------------------------------------------------------- */}
      <section className="section-py products-section">
        <div className="container">
          <SectionTitle
            tagline="Product Portfolio"
            title="OUR PRODUCTS"
            description="Reliable plastic raw material solutions for diverse industrial applications."
            centered
          />

          {productsLoading && (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <Loader2 size={32} className="spinner-icon" style={{ margin: "0 auto 0.75rem", color: "var(--color-secondary)" }} />
              <p style={{ color: "var(--color-text-muted)" }}>Loading active products from API...</p>
            </div>
          )}

          {!productsLoading && productsError && (
            <div style={{ textAlign: "center", padding: "2rem", background: "#fff", border: "1px solid #fee2e2", borderRadius: "var(--radius-md)", marginBottom: "2rem" }}>
              <AlertCircle size={28} style={{ color: "#ef4444", margin: "0 auto 0.5rem" }} />
              <p style={{ color: "var(--color-text-muted)" }}>Unable to load this information right now. Please try again later.</p>
            </div>
          )}

          {!productsLoading && !productsError && products.length > 0 && (
            <div className="products-grid">
              {products.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/products" className="btn btn-blue">
              <span>VIEW FULL PRODUCT CATALOG</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          3. ABOUT SECTION (Two-Column Industrial About)
          ---------------------------------------------------------------------- */}
      <section className="section-py bg-light-alt about-section-home">
        <div className="container">
          <div className="about-two-col-grid">
            {/* Left: Industrial Visual */}
            <div className="about-visual-side">
              <div className="about-image-card">
                <img
                  src="/assets/gallery/plastic-extrusion-machinery.jpg"
                  alt="Jay Veer Industrial Plastic Extrusion Machinery & Compounding Facility"
                  className="about-image"
                />
              </div>
            </div>

            {/* Right: Company Introduction & Pillars */}
            <div className="about-content-side">
              <div className="badge-tag badge-blue" style={{ marginBottom: "0.85rem" }}>
                ABOUT JAY VEER ENTERPRISE
              </div>
              <h2 className="section-title">
                Committed to Excellence in Polymer Compounding &amp; Supply
              </h2>
              <div className="section-title-line" />

              <p className="about-intro-text">
                {company?.description ||
                  "Jay Veer Enterprise is a dedicated manufacturer and supplier of plastic raw materials and granules, serving plastic converters, injection molders, and blown film producers across India."}
              </p>

              <p className="about-body-text">
                {company?.about ||
                  "We understand that polymer consistency directly determines machine runnability, cycle times, and finished product durability. Guided by our motto “We Deliver Trust, You Grow”, our team provides tailor-made granules formulated to meet precise physical and thermal specifications."}
              </p>

              <div className="about-commitments-grid">
                <div className="about-commitment-card">
                  <h4 className="commitment-title">✓ Quality Commitment</h4>
                  <p className="commitment-desc">
                    Screened purity, controlled melt index, and strict lot testing to safeguard tooling and prevent nozzle clogging.
                  </p>
                </div>
                <div className="about-commitment-card">
                  <h4 className="commitment-title">✓ Customer-Focused Approach</h4>
                  <p className="commitment-desc">
                    Custom color formulation, technical advice, and responsive commercial terms to suit converter requirements.
                  </p>
                </div>
                <div className="about-commitment-card" style={{ gridColumn: "span 2" }}>
                  <h4 className="commitment-title">✓ Reliable Supply Readiness</h4>
                  <p className="commitment-desc">
                    Substantial inventory buffer and trusted logistics partners ensuring seamless deliveries to your plant.
                  </p>
                </div>
              </div>

              <div className="about-actions">
                <Link to="/about" className="btn btn-primary">
                  <span>READ MORE</span>
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={onOpenQuoteModal}
                >
                  <FileText size={16} />
                  <span>REQUEST MATERIAL QUOTE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          4. WHY CHOOSE US (6 Feature Blocks)
          ---------------------------------------------------------------------- */}
      <section className="section-py why-choose-section">
        <div className="container">
          <SectionTitle
            tagline="Our Advantages"
            title="WHY CHOOSE JAY VEER ENTERPRISE?"
            description="Key operational strengths ensuring consistent polymer performance, processability, and long-term business trust."
            centered
          />

          <div className="why-choose-six-grid">
            {whyChooseUsFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="why-card">
                  <div className="why-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3 className="why-card-title">{feature.title}</h3>
                  <p className="why-card-desc">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          5. QUALITY SECTION ("QUALITY YOU CAN RELY ON" & Workflow)
          ---------------------------------------------------------------------- */}
      <section className="section-py bg-light-alt quality-workflow-section">
        <div className="container">
          <SectionTitle
            tagline="Quality Assurance"
            title="QUALITY YOU CAN RELY ON"
            description="A systematic approach to polymer integrity, from raw feed inspection to final customer delivery."
            centered
          />

          {/* Stepped Workflow: Raw Material -> Processing -> Quality Checking -> Final Product -> Customer Supply */}
          <div className="workflow-stepper-grid">
            {qualityWorkflowSteps.map((ws, idx) => (
              <div key={ws.step} className="workflow-step-card">
                <div className="workflow-step-badge">{ws.step}</div>
                <h4 className="workflow-step-title">{ws.title}</h4>
                <p className="workflow-step-desc">{ws.desc}</p>
                {idx < qualityWorkflowSteps.length - 1 && (
                  <div className="workflow-arrow-connector">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="quality-two-col-box">
            <div className="quality-box-content">
              <h3 className="quality-box-title">Batch Consistency &amp; Inspection Protocols</h3>
              <p className="quality-box-desc">
                Every lot produced and dispatched adheres to controlled melt flow index (MFI), ash content tolerances, and density testing. Our multi-stage melt filtration ensures minimal unmolten gels and zero foreign particles.
              </p>
              <div className="quality-check-list">
                <div className="quality-check-item">
                  <CheckCircle size={18} className="quality-check-icon" />
                  <span>Screened base polymer resins &amp; high-purity mineral fillers</span>
                </div>
                <div className="quality-check-item">
                  <CheckCircle size={18} className="quality-check-icon" />
                  <span>Fine micron screen changers prevent die and nozzle clogging</span>
                </div>
                <div className="quality-check-item">
                  <CheckCircle size={18} className="quality-check-icon" />
                  <span>Packed into moisture-barrier 25kg tamper-evident HDPE bags</span>
                </div>
              </div>
              <div style={{ marginTop: "1.75rem" }}>
                <Link to="/quality" className="btn btn-secondary btn-sm">
                  <span>LEARN MORE ABOUT QUALITY</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="quality-box-visual">
              <img
                src="/assets/gallery/quality-testing.jpg"
                alt="Jay Veer Polymer Inspection"
                className="quality-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          6. PROCESS / MANUFACTURING SECTION (01 Material Selection to 05 Supply)
          ---------------------------------------------------------------------- */}
      <section className="section-py bg-dark-industrial process-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge-tag badge-dark" style={{ marginBottom: "0.75rem" }}>
              OPERATIONAL EXCELLENCE
            </span>
            <h2 className="section-title light-text">MANUFACTURING PROCESS</h2>
            <div className="section-title-line" style={{ background: "var(--color-secondary)" }} />
            <p className="section-description light-text">
              Precision extrusion, compounding, and screening from raw material selection to final bagged granules.
            </p>
          </div>

          <div className="manufacturing-steps-grid">
            {manufacturingSteps.map((mStep) => (
              <div key={mStep.number} className="process-step-item">
                <div className="process-number">{mStep.number}</div>
                <h4 className="process-title">{mStep.title}</h4>
                <p className="process-desc">{mStep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          7. INDUSTRIAL APPLICATIONS (6 Categories)
          ---------------------------------------------------------------------- */}
      <section className="section-py applications-section-home">
        <div className="container">
          <SectionTitle
            tagline="Versatile Polymer Usage"
            title="APPLICATIONS"
            description="Supplying high-performance plastic raw materials across major manufacturing sectors."
            centered
          />

          <div className="applications-six-grid">
            {applicationCategories.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.id} className="app-card-b2b">
                  <div className="app-icon-wrap-b2b">
                    <Icon size={24} />
                  </div>
                  <h3 className="app-b2b-title">{app.title}</h3>
                  <p className="app-b2b-desc">{app.desc}</p>
                  <Link to="/applications" className="app-b2b-link">
                    <span>Explore Applications</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/applications" className="btn btn-outline-primary">
              <span>VIEW ALL INDUSTRIAL APPLICATIONS</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* ----------------------------------------------------------------------
          9. BUSINESS CTA ("LOOKING FOR RELIABLE PLASTIC RAW MATERIALS?")
          ---------------------------------------------------------------------- */}
      <CTA onOpenQuoteModal={onOpenQuoteModal} />

      {/* ----------------------------------------------------------------------
          10. CONTACT SECTION (Company API Powered)
          ---------------------------------------------------------------------- */}
      {/* ----------------------------------------------------------------------
          10. CONTACT SECTION (Premium Split Layout)
          ---------------------------------------------------------------------- */}
      <section className="section-py contact-section-home">
        <div className="container">
          <div className="contact-split-grid">
            {/* LEFT SIDE — CONTACT / CONNECT PANEL (45%) */}
            <div className="contact-split-left">
              <div className="contact-split-tag">
                <span className="contact-split-tag-dot" />
                <span>LET'S CONNECT</span>
              </div>

              <h2 className="contact-split-heading">
                LET'S BUILD A STRONGER CONNECTION
              </h2>

              <p className="contact-split-desc">
                Connect directly with our sales and technical team for product requirements, grade recommendations, pricing, and bulk inquiries.
              </p>

              <div className="contact-split-actions">
                {/* 1. Direct Call / Phone */}
                <div className="contact-action-card">
                  <div className="contact-action-header">
                    <div className="contact-action-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="contact-action-badge">DIRECT CALL SUPPORT</span>
                      <h4 className="contact-action-title">Speak Directly with Leadership</h4>
                    </div>
                  </div>

                  <div className="contact-phone-list">
                    <a href={getTelLink(rawPrimaryPhone)} className="contact-phone-row">
                      <div className="contact-phone-info">
                        <span className="contact-phone-role">Key Business Executive</span>
                        <span className="contact-phone-name">Vijay Patel</span>
                      </div>
                      <span className="contact-phone-number">{primaryPhone}</span>
                    </a>

                    <a href={getTelLink(rawSecondaryPhone)} className="contact-phone-row">
                      <div className="contact-phone-info">
                        <span className="contact-phone-role">Sales &amp; Procurement</span>
                        <span className="contact-phone-name">Chetan Patel</span>
                      </div>
                      <span className="contact-phone-number">{secondaryPhone}</span>
                    </a>
                  </div>
                </div>

                {/* 2. WhatsApp Communication */}
                <div className="contact-action-card">
                  <div className="contact-action-header">
                    <div className="contact-action-icon contact-wa-icon-box">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <span className="contact-action-badge contact-wa-badge">INSTANT MESSAGING</span>
                      <h4 className="contact-action-title">Chat on WhatsApp</h4>
                    </div>
                  </div>

                  <p className="contact-action-subtext">
                    Instant grade consultation, technical specifications &amp; quick pricing quotes.
                  </p>

                  <div className="contact-wa-grid">
                    <a
                      href={getWhatsAppLink(whatsappNumber, "Hello Vijay Patel, I am inquiring regarding plastic raw materials from Jay Veer Enterprise.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                    >
                      <span>Chat with Vijay Patel</span>
                    </a>
                    <a
                      href={getWhatsAppLink(secondaryWhatsapp, "Hello Chetan Patel, I am inquiring regarding plastic raw materials from Jay Veer Enterprise.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                    >
                      <span>Chat with Chetan Patel</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — CONTACT INFORMATION (55%) */}
            <div className="contact-split-right">
              {/* 1. EMAIL */}
              <div className="contact-info-panel-item">
                <div className="contact-info-icon">
                  <Mail size={19} />
                </div>
                <div className="contact-info-body">
                  <span className="contact-info-badge">EMAIL</span>
                  <h4 className="contact-info-title">Corporate &amp; Sales Correspondence</h4>
                  <a
                    href={getMailtoLink(companyEmail)}
                    className="contact-info-email-link"
                  >
                    {companyEmail}
                  </a>
                  <p className="contact-info-caption">
                    Send formal purchase orders, technical specifications, or request quotation documents.
                  </p>
                </div>
              </div>

              {/* 2. LOCATION */}
              <div className="contact-info-panel-item">
                <div className="contact-info-icon">
                  <MapPin size={19} />
                </div>
                <div className="contact-info-body">
                  <span className="contact-info-badge">LOCATION</span>
                  <h4 className="contact-info-title">Manufacturing &amp; Plant Works</h4>
                  <p className="contact-info-address">
                    {displayAddress}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm contact-directions-btn"
                  >
                    <ExternalLink size={13} />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* 3. BUSINESS HOURS */}
              <div className="contact-info-panel-item">
                <div className="contact-info-icon">
                  <Clock size={19} />
                </div>
                <div className="contact-info-body">
                  <span className="contact-info-badge">BUSINESS HOURS</span>
                  <h4 className="contact-info-title">Operating &amp; Dispatch Schedule</h4>
                  <div className="contact-info-hours">
                    {workingHours}
                  </div>
                  <p className="contact-info-caption">
                    Plant compounding extruders, quality control laboratory &amp; warehouse loading operations active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
