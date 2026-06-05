# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
1. Open `.env.local`
2. Add your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

Get your free API key: https://makersuite.google.com/app/apikey

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Test the App

1. **Landing Page:** View features and design
2. **Dashboard:** Upload sample CSV or use demo data
3. **View Results:** Check data quality metrics and AI recommendations

## Sample CSV Format

Create a `test.csv` file with this structure:

```csv
firstName,lastName,email,phone,company,address,city,state,zipCode,country
John,Doe,john@example.com,+1(555)123-4567,Acme Corp,123 Main St,New York,NY,10001,USA
Jane,Smith,jane@example.com,+1(555)234-5678,Tech Inc,456 Oak Ave,Los Angeles,CA,90001,USA
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run type-check # TypeScript type checking
```

## Features to Try

### 1. **Demo Data**
Click "Try Demo Data" in dashboard to see the app in action with pre-generated sample data including:
- Duplicate records
- Missing values
- Invalid emails/phones
- Formatting issues

### 2. **Data Upload**
- Drag and drop CSV files
- Select files manually
- File validation included

### 3. **Analytics Dashboard**
- View data quality metrics
- Analyze duplicate distribution
- See missing field trends
- Customer segmentation

### 4. **AI Recommendations**
- Get quality improvement suggestions
- Data collection recommendations
- CRM optimization strategies
- Marketing readiness assessment

### 5. **Export Data**
- Export cleaned CSV
- Generate PDF report
- Download analytics summary

## Troubleshooting

### "Module not found" Error
```bash
npm install
npm run build
```

### "Gemini API key not found"
1. Check `.env.local` file exists
2. Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set
3. Get new key from https://makersuite.google.com/app/apikey

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Dark Mode Not Working
- Check theme provider in `app/providers.tsx`
- Clear browser cache
- Check CSS is loaded in browser DevTools

## Next Steps

1. **Customize UI:** Edit components in `/components`
2. **Add Features:** Create new API routes in `/app/api`
3. **Deploy:** Follow `DEPLOYMENT.md` for Vercel setup
4. **Database:** Add MongoDB or PostgreSQL for persistence
5. **Auth:** Implement NextAuth.js for user management

## Useful Resources

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🤖 [Google Gemini API](https://ai.google.dev/)
- 📊 [Recharts Documentation](https://recharts.org)
- 🚀 [Vercel Deployment](https://vercel.com/docs)

## Performance Tips

- Use demo data for testing (faster than CSV upload)
- Chrome DevTools → Performance tab to profile
- Check Network tab for API response times
- Enable dark mode for reduced eye strain

## Support

Need help?
- Check README.md for detailed documentation
- Review DEPLOYMENT.md for production setup
- Check error messages in browser console
- Verify API responses in Network tab

---

Happy data cleaning! 🚀
