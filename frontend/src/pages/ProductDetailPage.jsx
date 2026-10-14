import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Phone,
  MessageCircle,
  Send,
  Loader2,
  AlertCircle
} from "lucide-react";
import CTA from "../components/CTA";
import { useCompany } from "../context/CompanyContext";
import { getProduct, getMediaUrl, parseApplications, getWhatsAppLink, getTelLink } from "../services/api";

export default function ProductDetailPage({ onOpenQuoteModal, onSelectProductForQuote }) {
  const { slug, id } = useParams();
  const productSlug = slug || id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { company } = useCompany();

  useEffect(() => {
    let isMounted = true;

    async function fetchProductDetail() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(productSlug);
        if (isMounted) {
          setProduct(data);
          if (data) {
            document.title = `${data.name} | Jay Veer Enterprise`;
          } else {
            document.title = "Product Not Found | Jay Veer Enterprise";
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Product detail fetch notice:", err.message);
          setError("Unable to load this information right now. Please try again later.");
          setProduct(null);
          document.title = "Product Details | Jay Veer Enterprise";
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (productSlug) {
      fetchProductDetail();
    }

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  const handleEnquireClick = () => {
    if (onSelectProductForQuote && product) {
      onSelectProductForQuote(product);
    } else if (onOpenQuoteModal) {
      onOpenQuoteModal();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-page">
        <section
          style={{
            background: "linear-gradient(135deg, #091a33 0%, #0c2340 100%)",
            color: "#ffffff",
            padding: "4rem 0 3.5rem",
            textAlign: "center"
          }}
        >
          <div className="container">
            <Loader2 size={36} className="spinner-icon" style={{ margin: "0 auto 1rem", color: "var(--color-orange)" }} />
            <h2 style={{ fontSize: "1.5rem", color: "#ffffff" }}>Loading Product Details...</h2>
            <p style={{ color: "#cbd5e1", marginTop: "0.5rem" }}>
              Retrieving technical specifications and material profile from server
            </p>
          </div>
        </section>
        <div className="container" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
          <div className="loading-card" style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
            <p style={{ color: "var(--color-text-muted)" }}>Please wait a moment while details are loaded...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="product-detail-page">
        <div className="container" style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
          <div
            style={{
              maxWidth: "550px",
              margin: "0 auto",
              padding: "2.5rem",
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <AlertCircle size={48} style={{ color: "#ef4444", margin: "0 auto 1rem" }} />
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--color-text-blue)" }}>
              Unable to Load Product
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              {error}
            </p>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Back to Products Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 404 / Product Not Found
  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container" style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
          <div
            style={{
              maxWidth: "550px",
              margin: "0 auto",
              padding: "2.5rem",
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--color-text-blue)" }}>
              Product Not Found
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              The plastic product you are looking for does not exist or may have been deactivated.
            </p>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Back to Products Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = getMediaUrl(product.image, product.slug);
  const apps = parseApplications(product.applications);
  const shortDescription = product.short_description || "";
  const fullDescription =
    product.description ||
    product.short_description ||
    "High-grade industrial plastic raw material engineered for superior processing, structural consistency, and minimal manufacturing shrinkage.";

  // Contacts from Company API
  const companyPhone = company?.phone || "";
  const companyWhatsApp = company?.whatsapp_number || "";
  const whatsappMsg = `Hello Jay Veer Enterprise, I am interested in receiving a quotation for ${product.name}.`;

  return (
    <div className="product-detail-page">
      {/* Header Banner & Breadcrumbs */}
      <section
        className="product-detail-banner subpage-banner"
        style={{
          color: "#ffffff",
          padding: "3rem 0 2.5rem"
        }}
      >
        <div className="container">
          {/* Breadcrumbs */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginBottom: "1.25rem"
            }}
          >
            <Link to="/" style={{ color: "#cbd5e1" }}>Home</Link>
            <span>/</span>
            <Link to="/products" style={{ color: "#cbd5e1" }}>Products</Link>
            <span>/</span>
            <span style={{ color: "var(--color-orange)", fontWeight: 600 }}>{product.name}</span>
          </nav>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge-tag badge-orange" style={{ marginBottom: "0.75rem" }}>
                Active Catalog Product
              </span>
              <h1 style={{ fontSize: "2.6rem", color: "#ffffff", textTransform: "uppercase" }}>
                {product.name}
              </h1>
              {shortDescription && (
                <p style={{ color: "#e2e8f0", fontSize: "1.15rem", marginTop: "0.25rem", maxWidth: "750px" }}>
                  {shortDescription}
                </p>
              )}
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEnquireClick}
              >
                <span>Request Price For {product.name}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="section-py bg-light-alt">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "3.5rem" }}>
            {/* Left Column: Visual & Applications */}
            <div>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-xl)",
                  padding: "0.45rem",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-md)",
                  marginBottom: "2rem"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                  <img
                    src={imageUrl}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      const fallback = {
                        "filler-granules": "/assets/products/filler-granules.png",
                        "ld-granules": "/assets/products/ld-granules.jpg",
                        "reprocessed-granules": "/assets/products/reprocessed-granules.webp",
                        "color-masterbatch": "/assets/products/color-masterbatch.jpg",
                        "custom-plastic-colors": "/assets/products/custom-plastic-colors.webp",
                      }[productSlug];
                      if (fallback && !e.currentTarget.src.includes(fallback)) {
                        e.currentTarget.src = fallback;
                      } else {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/assets/products/placeholder-granules.svg";
                      }
                    }}
                  />
                </div>
              </div>

              {/* Applications Card */}
              {apps.length > 0 && (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "var(--radius-xl)",
                    padding: "2rem",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-sm)",
                    marginBottom: "2rem"
                  }}
                >
                  <h3 style={{ fontSize: "1.3rem", color: "var(--color-text-blue)", marginBottom: "1.25rem" }}>
                    Suitable Industrial Applications
                  </h3>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {apps.map((app, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", color: "var(--color-text-main)" }}>
                        <CheckCircle2 size={18} style={{ color: "var(--color-orange)", flexShrink: 0 }} />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standard Packaging Details */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-xl)",
                  padding: "2rem",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Package size={24} style={{ color: "var(--color-orange)" }} />
                  <h3 style={{ fontSize: "1.25rem", color: "var(--color-text-blue)" }}>
                    Standard Packaging & Dispatch
                  </h3>
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                  Standard supply packed in <strong>25 Kg heavy-duty moisture-proof HDPE woven bags</strong> with inner LDPE liners to ensure no atmospheric humidity absorption during shipping and transit storage. Bulk containerized and palletized shipments available upon request.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--color-text-blue)", fontWeight: 600 }}>
                  <span>✓ 25 Kg Net Weight Bags</span>
                  <span>✓ Moisture-Barrier Lined</span>
                  <span>✓ Palletized Delivery Ready</span>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & Quote Box */}
            <div>
              {/* Product Overview */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-xl)",
                  padding: "2.5rem",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: "2rem"
                }}
              >
                <h3 style={{ fontSize: "1.4rem", color: "var(--color-text-blue)", marginBottom: "1rem" }}>
                  Product Overview
                </h3>
                <p style={{ color: "var(--color-text-main)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                  {fullDescription}
                </p>

                {shortDescription && shortDescription !== fullDescription && (
                  <div style={{ background: "var(--color-bg-light)", padding: "1.25rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-orange)", marginTop: "1rem" }}>
                    <h4 style={{ fontSize: "0.95rem", color: "var(--color-text-blue)", marginBottom: "0.35rem" }}>
                      Processing Summary
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                      {shortDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Enquiry Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, #091a33 0%, #0c2340 100%)",
                  borderRadius: "var(--radius-xl)",
                  padding: "2rem",
                  color: "#ffffff",
                  boxShadow: "var(--shadow-lg)"
                }}
              >
                <span style={{ color: "var(--color-orange)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Direct Factory Inquiry
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "#ffffff", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                  Request Bulk Rate for {product.name}
                </h3>
                <p style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Speak directly with our technical sales executives or send an instant inquiry to receive current pricing and sample dispatch.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {companyPhone ? (
                    <a
                      href={getTelLink(companyPhone)}
                      className="btn btn-outline-white btn-sm"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Phone size={16} style={{ color: "var(--color-orange)" }} />
                      <span>Call Sales: {companyPhone}</span>
                    </a>
                  ) : (
                    <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                      [Phone contact pending administrative update]
                    </div>
                  )}

                  {companyWhatsApp && (
                    <a
                      href={getWhatsAppLink(companyWhatsApp, whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp Inquiry for {product.name}</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEnquireClick}
                  style={{ width: "100%" }}
                >
                  <Send size={16} />
                  <span>Open Quotation Form</span>
                </button>
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
