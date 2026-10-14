import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EnquiryModal from "./components/EnquiryModal";
import FloatingContact from "./components/FloatingContact";
import ClickEffects from "./components/ClickEffects";

// Context Providers
import { CompanyProvider } from "./context/CompanyContext";
import { ProductsProvider } from "./context/ProductsContext";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import QualityPage from "./pages/QualityPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ContactPage from "./pages/ContactPage";

import "./App.css";

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);

  const handleOpenQuoteModal = (product = null) => {
    setSelectedProductForQuote(product);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProductForQuote(null);
  };

  return (
    <CompanyProvider>
      <ProductsProvider>
        <Router>
          <ScrollToTop />
          <ClickEffects />
          <div className="app-layout">
            <Navbar onOpenQuoteModal={() => handleOpenQuoteModal(null)} />

            <main className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      onOpenQuoteModal={() => handleOpenQuoteModal(null)}
                      onSelectProductForQuote={handleOpenQuoteModal}
                    />
                  }
                />
                <Route
                  path="/about"
                  element={<AboutPage onOpenQuoteModal={() => handleOpenQuoteModal(null)} />}
                />
                <Route
                  path="/products"
                  element={
                    <ProductsPage
                      onOpenQuoteModal={() => handleOpenQuoteModal(null)}
                      onSelectProductForQuote={handleOpenQuoteModal}
                    />
                  }
                />
                <Route
                  path="/products/:slug"
                  element={
                    <ProductDetailPage
                      onOpenQuoteModal={() => handleOpenQuoteModal(null)}
                      onSelectProductForQuote={handleOpenQuoteModal}
                    />
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <ProductDetailPage
                      onOpenQuoteModal={() => handleOpenQuoteModal(null)}
                      onSelectProductForQuote={handleOpenQuoteModal}
                    />
                  }
                />
                <Route
                  path="/quality"
                  element={<QualityPage onOpenQuoteModal={() => handleOpenQuoteModal(null)} />}
                />
                <Route
                  path="/applications"
                  element={<ApplicationsPage onOpenQuoteModal={() => handleOpenQuoteModal(null)} />}
                />
                <Route
                  path="/gallery"
                  element={<Navigate to="/" replace />}
                />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback route */}
                <Route
                  path="*"
                  element={
                    <HomePage
                      onOpenQuoteModal={() => handleOpenQuoteModal(null)}
                      onSelectProductForQuote={handleOpenQuoteModal}
                    />
                  }
                />
              </Routes>
            </main>

            <Footer onOpenQuoteModal={() => handleOpenQuoteModal(null)} />

            {/* Global Floating Quick Contact */}
            <FloatingContact />

            {/* Global Enquiry & Quote Modal */}
            <EnquiryModal
              isOpen={isQuoteModalOpen}
              onClose={handleCloseQuoteModal}
              preselectedProduct={selectedProductForQuote}
            />
          </div>
        </Router>
      </ProductsProvider>
    </CompanyProvider>
  );
}
