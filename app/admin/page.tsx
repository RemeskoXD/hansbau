import { Metadata } from "next";
import { checkIsAdmin } from "@/lib/auth";
import { getContentStore } from "@/lib/content-store";
import { AdminAuthWrapper } from "./AdminAuthWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administrace obsahu | HANSBAU",
  description: "Správa textů a záchranná síť v CSV pro web HANSBAU",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAdmin = await checkIsAdmin();
  const store = isAdmin ? getContentStore() : null;

  return (
    <AdminAuthWrapper
      initialIsAdmin={isAdmin}
      initialContent={store?.content || null}
      initialUpdatedAt={store?.updatedAt || null}
    />
  );
}
