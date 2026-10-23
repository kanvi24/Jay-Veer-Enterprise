/**
 * Centralized API configuration and service layer for Jay Veer Enterprise.
 * Communicates with the Django REST Framework backend.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// Base URL for backend media files (e.g. http://127.0.0.1:8000)
export const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const DEFAULT_HEADERS = {
  Accept: "application/json",
};

/**
 * Builds the full media URL for a given product or document image path.
 * Falls back to local product SVG assets or placeholder if null/empty.
 */
export function getMediaUrl(imagePath, slug = "") {
  const knownImages = {
    "filler-granules": "/assets/products/filler-granules.png",
    "ld-granules": "/assets/products/ld-granules.jpg",
    "reprocessed-granules": "/assets/products/reprocessed-granules.webp",
    "color-masterbatch": "/assets/products/color-masterbatch.jpg",
    "custom-plastic-colors": "/assets/products/custom-plastic-colors.webp",
  };

  if (!imagePath) {
    if (slug && knownImages[slug]) {
      return knownImages[slug];
    }
    return "/assets/products/placeholder-granules.svg";
  }

  // If already absolute URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If static frontend asset path (public/assets/...), keep it relative to frontend
  if (imagePath.startsWith("/assets/") || imagePath.startsWith("assets/")) {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  }

  // Strip leading slash if needed and append to backend base URL
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_BASE_URL}${cleanPath}`;
}

/**
 * Parse application string from API (which may be comma-separated or newline-separated)
 * into a clean array of application strings.
 */
export function parseApplications(apps) {
  if (!apps) return [];
  if (Array.isArray(apps)) return apps;
  return apps
    .split(/[\r\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Clean phone numbers to create valid tel: and wa.me links
 */
export function cleanPhone(phone) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

export function getTelLink(phone) {
  const cleaned = cleanPhone(phone);
  return cleaned ? `tel:${cleaned}` : "#";
}

export function getWhatsAppLink(whatsappNumber, message = "Hello Jay Veer Enterprise, I am interested in your plastic raw materials and granules.") {
  const cleaned = cleanPhone(whatsappNumber).replace(/^\+/, "");
  if (!cleaned) return "#";
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function getMailtoLink(email, subject = "Business Enquiry - Jay Veer Enterprise") {
  if (!email) return "#";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Fetch official Company profile from GET /api/company/
 * Returns company object or null if 404 (no record created yet in Django Admin).
 */
export async function getCompany() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE_URL}/company/`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      signal: controller.signal,
    });

    if (response.status === 404) {
      // Clean fallback: No company record configured yet
      return null;
    }

    if (!response.ok) {
      throw new Error("Unable to load this information right now. Please try again later.");
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("Company API request timed out after 10s");
    }
    if (error.message.includes("Unable to load")) {
      throw error;
    }
    // Network errors (e.g. Django server unreachable)
    throw new Error("Unable to load this information right now. Please try again later.");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch active product catalog from GET /api/products/
 * Returns array of active products.
 */
export async function getProducts() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Unable to load this information right now. Please try again later.");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("Products API request timed out after 10s");
    }
    if (error.message.includes("Unable to load")) {
      throw error;
    }
    throw new Error("Unable to load this information right now. Please try again later.");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch single product by slug from GET /api/products/<slug>/
 * Returns product object or null if 404.
 */
export async function getProduct(slug) {
  if (!slug) return null;

  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${encodeURIComponent(slug)}/`,
      {
        method: "GET",
        headers: DEFAULT_HEADERS,
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Unable to load this information right now. Please try again later.");
    }

    return await response.json();
  } catch (error) {
    if (error.message.includes("Unable to load")) {
      throw error;
    }
    throw new Error("Unable to load this information right now. Please try again later.");
  }
}

/**
 * Submit business enquiry to POST /api/enquiries/
 * Returns { success: true, message: string, data: object }
 * or throws { success: false, errors: object, message: string }
 */
export async function submitEnquiry(formData) {
  const payload = {
    name: (formData.name || "").trim(),
    company_name: (formData.company_name || formData.companyName || "").trim(),
    phone: (formData.phone || "").trim(),
    email: (formData.email || "").trim(),
    product: (formData.product || "").trim(),
    quantity: (formData.quantity || "").trim(),
    message: (formData.message || "").trim(),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/enquiries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.status === 201) {
      return {
        success: true,
        message: "Thank you. Your enquiry has been submitted successfully.",
        data: result.data || result,
      };
    }

    if (response.status === 400) {
      // DRF returns validation errors in result.errors or root keys
      const errorMap = result.errors || result;
      const formattedErrors = {};

      for (const [key, val] of Object.entries(errorMap)) {
        if (Array.isArray(val)) {
          formattedErrors[key] = val.join(" ");
        } else if (typeof val === "string") {
          formattedErrors[key] = val;
        }
      }

      return {
        success: false,
        errors: formattedErrors,
        message: "Please check your inputs and correct the errors below.",
      };
    }

    return {
      success: false,
      message: "Unable to submit your enquiry right now. Please try again later or contact us directly.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to connect to the server right now. Please try again later or contact us directly.",
    };
  }
}
