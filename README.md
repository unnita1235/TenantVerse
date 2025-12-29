# TenantVerse

> Full-Stack Multi-Tenant SaaS Boilerplate with Authentication, RBAC, and Payment Integration

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🎯 What This Project Is

TenantVerse is a **full-stack SaaS starter/boilerplate** demonstrating enterprise-level multi-tenant architecture. It's built to showcase modern development practices and can serve as a foundation for building production SaaS applications.

**Key Highlight:** Complete multi-tenant isolation, role-based access control, and payment infrastructure (Stripe integration) - all with TypeScript and modern frameworks.

---

## ✨ Core Features

### Fully Implemented
- ✅ **Multi-Tenant Architecture** - Complete data isolation per tenant
- ✅ **JWT Authentication** - Secure token-based auth with bcrypt password hashing
- ✅ **Role-Based Access Control (RBAC)** - Super Admin, Owner, Admin, Member roles
- ✅ **Team Management** - User invitations, role updates, member removal
- ✅ **Dashboard & Analytics** - Real-time stats and activity tracking
- ✅ **REST API** - Comprehensive Express backend with proper error handling
- ✅ **Modern Frontend** - Next.js 15 with TypeScript, Tailwind CSS, Radix UI
- ✅ **Super Admin Panel** - Platform-wide tenant management

### Requires Configuration
- ⚙️ **Stripe Payments** - Full integration code (needs Stripe API keys)
- ⚙️ **AI Features** - Google Genkit for onboarding (needs API key)
- ⚙️ **Email Service** - Invitation system (needs SMTP/email provider)

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Radix UI Components
- React Hook Form + Zod
- Google Genkit (AI)

**Backend**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Stripe SDK
- MongoDB Memory Server (dev fallback)

---

## 🚀 Quick Start (2 Minutes)

### Prerequisites
- Node.js 18+
- (Optional) MongoDB - project works with in-memory fallback

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/TenantVerse.git
cd TenantVerse

# 2. Install dependencies
npm install
cd backend && npm install && cd ..

# 3. Start backend (in-memory database)
cd backend
set JWT_SECRET=my_dev_secret_key_2024
npm run dev
# Backend will start on http://localhost:5000

# 4. Start frontend (new terminal)
cd ..
npm run dev
# Frontend will start on http://localhost:9002
```

**Access:** http://localhost:9002

### Demo Credentials (Auto-Seeded)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@tenantverse.com | admin123 |
| Tenant Owner (Acme) | owner@acme.com | password123 |
| Tenant Owner (Stark) | owner@stark.com | password123 |

---

## 📁 Project Structure

```
TenantVerse/
├── backend/                     # Express API
│   ├── src/
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth & validation
│   │   ├── utils/              # Helpers & logger
│   │   └── server.ts           # Entry point
│   └── package.json
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login/Signup
│   │   ├── t/[tenant]/         # Tenant dashboards
│   │   │   ├── billing/        # Subscription page
│   │   │   ├── team/           # Team management
│   │   │   ├── settings/       # Tenant settings
│   │   │   └── guides/         # AI-powered guides
│   │   └── super-admin/        # Admin panel
│   ├── components/ui/          # Reusable components
│   ├── lib/                    # API client
│   └── middleware.ts           # Route protection
└── package.json
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
# Required
JWT_SECRET=your_secret_key_here

# Optional (uses in-memory database if not provided)
MONGODB_URI=mongodb://localhost:27017/tenantverse

# Optional
FRONTEND_URL=http://localhost:9002
PORT=5000
NODE_ENV=development

# For Stripe payments (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# For AI features (optional)
GOOGLE_GENAI_API_KEY=...
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Optional for AI
GOOGLE_GENAI_API_KEY=...
```

---

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account + tenant
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Tenants
- `GET /api/tenants/:slug` - Get tenant
- `PUT /api/tenants/:slug` - Update tenant
- `DELETE /api/tenants/:slug` - Delete tenant

### Team Management
- `GET /api/users` - List users
- `POST /api/users/invite` - Invite user
- `PUT /api/users/:id/role` - Update role
- `DELETE /api/users/:id` - Remove user

### Subscriptions (requires Stripe)
- `GET /api/subscriptions/plans` - Plans
- `POST /api/subscriptions/create-checkout` - Checkout
- `POST /api/subscriptions/cancel` - Cancel
- `POST /api/subscriptions/webhook` - Stripe webhook

### Dashboard & Admin
- `GET /api/dashboard/stats` - Analytics
- `GET /api/admin/tenants` - All tenants (super admin)

---

## 🚢 Deployment

### Vercel (Frontend)
1. Connect GitHub repo to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL`
3. Deploy automatically

### Railway/Render (Backend)
1. Connect GitHub repo
2. Set build: `cd backend && npm install && npm run build`
3. Set start: `cd backend && npm start`
4. Configure environment variables

**Note:** You'll need to configure MongoDB Atlas or similar for production database.

---

## 🎓 What You'll Learn

- Multi-tenant data architecture
- JWT authentication & authorization
- Role-based access control (RBAC)
- Stripe payment integration
- MongoDB schema design
- Next.js App Router patterns
- TypeScript best practices
- Error handling & logging
- API design patterns

---

## ⚠️ Known Limitations

- **Email not configured** - User invitations log to console
- **Stripe requires setup** - Needs active Stripe account
- **AI features optional** - Requires Genkit API key
- **Not deployed live** - Deployment config provided but requires setup

---

## 🎯 Ideal For

- 👨‍💻 **Developers** learning multi-tenant SaaS architecture
- 🏢 **Startups** needing a SaaS boilerplate
- 📚 **Portfolio projects** demonstrating full-stack skills
- 🎓 **Students** studying modern web development

---

## 📝 License

MIT License - Copyright (c) 2025 Unni T A

---

## 👨‍💻 Author

**Unni T A** - Full-Stack Developer

This project demonstrates production-level architecture and best practices for building multi-tenant SaaS applications.

---

**⭐ If this helped you, consider starring the repo!**
