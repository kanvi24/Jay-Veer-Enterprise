import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { companyData } from "../data/companyData";
import { getTelLink, getWhatsAppLink } from "../services/api";

export default function FloatingContact() {
  const { company } = useCompany();

  const whatsappNumber = company?.whatsapp_number || companyData.contacts[0].whatsapp;
  const rawPhone = company?.phone || companyData.contacts[0].phone;

  return (
    <div className="floating-actions" aria-label="Quick Contact Options">
      <a
        href={getWhatsAppLink(whatsappNumber, "Hello Jay Veer Enterprise, I am interested in plastic raw materials granules.")}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={getTelLink(rawPhone)}
        className="floating-btn floating-call"
        title="Direct Call"
        aria-label="Call Jay Veer Enterprise"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
