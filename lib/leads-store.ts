import fs from "fs";
import path from "path";
import crypto from "crypto";

export type LeadStatus = "novy" | "kontaktovano" | "domluveno" | "dokonceno" | "archivovano";

export interface LeadRecord {
  id: string;
  type: "contact" | "calculator";
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  areaSize?: string;
  calculatorDetails?: {
    buildingType?: string;
    layout?: string;
    standard?: string;
    priceRange?: string;
    timeEstimate?: string;
  };
  clientIp?: string;
  status: LeadStatus;
  emailDelivered: boolean;
  emailError?: string;
  notes?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads_store.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Retrieve all leads, sorted newest first
 */
export function getLeads(): LeadRecord[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return [];
  } catch (err) {
    console.error("Error reading leads store file:", err);
    return [];
  }
}

/**
 * Save a new lead atomically to disk
 */
export function saveLead(
  leadInput: Omit<LeadRecord, "id" | "createdAt" | "status"> & {
    id?: string;
    createdAt?: string;
    status?: LeadStatus;
  }
): LeadRecord {
  ensureDataDir();
  const leads = getLeads();

  const newLead: LeadRecord = {
    id: leadInput.id || `lead_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
    createdAt: leadInput.createdAt || new Date().toISOString(),
    status: leadInput.status || "novy",
    ...leadInput,
  };

  leads.unshift(newLead);

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
  } catch (err) {
    console.error("Error persisting lead to disk:", err);
  }

  return newLead;
}

/**
 * Update an existing lead by ID (e.g. status, notes, email delivery status)
 */
export function updateLead(id: string, updates: Partial<LeadRecord>): LeadRecord | null {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) {
    return null;
  }

  leads[index] = {
    ...leads[index],
    ...updates,
    id: leads[index].id, // Prevent ID overwrite
  };

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
  } catch (err) {
    console.error("Error updating lead in disk store:", err);
  }

  return leads[index];
}

/**
 * Delete a lead by ID
 */
export function deleteLead(id: string): boolean {
  ensureDataDir();
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);

  if (filtered.length === leads.length) {
    return false;
  }

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error deleting lead from disk store:", err);
    return false;
  }
}
