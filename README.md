# Clyptus — Enterprise Technology & Talent Solutions

An enterprise web application built for **Clyptus**, showcasing three core pillars:
1. **SAP Consulting, Implementation & Support Services** (S/4HANA, BTP, BRIM, AMS)
2. **AI Development & Automation Services** (Custom AI Agents, CrewAI, Workflow Automation, RAG, Databricks)
3. **IT & SAP Recruitment and Staffing Services** (Contract, Permanent, Executive Search, Global RPO)

Built with **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS v4**, **Three.js**, and **Framer Motion**.

---

## 🚀 Quick Start Guide

### Prerequisites
Ensure you have the following installed on your machine:
* **Node.js**: `v18.0.0` or higher (recommended: Node 20+ LTS)
* **npm**: `v9.0.0` or higher (bundled with Node.js)
* **Git**

Verify your versions:
```bash
node -v
npm -v
git --version
```

---

### 1. Clone the Repository
```bash
git clone https://github.com/khaja9963/Mixing-2.O.git
cd Mixing-2.O
```

### 2. Install Dependencies
Install all project dependencies using npm:
```bash
npm install
```

### 3. Run the Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Open your browser and navigate to:
* **Local:** [http://localhost:5173/](http://localhost:5173/)
* **Network:** Check your terminal output for the local network IP (e.g. `http://192.168.x.x:5173/`).

---

## 📦 Available Scripts

In the project root, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with instant HMR at `http://localhost:5173/`. |
| `npm run build` | Compiles TypeScript (`tsc -b`) and generates optimized production bundles for all multi-page entries in `dist/`. |
| `npm run preview` | Locally serves the production build from `dist/` to preview performance before deploying. |
| `npm run lint` | Runs `oxlint` for fast code linting and style validation. |

---

## 🌐 Multi-Page & SEO Architecture

The application is structured for both single-page client transitions and multi-page static search engine indexing.

### Verified Routes
Each route has its own dedicated static HTML page with unique Title, Meta Description, Canonical URL, Open Graph cards, and Schema.org Structured Data:

* **Homepage (`/`):** [`index.html`](index.html) — `https://clyptus.com/`
* **SAP Services (`/sap` or `/#sap`):** [`sap/index.html`](sap/index.html) — `https://clyptus.com/sap`
* **AI Development (`/ai` or `/#ai`):** [`ai/index.html`](ai/index.html) — `https://clyptus.com/ai`
* **IT Recruiting (`/recruiting` or `/#recruiting`):** [`recruiting/index.html`](recruiting/index.html) — `https://clyptus.com/recruiting`
* **Contact (`/contact` or `/#contact`):** [`contact/index.html`](contact/index.html) — `https://clyptus.com/contact`

### Search Engine Crawling & Verification
* **Sitemap:** [`public/sitemap.xml`](public/sitemap.xml) (Accessible at `https://clyptus.com/sitemap.xml`)
* **Robots File:** [`public/robots.txt`](public/robots.txt) (Accessible at `https://clyptus.com/robots.txt`)
* **1200 × 630 px Social Banner:** [`public/clyptus-og-banner.png`](public/clyptus-og-banner.png) (Guarantees crisp preview cards on LinkedIn, WhatsApp, Facebook, and Twitter/X)

---

## 🔒 Security & Server Architecture

The application includes an enterprise server layer providing secure authentication, rate-limiting, confidential document access, and inquiry handling with local Vite dev parity and Vercel serverless functions.

### Environment Variables
Configure the following optional variables in `.env` (local) or Vercel Environment Variables:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `SESSION_SECRET` | 32+ character HMAC secret used to sign session cookies | Secure random fallback |
| `AUTH_CLYPTUS_HASH` | PBKDF2-SHA512 hash for the `clyptus` administrative user | Pre-computed PBKDF2 hash |
| `AUTH_CLYPTUS_SALT` | Cryptographic salt for `clyptus` user password | Pre-computed salt |
| `AUTH_AUDIT_HASH` | PBKDF2-SHA512 hash for the `audit` compliance user | Pre-computed PBKDF2 hash |
| `AUTH_AUDIT_SALT` | Cryptographic salt for `audit` user password | Pre-computed salt |
| `RESEND_API_KEY` | Optional: Resend API Key for automatic contact email delivery | None (logs to `server/logs/inquiries.jsonl`) |
| `CONTACT_RECEIVER_EMAIL` | Optional: Destination email address for customer inquiries | `contact@clyptus.com` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Optional: Custom SMTP server credentials | None |

### Rotating Administrative Credentials
To generate a new PBKDF2 salt and hash for credential rotation:
```bash
node scripts/generate-password-hash.js "YourNewSecurePasswordHere"
```
Copy the generated `SALT` and `HASH` values into your environment variables (`AUTH_CLYPTUS_SALT` / `AUTH_CLYPTUS_HASH`).

### Protected HR & Compliance Documents
Confidential employee handbooks and audit documents are located in `server/protected-documents/`. They are:
1. Excluded from `dist/` and `public/` builds.
2. Delivered exclusively through authenticated endpoint `/api/documents?id=<policy-id>`.
3. Protected by session cookie verification (`HttpOnly`, `SameSite=Lax`, `Secure` in HTTPS) and path traversal prevention.

---

## ⚙️ Configuration Before Production Launch

Before launching to production:

1. **Google Analytics 4 (GA4):**
   * Replace `G-XXXXXXXXXX` in `index.html` and subpages with your verified production measurement ID.
2. **Google Search Console (GSC):**
   * Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` with your verification token.
3. **Contact Email Provider (Optional):**
   * Add `RESEND_API_KEY` or SMTP credentials in your hosting platform environment variables to deliver incoming inquiries directly to your inbox. Inquiries are always safely stored in `server/logs/inquiries.jsonl`.
4. **Deploying on Vercel:**
   * Build Command: `npm run build`
   * Output Directory: `dist`
   * Serverless functions in `api/` will deploy automatically.

---

### Step 1: Create Production Build
```bash
npm run build
```
This outputs all compiled assets to the `dist/` directory:
```
dist/
├── index.html            # Home page
├── sap/index.html        # SAP page
├── ai/index.html         # AI page
├── recruiting/index.html # Recruiting page
├── contact/index.html    # Contact page
├── sitemap.xml
├── robots.txt
├── clyptus-og-banner.png
└── assets/               # Minified JS, CSS, and optimized images
```

### Step 2: Test Locally
```bash
npm run preview
```

### Step 3: Deploy `dist/` to Your Host
Deploy the contents of the `dist/` folder to your hosting provider:
* **Vercel / Netlify:** Connect the GitHub repository and set build command to `npm run build` with output directory `dist`.
* **Nginx / Apache / Shared Hosting:** Upload all files inside `dist/` directly to your `public_html` or web root directory.
* **Cloudflare Pages:** Set framework preset to `Vite`, build command to `npm run build`, and output folder to `dist`.

---

## 🛠️ Technology Stack

* **Frontend Library:** [React 19](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite 8](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Motion & Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
* **3D & Visualizations:** [Three.js](https://threejs.org/) & [Globe.gl](https://globe.gl/)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 🏢 Official Social Media Channels

* **LinkedIn:** [Clyptus on LinkedIn](https://www.linkedin.com/company/clyptus/posts/)
* **Facebook:** [Clyptus on Facebook](https://www.facebook.com/share/19amDstBuo/)
* **Instagram:** [@clyptussoftwaresolutions](https://instagram.com/clyptussoftwaresolutions?vrfl=c2JucW9hcGRrZWts)
* **YouTube:** [Clyptus Official Channel](https://www.youtube.com/)

---

## 📄 License
Private & Proprietary © 2026 Clyptus Software Solutions. All rights reserved.
