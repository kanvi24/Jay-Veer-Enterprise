import React, { useState, useEffect } from "react";
import { ZoomIn, X, ChevronRight, ArrowRight } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import CTA from "../components/CTA";
import { galleryData, galleryCategories } from "../data/galleryData";

export default function GalleryPage({ onOpenQuoteModal }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    document.title = "Industrial Gallery | Jay Veer Enterprise - Factory & Granules";
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="gallery-page">
      {/* Banner */}
      <section
        className="gallery-page-banner subpage-banner"
        style={{
          color: "#ffffff",
          padding: "4rem 0 3.5rem"
        }}
      >
        <div className="container">
          <div className="badge-tag badge-orange" style={{ marginBottom: "1rem" }}>
            Visual Facility & Products
          </div>
          <h1 style={{ fontSize: "2.75rem", color: "#ffffff", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Industrial <span style={{ color: "var(--color-orange)" }}>Gallery</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.5" }}>
            Visual showcase of our plastic granules, compounding operations, testing equipment, and moisture-proof packaging facilities.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="section-py bg-light-alt">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="gallery-filter-bar">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filter-btn ${
                  selectedCategory.toLowerCase() === cat.toLowerCase() ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setActiveModalItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveModalItem(item);
                }}
              >
                <div className="gallery-img-wrap">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="gallery-zoom-overlay">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,0,0,0.6)", padding: "0.5rem 1rem", borderRadius: "var(--radius-full)" }}>
                      <ZoomIn size={18} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Click to Enlarge</span>
                    </div>
                  </div>
                </div>

                <div className="gallery-card-content">
                  <span className="gallery-card-tag">{item.categoryLabel}</span>
                  <h3 className="gallery-card-title">{item.title}</h3>
                  <p className="gallery-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          className="modal-overlay"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "800px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="badge-tag badge-orange" style={{ marginBottom: "0.25rem" }}>
                  {activeModalItem.categoryLabel}
                </span>
                <h3 className="modal-title" style={{ fontSize: "1.25rem" }}>
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                style={{ color: "var(--color-text-muted)", padding: "0.4rem" }}
                aria-label="Close image modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: "1.5rem" }}>
              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  background: "#091426",
                  marginBottom: "1.25rem",
                  maxHeight: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                />
              </div>

              <p style={{ color: "var(--color-text-main)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                {activeModalItem.description}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {activeModalItem.tags.map((tag, idx) => (
                    <span key={idx} className="badge-tag badge-blue">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setActiveModalItem(null);
                    onOpenQuoteModal();
                  }}
                >
                  <span>Inquire Regarding This Item</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <CTA onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
}
