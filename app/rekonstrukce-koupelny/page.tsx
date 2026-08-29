import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

const service = services.find((s) => s.slug === "rekonstrukce-koupelny")!;

export const metadata: Metadata = {
  title: "Rekonstrukce koupelny Cheb & Karlovarský kraj | HANSBAU",
  description: "Moderní rekonstrukce koupelny a WC: velkoformátové obklady, kamenické rohy 45°, walk-in sprchové kouty a podomítková sanita. HANSBAU.",
  alternates: {
    canonical: "/rekonstrukce-koupelny/",
  },
};

export default function RekonstrukceKoupelnyDedicatedPage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
