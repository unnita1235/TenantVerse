# TenantVerse Deployment Guide

## Platform Choices

### Backend: Render or Railway

**Why Render**:

- Simple deployment process
- Built-in MongoDB support
- Automatic HTTPS
- Free tier available
- Easy environment variable management

**Why Railway**:

- Excellent developer experience
- Automatic deployments from Git
- Simple configuration
- Good free tier

**Recommendation**: Render for simplicity, Railway for developer experience

### Frontend: Vercel

**Why Vercel**:

- Optimized for Next.js
- Automatic deployments
- Edge network
- Free tier with excellent performance
- Zero configuration needed

## Backend Deployment (Render)

### Step 1: Prepare Repository

1. Ensure all code is committed and pushed
2. Verify `backend/package.json` has correct build/start scripts

### Step 2: Create Render Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `tenantverse-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Starter ($7/month) or Free

### Step 3: Configure Environment Variables

Set these in Render dashboard:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://... (MongoDB Atlas connection string)
JWT_SECRET=<generate-strong-random-string>
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_STARTER=price_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
```

### Step 4: Configure MongoDB Atlas

1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist Render IP (or 0.0.0.0/0 for all)
4. Get connection string
5. Set `MONGODB_URI` in Render

### Step 5: Configure Stripe Webhook

1. In Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-backend.onrender.com/api/subscriptions/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Step 6: Verify Deployment

1. Check health: `https://your-backend.onrender.com/api/health`
2. Should return: `{"status":"ok",...}`

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository

1. Ensure code is pushed to GitHub
2. Verify `.env.example` exists

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your deployment URL

### Step 5: Update Backend CORS

Update `FRONTEND_URL` in Render to match your Vercel URL

## Alternative: Railway Deployment

### Backend on Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select repository
4. Railway auto-detects Node.js
5. Set environment variables (same as Render)
6. Railway automatically deploys

**Advantages**: Simpler setup, automatic HTTPS, better DX

## Post-Deployment Checklist

- [ ] Backend health check returns 200
- [ ] Frontend loads without errors
- [ ] Login works
- [ ] Registration works
- [ ] Dashboard loads data
- [ ] Stripe checkout works (test mode)
- [ ] Webhook receives events
- [ ] No console errors
- [ ] CORS configured correctly

## Custom Domain (Optional)

### Backend (Render)

1. Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

### Frontend (Vercel)

1. Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL automatically configured

## Monitoring

### Recommended Services

- **Uptime**: UptimeRobot (free)
- **Errors**: Sentry (free tier)
- **Logs**: Render/Railway built-in logs
- **APM**: New Relic (optional)

## Troubleshooting

### Backend won't start

- Check MongoDB connection string
- Verify all environment variables set
- Check build logs for errors

### Frontend can't connect

- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS configuration in backend
- Verify backend is running

### Stripe webhooks fail

- Verify webhook secret matches
- Check webhook endpoint URL
- Review Stripe webhook logs

## Cost Estimate

- **Render Backend**: Free tier or $7/month
- **Vercel Frontend**: Free tier (generous limits)
- **MongoDB Atlas**: Free tier (512MB) or $9/month
- **Stripe**: 2.9% + $0.30 per transaction
- **Total**: ~$0-16/month (free tier) or ~$25/month (paid)

---

**Deployment Status**: ✅ Ready for production
