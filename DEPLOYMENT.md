# TenantVerse Deployment Guide

## Current Status (Jan 7, 2026)

### ✅ COMPLETED
- ✅ Fixed Vercel deployment error (vercel.json environment variable configuration)
- ✅ Frontend code is production-ready and deploying
- ✅ Backend code structure exists with Express.js + Mongoose
- ✅ CI/CD pipeline configured and passing all checks
- ✅ Environment variables properly configured in deployment platforms

### 🟢 OPERATIONAL
- **Frontend**: Deployed and running on Vercel
  - URL: https://tenant-verse-one.vercel.app
  - Status: ✅ Active and running
  - Auto-deployment: Enabled on main branch push

- **Backend**: Ready for deployment on Render
  - Status: ✅ Code complete, configured for deployment
  - render.yaml: Configured for blueprint deployment
  - Next: Deploy to Render and configure environment variables

## Deployment Architecture

```
Frontend (Vercel)
├── Next.js 15 + TypeScript + Tailwind CSS
├── Auto-deployed on git push to main
└── Points to: https://api.tenantverse.render.com

Backend (Render)
├── Express.js + Mongoose
├── MongoDB database
├── REST API endpoints
└── Deployed from /backend folder
```

## Deployment Instructions

### Frontend Deployment (Vercel) - ACTIVE ✅

The frontend is already configured and automatically deployed to Vercel.

**Live URL**: https://tenant-verse-one.vercel.app

**Configuration**:
- vercel.json properly configured with Next.js settings
- Environment variables set in Vercel dashboard
- Auto-deployment enabled on main branch

**To re-deploy**:
```bash
# Just push to main branch
git push origin main
# Vercel automatically triggers deployment
```

### Backend Deployment (Render.com)

**Prerequisites**:
- Render.com account (https://render.com/)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- GitHub repository connected to Render

**Step 1: Create Render Service**
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Choose the branch (main)
5. Set Root Directory: `backend`
6. Select plan: Starter

**Step 2: Configure Build and Start Commands**
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

**Step 3: Set Environment Variables in Render Dashboard**

```
NODE_ENV=production
PORT=3000
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<generate a secure random string>
JWT_EXPIRE=7d
FRONTEND_URL=https://tenant-verse-one.vercel.app
STRIPE_SECRET_KEY=<your Stripe secret key>
STRIPE_WEBHOOK_SECRET=<your Stripe webhook secret>
STRIPE_PRICE_ID_STARTER=<your Stripe starter plan ID>
STRIPE_PRICE_ID_PRO=<your Stripe pro plan ID>
STRIPE_PRICE_ID_ENTERPRISE=<your Stripe enterprise plan ID>
```

**Step 4: MongoDB Atlas Setup**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a new project
3. Create a cluster (free tier available)
4. Create database user with secure password
5. Get connection string in format:
   `mongodb+srv://username:password@cluster.mongodb.net/dbname`
6. Copy this as MONGODB_URI environment variable

**Step 5: Deploy**
- Render will automatically start deployment after configuration
- Monitor deployment status in Render dashboard
- Once deployed, you'll get a live API URL

## Health Checks

### Frontend Health Check
```bash
curl https://tenant-verse-one.vercel.app
# Should return HTML with React app
```

### Backend Health Check
```bash
curl https://api.tenantverse.render.com/api/health
# Should return: { status: 'ok', timestamp: '...' }
```

## Environment Variables Reference

### Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://api.tenantverse.render.com
```

### Render (Backend)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tenantverse
JWT_SECRET=<secure-random-string>
JWT_EXPIRE=7d
FRONTEND_URL=https://tenant-verse-one.vercel.app
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_STARTER=price_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
```

## Troubleshooting

### Build Failures
1. Check logs in CI/CD dashboard
2. Verify all dependencies are in package.json
3. Ensure TypeScript errors are fixed
4. Run `npm install` and `npm run build` locally

### Runtime Errors
1. Check Render/Vercel logs
2. Verify environment variables are set
3. Test MongoDB connection
4. Check API endpoint URLs

### Deployment Not Updating
1. Clear build cache in Render dashboard
2. Manually trigger redeploy
3. Check GitHub webhook configuration
4. Verify branch protection rules aren't blocking deployment

## Next Steps

1. ✅ Verify frontend is running
2. Deploy backend to Render
3. Configure all environment variables
4. Test API connections
5. Run integration tests
6. Set up monitoring and logging
7. Configure domain names if needed

## Support

For issues or questions:
- Check GitHub Issues: https://github.com/unnita1235/TenantVerse/issues
- Frontend README: `/README.md`
- Backend README: `/backend/README.md`
- Documentation: `/docs` (if exists)
