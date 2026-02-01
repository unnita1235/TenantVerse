# TenantVerse - Multi-Tenant Property Management SaaS Prototype

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org)

> A full-stack **prototype** of a multi-tenant property management SaaS platform built to demonstrate enterprise-grade architecture, role-based access control (RBAC), and subscription management.

**Live Demo (Frontend):** [https://tenant-verse-one.vercel.app](https://tenant-verse-one.vercel.app)  
*(Backend must be deployed separately — currently not live)*

### Overview

TenantVerse is an **advanced full-stack prototype** designed for property managers and real estate companies. It includes multi-tenant data isolation, team collaboration, role-based permissions, and a foundation for Stripe subscription billing.

**Reality Check**: While the architecture and documentation are strong, this is **not production-ready**. Key features like Stripe payments and advanced multi-tenancy (custom subdomains) are partially implemented or in progress. It serves best as a **high-quality portfolio project** showcasing modern SaaS development skills.

### Key Features & Current Status

| Feature                        | Status          | Notes |
|-------------------------------|-----------------|-------|
| Multi-Tenant Architecture     | Implemented (Basic) | Tenant-based data filtering via `tenantId` |
| Role-Based Access Control (RBAC) | Implemented   | Owner, Admin, Member roles |
| JWT Authentication            | Fully Implemented | Secure login, refresh tokens |
| Team Invitations & Management | Partially Done  | Invitation flow started |
| Stripe Subscription Billing   | In Progress     | Integration scaffolded, not active |
| Dashboard & Analytics         | Implemented     | Basic stats and activity feed |
| Responsive UI                 | Fully Implemented | shadcn/ui + Tailwind |
| Docker + Docker Compose       | Fully Implemented | Easy local development |

### Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Hook Form + Zod
- **Backend**: Node.js + Express.js, TypeScript, MongoDB + Mongoose
- **Authentication**: JWT
- **Payments**: Stripe (partial)
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD, Vercel (frontend)

### Project Structure

- `/src` → Next.js frontend (App Router with `(auth)` and `t/[tenant]` routes)
- `/backend/src` → Express backend (models, routes, middleware, controllers)
- `/docs` → Detailed architecture, deployment, and production checklist

### Setup Instructions

```bash
# Clone repo
git clone https://github.com/unnita1235/TenantVerse.git
cd TenantVerse

# Backend
cd backend
npm install
cp .env.example .env
# Add MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY

# Frontend
cd ../src
npm install
cp .env.example .env.local

# Run both (recommended)
docker-compose up

Honest Limitations (Important)

Stripe payments are not fully functional yet.
Custom subdomains are planned, not implemented.
Backend must be deployed separately (Railway/Render recommended).
No end-to-end tests or advanced error monitoring.
Multi-tenancy uses basic tenant filtering (not separate schemas/databases).
License: MIT
Author: Unni T A (@unnita1235)
Last Updated: February 2026
