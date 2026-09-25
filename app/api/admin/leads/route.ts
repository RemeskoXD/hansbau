import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { getLeads, updateLead, deleteLead, LeadStatus } from "@/lib/leads-store";

export async function GET() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ leads, count: leads.length });
}

export async function PATCH(req: Request) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Chybí ID poptávky." }, { status: 400 });
    }

    const updates: { status?: LeadStatus; notes?: string } = {};
    if (status) updates.status = status as LeadStatus;
    if (typeof notes === "string") updates.notes = notes;

    const updated = updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Poptávka nebyla nalezena." }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (err) {
    console.error("Admin PATCH lead error:", err);
    return NextResponse.json({ error: "Chyba při aktualizaci poptávky." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Chybí ID poptávky ke smazání." }, { status: 400 });
    }

    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ error: "Poptávka nebyla nalezena." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Admin DELETE lead error:", err);
    return NextResponse.json({ error: "Chyba při mazání poptávky." }, { status: 500 });
  }
}
