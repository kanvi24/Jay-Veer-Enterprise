import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { getMediaUrl } from "../services/api";

export default function ProductCard({ product, onEnquire }) {
  const productSlug = product.slug || product.id;
  const imageUrl = getMediaUrl(product.image, product.slug);
  const shortDesc =
    product.short_description || product.shortDescription || product.description || "";

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const fallback = {
              "filler-granules": "/assets/products/filler-granules.png",
              "ld-granules": "/assets/products/ld-granules.jpg",
              "reprocessed-granules": "/assets/products/reprocessed-granules.webp",
              "color-masterbatch": "/assets/products/color-masterbatch.jpg",
              "custom-plastic-colors": "/assets/products/custom-plastic-colors.webp",
            }[productSlug];
            const fallbackUrl = fallback ? (window.location.origin + fallback) : null;
            if (fallback && e.currentTarget.src !== fallbackUrl) {
              e.currentTarget.src = fallback;
            } else {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/products/placeholder-granules.svg";
            }
          }}
        />
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        {shortDesc && <p className="product-card-desc">{shortDesc}</p>}

        <div className="product-card-actions">
          <Link
            to={`/products/${productSlug}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
          >
            <span>View Details</span>
            <ArrowRight size={15} />
          </Link>
          {onEnquire && (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEnquire(product)}
              title="Request quotation for this product"
            >
              <FileText size={15} />
              <span>Quote</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
