# Vercel Deployment Setup

## Files Created:

### 1. `vercel.json` - Main Vercel Configuration
- **SPA Routing**: All routes redirect to `index.html`
- **Environment Variables**: Pre-configured with API URL
- **Security Headers**: Added security headers for production
- **Asset Caching**: Optimized caching for static assets
- **Build Configuration**: Uses Vite build output

### 2. `public/_redirects` - Netlify Compatibility
- Fallback for Netlify deployment
- SPA routing support

### 3. `.github/workflows/deploy.yml` - GitHub Actions (Optional)
- Automated deployment on push to main/master
- Requires Vercel secrets in GitHub repository

## Deployment Steps:

### Method 1: Automatic (Recommended)
1. **Push to GitHub** - Vercel will auto-deploy
2. **Environment variables** are already set in `vercel.json`
3. **Done!** ✅

### Method 2: Manual Override
1. **Go to Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Add**: `VITE_API_BASE_URL = https://virpal-portfolio.onrender.com/api`
4. **Redeploy**

## What the vercel.json Does:

```json
{
  "routes": [
    { "handle": "filesystem" },     // Serve static files first
    { "src": "/(.*)", "dest": "/index.html" }  // SPA fallback
  ],
  "env": {
    "VITE_API_BASE_URL": "https://virpal-portfolio.onrender.com/api"
  }
}
```

## Verification:
After deployment, check browser console for:
```
API Base URL: https://virpal-portfolio.onrender.com/api
```

## Troubleshooting:
- **404 on refresh**: Check SPA routing in vercel.json
- **API errors**: Verify VITE_API_BASE_URL in environment
- **Build fails**: Check Node.js version compatibility