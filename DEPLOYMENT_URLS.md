# Deployment URLs - Update Instructions

## 📝 How to Add Your Deployed URLs

Once you deploy TenantVerse, update the README.md with your actual URLs.

### Step 1: Deploy Backend

1. **Deploy to Render**:
   - Go to https://render.com
   - Create new Web Service
   - Connect your GitHub repository
   - Use the `backend/` directory
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Your backend URL will be: `https://your-service.onrender.com`

2. **Or Deploy to Railway**:
   - Go to https://railway.app
   - New Project → Deploy from GitHub
   - Select your repository
   - Railway auto-detects Node.js
   - Your backend URL will be: `https://your-service.up.railway.app`

### Step 2: Deploy Frontend

1. **Deploy to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)
   - Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url/api`
   - Your frontend URL will be: `https://your-app.vercel.app`

### Step 3: Update README.md

Edit `README.md` and replace the placeholder URLs:

```markdown
### 🌐 Live Demo & Links

- **GitHub Repository**: https://github.com/unnita1235/TenantVerse
- **CI/CD Status**: [![CI](https://github.com/unnita1235/TenantVerse/workflows/CI/badge.svg)](https://github.com/unnita1235/TenantVerse/actions)
- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
```

### Step 4: Update Backend CORS

After deploying frontend, update your backend's `FRONTEND_URL` environment variable:
- In Render/Railway dashboard
- Set `FRONTEND_URL=https://your-app.vercel.app`

## 🔍 Verify Deployments

### Backend Health Check
```bash
curl https://your-backend.onrender.com/api/health
# Should return: {"status":"ok",...}
```

### Frontend
- Visit your Vercel URL
- Should load the landing page
- Try logging in (if backend is connected)

## 📊 Current Status

- ✅ **Backend**: Ready to deploy (Render/Railway configs included)
- ✅ **Frontend**: Ready to deploy (Vercel config included)
- ⏳ **URLs**: Add after deployment

---

**Quick Deploy Links**:
- [Deploy Backend to Render](https://render.com)
- [Deploy Backend to Railway](https://railway.app)
- [Deploy Frontend to Vercel](https://vercel.com/new)

