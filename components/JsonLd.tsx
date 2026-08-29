import { siteConfig, services, reviews } from "@/lib/data";

interface JsonLdProps {
  pageTitle?: string;
  pageDesc?: string;
  pageUrl?: string;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { q: string; a: string }[];
  serviceData?: {
    name: string;
    description: string;
    url: string;
    image: string;
  };
}

export function JsonLd({
  pageTitle = siteConfig.tagline,
  pageDesc = "Kompletní i částečné rekonstrukce bytů a koupelen v Karlovarském kraji.",
  pageUrl = siteConfig.url,
  breadcrumbs = [{ name: "Domů", url: siteConfig.url }],
  faqs = [],
  serviceData
}: JsonLdProps) {
  // Base Organization / GeneralContractor Entity
  const organizationEntity = {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "alternateName": ["HANSBAU", "HANSBAU stavební firma", "HANSBAU s.r.o. Cheb"],
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}/images/Logo-17.webp`,
      "caption": "HANSBAU s.r.o. Logo"
    },
    "image": `${siteConfig.url}/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp`,
    "description": "Profesionální stavební firma se specializací na kompletní i částečné rekonstrukce bytů, koupelen a bytových jader na klíč v Karlovarském kraji.",
    "telephone": siteConfig.phoneCZ,
    "email": siteConfig.email,
    "priceRange": "$$",
    "currenciesAccepted": "CZK, EUR",
    "paymentAccepted": "Bankovní převod, Hotovost",
    "founder": {
      "@type": "Person",
      "@id": `${siteConfig.url}/#founder`,
      "name": siteConfig.contactPerson,
      "jobTitle": siteConfig.contactRole,
      "worksFor": {
        "@id": `${siteConfig.url}/#organization`
      },
      "image": `${siteConfig.url}/images/nove/jan-cervenak-jednatel.webp`
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "postalCode": siteConfig.address.zip,
      "addressRegion": siteConfig.address.region,
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.0827,
      "longitude": 12.3789
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "19:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": siteConfig.rating.score.toString(),
      "reviewCount": siteConfig.rating.reviewCount.toString(),
      "bestRating": siteConfig.rating.maxScore.toString(),
      "worstRating": "1"
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5"
      },
      "reviewBody": r.text
    })),
    "areaServed": siteConfig.coverageAreas.map((area) => ({
      "@type": "City",
      "name": area,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Karlovarský kraj"
      }
    })),
    "knowsAbout": [
      "Rekonstrukce bytů",
      "Rekonstrukce bytového jádra",
      "Rekonstrukce koupelny",
      "Zednické práce",
      "Sádrokartony Knauf a Rigips",
      "Velkoformátové obklady",
      "Kamenické rohy (jolly hrany 45°)",
      "Elektroinstalace a revize",
      "Výměna umakartového jádra za Ytong",
      "Karlovarský kraj",
      "Cheb",
      "Karlovy Vary",
      "Sokolov",
      "Aš",
      "Františkovy Lázně",
      "Mariánské Lázně"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Stavební a rekonstrukční služby",
      "itemListElement": services.map((srv, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": srv.title,
          "description": srv.shortDesc,
          "url": `${siteConfig.url}/${srv.slug}/`
        },
        "position": idx + 1
      }))
    }
  };

  // WebSite Entity
  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "url": siteConfig.url,
    "name": siteConfig.name,
    "description": siteConfig.tagline,
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "inLanguage": "cs-CZ"
  };

  // WebPage Entity with speakable attribute for AI voice search
  const webPageEntity = {
    "@type": "WebPage",
    "@id": pageUrl,
    "url": pageUrl,
    "name": pageTitle,
    "description": pageDesc,
    "isPartOf": {
      "@id": `${siteConfig.url}/#website`
    },
    "about": {
      "@id": `${siteConfig.url}/#organization`
    },
    "inLanguage": "cs-CZ",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable-perex"]
    }
  };

  // Breadcrumbs Entity
  const breadcrumbEntity = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // Graph nodes collection
  const graphNodes: Record<string, unknown>[] = [
    organizationEntity,
    websiteEntity,
    webPageEntity,
    breadcrumbEntity
  ];

  // If Service Data provided, add Service Schema
  if (serviceData) {
    graphNodes.push({
      "@type": "Service",
      "@id": `${serviceData.url}#service`,
      "name": serviceData.name,
      "description": serviceData.description,
      "provider": {
        "@id": `${siteConfig.url}/#organization`
      },
      "url": serviceData.url,
      "image": serviceData.image,
      "areaServed": siteConfig.coverageAreas.map((area) => ({
        "@type": "City",
        "name": area
      })),
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CZK",
        "description": "Nezávazná prohlídka a položkový rozpočet ZDARMA",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      }
    });
  }

  // If FAQs provided, add FAQPage Schema
  if (faqs && faqs.length > 0) {
    graphNodes.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graphNodes
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
