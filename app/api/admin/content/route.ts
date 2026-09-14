import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkIsAdmin } from "@/lib/auth";
import { getContentStore, saveContentStore, PageContent } from "@/lib/content-store";

export async function GET() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  const data = getContentStore();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Neautorizovaný přístup." }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body || !body.home || !body.about || !body.calculator || !body.contact) {
      return NextResponse.json({ error: "Neplatná data obsahu." }, { status: 400 });
    }

    const saveResult = saveContentStore(body as PageContent);

    // Invalidate SSR caches across all pages
    try {
      revalidatePath("/", "layout");
    } catch (cacheErr) {
      console.warn("Cache revalidation warning:", cacheErr);
    }

    return NextResponse.json({
      ...saveResult,
      message: "Obsah byl úspěšně uložen do NoSQL databáze i do CSV záchranné sítě.",
    });
  } catch (err) {
    console.error("Save content API error:", err);
    return NextResponse.json({ error: "Chyba při ukládání obsahu." }, { status: 500 });
  }
}
