import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkIsAdmin } from "@/lib/auth";
import { getContentStore, saveContentStore, convertContentToCsv, parseCsvToContent } from "@/lib/content-store";

// Download CSV Safety Net Backup
export async function GET() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  const { content, updatedAt } = getContentStore();
  const csvData = convertContentToCsv(content);

  const dateStr = new Date(updatedAt).toISOString().split("T")[0];
  const filename = `hansbau_zaloha_${dateStr}.csv`;

  return new NextResponse(csvData, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

// Upload & Restore from CSV Safety Net Backup
export async function POST(req: Request) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  try {
    const csvText = await req.text();
    if (!csvText || !csvText.includes("page,key,value")) {
      return NextResponse.json(
        { error: "Neplatný formát CSV souboru. Soubor musí obsahovat hlavičku 'page,key,value'." },
        { status: 400 }
      );
    }

    const restoredContent = parseCsvToContent(csvText);
    const saveResult = saveContentStore(restoredContent);

    // Invalidate SSR caches across all pages
    try {
      revalidatePath("/", "layout");
    } catch (cacheErr) {
      console.warn("Cache revalidation warning:", cacheErr);
    }

    return NextResponse.json({
      ...saveResult,
      message: "Záloha CSV byla úspěšně obnovena a synchronizována s NoSQL databází.",
      content: restoredContent,
    });
  } catch (err) {
    console.error("CSV restore error:", err);
    return NextResponse.json({ error: "Chyba při obnově z CSV souboru." }, { status: 500 });
  }
}
