import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  ArrowUp
} from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { useProducts } from "../context/ProductsContext";
import { companyData } from "../data/companyData";
import { getTelLink, getMailtoLink, getWhatsAppLink } from "../services/api";

export default function Footer({ onOpenQuoteModal }) {
  const { company, fullAddress } = useCompany();
  const { products } = useProducts();

  const primaryPhone = company?.phone || companyData.contacts[0].displayPhone;
  const rawPrimaryPhone = company?.phone || companyData.contacts[0].phone;
  const secondaryPhone = companyData.contacts[1].displayPhone;
  const rawSecondaryPhone = companyData.contacts[1].phone;
  const secondaryWhatsapp = companyData.contacts[1].whatsapp;
  const companyEmail = company?.email || companyData.email;
  const displayAddress = fullAddress || companyData.address;
  const whatsappNumber = company?.whatsapp_number || companyData.contacts[0].whatsapp;
  const companyName = company?.company_name || companyData.name;
  const mapsUrl =
    company?.google_maps_url ||
    companyData.googleMapsUrl ||
    "https://maps.google.com/?q=Prarthana+Estate,+47,+C.T.M,+Amraiwadi,+Ahmedabad,+Gujarat+380026";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const defaultProducts = [
    { id: "1", name: "Filler Granules", slug: "filler-granules" },
    { id: "2", name: "LD Granules", slug: "ld-granules" },
    { id: "3", name: "Reprocessed Granules", slug: "reprocessed-granules" },
    { id: "4", name: "Color Masterbatch", slug: "color-masterbatch" },
    { id: "5", name: "Custom Plastic Colors", slug: "custom-plastic-colors" },
  ];

  const productList = products && products.length > 0 ? products : defaultProducts;

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Quality", path: "/quality" },
    { name: "Applications", path: "/applications" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="footer-wrap">
      <div className="container">
        {/* Main 4-Column Corporate Grid */}
        <div className="footer-grid">
          {/* Column 1: Jay Veer Enterprise & Short Description */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <div className="brand-shield" style={{ width: "42px", height: "42px", flexShrink: 0 }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M50 4 L88 18 C88 56 68 85 50 96 C32 85 12 56 12 18 Z"
                    fill="#071526"
                    stroke="#FE691E"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <text
                    x="35"
                    y="62"
                    fontFamily="'Montserrat', sans-serif"
                    fontWeight="900"
                    fontSize="32"
                    fill="#ffffff"
                    letterSpacing="-1"
                  >
                    JV
                  </text>
                  <circle cx="50" cy="74" r="4" fill="#FE691E" />
                </svg>
              </div>
              <div>
                <h3 className="footer-brand-title">{companyName}</h3>
                <span className="footer-brand-sub">Plastic Raw Material Solutions</span>
              </div>
            </div>

            <p className="footer-desc">
              {company?.description ||
                "Dedicated manufacturer and supplier of plastic raw materials and granules, serving plastic converters, injection molders, and blown film producers across India."}
            </p>

            <div className="footer-actions-wrap">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenQuoteModal}
              >
                <span>GET A QUOTE</span>
              </button>
              <a
                href={getWhatsAppLink(whatsappNumber, "Hello Jay Veer Enterprise, I would like to enquire about plastic raw materials.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    <ChevronRight size={14} className="footer-arrow-icon" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="footer-col">
            <h4 className="footer-col-title">Products</h4>
            <ul className="footer-links-list">
              {productList.map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.slug || p.id}`} className="footer-link">
                    <ChevronRight size={14} className="footer-arrow-icon" />
                    <span>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Contact Information</h4>

            <div className="footer-contact-block">
              <div className="footer-contact-row">
                <Phone size={15} className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">Vijay Patel:</span>
                  <a href={getTelLink(rawPrimaryPhone)} className="footer-contact-val">
                    {primaryPhone}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Phone size={15} className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">Chetan Patel:</span>
                  <a href={getTelLink(rawSecondaryPhone)} className="footer-contact-val">
                    {secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Mail size={15} className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">Email:</span>
                  <a href={getMailtoLink(companyEmail)} className="footer-contact-val">
                    {companyEmail}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <MapPin size={15} className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">Plant Works:</span>
                  <span className="footer-contact-val" style={{ display: "block" }}>
                    {displayAddress}
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-map-link"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-bottom-copy">
            © {new Date().getFullYear()} {companyName}. All Rights Reserved.
          </p>

          <button
            type="button"
            className="footer-scroll-top-btn"
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
