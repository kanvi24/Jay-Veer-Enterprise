import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Send, AlertCircle, Loader2 } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import { useCompany } from "../context/CompanyContext";
import { submitEnquiry } from "../services/api";

export default function EnquiryModal({ isOpen, onClose, preselectedProduct = null }) {
  const { products } = useProducts();
  const { company, telLink } = useCompany();

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
  const [submittedName, setSubmittedName] = useState("");
  const [submittedProduct, setSubmittedProduct] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: preselectedProduct.name
      }));
    } else if (products.length > 0) {
      setFormData((prev) => ({
        ...prev,
        product: prev.product || products[0].name
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        product: prev.product || "Filler Granules"
      }));
    }
  }, [preselectedProduct, isOpen, products]);

  if (!isOpen) return null;

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
      newErrors.name = "Contact name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.product || !formData.product.trim()) {
      newErrors.product = "Please select a product";
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
        setSubmittedName(formData.name);
        setSubmittedProduct(formData.product);
        setSubmitted(true);
        // Clear form after successful submission
        setFormData({
          name: "",
          companyName: "",
          phone: "",
          email: "",
          product: products[0]?.name || "Filler Granules",
          quantity: "",
          message: ""
        });
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setApiError(response.message || "Failed to submit enquiry. Please verify details.");
      }
    } catch (err) {
      console.warn("Enquiry submit error:", err);
      setApiError("Unable to submit your enquiry right now. Please try again later or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedName("");
    setSubmittedProduct("");
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
    onClose();
  };

  const primaryPhone = company?.phone || "+91 90990 66131";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        <div className="modal-header">
          <div>
            <h3 id="modal-heading" className="modal-title">
              Request Business Quotation
            </h3>
            <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
              {company?.company_name || "Jay Veer Enterprise"} • Fast B2B Rate Response
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ color: "var(--color-text-muted)", padding: "0.4rem", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          {apiError && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fee2e2",
                borderRadius: "var(--radius-md)",
                padding: "0.75rem 1rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#991b1b",
                fontSize: "0.88rem"
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{apiError}</span>
            </div>
          )}

          {submitted ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#ecfdf5",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem"
                }}
              >
                <CheckCircle2 size={38} />
              </div>
              <h4 style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>
                Thank you. Your enquiry has been submitted successfully.
              </h4>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.95rem",
                  marginBottom: "1.5rem",
                  lineHeight: "1.5"
                }}
              >
                Thank you <strong>{submittedName}</strong>. Our team has received your quotation request for{" "}
                <strong>{submittedProduct}</strong> and will get in touch with you shortly.
              </p>

              <div
                style={{
                  background: "var(--color-bg-light)",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                  fontSize: "0.85rem",
                  border: "1px dashed var(--color-border-dark)"
                }}
              >
                <strong>Need immediate assistance?</strong> Call directly:
                <br />
                <a
                  href={telLink}
                  style={{ color: "var(--color-orange)", fontWeight: 700 }}
                >
                  Direct Sales: {primaryPhone}
                </a>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReset}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span style={{ color: "#ef4444" }}>*</span>
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
                    Phone / Mobile <span style={{ color: "#ef4444" }}>*</span>
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
                    Product Required <span style={{ color: "#ef4444" }}>*</span>
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
                    <option value="General Polymer Requirement">Other / General Requirement</option>
                  </select>
                  {errors.product && <span className="invalid-feedback">{errors.product}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity (Optional)</label>
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
                <label className="form-label">Requirements / Notes</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="form-control"
                  disabled={submitting}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="spinner-icon" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Quote Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
