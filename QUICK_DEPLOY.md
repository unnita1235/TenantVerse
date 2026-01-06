# TenantVerse - QUICK DEPLOYMENT GUIDE (5 MINUTES)

## ✅ WHAT'S ALREADY DONE
- Frontend (Next.js) deployment fixed and ready on Vercel
- - Backend Express.js code is production-ready
  - - MongoDB connection configured
    - - Render deployment files included
     
      - ## 🚀 DEPLOY IN 3 STEPS (Copy-Paste Ready)
     
      - ### STEP 1: Create MongoDB Cluster (2 minutes)
     
      - 1. Go to https://www.mongodb.com/cloud/atlas/register
        2. 2. Click **"Sign up with Google"** (fastest)
           3. 3. Create free cluster when prompted
              4. 4. Go to Database Access → Create user
                 5. 5. Username: `tenantverse`
                    6. 6. Password: `TenantVerse@2026!` (or your own)
                       7. 7. Click "Network Access" → "Add IP Address" → Allow from Anywhere
                          8. 8. Click "Databases" → "Connect" → Copy connection string
                             9. 9. Replace `<password>` with your password above
                               
                                10. **Your MongoDB connection string looks like:**
                                11. ```
                                    mongodb+srv://tenantverse:TenantVerse@2026!@cluster0.xxxxx.mongodb.net/tenantverse?retryWrites=true&w=majority
                                    ```

                                    ### STEP 2: Deploy Backend to Render (2 minutes)

                                    1. Go to https://render.com/
                                    2. 2. Click **"Sign up"** → Choose **"GitHub"**
                                       3. 3. Authorize your GitHub account
                                          4. 4. Click **"New +"** → **"Web Service"**
                                             5. 5. Select **TenantVerse** repository
                                                6. 6. Configure:
                                                   7.    - **Name:** `tenantverse-api`
                                                         -    - **Region:** Choose closest to you
                                                              -    - **Branch:** `main`
                                                                   -    - **Root Directory:** `backend`
                                                                        -    - **Environment:** `Node`
                                                                             -    - **Build Command:** `npm run build`
                                                                                  -    - **Start Command:** `npm start`
                                                                                   
                                                                                       - ### STEP 3: Add Environment Variables to Render (1 minute)
                                                                                   
                                                                                       - In the Render dashboard, under "Environment":
                                                                                   
                                                                                       - ```
                                                                                         MONGODB_URI=mongodb+srv://tenantverse:TenantVerse@2026!@cluster0.xxxxx.mongodb.net/tenantverse?retryWrites=true&w=majority
                                                                                         JWT_SECRET=TenantVerse_JWT_Secret_Key_2026_SuperSecure!
                                                                                         PORT=3000
                                                                                         NODE_ENV=production
                                                                                         ```

                                                                                         Click **"Deploy"** - it will build automatically!

                                                                                         ---

                                                                                         ## 🎉 YOU'RE DONE!

                                                                                         After deployment completes (2-3 minutes):

                                                                                         - ✅ **Frontend:** https://tenant-verse-one.vercel.app (already live)
                                                                                         - - ✅ **Backend API:** https://tenantverse-api.onrender.com (new)
                                                                                           - - ✅ **Database:** MongoDB Atlas connected
                                                                                            
                                                                                             - ### Test the API:
                                                                                             - ```bash
                                                                                               curl https://tenantverse-api.onrender.com/api/health
                                                                                               ```

                                                                                               Should return: `{"status":"ok"}`

                                                                                               ---

                                                                                               ## 📋 Environment Variables Reference

                                                                                               | Variable | Value | Notes |
                                                                                               |----------|-------|-------|
                                                                                               | `MONGODB_URI` | Your MongoDB connection string | Required for database |
                                                                                               | `JWT_SECRET` | Your secret key | Used for authentication tokens |
                                                                                               | `PORT` | 3000 | Don't change (Render sets this) |
                                                                                               | `NODE_ENV` | production | For production deployment |

                                                                                               ---

                                                                                               ## 🔗 API Endpoints Available

                                                                                               Once deployed, your backend provides:

                                                                                               - `POST /api/auth/register` - Create account
                                                                                               - - `POST /api/auth/login` - Login
                                                                                                 - - `GET /api/properties` - List properties
                                                                                                   - - `POST /api/properties` - Create property
                                                                                                     - - `GET /api/tenants` - List tenants
                                                                                                       - - `POST /api/tenants` - Add tenant
                                                                                                        
                                                                                                         - Frontend automatically connects to your backend!
                                                                                                        
                                                                                                         - ---
                                                                                                         
                                                                                                         ## ⚠️ Troubleshooting
                                                                                                         
                                                                                                         **Backend not starting?**
                                                                                                         - Check build logs in Render dashboard
                                                                                                         - Verify `MONGODB_URI` is correct
                                                                                                         - - Make sure MongoDB user password matches
                                                                                                          
                                                                                                           - **Frontend not connecting?**
                                                                                                           - - The URL in `vercel.json` is already set to your Render backend
                                                                                                             - - Redeploy frontend if needed: `git push origin main`
                                                                                                              
                                                                                                               - **MongoDB connection failing?**
                                                                                                               - - Verify IP whitelist in MongoDB Atlas (should be "Anywhere")
                                                                                                                 - - Check username and password match exactly
                                                                                                                   - - Ensure database name is `tenantverse`
                                                                                                                    
                                                                                                                     - ---
                                                                                                                     
                                                                                                                     ## 📞 Need Help?
                                                                                                                     
                                                                                                                     1. Check Render logs: Dashboard → Backend service → "Logs" tab
                                                                                                                     2. 2. Check MongoDB: Atlas console → Collections
                                                                                                                        3. 3. GitHub Issues: Add your error message
                                                                                                                          
                                                                                                                           4. **That's it! Your production SaaS platform is now LIVE! 🎉**
                                                                                                                           5. 
