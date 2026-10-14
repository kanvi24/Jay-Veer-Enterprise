import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Check,
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import CTA from "../components/CTA";
import { useProducts } from "../context/ProductsContext";
import { productsData } from "../data/productsData";
import { getMediaUrl, parseApplications } from "../services/api";

const CANONICAL_ORDER = [
  "filler-granules",
  "ld-granules",
  "reprocessed-granules",
  "color-masterbatch",
  "custom-plastic-colors"
];

export default function ProductsPage({ onOpenQuoteModal }) {
  const { products, loading, error, refetchProducts } = useProducts();
  const location = useLocation();

  useEffect(() => {
    document.title =
      "Products Showcase | Jay Veer Enterprise - Plastic Raw Materials & Granules";
  }, []);

  useEffect(() => {
    if (location.hash) {
      const slug = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash, products]);

  // Merge live API data with fallback definitions while prioritizing live Django API fields
  const displayProducts = CANONICAL_ORDER.map((slug) => {
    const apiItem = (products || []).find((p) => p.slug === slug || String(p.id) === slug);
    const fallbackItem = productsData.find((d) => d.id === slug);

    if (apiItem) {
      return {
        ...fallbackItem,
        ...apiItem,
        id: apiItem.id || fallbackItem?.id,
        slug: apiItem.slug || fallbackItem?.id,
        name: apiItem.name || fallbackItem?.name,
        short_description: apiItem.short_description || fallbackItem?.shortDescription,
        description: apiItem.description || fallbackItem?.fullDescription,
        applications: apiItem.applications || fallbackItem?.applications?.join(", "),
        image: apiItem.image || fallbackItem?.image,
      };
    }
    return fallbackItem;
  }).filter(Boolean);

  const scrollToProduct = (slug) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="product-showcase-page">

      {/* Loading State Banner */}
      {loading && products.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <Loader2
            size={36}
            className="spinner-icon"
            style={{ margin: "0 auto 1rem", color: "var(--color-orange)" }}
          />
          <h3 style={{ fontSize: "1.25rem", color: "var(--color-text-blue)" }}>
            Loading Product Showcase...
          </h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
            Connecting to Jay Veer Enterprise catalog database
          </p>
        </div>
      )}

      {/* Error Notice */}
      {!loading && error && products.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            padding: "2.5rem",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
            border: "1px solid #fee2e2",
            maxWidth: "600px",
            margin: "3rem auto"
          }}
        >
          <AlertCircle size={36} style={{ color: "#ef4444", margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.2rem", color: "var(--color-text-blue)", marginBottom: "0.5rem" }}>
            Live Catalog Reconnection
          </h3>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
            {error} Showing verified standard specification data.
          </p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={refetchProducts}
          >
            <RefreshCw size={14} />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Vertical Product Showcase Sections (Alternating 2-Column Desktop, Stacked Mobile) */}
      <div className="showcase-products-stream">
        {displayProducts.map((product, index) => {
          const productSlug = product.slug || product.id;
          const imageUrl = getMediaUrl(product.image, productSlug);
          const isEven = index % 2 === 1; // index 0 (Left Image), index 1 (Right Image), etc.
          const apps = parseApplications(product.applications);
          const productNum = String(index + 1).padStart(2, "0");

          return (
            <section
              key={productSlug}
              id={productSlug}
              className={`showcase-product-section ${isEven ? "bg-alt" : ""}`}
            >
              <div className="container">
                <div className={`showcase-row ${isEven ? "reverse" : ""}`}>
                  {/* Left (or Right for even) Column: Large Product Image */}
                  <div className="showcase-image-col">
                    <div className="showcase-image-wrap">
                      <div className="showcase-img-aspect">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          loading={index === 0 ? "eager" : "lazy"}
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
                  </div>

                  {/* Right (or Left for even) Column: Complete Product Information */}
                  <div className="showcase-info-col">
                    <div className="showcase-kicker">
                      <span>Product {productNum} • Jay Veer Enterprise</span>
                    </div>

                    <h2 className="showcase-product-name">{product.name}</h2>
                    <div className="showcase-divider" />

                    <div className="showcase-block-group">
                      {/* Product Overview / Introduction */}
                      <div className="showcase-block">
                        <div className="showcase-block-label">Product Overview</div>
                        <p className="showcase-overview-text">
                          {product.short_description || product.shortDescription}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="showcase-block">
                        <div className="showcase-block-label">Description</div>
                        <p className="showcase-desc-text">
                          {product.description || product.fullDescription}
                        </p>
                      </div>

                      {/* Applications */}
                      {apps && apps.length > 0 && (
                        <div className="showcase-block">
                          <div className="showcase-block-label">Applications</div>
                          <div className="showcase-apps-list">
                            {apps.map((app, appIdx) => (
                              <span key={appIdx} className="showcase-app-pill">
                                <Check size={13} className="showcase-check-icon" />
                                <span>{app}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <CTA onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
}
