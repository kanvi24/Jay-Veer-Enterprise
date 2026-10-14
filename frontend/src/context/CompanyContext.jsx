import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getCompany,
  getTelLink,
  getWhatsAppLink,
  getMailtoLink,
} from "../services/api";

const CompanyContext = createContext(null);

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCompany();
      setCompany(data);
    } catch (err) {
      console.warn("Company data fetch notice:", err.message);
      setError("Unable to load this information right now. Please try again later.");
      setCompany(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  // Derived formatted values
  const fullAddress = company
    ? (company.address && (company.address.includes("Ahmedabad") || company.address.includes("Gujarat"))
        ? company.address
        : [company.address, company.city, company.state, company.country].filter(Boolean).join(", "))
    : "";

  const telLink = getTelLink(company?.phone);
  const getCustomWhatsAppLink = (message) =>
    getWhatsAppLink(company?.whatsapp_number, message);
  const getCustomMailtoLink = (subject) =>
    getMailtoLink(company?.email, subject);

  return (
    <CompanyContext.Provider
      value={{
        company,
        loading,
        error,
        fullAddress,
        telLink,
        getWhatsAppLink: getCustomWhatsAppLink,
        getMailtoLink: getCustomMailtoLink,
        refetchCompany: fetchCompanyData,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
