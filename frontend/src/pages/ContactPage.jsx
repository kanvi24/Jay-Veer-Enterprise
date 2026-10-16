import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2
} from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { useProducts } from "../context/ProductsContext";
import { companyData } from "../data/companyData";
import {
  submitEnquiry,
  getTelLink,
  getWhatsAppLink,
  getMailtoLink
} from "../services/api";
import FindUsSection from "../components/FindUsSection";

export default function ContactPage() {
  const { company, fullAddress } = useCompany();
  const { products } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    product: "",
    quantity: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    document.title = "Contact Us | Jay Veer Enterprise - Vijay Patel & Chetan Patel";
  }, []);

  // Prepopulate default product once products load
  useEffect(() => {
    if (!formData.product && products.length > 0) {
      setFormData((prev) => ({
        ...prev,
        product: products[0].name
      }));
    }
  }, [products, formData.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Your full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.product || !formData.product.trim()) {
      newErrors.product = "Please select a target product";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError("");

    try {
      const response = await submitEnquiry({
        name: formData.name,
        company_name: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        product: formData.product,
        quantity: formData.quantity,
        message: formData.message
      });

      if (response.success) {
        setSubmittedSummary({ ...formData });
        setSubmitted(true);
        // Clear form fields as specified in requirements
        setFormData({
          name: "",
          companyName: "",
          phone: "",
          email: "",
          product: products[0]?.name || "Filler Granules",
          quantity: "",
          message: ""
        });
        window.scrollTo({ top: 400, behavior: "smooth" });
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setApiError(response.message || "Failed to submit enquiry. Please verify details.");
      }
    } catch (err) {
      console.warn("Contact form submit error:", err);
      setApiError("Unable to submit your enquiry right now. Please try again later or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedSummary(null);
    setErrors({});
    setApiError("");
    setFormData({
      name: "",
      companyName: "",
      phone: "",
      email: "",
      product: products[0]?.name || "Filler Granules",
      quantity: "",
      message: ""
    });
  };

  const primaryPhone = company?.phone || companyData.contacts[0].displayPhone;
  const rawPrimaryPhone = company?.phone || companyData.contacts[0].phone;
  const primaryWhatsApp = company?.whatsapp_number || companyData.contacts[0].whatsapp;
  const companyEmail = company?.email || companyData.email;
  const displayAddress = fullAddress || companyData.address;
  const googleMapsUrl =
    company?.google_maps_url ||
    companyData.googleMapsUrl ||
    "https://maps.google.com/?q=Prarthana+Estate,+47,+C.T.M,+Amraiwadi,+Ahmedabad,+Gujarat+380026";

  return (
    <div className="contact-page">
      {/* Banner */}
      <section
        className="contact-page-banner subpage-banner"
        style={{
          color: "#ffffff",
          padding: "4rem 0 3.5rem"
        }}
      >
        <div className="container">
          <div className="badge-tag badge-orange" style={{ marginBottom: "1rem" }}>
            Direct Business Connect
          </div>
          <h1 style={{ fontSize: "2.75rem", color: "#ffffff", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Contact <span style={{ color: "var(--color-orange)" }}>{company?.company_name || "Jay Veer Enterprise"}</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.5" }}>
            Get direct pricing, order status, or technical support from our dedicated leaders Vijay Patel and Chetan Patel.
          </p>
        </div>
      </section>

      {/* Main Contact & Enquiry Section */}
      <section className="section-py bg-light-alt">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Direct Phone / WhatsApp / Corporate Details */}
            <div className="contact-info-card">
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-orange)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Key Contacts
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.62rem)",
                    color: "var(--color-text-blue)",
                    textTransform: "uppercase",
                    marginTop: "0.25rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  Speak Directly With Us
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginTop: "0.5rem" }}>
                  No automated call centers or delays. Reach out directly to discuss raw material grades and pricing.
                </p>
              </div>

              {/* Vijay Patel Box */}
              <div className="contact-person-box">
                <div className="contact-person-name">VIJAY PATEL</div>
                <div className="contact-person-role">Key Business Executive</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                  Phone:{" "}
                  <a href={getTelLink(rawPrimaryPhone)} style={{ color: "var(--color-orange)" }}>
                    {primaryPhone}
                  </a>
                </div>
                <div className="contact-person-actions">
                  <a
                    href={getTelLink(rawPrimaryPhone)}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <Phone size={14} />
                    <span>Call Vijay Patel</span>
                  </a>
                  <a
                    href={getWhatsAppLink(primaryWhatsApp, "Hello Vijay Patel, I am interested in Jay Veer Enterprise plastic granules.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Chetan Patel Box */}
              <div className="contact-person-box">
                <div className="contact-person-name">CHETAN PATEL</div>
                <div className="contact-person-role">Sales &amp; Procurement Lead</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-blue)", marginBottom: "0.85rem" }}>
                  Phone:{" "}
                  <a href={getTelLink(companyData.contacts[1].phone)} style={{ color: "var(--color-orange)" }}>
                    {companyData.contacts[1].displayPhone}
                  </a>
                </div>
                <div className="contact-person-actions">
                  <a
                    href={getTelLink(companyData.contacts[1].phone)}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <Phone size={14} />
                    <span>Call Chetan Patel</span>
                  </a>
                  <a
                    href={getWhatsAppLink(companyData.contacts[1].whatsapp, "Hello Chetan Patel, I am interested in Jay Veer Enterprise plastic granules.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Corporate details */}
              <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Mail size={18} style={{ color: "var(--color-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.9rem" }}>
                    <span style={{ display: "block", color: "var(--color-text-blue)", fontWeight: 700 }}>Email Address:</span>
                    <a
                      href={getMailtoLink(companyEmail)}
                      style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
                    >
                      {companyEmail}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                  <MapPin size={18} style={{ color: "var(--color-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.9rem" }}>
                    <span style={{ display: "block", color: "var(--color-text-blue)", fontWeight: 700 }}>Manufacturing / Supply Base:</span>
                    <span style={{ color: "var(--color-text-muted)" }}>{displayAddress}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <Clock size={18} style={{ color: "var(--color-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.9rem" }}>
                    <span style={{ display: "block", color: "var(--color-text-blue)", fontWeight: 700 }}>Business Hours:</span>
                    <span style={{ color: "var(--color-text-muted)" }}>{companyData.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Business Enquiry Form */}
            <div className="enquiry-form-card">
              <h3 className="form-title">Business Enquiry Form</h3>
              <p className="form-subtitle">
                Please submit your plastic raw material specifications and volume requirements. Our sales team will get back to you with competitive factory pricing.
              </p>

              {apiError && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fee2e2",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem 1rem",
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#991b1b",
                    fontSize: "0.9rem"
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{apiError}</span>
                </div>
              )}

              {submitted ? (
                <div>
                  <div className="form-success-banner">
                    <CheckCircle2 size={32} style={{ color: "#10b981", flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontSize: "1.15rem", color: "#065f46", marginBottom: "0.25rem" }}>
                        Thank you. Your enquiry has been submitted successfully.
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "#047857", lineHeight: "1.5" }}>
                        We have recorded your requirement for <strong>{submittedSummary?.product}</strong> ({submittedSummary?.quantity || "General Quantity"}). Vijay Patel or Chetan Patel will review the details and respond promptly.
                      </p>
                    </div>
                  </div>

                  {submittedSummary && (
                    <div style={{ background: "var(--color-bg-light)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", marginBottom: "1.5rem" }}>
                      <h5 style={{ fontSize: "0.95rem", color: "var(--color-text-blue)", marginBottom: "0.5rem" }}>
                        Summary of submitted details:
                      </h5>
                      <div style={{ fontSize: "0.85rem", color: "var(--color-text-main)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        <div><strong>Contact:</strong> {submittedSummary.name}</div>
                        <div><strong>Company:</strong> {submittedSummary.companyName || "N/A"}</div>
                        <div><strong>Phone:</strong> {submittedSummary.phone}</div>
                        <div><strong>Email:</strong> {submittedSummary.email || "N/A"}</div>
                        <div><strong>Product:</strong> {submittedSummary.product}</div>
                        <div><strong>Quantity:</strong> {submittedSummary.quantity || "Not specified"}</div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        Your Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        disabled={submitting}
                      />
                      {errors.name && <span className="invalid-feedback">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="form-control"
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        Mobile / Phone <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        disabled={submitting}
                      />
                      {errors.phone && <span className="invalid-feedback">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        disabled={submitting}
                      />
                      {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        Required Product <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className={`form-control ${errors.product ? "is-invalid" : ""}`}
                        disabled={submitting}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                        <option value="General Plastic Granules">Other / Combined Requirement</option>
                      </select>
                      {errors.product && <span className="invalid-feedback">{errors.product}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="form-control"
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Technical Requirements</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="form-control"
                      disabled={submitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "0.95rem" }}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Submitting to Server...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stylized FIND US Location Section */}
      <FindUsSection />
    </div>
  );
}
