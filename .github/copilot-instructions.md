# SmartSync AI - Project Development Guide

## Project Overview

SmartSync AI is a production-ready SaaS application for enterprise customer data integration, cleaning, and analysis using AI-powered recommendations.

**Tech Stack:** Next.js 15 + TypeScript + Tailwind CSS + Gemini API

## Architecture

### Frontend
- **Framework:** Next.js 15 with App Router
- **UI Components:** Custom React components with Tailwind CSS
- **Charts:** Recharts for data visualization
- **Theming:** next-themes for dark/light mode
- **Type Safety:** Full TypeScript

### Backend
- **API Routes:** Next.js API routes for server-side processing
- **Data Processing:** CSV parsing, validation, cleaning, duplicate detection
- **AI Integration:** Google Gemini API for recommendations
- **File Handling:** In-memory CSV processing

### Data Flow
```
User Upload/Demo Data
    ↓
CSV Parsing
    ↓
Data Validation & Cleaning
    ↓
Duplicate Detection
    ↓
Quality Metrics Calculation
    ↓
AI Recommendations (Gemini)
    ↓
Dashboard Display
    ↓
Export (CSV/PDF)
```

## Development Standards

### Code Organization
- **Components:** Reusable React components in `/components`
- **Pages:** Next.js pages in `/app` using App Router
- **API Routes:** Backend logic in `/app/api`
- **Utilities:** Helper functions in `/lib`
- **Types:** TypeScript interfaces in `/lib/types`

### Naming Conventions
- **Files:** kebab-case (e.g., `file-upload.tsx`)
- **Components:** PascalCase (e.g., `FileUpload`)
- **Functions:** camelCase (e.g., `handleFileSelect`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Types:** PascalCase (e.g., `CustomerRecord`)

### File Structure
```
component.tsx
├── Imports
├── Type definitions
├── Component function
├── Styling
└── Export
```

## Common Development Tasks

### Adding a New Page
1. Create file in `/app` with route structure
2. Mark as "use client" for client-side components
3. Import necessary components
4. Add metadata if needed

### Adding a New Component
1. Create file in `/components/<category>/`
2. Export both default and named exports
3. Include proper TypeScript types
4. Use consistent styling with Tailwind

### Adding a New API Endpoint
1. Create route file at `/app/api/<resource>/route.ts`
2. Export handler functions (GET, POST, etc.)
3. Include error handling
4. Return structured JSON responses

### Adding Styling
- **Global:** Edit `/app/globals.css`
- **Component:** Use Tailwind className strings
- **Dark Mode:** Use `dark:` prefix for dark mode styles
- **Responsive:** Use `sm:`, `md:`, `lg:` prefixes

## Data Processing Pipeline

### Data Validation
- Email format: RFC compliant regex
- Phone number: International format support
- Required fields: firstName, lastName, email

### Data Cleaning
- Name normalization: Proper capitalization
- Email normalization: Lowercase, trim whitespace
- Phone normalization: Consistent format
- Company/Address: Trimming extra spaces

### Duplicate Detection
- Email-based matching
- Phone number matching with normalization
- Confidence scoring

### Quality Scoring
- Quality Score: % of valid records
- Completeness Score: % of filled fields
- Duplicate Rate: % of duplicate records

## API Responses

### Standard Success Response
```json
{
  "status": "success",
  "data": {...},
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Standard Error Response
```json
{
  "status": "error",
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Environment Variables

### Required
- `NEXT_PUBLIC_GEMINI_API_KEY`: Google Gemini API key

### Optional
- `NEXT_PUBLIC_APP_URL`: Application URL
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_ENABLE_DEMO_DATA`: Enable demo data feature

## Testing Checklist

- [ ] Components render without errors
- [ ] API endpoints return correct data
- [ ] Validation rules work as expected
- [ ] Dark mode toggling works
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] Error handling displays user-friendly messages
- [ ] Loading states appear during processing
- [ ] Export functionality works

## Performance Considerations

- Lazy load charts with dynamic imports
- Limit CSV file size to prevent memory issues
- Use useMemo for expensive calculations
- Debounce input handlers
- Implement pagination for large datasets

## Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

### Pre-Deployment Checklist
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All env variables configured
- [ ] No console errors in production build
- [ ] Responsive design tested

### Vercel Deployment
```bash
git push main
# Vercel automatically deploys on push
# Monitor deployment at vercel.com dashboard
```

## Troubleshooting

### Build Errors
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Run type check: `npm run type-check`
4. Check for circular imports

### Runtime Errors
1. Check browser console for errors
2. Check Network tab for API failures
3. Verify environment variables
4. Check API route logs

### Performance Issues
1. Use DevTools Performance tab
2. Check bundle size
3. Profile with Chrome DevTools
4. Look for N+1 queries

## Code Review Guidelines

### Before PR
- [ ] Code follows naming conventions
- [ ] TypeScript types are complete
- [ ] Error handling implemented
- [ ] No console.log left in code
- [ ] Responsive design verified
- [ ] Dark mode tested
- [ ] Accessibility checked

### PR Description
- What: Brief description of changes
- Why: Reason for changes
- How: Implementation approach
- Tests: What was tested

## Future Enhancements

1. **Database Integration**
   - PostgreSQL or MongoDB
   - User data persistence
   - History tracking

2. **User Authentication**
   - NextAuth.js integration
   - User profiles
   - Role-based access

3. **Advanced Features**
   - Real-time data streaming
   - Batch processing
   - Custom validation rules
   - Webhook integrations

4. **Performance**
   - Database query optimization
   - Caching strategy
   - CDN integration
   - API rate limiting

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/)
- [Google Gemini API](https://ai.google.dev/)

## Getting Help

- Check existing GitHub issues
- Review code comments and docstrings
- Consult README.md for general info
- Check QUICKSTART.md for setup issues

---

Last Updated: 2024
