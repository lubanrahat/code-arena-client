<div align="center">

# 🏟️ CodeArena

### Master Algorithms. Ace Interviews. Ship Better Code.

A modern, high-performance coding practice platform where developers solve algorithmic challenges, track their progress, and level up with AI-powered learning — built with **Next.js 16**, **React 19**, and **TypeScript**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

![CodeArena Banner](https://res.cloudinary.com/dq4n6leek/image/upload/v1774890820/SCR-20250330-uahr_nm95cd.png)

[Live Demo](https://code-arena-client.vercel.app) · [API Server](https://code-arena-server.vercel.app) · [Report Bug](https://github.com/lubanrahat/code-arena-client/issues) · [Request Feature](https://github.com/lubanrahat/code-arena-client/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🔭 Overview

**CodeArena** is a full-featured, LeetCode-inspired platform designed for developers who want to sharpen their problem-solving skills and prepare for technical interviews. It combines a powerful Monaco-based code editor with AI-powered discussions, structured learning roadmaps, and real-time performance analytics — all wrapped in a premium, dark-mode-first UI.

This repository contains the **client application**. The companion backend repository can be found at [`code-arena-server`](https://github.com/lubanrahat/code-arena-server).

---

## ✨ Key Features

| Category | Feature | Description |
|---|---|---|
| **💻 Code Editor** | Monaco Editor | Full-featured editor with syntax highlighting, IntelliSense, multi-language support, and persistent theme/font settings |
| **🧠 AI Assistant** | Gemini AI Discussions | Conversational AI powered by Google Gemini for code reviews, explanations, and optimization suggestions |
| **📝 Problem Solving** | Problem Workspace | Split-pane interface with problem description, code editor, and output panel with real-time submission feedback |
| **📊 Analytics** | Performance Dashboard | Visual progress tracking with interactive Recharts — activity heatmaps, skill analysis, and submission history |
| **🛤️ Roadmaps** | Learning Paths | Structured, topic-based roadmaps guiding developers from fundamentals to advanced algorithms |
| **📋 Problem Sheets** | Curated Lists | Pre-built problem sheets organized by topic and difficulty for focused practice |
| **🏆 Leaderboard** | Global Rankings | Real-time leaderboard tracking solve counts and performance across the community |
| **🎓 Courses** | Premium Content | Structured courses with gated access via integrated payment system (Stripe) |
| **📖 Resources** | Blogs & Glossary | Educational blog posts and a searchable glossary of CS/DSA terminology |
| **🛡️ Admin Panel** | Management Suite | Full admin dashboard for managing problems, users, contributions, and premium subscriptions |
| **🤝 Contribute** | Community Problems | Submit and manage community-contributed problems with admin review workflow |
| **👤 Profile** | User Dashboard | Personalized profile with submission history, progress charts, and skill radar |
| **🌗 Theming** | Dark / Light Mode | Seamless theme switching with system preference detection via `next-themes` |
| **🎉 Celebrations** | Confetti Effects | Canvas confetti animations on successful submissions for a delightful UX |

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework with App Router, SSR, and API routes |
| [React](https://react.dev/) | 19 | UI library with latest concurrent features |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type-safe JavaScript |

### State Management & Data Fetching
| Technology | Purpose |
|---|---|
| [TanStack Query v5](https://tanstack.com/query/latest) | Server state, caching, and background refetching |
| [TanStack Form](https://tanstack.com/form/latest) | Performant, type-safe form management |
| [Zod](https://zod.dev/) | Schema validation for forms and API payloads |
| [Axios](https://axios-http.com/) | HTTP client with interceptors |

### UI & Design System
| Technology | Purpose |
|---|---|
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Shadcn UI](https://ui.shadcn.com/) | Accessible, customizable component primitives |
| [Radix UI](https://www.radix-ui.com/) | Headless, accessible UI primitives |
| [Motion (Framer Motion)](https://motion.dev/) | Declarative animations and transitions |
| [Lucide React](https://lucide.dev/) | Modern icon set |
| [Tabler Icons](https://tabler-icons.io/) | Extended icon library |
| [Recharts](https://recharts.org/) | Composable charting library |
| [Sonner](https://sonner.emilkowal.ski/) | Elegant toast notifications |
| [Canvas Confetti](https://github.com/catdad/canvas-confetti) | Celebration effects |

### Integrations
| Technology | Purpose |
|---|---|
| [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) | VS Code-grade in-browser code editor |
| [Google Generative AI SDK](https://ai.google.dev/) | AI-powered discussions via Gemini |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management with system detection |
| [jose](https://github.com/panva/jose) | JWT handling and verification |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Draggable split-pane layout for the editor workspace |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Markdown rendering for problem descriptions |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Next.js App Router                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │
│  │  Layouts    │  │   Pages    │  │  Server Actions    │  │
│  └─────┬──────┘  └─────┬──────┘  └────────┬───────────┘  │
│        │               │                   │              │
│  ┌─────▼───────────────▼───────────────────▼───────────┐  │
│  │              Context Providers                       │  │
│  │   ThemeProvider → AuthProvider → QueryProvider       │  │
│  └─────────────────────┬───────────────────────────────┘  │
│                        │                                  │
│  ┌─────────────────────▼───────────────────────────────┐  │
│  │              Component Modules                       │  │
│  │  Landing · Problem · Admin · Profile · Courses ···  │  │
│  └─────────────────────┬───────────────────────────────┘  │
│                        │                                  │
│  ┌──────────┐  ┌───────▼──────┐  ┌──────────────────┐    │
│  │  Hooks   │  │  Services    │  │  Validation (Zod)│    │
│  └──────────┘  └───────┬──────┘  └──────────────────┘    │
│                        │                                  │
│                  ┌─────▼──────┐                           │
│                  │ Axios HTTP │ ──▶  Backend API Server   │
│                  └────────────┘                           │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```text
code-arena-client/
├── public/                          # Static assets
│   └── courses/                     # Course thumbnail images
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/                  # Auth routes (login, register)
│   │   ├── admin/                   # Admin dashboard & management
│   │   │   ├── contributions/       # Community contribution review
│   │   │   ├── create-problem/      # Problem creation form
│   │   │   ├── premium-users/       # Premium subscriber management
│   │   │   ├── problems/            # Problem CRUD
│   │   │   └── users/               # User management
│   │   ├── ai-discussion/           # AI-powered chat interface
│   │   ├── blogs/                   # Blog listing & articles
│   │   ├── contribute/              # Community contribution portal
│   │   ├── courses/                 # Premium course catalog
│   │   ├── glossary/                # CS/DSA glossary
│   │   ├── leaderboard/             # Global rankings
│   │   ├── payment-cancel/          # Payment failure handler
│   │   ├── payment-success/         # Payment success handler
│   │   ├── pricing/                 # Subscription plans
│   │   ├── problems/                # Problem list & workspace
│   │   │   └── [id]/                # Individual problem view
│   │   ├── profile/                 # User profile dashboard
│   │   ├── roadmaps/                # Learning path browser
│   │   │   └── [id]/                # Individual roadmap view
│   │   └── sheets/                  # Curated problem sheets
│   ├── components/
│   │   ├── layout/                  # Navbar, Footer, wrappers
│   │   ├── modules/                 # Feature-specific components
│   │   │   ├── Admin/               # Admin tables & stats dashboard
│   │   │   ├── AiDiscussion/        # AI chat interface
│   │   │   ├── Auth/                # Login & registration forms
│   │   │   ├── Contribute/          # Contribution form
│   │   │   ├── Courses/             # Course cards
│   │   │   ├── Glossary/            # Glossary components
│   │   │   ├── Landing/             # Hero, Features, CareerOutcomes
│   │   │   ├── Problem/             # Editor, Output, Submissions, AI
│   │   │   ├── Profile/             # Stats, Activity, Submissions
│   │   │   ├── Roadmaps/            # Roadmap components
│   │   │   └── Sheets/              # Problem sheet components
│   │   └── ui/                      # 64+ Shadcn/Radix UI primitives
│   ├── data/                        # Static data (blogs, glossary, roadmaps)
│   ├── hooks/                       # Custom hooks (auth, user, leaderboard)
│   ├── lib/                         # Utilities, Axios config, cookie helpers
│   ├── providers/                   # Auth, Query, Theme context providers
│   ├── services/                    # API service layer (auth, user, AI, contribute)
│   ├── shared/                      # Shared constants and assets
│   ├── types/                       # TypeScript type definitions
│   └── validation/                  # Zod schemas (auth, problem)
├── components.json                  # Shadcn UI configuration
├── next.config.ts                   # Next.js configuration
├── postcss.config.mjs               # PostCSS (Tailwind) config
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | 18.0 or higher |
| **Package Manager** | bun (recommended), npm, or pnpm |
| **Backend** | [code-arena-server](https://github.com/lubanrahat/code-arena-server) running locally or deployed |

### 1. Clone the Repository

```bash
git clone https://github.com/lubanrahat/code-arena-client.git
cd code-arena-client
```

### 2. Install Dependencies

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Configure Environment

Create a `.env.local` file in the project root:

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

# Google Gemini API Key (for AI Discussions)
NEXT_PUBLIC_GMAINE_API_KEY=your_gemini_api_key

# JWT Secret (must match the backend server)
JWT_SECRET=your_jwt_secret
```

> **💡 Tip:** Get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/apikey).

### 4. Start the Development Server

```bash
bun run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | Base URL for the CodeArena backend API |
| `NEXT_PUBLIC_GMAINE_API_KEY` | ✅ | Google Gemini API key for AI discussion features |
| `JWT_SECRET` | ✅ | Shared secret for JWT token verification (must match server) |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start the development server with hot reload |
| `bun run build` | Create an optimized production build |
| `bun run start` | Serve the production build locally |
| `bun run lint` | Run ESLint to check for code quality issues |

---

## 🚢 Deployment

The project is optimized for **[Vercel](https://vercel.com)** — the platform built by the creators of Next.js.

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Configure the environment variables in **Settings → Environment Variables**.
4. Vercel auto-deploys on every push to `main`.

### Deploy Elsewhere

For other platforms, build and serve the production bundle:

```bash
bun run build
bun run start
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

> Please ensure your code passes linting (`bun run lint`) and builds successfully (`bun run build`) before submitting a PR.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Luban Rahat**

[![GitHub](https://img.shields.io/badge/GitHub-lubanrahat-181717?style=for-the-badge&logo=github)](https://github.com/lubanrahat)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lubanrahat-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/lubanrahat)

</div>
