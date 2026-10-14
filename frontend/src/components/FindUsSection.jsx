import React from "react";

export default function FindUsSection() {
  const googleMapsUrl =
    "https://maps.google.com/?q=Prarthana+Estate,+47,+C.T.M,+Amraiwadi,+Ahmedabad,+Gujarat+380026";

  return (
    <section className="location-section-wrapper" id="location-section">
      <div className="container">
        <div className="location-split-card">
          {/* LEFT SIDE: Interactive Google Maps Embed (approx. 55%) */}
          <div className="location-visual-col">
            <iframe
              title="Jay Veer Enterprise Google Map Location"
              src="https://maps.google.com/maps?hl=en&q=Prarthana+Estate,+47,+C.T.M,+Amraiwadi,+Ahmedabad,+Gujarat+380026&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="location-map-iframe"
            />
          </div>

          {/* RIGHT SIDE: Company location information (approx. 45% - Unchanged) */}
          <div className="location-info-col">
            {/* Small orange label */}
            <span className="location-tag-label">FIND US</span>

            {/* Main heading */}
            <h2 className="location-heading">Jay Veer Enterprise</h2>

            {/* Supporting text */}
            <p className="location-supporting-text">
              We are located in Ahmedabad and are ready to serve your plastic raw material requirements.
            </p>

            {/* Thin divider */}
            <div className="location-divider" />

            {/* Address */}
            <div className="location-address-block">
              <p className="location-address-text">
                Prarthana Estate, 47, C.T.M,
                <br />
                Amraiwadi, Ahmedabad,
                <br />
                Gujarat 380026
              </p>
            </div>

            {/* Prominent orange button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="location-directions-btn"
            >
              <span>GET DIRECTIONS →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

