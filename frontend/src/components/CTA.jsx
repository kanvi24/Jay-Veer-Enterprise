import React from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, FileText } from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { companyData } from "../data/companyData";
import { getTelLink } from "../services/api";

export default function CTA({ onOpenQuoteModal }) {
  const { company } = useCompany();

  const primaryPhone = company?.phone || companyData.contacts[0].displayPhone;
  const rawPrimaryPhone = company?.phone || companyData.contacts[0].phone;
  const secondaryPhone = companyData.contacts[1].displayPhone;
  const rawSecondaryPhone = companyData.contacts[1].phone;

  return (
    <section className="section-py-sm cta-section-wrap">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-grid">
            <div className="cta-content-col">
              <span className="cta-tag">B2B Raw Material Partner</span>
              <h2 className="cta-title">
                LOOKING FOR RELIABLE PLASTIC RAW MATERIALS?
              </h2>
              <p className="cta-desc">
                Connect with Jay Veer Enterprise for your material requirements.
              </p>

              <div className="cta-direct-contacts">
                <a href={getTelLink(rawPrimaryPhone)} className="cta-contact-pill">
                  <Phone size={15} />
                  <span>Vijay Patel: <strong>{primaryPhone}</strong></span>
                </a>
                <a href={getTelLink(rawSecondaryPhone)} className="cta-contact-pill">
                  <Phone size={15} />
                  <span>Chetan Patel: <strong>{secondaryPhone}</strong></span>
                </a>
              </div>
            </div>

            <div className="cta-actions-col">
              <Link to="/contact" className="btn btn-outline-white">
                <span>CONTACT US</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onOpenQuoteModal}
              >
                <FileText size={16} />
                <span>GET A QUOTE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
