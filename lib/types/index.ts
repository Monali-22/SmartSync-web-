// Type definitions for SmartSync AI

export interface CustomerRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: string;
  lastUpdated: string;
  source: string;
  [key: string]: any;
}

export interface DataQualityMetrics {
  totalRecords: number;
  duplicateRecords: number;
  missingFields: number;
  invalidEmails: number;
  invalidPhones: number;
  qualityScore: number;
  completenessScore: number;
  duplicateRate: number;
}

export interface CleanedDataResult {
  originalRecords: CustomerRecord[];
  cleanedRecords: CustomerRecord[];
  mergedRecords: MergedRecord[];
  issues: DataIssue[];
  metrics: DataQualityMetrics;
}

export interface MergedRecord {
  id: string;
  mergedIds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  confidence: number;
  mergedAt: string;
}

export interface DataIssue {
  id: string;
  recordId: string;
  type: "duplicate" | "missing" | "invalid" | "formatting";
  field: string;
  message: string;
  severity: "low" | "medium" | "high";
}

export interface AIRecommendations {
  qualityImprovements: string[];
  dataCollectionSuggestions: string[];
  crmOptimizations: string[];
  retentionOpportunities: string[];
  marketingReadinessAssessment: string;
}

export interface AnalyticsData {
  date: string;
  qualityScore: number;
  completenessScore: number;
  duplicateRate: number;
  crmReadiness: number;
  marketingReadiness: number;
}

export interface UploadSession {
  id: string;
  fileName: string;
  uploadDate: string;
  recordCount: number;
  status: "pending" | "processing" | "completed" | "error";
  errorMessage?: string;
  results?: CleanedDataResult;
  recommendations?: AIRecommendations;
}

export interface SegmentData {
  name: string;
  count: number;
  percentage: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  percentage?: number;
  count?: number;
}
