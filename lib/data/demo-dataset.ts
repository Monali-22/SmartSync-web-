import { CustomerRecord } from "@/lib/types";
import { generateId } from "@/lib/utils/helpers";
import { faker } from "@faker-js/faker";

// Create a simple faker-like implementation for sample data
export function generateDemoDataset(count: number = 500): CustomerRecord[] {
  const companies = [
    "Acme Corp",
    "TechFlow Inc",
    "Global Solutions",
    "Enterprise Systems",
    "Digital Dynamics",
    "CloudBase Ltd",
    "DataStream Co",
    "Future Ventures",
  ];

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ];

  const states = [
    "NY",
    "CA",
    "TX",
    "FL",
    "PA",
    "IL",
    "OH",
    "GA",
    "NC",
    "MI",
  ];

  const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France"];

  const records: CustomerRecord[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = generateRandomFirstName();
    const lastName = generateRandomLastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    const record: CustomerRecord = {
      id: generateId(),
      firstName,
      lastName,
      email,
      phone: generateRandomPhone(),
      company: companies[Math.floor(Math.random() * companies.length)],
      address: `${Math.floor(Math.random() * 9999) + 1} ${generateRandomStreet()} St`,
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      zipCode: String(Math.floor(Math.random() * 90000) + 10000),
      country: countries[Math.floor(Math.random() * countries.length)],
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      lastUpdated: new Date().toISOString(),
      source: ["Salesforce", "HubSpot", "Import", "Website"][
        Math.floor(Math.random() * 4)
      ],
    };

    // Randomly introduce data quality issues
    if (Math.random() < 0.15) {
      // 15% missing email
      record.email = "";
    } else if (Math.random() < 0.1) {
      // 10% invalid email
      record.email = `${firstName}@invalid`;
    }

    if (Math.random() < 0.2) {
      // 20% invalid phone
      record.phone = "123";
    } else if (Math.random() < 0.1) {
      // 10% missing phone
      record.phone = "";
    }

    if (Math.random() < 0.1) {
      // 10% missing name
      record.firstName = "";
    }

    if (Math.random() < 0.08) {
      // 8% formatting issues
      record.firstName = record.firstName.toLowerCase();
      record.lastName = record.lastName.toUpperCase();
    }

    records.push(record);
  }

  // Intentionally create some duplicates (5-10 records)
  const duplicateCount = Math.floor(Math.random() * 6) + 5;
  for (let i = 0; i < duplicateCount; i++) {
    const originalIndex = Math.floor(Math.random() * (count - 100));
    const original = records[originalIndex];

    const duplicate: CustomerRecord = {
      ...original,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    // Slightly modify the duplicate
    if (Math.random() < 0.5) {
      duplicate.email = original.email.replace("@", " @"); // spacing issue
    }
    if (Math.random() < 0.5) {
      duplicate.phone = original.phone.replace(/-/g, " "); // formatting difference
    }

    records.push(duplicate);
  }

  return records;
}

function generateRandomFirstName(): string {
  const names = [
    "John",
    "Jane",
    "Michael",
    "Sarah",
    "Robert",
    "Emily",
    "David",
    "Emma",
    "James",
    "Olivia",
    "William",
    "Ava",
    "Richard",
    "Isabella",
    "Joseph",
    "Sophia",
    "Thomas",
    "Charlotte",
    "Charles",
    "Amelia",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomLastName(): string {
  const names = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomPhone(): string {
  const areaCode = Math.floor(Math.random() * 900) + 200;
  const exchange = Math.floor(Math.random() * 900) + 200;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `+1(${areaCode})${exchange}-${line}`;
}

function generateRandomStreet(): string {
  const streets = [
    "Main",
    "Oak",
    "Elm",
    "Maple",
    "Cedar",
    "Pine",
    "Park",
    "River",
    "Hill",
    "Lake",
  ];
  return streets[Math.floor(Math.random() * streets.length)];
}
