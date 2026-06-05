# SmartSync AI - Enterprise Data Integration Assistant

A production-ready SaaS application that helps businesses clean, standardize, analyze, and prepare customer data for CRM, loyalty, and marketing systems using AI-powered data integration.

## Features

### 1. **Data Quality Dashboard**
- Real-time metrics on duplicates, missing fields, and data quality scores
- Visual analytics with Recharts
- Comprehensive data quality assessment

### 2. **AI-Powered Cleaning Engine**
- Automatic duplicate detection and merging
- Email and phone number validation
- Data standardization and normalization
- Confidence scoring for merged records

### 3. **Advanced Analytics**
- Customer segmentation analysis
- Missing field trends analysis
- Data quality distribution charts
- CRM and marketing readiness scoring

### 4. **AI Recommendations** (Powered by Google Gemini)
- Quality improvement suggestions
- Data collection recommendations
- CRM optimization strategies
- Customer retention opportunities
- Marketing readiness assessment

### 5. **Data Upload & Processing**
- CSV file upload with drag-and-drop support
- Demo dataset generation with realistic data quality issues
- Real-time processing status
- Error handling and validation

### 6. **Export Functionality**
- Export cleaned data as CSV
- Generate PDF reports with analytics
- One-click download options

### 7. **Enterprise-Grade Design**
- Modern glassmorphism UI inspired by HubSpot, Salesforce, and Stripe
- Dark mode support
- Responsive mobile design
- Smooth animations and loading states
- Professional typography and spacing

## Tech Stack

- **Frontend:** Next.js 15 with App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 3.4 with custom components
- **UI Components:** Custom shadcn/ui-inspired components
- **Charts & Analytics:** Recharts
- **AI Integration:** Google Gemini API
- **Data Processing:** CSV parsing, validation, and cleaning logic
- **Theme Management:** next-themes for dark mode

## Project Structure

```
smartsync-ai/
├── app/
│   ├── (public)/              # Public pages
│   │   └── page.tsx           # Landing page
│   ├── (dashboard)/           # Dashboard pages
│   │   └── dashboard/
│   │       └── page.tsx       # Main dashboard
│   ├── api/
│   │   ├── data/
│   │   │   ├── clean/route.ts # Data cleaning endpoint
│   │   │   └── demo/route.ts  # Demo data generation
│   │   └── ai/
│   │       └── recommendations/route.ts # AI recommendations
│   ├── layout.tsx             # Root layout
│   ├── providers.tsx          # Theme provider
│   └── globals.css            # Global styles
├── components/
│   ├── landing/               # Landing page components
│   │   └── hero.tsx          # Hero, features, CTA sections
│   ├── dashboard/             # Dashboard components
│   │   ├── file-upload.tsx
│   │   ├── metrics-grid.tsx
│   │   ├── charts.tsx
│   │   ├── ai-recommendations.tsx
│   │   ├── data-preview.tsx
│   │   └── export-options.tsx
│   ├── common/                # Shared components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── loading-spinner.tsx
│   │   └── error-boundary.tsx
│   └── ui/                    # Base UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── badge.tsx
│       └── alert.tsx
├── lib/
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   ├── helpers.ts        # Utility functions
│   │   └── data-validation.ts # Data cleaning logic
│   ├── ai/
│   │   └── gemini.ts         # Gemini API integration
│   ├── data/
│   │   └── demo-dataset.ts   # Demo data generator
│   └── hooks/                # Custom React hooks (empty)
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── .env.local                # Local environment variables
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd smartsync-ai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get your Gemini API key from: https://makersuite.google.com/app/apikey

4. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features in Detail

### Landing Page
- Modern SaaS design with hero section
- Features showcase
- Call-to-action buttons
- Professional footer

### Dashboard

#### Upload Section
- Drag-and-drop CSV upload
- File validation
- Demo dataset option for quick testing

#### Data Quality Metrics
- Total records count
- Duplicate detection
- Missing fields analysis
- Invalid email/phone detection
- Quality and completeness scores

#### Advanced Analytics
- Data quality trends chart
- Duplicate distribution visualization
- Customer segmentation pie chart
- Missing fields analysis chart
- Detailed metrics breakdown

#### AI-Powered Insights
- Quality improvement recommendations
- Data collection suggestions
- CRM optimization strategies
- Retention opportunities
- Marketing readiness assessment

#### Data Preview & Issues
- Cleaned data table preview (first 10 records)
- Detailed data issue list with severity levels
- Type categorization (duplicate, missing, invalid, formatting)
- Filterable and sortable issues

#### Export Options
- CSV export for CRM integration
- PDF report generation
- One-click download

## Data Processing Pipeline

### 1. **Upload & Parse**
- Accept CSV files
- Parse headers and data rows
- Create typed customer records

### 2. **Validation**
- Email format validation
- Phone number validation
- Required field checking
- Formatting consistency checks

### 3. **Cleaning**
- Name normalization (proper capitalization)
- Email normalization (lowercase, trimmed)
- Phone number normalization (consistent format)
- Company and address trimming

### 4. **Duplicate Detection**
- Email-based duplicate detection
- Phone number-based duplicate detection
- Confidence scoring for merged records

### 5. **Quality Scoring**
- Calculate quality score based on valid records
- Completeness score based on filled fields
- Duplicate rate calculation
- Issue severity classification

### 6. **AI Recommendations**
- Send metrics to Gemini API
- Generate actionable insights
- Provide business recommendations

## API Endpoints

### Data Endpoints

#### POST `/api/data/clean`
Process and clean customer data.

**Request:**
```json
{
  "records": [
    {
      "id": "record-1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1(555)123-4567",
      "company": "Acme Corp",
      ...
    }
  ]
}
```

**Response:**
```json
{
  "originalRecords": [...],
  "cleanedRecords": [...],
  "mergedRecords": [...],
  "issues": [...],
  "metrics": {
    "totalRecords": 500,
    "duplicateRecords": 5,
    "missingFields": 12,
    "invalidEmails": 3,
    "invalidPhones": 2,
    "qualityScore": 95,
    "completenessScore": 92,
    "duplicateRate": 1.0
  }
}
```

#### GET `/api/data/demo?count=500`
Generate demo dataset with realistic data quality issues.

**Response:**
```json
{
  "records": [...],
  "message": "Demo dataset generated successfully",
  "count": 500
}
```

### AI Endpoints

#### POST `/api/ai/recommendations`
Generate AI-powered recommendations based on data quality metrics.

**Request:**
```json
{
  "metrics": {
    "totalRecords": 500,
    "qualityScore": 85,
    "completenessScore": 90,
    ...
  }
}
```

**Response:**
```json
{
  "qualityImprovements": [...],
  "dataCollectionSuggestions": [...],
  "crmOptimizations": [...],
  "retentionOpportunities": [...],
  "marketingReadinessAssessment": "..."
}
```

## Deployment

### Vercel Deployment

1. **Push to Git:**
```bash
git push origin main
```

2. **Connect to Vercel:**
- Go to [Vercel Dashboard](https://vercel.com)
- Click "New Project"
- Import your repository
- Add environment variables
- Click "Deploy"

3. **Set Environment Variables in Vercel:**
- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Gemini API key
- `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL

### Alternative Deployment Options
- Docker containerization
- AWS Lambda / EC2
- Google Cloud Platform
- Azure App Service

## Performance Optimizations

- Next.js Image optimization
- Code splitting with dynamic imports
- CSS-in-JS with Tailwind (no runtime overhead)
- Server-side rendering for SEO
- API route optimization
- Efficient data processing algorithms

## Accessibility

- WCAG 2.1 compliant components
- Semantic HTML
- Proper ARIA labels
- Keyboard navigation support
- Screen reader optimized

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security

- Environment variable protection
- CORS enabled for API routes
- Input validation and sanitization
- No sensitive data logging
- Secure headers configured

## Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Fallback UI states
- Graceful degradation
- Console error logging

## Future Enhancements

- Database integration for data persistence
- User authentication and authorization
- Advanced duplicate matching algorithms
- Real-time data streaming
- Batch processing for large datasets
- Custom rules engine
- Data lineage tracking
- Webhook integrations
- API access for external applications
- Advanced permissions and roles

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@smartsync-ai.com or visit our website.

## Acknowledgments

- Next.js and React communities
- Recharts for visualization
- Google Gemini for AI capabilities
- Tailwind CSS for styling

---

Built with ❤️ by SmartSync AI Team
