# Deployment Guide

## Setting up API URL for Production

### Method 1: Using the script (Recommended)
```bash
# Set your backend API URL
npm run set-api-url https://your-backend-url.onrender.com/api
```

### Method 2: Manual setup
1. Create or update `.env.production` file:
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
VITE_ADMIN_EMAIL=77virpalsinh77@gmail.com
REACT_APP_ADMIN_EMAIL=77virpalsinh77@gmail.com
```

### Method 3: Environment Variables on Platform
Set these environment variables on your deployment platform (Vercel/Netlify):
- `VITE_API_BASE_URL`: Your backend API URL
- `VITE_ADMIN_EMAIL`: Admin email address

## Deployment Steps

### Quick Fix for Current Issue:
```bash
# 1. Set the correct API URL
npm run set-api-url https://virpal-portfolio.onrender.com

# 2. Build the project
npm run build

# 3. Deploy the dist folder
```

### For Vercel:
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL=https://virpal-portfolio.onrender.com/api`
3. Deploy

### For Netlify:
1. Connect your GitHub repository  
2. Set environment variables in Netlify dashboard:
   - `VITE_API_BASE_URL=https://virpal-portfolio.onrender.com/api`
3. Deploy

### For Render:
1. Connect your GitHub repository
2. Set environment variables in Render dashboard:
   - `VITE_API_BASE_URL=https://virpal-portfolio.onrender.com/api`
3. Deploy

## Important Notes:
- Make sure your backend is deployed first and accessible
- Update CORS settings in your backend to allow your frontend domain
- Test the API connection after deployment

## Troubleshooting:
- Check browser console for API URL being used
- Verify backend is accessible from your deployed frontend
- Check CORS settings on backend
- Ensure environment variables are properly set