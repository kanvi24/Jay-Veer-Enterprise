 # Jay Veer Enterprise — B2B Web Platform
    
    A full-stack enterprise web application and B2B portal for **Jay Veer Enterprise**, a
  manufacturer and supplier of polymer raw materials, masterbatches, LDPE granules, and
  plastic compounding solutions based in Gujarat, India.
    
    ---
    
    ## 🚀 Features
    
    - **Modern Industrial UI / UX**: Clean, high-performance responsive interface built with
  React 19, Tailwind CSS, and Lucide icons.
    - **Product Catalog**: Showcase of polymer products (LD Granules, Filler Granules, Color
  Masterbatch, Additives) with specifications, technical details, and inquiry triggers.
    - **Instant Quotation Request System**: Interactive modal allowing converters, molders,
  and B2B buyers to submit quotation requests with raw material requirements and volumes.
    - **Django REST Backend**: RESTful API endpoints for products, company profile, and
  enquiry submissions.
    - **Dual-Auth Django Admin Panel**: Secure administrative dashboard allowing
  staff/superusers to log in with **either username or email** to review enquiries, update
  products, and manage site content.
    - **Direct Business Contact**: One-click WhatsApp consultation, phone direct dial, and
  location mapping.
    
    ---
    
    ## 🛠️ Tech Stack
    
    ### Frontend
    - **Framework**: React 19
    - **Build Tool**: Vite 8
    - **Routing**: React Router DOM 7
    - **Styling**: Tailwind CSS
    - **Icons**: Lucide React
    - **Linter**: Oxlint
    
    ### Backend
    - **Framework**: Django 5.0
    - **API**: Django REST Framework (DRF) 3.15
    - **Database**: MySQL 8.x (with SQLite3 development fallback)
    - **CORS**: django-cors-headers
    - **Image Processing**: Pillow
    - **Environment**: python-dotenv
    
    ---
    
    ## 📁 Project Structure
    
    ```text
    Jay Veer/
    ├── frontend/                     # React + Vite frontend application
    │   ├── public/                   # Static assets, logos, and product images
    │   ├── src/
    │   │   ├── components/           # UI components (Header, Footer, Modals, Cards)
    │   │   ├── pages/                # Page views (Home, Products, About, Contact)
    │   │   ├── services/             # API client & fetch calls
    │   │   ├── App.jsx               # Main React entry & router configuration
    │   │   └── main.jsx
    │   ├── package.json
    │   └── vite.config.js
    │
    ├── backend/                      # Django REST API backend
    │   ├── config/                   # Project settings, URLs, auth backends
    │   │   ├── backends.py           # Email/Username dual authentication backend
    │   │   ├── settings.py           # Django configuration & DB setup
    │   │   └── urls.py
    │   ├── apps/
    │   │   ├── company/              # Company profile & banner management
    │   │   ├── products/             # Product catalog & specifications
    │   │   └── enquiries/            # B2B quotation enquiry pipeline
    │   ├── media/                    # Uploaded media (product images, brochures)
    │   ├── manage.py
    │   └── requirements.txt
    │
    ├── package.json                  # Root runner scripts
    └── README.md
  ──────
  ## ⚙ Getting Started

  ### Prerequisites
  • Node.js (v18 or higher) & npm
  • Python (v3.10 or higher)
  • MySQL Server (running locally on port 3306)
  ──────
  ### 1. Backend Setup (Django)
  1. Navigate to the backend directory:
    cd backend
  2. Create and activate a Python virtual environment:
    # Windows (PowerShell)
    python -m venv venv
    .\venv\Scripts\Activate.ps1

  3. Install dependencies:
    pip install -r requirements.txt
  4. Configure environment variables:
  Copy .env.example to .env (or configure your existing .env):
    SECRET_KEY=your-secure-secret-key
    DEBUG=True
    ALLOWED_HOSTS=localhost,127.0.0.1
    
    DB_ENGINE=django.db.backends.mysql
    DB_NAME=jay_veer_enterprise
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_HOST=127.0.0.1
    DB_PORT=3306

  5. Run database migrations:
    python manage.py migrate
  6. Create a superuser (for Admin panel access):
    python manage.py createsuperuser
  7. Start the Django development server:
    python manage.py runserver
  Backend will run at: http://127.0.0.1:8000/
  Admin dashboard at: http://127.0.0.1:8000/admin/
  ──────
  ### 2. Frontend Setup (React + Vite)

  1. Open a new terminal and navigate to the frontend directory:
    cd frontend

  2. Install dependencies:
    npm install

  3. Start the Vite dev server:
    npm run dev
  Frontend will run at: http://localhost:5173/
  ──────
  ## 📡 API Endpoints Summary

   Method             | Endpoint              | Description
  --------------------|-----------------------|----------------------------------------------
   GET                | /api/products/        | List all active polymer products
   GET                | /api/products/<slug>/ | Get detailed product specifications
   POST               | /api/enquiries/       | Submit a new B2B quotation request
   GET                | /api/company/info/    | Fetch company info, contact & certifications
  ──────
  ## 🔐 Admin Authentication

  The Django Admin panel supports dual login via EmailOrUsernameBackend:

  • You can log in using either your username OR your registered email address.
  ──────
  ## 📜 License

  Private & Proprietary — Developed for Jay Veer Enterprise. All rights reserved.
