import fs from "fs";
import path from "path";
import { PageContent, DEFAULT_CONTENT } from "./content-schema";
export type { PageContent };
export { DEFAULT_CONTENT };

const DATA_DIR = path.join(process.cwd(), "data");
const NOSQL_FILE = path.join(DATA_DIR, "content_store.json");
const CSV_FILE = path.join(DATA_DIR, "content_backup.csv");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Helper: Escape CSV cell value according to RFC 4180
function escapeCsvValue(val: string): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes('"') || str.includes(",") || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

// Convert Document Store to Flat CSV Rows
export function convertContentToCsv(content: PageContent): string {
  const rows: string[] = [];
  rows.push("page,key,value");

  for (const [pageKey, pageObj] of Object.entries(content)) {
    for (const [itemKey, itemVal] of Object.entries(pageObj as Record<string, string>)) {
      rows.push(`${pageKey},${itemKey},${escapeCsvValue(itemVal)}`);
    }
  }

  // Include UTF-8 BOM so Excel opens it with perfect Czech accents
  return "\uFEFF" + rows.join("\r\n");
}

// Parse Flat CSV Rows back into PageContent
export function parseCsvToContent(csvText: string): PageContent {
  // Strip UTF-8 BOM if present
  const cleanText = csvText.startsWith("\uFEFF") ? csvText.slice(1) : csvText;
  
  // Clone default content
  const result: any = JSON.parse(JSON.stringify(DEFAULT_CONTENT));

  // Regex-based CSV parser handling multiline and quotes
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentVal.trim());
        currentVal = "";
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') {
          i++; // skip CRLF
        }
        currentRow.push(currentVal.trim());
        if (currentRow.length >= 3 && currentRow[0] !== "page") {
          rows.push(currentRow);
        }
        currentRow = [];
        currentVal = "";
      } else {
        currentVal += char;
      }
    }
  }

  if (currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.length >= 3 && currentRow[0] !== "page") {
      rows.push(currentRow);
    }
  }

  for (const row of rows) {
    const [page, key, ...valParts] = row;
    const val = valParts.join(",");
    if (result[page] && key in result[page]) {
      result[page][key] = val;
    }
  }

  return result as PageContent;
}

// Read Content (NoSQL with CSV Safety Net fallback)
export function getContentStore(): { content: PageContent; updatedAt: string; source: "nosql" | "csv" | "default" } {
  ensureDataDir();

  // 1. Try reading NoSQL JSON store
  if (fs.existsSync(NOSQL_FILE)) {
    try {
      const raw = fs.readFileSync(NOSQL_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.documents) {
        // Deep merge with defaults to guarantee all keys exist
        const merged: PageContent = {
          home: { ...DEFAULT_CONTENT.home, ...(parsed.documents.home || {}) },
          about: { ...DEFAULT_CONTENT.about, ...(parsed.documents.about || {}) },
          calculator: { ...DEFAULT_CONTENT.calculator, ...(parsed.documents.calculator || {}) },
          contact: { ...DEFAULT_CONTENT.contact, ...(parsed.documents.contact || {}) },
          company: { ...DEFAULT_CONTENT.company, ...(parsed.documents.company || {}) }
        };
        return { content: merged, updatedAt: parsed.updatedAt || new Date().toISOString(), source: "nosql" };
      }
    } catch (e) {
      console.error("Warning: Error reading NoSQL file, falling back to CSV safety net:", e);
    }
  }

  // 2. Try reading CSV safety net backup
  if (fs.existsSync(CSV_FILE)) {
    try {
      const csvRaw = fs.readFileSync(CSV_FILE, "utf8");
      const parsedContent = parseCsvToContent(csvRaw);
      return { content: parsedContent, updatedAt: new Date().toISOString(), source: "csv" };
    } catch (e) {
      console.error("Warning: Error reading CSV safety net file:", e);
    }
  }

  // 3. Fallback to default content & initialize files
  saveContentStore(DEFAULT_CONTENT);
  return { content: DEFAULT_CONTENT, updatedAt: new Date().toISOString(), source: "default" };
}

// Save Content: Writes to NoSQL store + immediately updates the CSV safety net backup
export function saveContentStore(newContent: PageContent): { success: boolean; updatedAt: string; nosqlSize: number; csvSize: number } {
  ensureDataDir();
  const updatedAt = new Date().toISOString();

  // 1. Write to NoSQL JSON Document Store
  const noSqlData = {
    updatedAt,
    version: 1,
    documents: newContent
  };
  fs.writeFileSync(NOSQL_FILE, JSON.stringify(noSqlData, null, 2), "utf8");
  const nosqlSize = fs.statSync(NOSQL_FILE).size;

  // 2. Write to CSV Safety Net Backup
  const csvData = convertContentToCsv(newContent);
  fs.writeFileSync(CSV_FILE, csvData, "utf8");
  const csvSize = fs.statSync(CSV_FILE).size;

  return {
    success: true,
    updatedAt,
    nosqlSize,
    csvSize
  };
}
