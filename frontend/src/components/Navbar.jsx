import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { useProducts } from "../context/ProductsContext";
import { companyData } from "../data/companyData";
import { getTelLink, getMailtoLink } from "../services/api";

const CANONICAL_PRODUCTS = [
  { slug: "filler-granules", name: "Filler Granules" },
  { slug: "ld-granules", name: "LD Granules" },
  { slug: "reprocessed-granules", name: "Reprocessed Granules" },
  { slug: "color-masterbatch", name: "Color Masterbatch" },
  { slug: "custom-plastic-colors", name: "Custom Plastic Colors" }
];

export default function Navbar({ onOpenQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { company } = useCompany();
  const { products } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Quality", path: "/quality" },
    { name: "Applications", path: "/applications" },
    { name: "Contact Us", path: "/contact" }
  ];

  const displayProductItems = CANONICAL_PRODUCTS.map((item) => {
    const apiItem = (products || []).find(
      (p) => p.slug === item.slug || String(p.id) === item.slug
    );
    return {
      slug: item.slug,
      name: apiItem?.name || item.name
    };
  });

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  };

  const handleProductSelect = (slug) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (location.pathname === "/products") {
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/products#${slug}`);
      }
    } else {
      navigate(`/products#${slug}`);
    }
  };

  const primaryPhone = company?.phone || companyData.contacts[0].displayPhone;
  const rawPrimaryPhone = company?.phone || companyData.contacts[0].phone;
  const secondaryPhone = companyData.contacts[1].displayPhone;
  const rawSecondaryPhone = companyData.contacts[1].phone;
  const companyEmail = company?.email || companyData.email;

  return (
    <>
      {/* Main Sticky Navbar */}
      <header className="navbar-header">
        <div className="container navbar-container">
          {/* Logo / Brand */}
          <Link to="/" className="brand-logo-link" onClick={handleLinkClick}>
            <div className="brand-shield">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 4 L88 18 C88 56 68 85 50 96 C32 85 12 56 12 18 Z"
                  fill="#0c2340"
                  stroke="#FE691E"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path d="M40 18 L45 23 L50 16 L55 23 L60 18 L58 26 L42 26 Z" fill="#FE691E" />
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
            <div className="brand-text">
              <span className="brand-title">JAY VEER</span>
              <span className="brand-subtitle">ENTERPRISE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => {
              if (link.name === "Products") {
                return (
                  <div
                    key={link.path}
                    className="nav-item-dropdown"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""} has-dropdown`
                      }
                      onClick={() => {
                        setProductsDropdownOpen(false);
                        if (location.pathname === "/products") {
                          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                        }
                      }}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={14}
                        className={`nav-dropdown-chevron ${
                          productsDropdownOpen ? "open" : ""
                        }`}
                      />
                    </NavLink>

                    <div
                      className={`nav-dropdown-menu ${
                        productsDropdownOpen ? "show" : ""
                      }`}
                      role="menu"
                      aria-label="Products menu"
                    >
                      {displayProductItems.map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          className="nav-dropdown-item"
                          onClick={() => handleProductSelect(p.slug)}
                          role="menuitem"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Header Action: GET A QUOTE */}
          <div className="header-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm btn-quote"
              onClick={onOpenQuoteModal}
            >
              <span>GET A QUOTE</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-text">
                <span className="brand-title">JAY VEER</span>
                <span className="brand-subtitle">ENTERPRISE</span>
              </div>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mobile-drawer-links">
              {navLinks.map((link) => (
                <React.Fragment key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "active" : ""}`
                    }
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </NavLink>

                  {link.name === "Products" && (
                    <div className="mobile-product-sublinks">
                      {displayProductItems.map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          className="mobile-product-subitem"
                          onClick={() => handleProductSelect(p.slug)}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: "100%" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
              >
                <span>GET A QUOTE</span>
                <ArrowRight size={16} />
              </button>

              <div className="mobile-drawer-contact-info">
                <div>
                  <strong>Vijay Patel:</strong>{" "}
                  <a href={getTelLink(rawPrimaryPhone)}>{primaryPhone}</a>
                </div>
                <div>
                  <strong>Chetan Patel:</strong>{" "}
                  <a href={getTelLink(rawSecondaryPhone)}>{secondaryPhone}</a>
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <a href={getMailtoLink(companyEmail)}>{companyEmail}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
