import React from "react";

export default function SectionTitle({
  tagline,
  title,
  description,
  centered = false,
  light = false,
  className = ""
}) {
  return (
    <div className={`section-header ${centered ? "text-center" : ""} ${className}`}>
      {tagline && <span className="section-tagline">{tagline}</span>}
      <h2 className={`section-title ${light ? "light-text" : ""}`}>{title}</h2>
      <div className="section-title-line" />
      {description && (
        <p className={`section-description ${light ? "light-text" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
