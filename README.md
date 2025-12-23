# TenantVerse

> A production-ready Property & Tenant Management SaaS platform demonstrating enterprise-grade full-stack engineering, multi-tenancy, role-based access control, and subscription management.

**Status**: ✅ Production Ready | **Tech Stack**: Next.js, Node.js, MongoDB, Stripe

### 🌐 Live Demo & Links

- **🌍 Live Application**: [https://tenant-verse-one.vercel.app](https://tenant-verse-one.vercel.app)
- **📦 GitHub Repository**: [https://github.com/unnita1235/TenantVerse](https://github.com/unnita1235/TenantVerse)
- **✅ CI/CD Status**: [![CI](https://github.com/unnita1235/TenantVerse/workflows/CI/badge.svg)](https://github.com/unnita1235/TenantVerse/actions)
- **🚀 Frontend**: Deployed on [Vercel](https://vercel.com) - [tenant-verse-one.vercel.app](https://tenant-verse-one.vercel.app)
- **⚙️ Backend API**: [Deploy to Render](https://render.com) or [Railway](https://railway.app) - *Add your backend URL after deployment*

> **Note**: Frontend is live! Backend deployment URL can be added once deployed.

## 🚀 Features

- **Multi-Tenant Architecture**: Isolated tenant spaces with custom subdomains
- **Authentication & Authorization**: JWT-based auth with RBAC (Owner, Admin, Member roles)
- **Subscription Management**: Stripe integration for billing and subscriptions
- **Team Management**: Invite users, manage roles, and permissions
- **Dashboard Analytics**: Real-time stats and activity tracking
- **Super Admin Panel**: Platform-wide tenant management
- **Modern UI**: Built with Next.js, TypeScript, and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Hook Form + Zod

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe API
- TypeScript

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payments)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/unnita1235/TenantVerse.git
cd TenantVerse
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (generate a secure random string)
# - STRIPE_SECRET_KEY (from Stripe dashboard)
# - STRIPE_WEBHOOK_SECRET (from Stripe webhook settings)
# - STRIPE_PRICE_ID_* (create products in Stripe and add price IDs)

# Start MongoDB (if running locally)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB

# Seed the database with demo data
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate back to root directory
cd ..

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:9002`

### 4. Access the Application

- **Landing Page**: http://localhost:9002
- **Login**: http://localhost:9002/login
- **Signup**: http://localhost:9002/signup

## 👤 Demo Credentials

After running the seed script, you can use these credentials:

### Super Admin
- Email: `admin@tenantverse.com`
- Password: `admin123`

### Tenant Owners
- Email: `owner@acme.com` (or any tenant slug)
- Password: `password123`

### Team Members
- Email: `john@acme.com`, `jane@acme.com`, etc.
- Password: `password123`

## 📁 Project Structure

```
TenantVerse-main/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation middleware
│   │   ├── scripts/        # Seed scripts
│   │   └── server.ts       # Express app entry point
│   └── package.json
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── (auth)/         # Auth pages (login, signup)
│   │   ├── t/[tenant]/     # Tenant dashboard pages
│   │   └── super-admin/    # Admin panel
│   ├── components/         # React components
│   ├── lib/                # Utilities & API client
│   └── middleware.ts       # Next.js middleware
└── package.json
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tenantverse
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:9002
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

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user & tenant
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tenants
- `GET /api/tenants/:slug` - Get tenant details
- `PUT /api/tenants/:slug` - Update tenant
- `DELETE /api/tenants/:slug` - Delete tenant

### Users
- `GET /api/users` - List all users in tenant
- `POST /api/users/invite` - Invite new user
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Remove user

### Subscriptions
- `GET /api/subscriptions/plans` - Get available plans
- `GET /api/subscriptions/current` - Get current subscription
- `POST /api/subscriptions/create-checkout` - Create Stripe checkout
- `POST /api/subscriptions/cancel` - Cancel subscription
- `POST /api/subscriptions/webhook` - Stripe webhook handler

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Admin
- `GET /api/admin/tenants` - List all tenants (super admin)
- `PUT /api/admin/tenants/:id/status` - Update tenant status

## 🚢 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Use strong, randomly generated `JWT_SECRET`
4. Configure Stripe webhook endpoint
5. Deploy to services like Railway, Render, or AWS

### Frontend
1. Set `NEXT_PUBLIC_API_URL` to your production API URL
2. Build: `npm run build`
3. Start: `npm start`
4. Deploy to Vercel, Netlify, or similar

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control (RBAC)
- Tenant data isolation
- Input validation with express-validator
- CORS configuration
- Environment variable protection

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

Developed by Unni T A — Full-Stack Developer

## 🎯 Why This Project Matters

TenantVerse showcases **production-ready full-stack engineering** with:

- **Real-world complexity**: Multi-tenant architecture, payment processing, role-based access
- **Production quality**: Error handling, security, logging, monitoring
- **Best practices**: TypeScript, clean architecture, comprehensive documentation
- **Deployment ready**: CI/CD, cloud deployment, environment configuration

This is not a tutorial project—it's a **complete, deployable SaaS platform** that demonstrates enterprise-level engineering capabilities.

## 🚀 Quick Deploy

### Deploy Backend (Render)
1. Connect GitHub repository to [Render](https://render.com)
2. Create new Web Service
3. Build Command: `cd backend && npm install && npm run build`
4. Start Command: `cd backend && npm start`
5. Set environment variables (see Environment Variables section)

### Deploy Frontend (Vercel)
1. Connect GitHub repository to [Vercel](https://vercel.com)
2. Framework: Next.js (auto-detected)
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy automatically on push to main branch

## ✅ CI/CD Status

This project uses GitHub Actions for continuous integration:
- ✅ Automated linting and type checking
- ✅ Build verification for frontend and backend
- ✅ Runs on every push and pull request

View workflow status: [GitHub Actions](https://github.com/unnita1235/TenantVerse/actions)

## 🤝 Contributing

This is a private project. For questions or issues, please contact the maintainer.

## 📄 License

Private and proprietary.

---

**Built with ❤️ by a Full-Stack Engineer passionate about production-ready code**
