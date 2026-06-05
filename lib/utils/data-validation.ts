import { CustomerRecord, DataIssue, DataQualityMetrics } from "@/lib/types";
import { generateId } from "./helpers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  return PHONE_REGEX.test(phone.replace(/[\s\-()]/g, ""));
}

export function normalizePhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function normalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function detectDuplicates(records: CustomerRecord[]): string[][] {
  const emailMap = new Map<string, string[]>();
  const phoneMap = new Map<string, string[]>();

  records.forEach((record) => {
    if (record.email) {
      const normalizedEmail = normalizeEmail(record.email);
      if (!emailMap.has(normalizedEmail)) {
        emailMap.set(normalizedEmail, []);
      }
      emailMap.get(normalizedEmail)!.push(record.id);
    }

    if (record.phone) {
      const normalizedPhone = normalizePhone(record.phone);
      if (!phoneMap.has(normalizedPhone)) {
        phoneMap.set(normalizedPhone, []);
      }
      phoneMap.get(normalizedPhone)!.push(record.id);
    }
  });

  const duplicateGroups: Set<string> = new Set();
  const duplicates: string[][] = [];

  emailMap.forEach((ids) => {
    if (ids.length > 1) {
      const key = ids.sort().join(",");
      if (!duplicateGroups.has(key)) {
        duplicates.push(ids);
        duplicateGroups.add(key);
      }
    }
  });

  phoneMap.forEach((ids) => {
    if (ids.length > 1) {
      const key = ids.sort().join(",");
      if (!duplicateGroups.has(key)) {
        duplicates.push(ids);
        duplicateGroups.add(key);
      }
    }
  });

  return duplicates;
}

export function identifyIssues(
  records: CustomerRecord[],
  duplicateIds: Set<string>
): DataIssue[] {
  const issues: DataIssue[] = [];

  records.forEach((record) => {
    // Check for duplicates
    if (duplicateIds.has(record.id)) {
      issues.push({
        id: generateId(),
        recordId: record.id,
        type: "duplicate",
        field: "customer",
        message: "Potential duplicate customer record detected",
        severity: "high",
      });
    }

    // Check missing fields
    const requiredFields = ["firstName", "lastName", "email"];
    requiredFields.forEach((field) => {
      if (!record[field] || record[field] === "") {
        issues.push({
          id: generateId(),
          recordId: record.id,
          type: "missing",
          field,
          message: `Missing required field: ${field}`,
          severity: "high",
        });
      }
    });

    // Check email validity
    if (record.email && !validateEmail(record.email)) {
      issues.push({
        id: generateId(),
        recordId: record.id,
        type: "invalid",
        field: "email",
        message: `Invalid email format: ${record.email}`,
        severity: "medium",
      });
    }

    // Check phone validity
    if (record.phone && !validatePhone(record.phone)) {
      issues.push({
        id: generateId(),
        recordId: record.id,
        type: "invalid",
        field: "phone",
        message: `Invalid phone number format: ${record.phone}`,
        severity: "low",
      });
    }

    // Check for formatting issues
    if (record.firstName) {
      const normalized = normalizeName(record.firstName);
      if (normalized !== record.firstName) {
        issues.push({
          id: generateId(),
          recordId: record.id,
          type: "formatting",
          field: "firstName",
          message: `Name formatting inconsistency`,
          severity: "low",
        });
      }
    }
  });

  return issues;
}

export function calculateQualityMetrics(
  records: CustomerRecord[],
  issues: DataIssue[],
  duplicates: string[][]
): DataQualityMetrics {
  const totalRecords = records.length;
  const duplicateRecordIds = new Set<string>();

  duplicates.forEach((group) => {
    group.forEach((id) => {
      duplicateRecordIds.add(id);
    });
  });

  const duplicateRecords = duplicateRecordIds.size;

  const missingFieldsIssues = issues.filter((i) => i.type === "missing");
  const missingFields = new Set(missingFieldsIssues.map((i) => i.recordId))
    .size;

  const invalidEmailsIssues = issues.filter(
    (i) => i.type === "invalid" && i.field === "email"
  );
  const invalidEmails = invalidEmailsIssues.length;

  const invalidPhonesIssues = issues.filter(
    (i) => i.type === "invalid" && i.field === "phone"
  );
  const invalidPhones = invalidPhonesIssues.length;

  const recordsWithIssues = new Set(issues.map((i) => i.recordId)).size;
  const recordsOk = totalRecords - recordsWithIssues;
  const qualityScore = Math.round((recordsOk / totalRecords) * 100);

  const recordsWithAllFields = totalRecords - missingFields;
  const completenessScore = Math.round((recordsWithAllFields / totalRecords) * 100);

  const duplicateRate = totalRecords > 0 ? (duplicateRecords / totalRecords) * 100 : 0;

  return {
    totalRecords,
    duplicateRecords,
    missingFields,
    invalidEmails,
    invalidPhones,
    qualityScore,
    completenessScore,
    duplicateRate: Math.round(duplicateRate * 10) / 10,
  };
}

export function cleanRecord(record: CustomerRecord): CustomerRecord {
  return {
    ...record,
    firstName: record.firstName ? normalizeName(record.firstName) : "",
    lastName: record.lastName ? normalizeName(record.lastName) : "",
    email: record.email ? normalizeEmail(record.email) : "",
    phone: record.phone ? normalizePhone(record.phone) : "",
    company: record.company ? record.company.trim() : "",
    address: record.address ? record.address.trim() : "",
    city: record.city ? normalizeName(record.city) : "",
    state: record.state ? record.state.toUpperCase().trim() : "",
    zipCode: record.zipCode ? record.zipCode.trim() : "",
    country: record.country ? normalizeName(record.country) : "",
  };
}

export function cleanDataset(records: CustomerRecord[]): {
  cleaned: CustomerRecord[];
  issues: DataIssue[];
  duplicates: string[][];
  metrics: DataQualityMetrics;
} {
  // Clean individual records
  const cleaned = records.map(cleanRecord);

  // Detect duplicates
  const duplicates = detectDuplicates(cleaned);
  const duplicateIds = new Set<string>();
  duplicates.forEach((group) => {
    group.forEach((id) => duplicateIds.add(id));
  });

  // Identify issues
  const issues = identifyIssues(cleaned, duplicateIds);

  // Calculate metrics
  const metrics = calculateQualityMetrics(cleaned, issues, duplicates);

  return { cleaned, issues, duplicates, metrics };
}
