# TenantVerse Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Backend Setup

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tenantverse
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:9002
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
STRIPE_PRICE_ID_STARTER=price_starter_id
STRIPE_PRICE_ID_PRO=price_pro_id
STRIPE_PRICE_ID_ENTERPRISE=price_enterprise_id
EOF

# Start MongoDB (if local)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Seed database
npm run seed

# Start backend (in one terminal)
npm run dev
```

### Step 2: Frontend Setup

```bash
# In project root
npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF

# Start frontend (in another terminal)
npm run dev
```

### Step 3: Access Application

- Open http://localhost:9002
- Login with: `owner@acme.com` / `password123`
- Or create a new account

## 📝 Important Notes

1. **MongoDB**: Make sure MongoDB is running before starting the backend
2. **Stripe**: For full payment functionality, configure Stripe keys in backend `.env`
3. **Ports**: Backend runs on 5000, Frontend on 9002
4. **Demo Data**: Run `npm run seed` in backend to create demo tenants and users

## 🔑 Demo Accounts

After seeding:
- Super Admin: `admin@tenantverse.com` / `admin123`
- Tenant Owner: `owner@acme.com` / `password123`
- Team Member: `john@acme.com` / `password123`

## 🐛 Troubleshooting

- **Backend won't start**: Check MongoDB is running
- **Frontend can't connect**: Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- **Auth errors**: Check JWT_SECRET is set in backend `.env`
- **Stripe errors**: Payment features require valid Stripe keys

## 📚 Next Steps

- Read the main README.md for detailed documentation
- Configure Stripe for payment processing
- Customize tenant features
- Deploy to production

