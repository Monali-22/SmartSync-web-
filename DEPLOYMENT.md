# Deployment Guide

## SmartSync AI - Vercel Deployment

This guide walks you through deploying SmartSync AI to Vercel.

## Prerequisites

- GitHub, GitLab, or Bitbucket account
- Vercel account (free at https://vercel.com)
- Google Gemini API key

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select your project or create a new one
4. Copy the API key

## Step 2: Push Code to Git

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial SmartSync AI commit"

# Add remote and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure project settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow prompts to connect to your account and select project settings
```

## Step 4: Set Environment Variables

### In Vercel Dashboard:

1. Go to your project settings
2. Click "Environment Variables"
3. Add the following variables:

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL | Production, Preview, Development |
| `NEXT_PUBLIC_APP_NAME` | SmartSync AI | Production, Preview, Development |

### Using Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_GEMINI_API_KEY
vercel env add NEXT_PUBLIC_APP_URL
vercel env add NEXT_PUBLIC_APP_NAME
```

## Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to Settings → Domains
2. Enter your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (typically 24-48 hours)

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test landing page features
3. Try the dashboard with demo data
4. Verify all charts and analytics load correctly

## Production Checklist

- [ ] Environment variables are set
- [ ] Gemini API key is valid
- [ ] TypeScript builds without errors
- [ ] All API routes respond correctly
- [ ] Dark mode works properly
- [ ] Mobile responsive layout verified
- [ ] Custom domain configured (if applicable)
- [ ] Analytics/monitoring set up

## Monitoring & Logs

### View Deployment Logs:
```bash
vercel logs
```

### Monitor Performance:
1. Go to Vercel Dashboard
2. Click on your project
3. View Analytics tab

## Troubleshooting

### Build Failures

**Issue:** "Command 'npm run build' failed"

**Solution:**
```bash
# Verify locally first
npm install
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

### Runtime Errors

**Issue:** "Error: Failed to process data"

**Check:**
1. Verify environment variables are set
2. Check API route logs
3. Ensure Gemini API key is valid

### Gemini API Not Working

**Issue:** "Gemini API responses are not being generated"

**Solution:**
1. Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set correctly
2. Check API key is active at https://makersuite.google.com/app/apikey
3. Check for rate limiting
4. Review API quotas

### Slow Performance

**Solution:**
1. Use Vercel Analytics to identify bottlenecks
2. Enable Incremental Static Regeneration (ISR)
3. Optimize API route processing
4. Consider database caching

## Scaling Considerations

### For Production Scale:

1. **Database Integration:**
   - Add PostgreSQL or MongoDB for data persistence
   - Cache processed results

2. **Authentication:**
   - Implement NextAuth.js or Auth0
   - Add user management

3. **File Storage:**
   - Use AWS S3 or Vercel Blob Storage
   - Store uploaded CSV files

4. **API Rate Limiting:**
   - Implement rate limiting middleware
   - Add queue system for large datasets

5. **Caching Strategy:**
   - Use Redis for caching
   - Implement CDN caching

## Cost Optimization

- **Vercel Free Tier:** 100GB bandwidth/month
- **Gemini API:** Free tier includes 60 requests/minute
- **For high volume:**
  - Upgrade Vercel plan ($20/month starter)
  - Upgrade Gemini to paid tier if needed

## Rollback Procedures

If issues occur after deployment:

```bash
# Vercel automatically keeps previous deployments
# In Dashboard:
1. Go to Deployments tab
2. Click "Redeploy" on a previous version
3. Confirm redeployment

# Or via CLI:
vercel rollback
```

## Continuous Deployment

### Auto-Deploy on Git Push:

Vercel automatically deploys when you push to your main branch:

```bash
# Push updates
git add .
git commit -m "Update features"
git push origin main

# Vercel will automatically:
# 1. Detect the push
# 2. Run build
# 3. Deploy to preview URL
# 4. Run production deployment after approval
```

## SSL/TLS Certificate

Vercel automatically provides SSL certificates for all deployments (HTTPS).

## Performance Optimization Tips

1. **Use Image Optimization:**
   - Replace image imports with Next.js Image component

2. **Code Splitting:**
   - Dynamic imports for large components
   - Already implemented for charts

3. **Database Query Optimization:**
   - Index frequently queried fields
   - Implement pagination

4. **CDN Usage:**
   - Vercel Edge Network (included)
   - Cache headers optimization

## Maintenance

### Regular Tasks:
- Monitor error logs weekly
- Update dependencies monthly
- Review performance metrics
- Backup data if using database

### Update Deployment:
```bash
npm update
npm run build
npm run lint
git push
```

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini API Docs](https://ai.google.dev/)
- [SmartSync AI GitHub Issues](link-to-your-repo)

## Next Steps After Deployment

1. Set up custom domain
2. Configure analytics (Vercel Analytics)
3. Set up error monitoring (Sentry)
4. Add database for persistence
5. Implement user authentication
6. Create API documentation for integrations

---

For additional help, check the main README.md or contact support@smartsync-ai.com
