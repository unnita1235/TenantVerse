# 🏠 TenantVerse

[![Status](https://img.shields.io/badge/status-in_development-orange)]()
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

> **Property Management SaaS Platform** for landlords and tenants

A comprehensive property management system that streamlines rental operations, tenant applications, maintenance requests, and payment processing.

---

## 🎯 The Problem

Managing rental properties involves:
- 📝 Manual tenant screening (takes 3-5 days)
- 💰 Payment tracking across multiple tenants
- 🔧 Maintenance request chaos (emails/calls/texts)
- 📊 No centralized dashboard for property insights

**TenantVerse solves this** by providing an all-in-one platform for property managers and tenants.

---

## ✨ Key Features

### For Landlords
- 🏘️ **Property Listings Management**: Add/edit unlimited properties
- 👥 **Tenant Portal**: View all tenants, lease agreements, payment history
- 🔧 **Maintenance Tracking**: Receive, prioritize, and close maintenance tickets
- 💳 **Payment Integration**: Track rent payments with automated reminders
- 📊 **Analytics Dashboard**: Occupancy rates, revenue, maintenance costs
- 📄 **Document Management**: Store lease agreements, inspection reports

### For Tenants
- 🔍 **Property Search**: Filter by location, price, amenities
- 📋 **Online Applications**: Apply digitally with document upload
- 💬 **Communication Hub**: Message landlords directly
- 🔧 **Maintenance Requests**: Submit tickets with photos
- 💰 **Payment History**: View past payments and due dates
- 📝 **Lease Access**: View and download lease documents

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend (Planned)
- **API**: Next.js API Routes / Server Actions
- **Database**: PostgreSQL (planned)
- **ORM**: Prisma (planned)
- **Auth**: NextAuth.js (planned)
- **File Storage**: AWS S3 / Cloudinary (planned)
- **Payments**: Stripe API (planned)

### DevOps
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

---

## 📐 System Architecture
```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         ├──────────────┬──────────────┐
         │              │              │
    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
    │  Auth   │   │   API   │   │  File   │
    │ Service │   │ Routes  │   │ Upload  │
    └────┬────┘   └────┬────┘   └────┬────┘
         │              │              │
         └──────────────┴──────────────┘
                        │
                  ┌─────▼──────┐
                  │ PostgreSQL │
                  │  Database  │
                  └────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/unnita1235/TenantVerse.git
cd TenantVerse

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure
```
TenantVerse/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (dashboard)/  # Protected dashboard pages
│   │   ├── properties/   # Property listing pages
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── forms/        # Form components
│   │   └── layout/       # Layout components
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── public/               # Static assets
└── prisma/               # Database schema (planned)
```

---

## 🎨 Current Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Landing Page | ✅ Done | Responsive design |
| Property Listings UI | ✅ Done | Grid/list view toggle |
| Tenant Dashboard UI | ✅ Done | Mock data |
| Maintenance Request Form | ✅ Done | File upload ready |
| Authentication | 🚧 In Progress | NextAuth.js integration |
| Database Integration | 📅 Planned | PostgreSQL + Prisma |
| Payment Processing | 📅 Planned | Stripe integration |
| Real-time Notifications | 📅 Planned | WebSockets |

---

## 🔐 Environment Variables

Create a `.env.local` file:
```bash
# Database (when implemented)
DATABASE_URL="postgresql://..."

# Authentication (when implemented)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# File Upload (when implemented)
CLOUDINARY_URL="cloudinary://..."

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-password"
```

---

## 🧪 Testing (Planned)
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 📚 Key Learnings & Challenges

### Challenge 1: Multi-tenant Architecture
**Problem**: How to isolate landlord/tenant data securely?
**Solution**: Implementing Row-Level Security (RLS) in PostgreSQL with tenant-scoped queries.

### Challenge 2: Real-time Maintenance Updates
**Problem**: Tenants need instant notification when landlord responds.
**Solution**: Planning WebSocket integration for real-time updates.

### Challenge 3: Complex Search Filters
**Problem**: Property search with multiple filters (price, location, amenities).
**Solution**: Using Prisma's composable query system with dynamic filters.

---

## 🎯 Roadmap

### Phase 1 (Current - Month 1-2)
- [x] Landing page design
- [x] Property listing UI
- [x] Tenant dashboard mockup
- [ ] Authentication system
- [ ] Database setup

### Phase 2 (Month 3-4)
- [ ] Property CRUD operations
- [ ] Tenant application system
- [ ] Maintenance request backend
- [ ] File upload functionality

### Phase 3 (Month 5-6)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Analytics dashboard

### Phase 4 (Month 7+)
- [ ] Mobile app (React Native)
- [ ] Lease agreement e-signatures
- [ ] Automated rent reminders
- [ ] Multi-language support

---

## 🤝 Contributing

This is a personal learning project, but feedback is welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 👤 Author

**Unni T A**
- GitHub: [@unnita1235](https://github.com/unnita1235)
- Email: unnita1235@gmail.com
- Portfolio: [Coming Soon]

---

## 🙏 Acknowledgments

- Next.js team for amazing documentation
- shadcn for beautiful UI components
- Vercel for seamless deployment

---

## 📊 Project Stats

- **Lines of Code**: ~3,500+ (and growing)
- **Components**: 25+ reusable components
- **Tech Stack**: 8 major technologies
- **Development Time**: 2 months (ongoing)

---

**Note**: This project is under active development. Features marked as "Planned" are in the roadmap and will be implemented in upcoming iterations.
