# Clyptus Software Solutions — Enterprise Technology & Talent Platform

Official web application and digital enterprise portal for **Clyptus Software Solutions** (SAP Silver Partner).

The platform showcases Clyptus's 8 core enterprise technology practices, global delivery infrastructure across India, UAE, and the USA, executive leadership, client case studies, a protected HR policy portal, and **Keva**, our AI assistant powered by Groq LLM integration with automatic local fallback.

Built with **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS v4**, **Three.js**, **Globe.gl**, and **Framer Motion**.

---

## 📋 Table of Contents
1. [System Requirements](#-system-requirements)
2. [Requirements Installation Commands](#-requirements-installation-commands)
3. [Quick Start & Setup Process](#-quick-start--setup-process)
4. [Environment Configuration (`.env`)](#-environment-configuration-env)
5. [All Available Processes & Scripts](#-all-available-processes--scripts)
6. [Multi-Page Architecture & Route Directory](#-multi-page-architecture--route-directory)
7. [Backend & Server Architecture](#-backend--server-architecture)
8. [Keva AI Chatbot Architecture](#-keva-ai-chatbot-architecture)
9. [Production Build & Deployment Guide](#-production-build--deployment-guide)
10. [Troubleshooting & FAQs](#-troubleshooting--faqs)

---

## 💻 System Requirements

Before running the project, verify that your machine meets the following minimum requirements:

| Component | Minimum Requirement | Recommended |
| :--- | :--- | :--- |
| **Operating System** | Windows 10/11, macOS 12+, or Ubuntu 20.04+ | Any modern 64-bit OS |
| **Node.js** | `v18.0.0` or higher | `v20.x` or `v22.x` (LTS) |
| **npm** | `v9.0.0` or higher | `v10.x` (bundled with Node.js) |
| **Git** | `v2.30.0` or higher | Latest stable Git |
| **Memory (RAM)** | 4 GB minimum | 8 GB or higher |
| **Storage** | 500 MB free space | 1 GB free space |
| **Web Browser** | Chrome, Edge, Firefox, Safari (WebGL-enabled) | Latest Chrome / Edge |

---

## 🛠️ Requirements Installation Commands

Follow the commands below for your operating system to install the prerequisites:

### 1. Verify Existing Installations
Check if Node.js, npm, and Git are already installed:
```bash
node -v
npm -v
git --version
```

---

### 2. Installing Prerequisites by Operating System

#### Windows (via winget or official installer)
Option A: Using Windows Package Manager (`winget` in PowerShell / Command Prompt as Administrator):
```powershell
# Install Node.js LTS
winget install OpenJS.NodeJS.LTS

# Install Git
winget install Git.Git
```

Option B: Manual Download:
* [Download Node.js LTS (Windows Installer .msi)](https://nodejs.org/)
* [Download Git for Windows](https://git-scm.com/download/win)

#### macOS (via Homebrew)
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js LTS and Git
brew install node@20 git
```

#### Linux (Ubuntu / Debian)
```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Git and build essentials
sudo apt install -y git curl build-essential

# Install Node.js 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 🚀 Quick Start & Setup Process

Follow these step-by-step instructions to get the application running locally from scratch:

### Step 1: Clone the Repository
```bash
git clone https://github.com/kushipeethani/final-clyptus-website.git
cd final-clyptus-website
```

### Step 2: Install Project Dependencies
Run `npm install` to download and install all required runtime and developer packages:
```bash
npm install
```

> **What gets installed:**
> * **Frontend Core**: `react` (v19), `react-dom`, `typescript` (~6.0), `vite` (v8)
> * **Styling**: `tailwindcss` (v4), `@tailwindcss/vite`
> * **Animations & 3D**: `framer-motion`, `gsap`, `three`, `globe.gl`
> * **PDF & Utilities**: `pdfjs-dist`, `dompurify`, `lucide-react`, `oxlint`

### Step 3: Configure Environment Variables
Copy the example environment file:
* **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
* **macOS / Linux:**
  ```bash
  cp .env.example .env
  ```

*(Optional)* Open `.env` and insert your **Groq API Key** to enable cloud-powered conversational completions for the Keva chatbot:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
> **Tip:** You can obtain a free Groq API key with generous limits from [console.groq.com/keys](https://console.groq.com/keys). If no key is set or quota is reached, Keva automatically runs on the high-speed built-in local engine!

### Step 4: Start the Development Server
```bash
npm run dev
```

The application will start with instant Hot Module Replacement (HMR) at:
* **Local URL:** [http://localhost:5173/](http://localhost:5173/)
* **Network URL:** Displayed in the terminal for testing on mobile or other devices on the same Wi-Fi.

---

## ⚙️ Environment Configuration (`.env`)

The project supports optional environment variables defined in `.env`:

| Variable | Description | Default / Fallback |
| :--- | :--- | :--- |
| `GROQ_API_KEY` | Groq API Key powering the Keva AI assistant | Built-in local QA rule engine |
| `SESSION_SECRET` | 32+ character HMAC secret used to sign session cookies for protected HR policies | Ephemeral secure random secret |
| `AUTH_CLYPTUS_SALT` | Cryptographic salt for `clyptus` user login | Pre-computed PBKDF2 salt |
| `AUTH_CLYPTUS_HASH` | PBKDF2-SHA512 hash for `clyptus` user password | Pre-computed PBKDF2 hash |
| `AUTH_AUDIT_SALT` | Cryptographic salt for `audit` user login | Pre-computed PBKDF2 salt |
| `AUTH_AUDIT_HASH` | PBKDF2-SHA512 hash for `audit` user password | Pre-computed PBKDF2 hash |
| `RESEND_API_KEY` | Resend API key for direct contact form email forwarding | Logged to `server/logs/inquiries.jsonl` |
| `CONTACT_RECEIVER_EMAIL` | Destination mailbox for customer inquiries | `contact@clyptus.com` |
| `SMTP_HOST`, `SMTP_PORT` | Custom SMTP host & port if using SMTP instead of Resend | None |
| `SMTP_USER`, `SMTP_PASS` | Custom SMTP authentication credentials | None |
| `VITE_DOMAIN` | Canonical domain for structured metadata | `https://clyptus.com` |

---

## ⚡ All Available Processes & Scripts

All primary development, verification, and deployment processes are accessible through npm scripts:

| Command | Process Description |
| :--- | :--- |
| **`npm run dev`** | Starts the Vite development server with backend API middleware at `http://localhost:5173/`. |
| **`npm run build`** | Runs TypeScript type checking (`tsc -b`) and generates production bundles for all 15 multi-page routes in `dist/`. |
| **`npm run preview`** | Serves the production build from `dist/` locally to test real performance before deploying. |
| **`npm run lint`** | Runs `oxlint` for high-speed static code analysis, syntax verification, and linting. |
| **`npm run tunnel`** | Launches a Cloudflare Tunnel daemon to expose your local development server to a secure public HTTPS URL. |

### Command Execution Details

#### 1. Running the Development Server
```bash
npm run dev
```
Starts Vite on port `5173`. Includes integrated Vite API middleware handling `/api/chat`, `/api/contact`, `/api/auth/*`, and `/api/documents`.

#### 2. Running a Production Build
```bash
npm run build
```
Executes two tasks in sequence:
1. `tsc -b`: Validates all TypeScript types across the entire project.
2. `vite build`: Bundles all pages, minifies assets, optimizes styles with Tailwind v4, and generates the `dist/` distribution folder.

#### 3. Previewing the Production Build
```bash
npm run preview
```
Runs a local web server serving the `dist/` output folder so you can verify that production bundles, assets, and routes load smoothly.

#### 4. Linting Code
```bash
npm run lint
```
Uses `oxlint` to scan files for errors, unused variables, and code health.

#### 5. Exposing via Cloudflare Tunnel
```bash
npm run tunnel
```
Connects `http://localhost:5173` through `cloudflared` to a public `trycloudflare.com` HTTPS URL for remote stakeholder testing.

---

## 🌐 Multi-Page Architecture & Route Directory

The application uses a hybrid architecture: it behaves as an instant, smooth single-page application (SPA) while generating separate static HTML entry points for maximum SEO indexing:

| Page Route | Source HTML Entry | Primary Topics Covered |
| :--- | :--- | :--- |
| **`/`** | [`index.html`](index.html) | Flagship 3D spiral hero, live corporate metrics, enterprise overview. |
| **`/services`** | [`services/index.html`](services/index.html) | All 8 enterprise technology practices, solution matrix. |
| **`/sap`** | [`sap/index.html`](sap/index.html) | SAP S/4HANA, SAP BRIM, Clean Core, SAP BTP, 24/7 Managed AMS. |
| **`/ai`** | [`ai/index.html`](ai/index.html) | Custom GenAI LLMs, autonomous agent swarms, MLOps, Industry 4.0. |
| **`/cloud`** | [`cloud/index.html`](cloud/index.html) | AWS, Azure, GCP, Kubernetes, Terraform IaC, multi-cloud migrations. |
| **`/security`** | [`security/index.html`](security/index.html) | 24/7 Managed SOC, Zero-Trust Architecture, ISO 27001, SOC 2 Type II. |
| **`/crm`** | [`crm/index.html`](crm/index.html) | Microsoft Dynamics 365, SAP CX, CPQ, revenue operations. |
| **`/salesforce`** | [`salesforce/index.html`](salesforce/index.html) | Salesforce Agentforce AI, Sales & Service Cloud, LWC, MuleSoft. |
| **`/data-engineering`** | [`data-engineering/index.html`](data-engineering/index.html) | Snowflake, Databricks, BigQuery, Kafka streaming, dbt transforms. |
| **`/recruiting`** | [`recruiting/index.html`](recruiting/index.html) | Contract staffing, permanent placement, executive search, CoE. |
| **`/industries`** | [`industries/index.html`](industries/index.html) | Banking & BFSI, Healthcare, Retail & CPG, Manufacturing, Telecom. |
| **`/about`** | [`about/index.html`](about/index.html) | Company journey since 2014, leadership team, corporate vision. |
| **`/careers`** | [`careers/index.html`](careers/index.html) | Active vacancies, hiring perks, application submission. |
| **`/blogs`** | [`blogs/index.html`](blogs/index.html) | Technical whitepapers, 2026 SAP roadmap, architecture deep dives. |
| **`/contact`** | [`contact/index.html`](contact/index.html) | Interactive 3D globe, regional hub selector (India, Dubai, USA). |

---

## 🔒 Backend & Server Architecture

The server functionality runs seamlessly in both development (via Vite middleware plugin `server/viteApiPlugin.ts`) and production (via Vercel/Node serverless handlers):

### Active Endpoints:
* **`/api/chat` (`POST`)**: Handles chatbot queries for Keva. Connects to Groq cloud API or triggers instant auto-fallback to local knowledge base.
* **`/api/contact` (`POST`)**: Processes client contact inquiries, stores them in `server/logs/inquiries.jsonl`, and dispatches emails via Resend/SMTP if configured.
* **`/api/auth/login` (`POST`)**: Authenticates corporate and compliance personnel accessing protected HR handbooks.
* **`/api/auth/logout` (`POST`)**: Invalidates the active session cookie.
* **`/api/auth/session` (`GET`)**: Verifies current session status.
* **`/api/documents` (`GET`)**: Serves confidential PDF documents located in `server/protected-documents/` exclusively to verified sessions.

---

## 🤖 Keva AI Chatbot Architecture

Keva is the intelligent enterprise assistant for Clyptus (`src/components/ClyptusAiChatbot.tsx`):

### Key Capabilities:
1. **Grounded Company Knowledge**:
   - Covers all 8 enterprise practices, executive leadership (CEO Vamsi Krishna Are, Operations Manager Satya Narayana K, Project Manager Nandhini P), company journey since 2014, and all Indian delivery hubs (Hyderabad, Bengaluru, Chennai, Vijayawada, Indore).
2. **Instant Quota & Rate-Limit Auto-Fallback**:
   - If a configured Groq API key exhausts its rate limit (HTTP 429) or billing quota, Keva activates an automatic 60-second cooldown and seamlessly answers from the local knowledge engine with **zero delay**.
3. **Strict Website-Scope Guardrail**:
   - If an off-topic or unrelated question is asked (e.g. food recipes, sports, weather, politics, jokes), Keva politely replies with the approved corporate message:
   > *"I’m here to help with questions about Clyptus Software Solutions and its services. If you have any queries related to our products, support, or anything else Clyptus‑related, feel free to ask!"*

---

## 🚢 Production Build & Deployment Guide

### Building for Production
Run the build script:
```bash
npm run build
```
This generates the optimized `dist/` directory:
```
dist/
├── index.html            # Main home page
├── services/index.html   # Services hub
├── sap/index.html        # SAP ERP page
├── ai/index.html         # AI & GenAI page
├── contact/index.html    # Contact page
├── ...                   # All other subpages
├── sitemap.xml           # Verified XML sitemap
├── robots.txt            # Search engine directives
├── clyptus-og-banner.png # 1200x630 social preview card
└── assets/               # Minified CSS, JS bundles, and optimized images
```

### Deploying to Hosting Platforms

#### Deploy to Vercel
1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Vercel automatically detects Vite:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Add environment variables (`GROQ_API_KEY`, `SESSION_SECRET`, etc.) in the Vercel Project Settings.

#### Deploy to Netlify
1. Connect repository in Netlify.
2. Build Settings:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
3. Add redirect rule in `public/_redirects`:
   ```
   /*    /index.html   200
   ```

#### Deploy to Nginx / Apache VPS
1. Run `npm run build` on your CI/CD runner or server.
2. Copy the contents of the `dist/` directory to your web root (e.g. `/var/www/clyptus.com/html`).
3. Configure your server to serve static assets and proxy `/api/*` requests to your Node process.

---

## ❓ Troubleshooting & FAQs

### Q: Port 5173 is already in use
**Fix**: Specify a different port or allow Vite to choose the next open port automatically:
```bash
npx vite --port 5174
```

### Q: Error: `Payload too large` or `fetch failed`
**Fix**: Verify your internet connection. Ensure the Node.js version is `v18.0.0` or higher (`node -v`).

### Q: Groq API key gives 429 Rate Limit error
**Fix**: You do not need to do anything! Keva automatically detects the 429 status and switches to the local question answering system with zero downtime. You can also replace or rotate your key in `.env`.

### Q: How do I rotate administrative credentials for HR policies?
**Fix**: Run the password hashing script:
```bash
node scripts/generate-password-hash.js "YourNewPassword"
```
Copy the resulting `SALT` and `HASH` values into your `.env` file as `AUTH_CLYPTUS_SALT` and `AUTH_CLYPTUS_HASH`.

---

## 🏢 Corporate Headquarters & Contact

* **Global HQ (India)**: 12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072. Phone: `+91 77999 88139`
* **Middle East Hub (Dubai)**: 101 Sheikh Zayed Rd, Trade Centre 1, DIFC, Dubai, UAE. Phone: `+971 52 350 3297`
* **North America Office (USA)**: 45627 Basswood Ct, Temecula, CA 92592. Phone: `+1 480 427-6373`
* **Official Emails**: `sales@clyptus.com` | `hr.india@clyptus.com` | `contact@clyptus.com`

---

## 📄 License
Private & Proprietary © 2026 Clyptus Software Solutions. All rights reserved.
