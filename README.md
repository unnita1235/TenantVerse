# TenantVerse

> Production-ready Property & Tenant Management SaaS Platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://tenant-verse-one.vercel.app)
[![CI Status](https://github.com/unnita1235/TenantVerse/workflows/CI/badge.svg)](https://github.com/unnita1235/TenantVerse/actions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

**Frontend:** https://tenant-verse-one.vercel.app  
**Backend:** *Requires deployment* (see setup instructions)

---

## 📸 Screenshots

| Landing Page | Login Page |
|:---:|:---:|
| ![Landing Page](screenshots/landing.png) | ![Login Page](screenshots/login.png) |

| Signup Page |
|:---:|
| ![Signup Page](screenshots/signup.png) |

## Overview

TenantVerse is a multi-tenant SaaS platform for property and tenant management, featuring role-based access control, subscription management, and team collaboration. Built with enterprise-grade architecture demonstrating full-stack capabilities.

---

## Key Features

### Multi-Tenancy
- Isolated tenant workspaces
- Custom subdomain support (planned)
- Tenant-specific data isolation
- Per-tenant configuration

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Owner, Admin, Member)
- Team member invitations
- Session management

### Subscription Management
- Stripe integration
- Multiple pricing tiers (Starter, Pro, Enterprise)
- Subscription lifecycle management
- Usage-based billing support

### Team Management
- Invite team members
- Role assignment
- Permission management
- Activity tracking

### Dashboard
- Real-time statistics
- Activity feed
- Tenant management
- User analytics

---

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI + shadcn/ui
- React Hook Form + Zod

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Stripe API
- TypeScript

**Infrastructure**
- Frontend: Vercel
- Backend: Railway/Render (deployment required)
- Database: MongoDB Atlas (recommended)
- CI/CD: GitHub Actions

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account (for payments)

### Installation

```bash
# Clone repository
git clone https://github.com/unnita1235/TenantVerse.git
cd TenantVerse

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed  # Seed demo data
npm run dev   # Runs on http://localhost:5000

# Frontend setup (in new terminal)
cd ..
npm install
cp .env.example .env.local
# Edit .env.local with backend API URL
npm run dev   # Runs on http://localhost:9002
```

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tenantverse
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:9002

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_STARTER=price_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Demo Credentials

After running `npm run seed`:

**Super Admin**
- Email: `admin@tenantverse.com`
- Password: `admin123`

**Tenant Owner**
- Email: `owner@acme.com`
- Password: `password123`

**Team Member**
- Email: `john@acme.com`
- Password: `password123`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user & create tenant
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tenants
- `GET /api/tenants/:slug` - Get tenant details
- `PUT /api/tenants/:slug` - Update tenant
- `DELETE /api/tenants/:slug` - Delete tenant

### Users
- `GET /api/users` - List tenant users
- `POST /api/users/invite` - Invite user
- `PUT /api/users/:id/role` - Update role
- `DELETE /api/users/:id` - Remove user

### Subscriptions
- `GET /api/subscriptions/plans` - List plans
- `POST /api/subscriptions/create-checkout` - Create checkout session
- `POST /api/subscriptions/cancel` - Cancel subscription
- `POST /api/subscriptions/webhook` - Stripe webhook

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

### Admin (Super Admin Only)
- `GET /api/admin/tenants` - List all tenants
- `PUT /api/admin/tenants/:id/status` - Update status

---

## Project Structure

```
TenantVerse/
├── backend/              # Express API
│   ├── src/
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & validation
│   │   └── scripts/     # Seed scripts
│   └── package.json
├── src/
│   ├── app/
│   │   ├── (auth)/      # Auth pages
│   │   ├── t/[tenant]/  # Tenant dashboard
│   │   └── super-admin/ # Admin panel
│   ├── components/      # React components
│   └── lib/             # Utilities & API
└── package.json
```

---

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control (RBAC)
- Tenant data isolation
- Input validation
- CORS configuration
- Environment variable protection

---

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Framework: Next.js (auto-detected)
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

### Backend (Railway/Render)
1. Connect GitHub repository
2. Build: `cd backend && npm install && npm run build`
3. Start: `cd backend && npm start`
4. Set environment variables
5. Deploy

**Note:** Backend must be deployed separately for full functionality.

---

## Current Status

✅ **Working Features:**
- User authentication
- Tenant creation
- Team management
- Role-based access
- Dashboard UI
- CI/CD pipeline

🚧 **In Progress:**
- Stripe integration (setup required)
- Subscription management
- Email notifications

📅 **Planned:**
- Custom subdomains
- Advanced analytics
- File storage
- Audit logs

---

## CI/CD Pipeline

GitHub Actions workflow:
- ✅ Automated linting
- ✅ Type checking
- ✅ Build verification
- ✅ Runs on push/PR

View status: [GitHub Actions](https://github.com/unnita1235/TenantVerse/actions)

---

## Contributing

This is a portfolio/demonstration project. For questions or issues, please open a GitHub issue.

---

## License

MIT License - See [LICENSE](LICENSE)

---

## Author

**Unni T A**
- GitHub: [@unnita1235](https://github.com/unnita1235)
- Email: unnita1235@gmail.com

---

## Documentation

Additional documentation available in the repository:
- [Architecture](ARCHITECTURE.md)
- [Production Checklist](PRODUCTION_CHECKLIST.md)
- [Deployment](DEPLOYMENT.md)
- [GitHub Setup](GITHUB_SETUP.md)

---

**TenantVerse** - Enterprise-grade Multi-tenant SaaS Platform

*Note: This is a demonstration project showcasing production-ready full-stack engineering with multi-tenancy, RBAC, and subscription management.*
