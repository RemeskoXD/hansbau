import { 
  reviews as initialReviews, 
  portfolioItems as initialPortfolio, 
  whyUsPoints as initialWhyUs, 
  workProcess as initialWorkProcess, 
  homeFaq as initialHomeFaq, 
  siteConfig,
  ReviewItem,
  PortfolioItem
} from "./data";

export type { ReviewItem, PortfolioItem };

export interface FaqItem {
  q: string;
  a: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  desc: string;
}

export interface WorkProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceContentItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
}

export interface PageContent {
  home: {
    heroBadge: string;
    heroTitle: string;
    heroPerex: string;
    guaranteePrice: string;
    guaranteeTime: string;
    guaranteeSurvey: string;
    servicesTitle: string;
    servicesPerex: string;
  };
  about: {
    badge: string;
    title: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    founderQuote: string;
    founderRole: string;
  };
  calculator: {
    badge: string;
    title: string;
    perex: string;
    disclaimer: string;
  };
  contact: {
    title: string;
    perex: string;
    openingHours: string;
    responseSpeed: string;
  };
  company: {
    legalName: string;
    brandName: string;
    street: string;
    city: string;
    zip: string;
    ico: string;
    dic: string;
    phone: string;
    email: string;
    representative: string;
  };
  reviews: {
    score: string;
    reviewCount: string;
    googleReviewsUrl: string;
    items: ReviewItem[];
  };
  portfolio: {
    items: PortfolioItem[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  whyUs: {
    badge: string;
    title: string;
    perex: string;
    guaranteeTitle: string;
    guaranteeSub: string;
    guaranteeDesc: string;
    items: WhyUsItem[];
  };
  process: {
    badge: string;
    title: string;
    perex: string;
    steps: WorkProcessStep[];
  };
  servicesContent: Record<string, ServiceContentItem>;
  seo: {
    homeTitle: string;
    homeDesc: string;
  };
}

export const DEFAULT_CONTENT: PageContent = {
  home: {
    heroBadge: "Google Hodnocení 5.0 ★ • Karlovarský kraj",
    heroTitle: "Kompletní rekonstrukce bytů a koupelen na klíč",
    heroPerex: "Od bourání a vyklizení přes novou elektřinu v mědi, instalace, sádrové stěrky až po velkoformátové obklady a čistý úklid. Pevná cena ve smlouvě o dílo.",
    guaranteePrice: "Pevná cena bez víceprací",
    guaranteeTime: "Garantovaný termín dokončení",
    guaranteeSurvey: "Osobní zaměření ZDARMA",
    servicesTitle: "Kompletní stavební a řemeslné práce",
    servicesPerex: "Žádné shánění pěti různých firem. U nás máte jednoho spolehlivého partnera, který ručí za celou stavbu od A do Z."
  },
  about: {
    badge: "Naše hodnoty & filozofie",
    title: "Stavíme na důvěře, pevných cenách a čistotě",
    storyP1: "Jan Červeňak s.r.o. (působící pod značkou HANSBAU) je stavební a zednická firma se sídlem v Potočišti u Chebu. Stavíme na poctivém řemesle, osobním přístupu a rodinné tradici sahající až do roku 1984.",
    storyP2: "Naší hlavní specializací jsou kompletní rekonstrukce bytů na klíč, zděná bytová jádra z Ytongu a moderní koupelny po celém Karlovarském kraji. Zákazníkům nabízíme naprostý klid: od bouracích prací a odvozu suti přes novou elektřinu v mědi, instalatérské rozvody, precizní velkoformátové obklady, štuky a sádrové stěrky až po pokládku podlah.",
    storyP3: "Nemusíte shánět 5 různých part řemeslníků a složitě je koordinovat. Všechny profese – včetně certifikovaného elektrikáře a instalatéra s revizními zprávami – koordinuje osobně pan Červeňak. Za celý výsledek ručíme pevnou smlouvou o dílo a garantovanou cenou.",
    founderQuote: "Každou zakázku řídím osobně. Co si domluvíme to se dodrží.",
    founderRole: "Jednatel společnosti"
  },
  calculator: {
    badge: "Online kalkulace rozpočtu",
    title: "Orientační kalkulačka cen rekonstrukcí",
    perex: "Vyberte parametry vaší rekonstrukce a získejte okamžitý přehled o orientační ceně a harmonogramu. Přesný položkový rozpočet pro vás zdarma připravíme po osobním zaměření na místě.",
    disclaimer: "Uvedené ceny jsou pouze orientační a bez DPH. Konečná cena se vždy stanovuje až po posouzení aktuálního stavu bytu, rozsahu bouracích prací, stavu rozvodů, dostupnosti a přístupu na stavbu a zvoleného standardu materiálů. Skutečná cena se může od odhadu lišit směrem dolů i nahoru. Kalkulačka slouží jako hrubý odhad pro prvotní orientaci klienta – přesný položkový rozpočet připravujeme zdarma po osobním zaměření na místě v Karlovarském kraji."
  },
  contact: {
    title: "Kontaktní informace",
    perex: "Máte dotaz nebo zájem o nezávaznou cenovou nabídku? Zavolejte nám, napište e-mail nebo vyplňte formulář níže.",
    openingHours: "Pondělí až pátek: 08:00 – 16:30 hod.",
    responseSpeed: "Odpovídáme standardně do 24 hodin od doručení poptávky."
  },
  company: {
    legalName: "Jan Červeňak s.r.o.",
    brandName: "HANSBAU",
    street: "Potočiště 21 - Odrava",
    city: "Cheb",
    zip: "350 02",
    ico: "04860837",
    dic: "CZ04860837",
    phone: "+420 606 073 700",
    email: "team@hansbau.com",
    representative: "Jan Červeňak"
  },
  reviews: {
    score: "5.0",
    reviewCount: "28",
    googleReviewsUrl: siteConfig.googleReviewsUrl,
    items: initialReviews
  },
  portfolio: {
    items: initialPortfolio
  },
  faq: {
    title: "Vše, co potřebujete vědět před rekonstrukcí",
    subtitle: "Často kladené otázky",
    items: initialHomeFaq
  },
  whyUs: {
    badge: "Proč si vybrat HANSBAU?",
    title: "Férové stavební řemeslo bez kompromisů a stresu",
    perex: "Víme, jak náročná může být rekonstrukce. Proto stavíme na absolutní transparentnosti, dodržování rozpočtu a precizním řemeslném zpracování. U nás přesně víte, co platíte a kdy bude hotovo.",
    guaranteeTitle: "Garantovaný položkový rozpočet",
    guaranteeSub: "Žádné skryté poplatky a nečekané doplatky",
    guaranteeDesc: "Cena sjednaná ve smlouvě o dílo je konečná. Jakékoliv případné úpravy jsou vždy předem schváleny písemným dodatkem.",
    items: initialWhyUs
  },
  process: {
    badge: "Jednoduchý postup",
    title: "Jak probíhá spolupráce s HANSBAU?",
    perex: "Přehledný a transparentní proces od prvního kontaktu po předání hotového díla na klíč.",
    steps: initialWorkProcess
  },
  servicesContent: {
    "rekonstrukce-bytu": {
      id: "rekonstrukce-bytu",
      title: "Rekonstrukce bytu (kompletní i částečná)",
      shortDesc: "Kompletní proměna bytu na klíč od vyklizení a bourání po finální předání. Žádné starosti se sháněním 5 různých řemeslníků. Pevná cena a termín.",
      fullDesc: "Plánujete rekonstrukci panelového nebo cihlového bytu v Karlovarském kraji? HANSBAU se postará o celou proměnu vašeho domova. Zajistíme vyklizení, bourací práce, novou elektroinstalaci, vodoinstalaci, sádrokartony, omítky, obklady, podlahy i montáž sanitární keramiky a dveří."
    },
    "rekonstrukce-bytoveho-jadra": {
      id: "rekonstrukce-bytoveho-jadra",
      title: "Rekonstrukce bytového jádra",
      shortDesc: "Výměna starého umakartového jádra za moderní zděné z pórobetonu (Ytong). Vybourání, nové rozvody, hydroizolace a obklady hotové za 10–14 dní.",
      fullDesc: "Máte v bytě staré umakartové jádro, kde hučí stoupačky a opadávají obklady? Provedeme kompletní vybourání a vyzdění nového pórobetonového jádra s novými rozvody vody, odpadů a elektřiny."
    },
    "rekonstrukce-koupelny": {
      id: "rekonstrukce-koupelny",
      title: "Rekonstrukce koupelny",
      shortDesc: "Designové koupelny na míru v panelácích i rodinných domech. Velkoformátové obklady, walk-in sprchové kouty s lineárními žlaby, podomítková sanita a LED niky.",
      fullDesc: "Koupelna je místem každodenní relaxace. Provádíme rekonstrukce koupelen a WC s důrazem na špičkovou hydroizolaci, dokonale rovné kamenické rohy (jolly hrany 45°) a spolehlivou instalaci sanity značek Geberit, Grohe, Hansgrohe či Ravak."
    },
    "zednicke-prace": {
      id: "zednicke-prace",
      title: "Zednické práce a povrchové úpravy",
      shortDesc: "Přesné zednické práce, bourání příček, zdění Ytongem, jádrové a štukové omítky, stěrky, nivelace podlah a pokládka dlažeb.",
      fullDesc: "Kvalitní zednické práce jsou základem každé úspěšné rekonstrukce. Provádíme veškeré zednické práce v interiérech od přípravy podkladů přes zdění příček až po finální štuky, sádrové stěrky a pokládku podlah."
    },
    "elektro-voda-revize": {
      id: "elektro-voda-revize",
      title: "Elektroinstalace, voda a revize",
      shortDesc: "Kompletní rozvody elektřiny v mědi, nové rozvody vody a odpadů, topenářské práce a oficiální revizní zprávy pro kolaudaci a SVJ.",
      fullDesc: "Žádná rekonstrukce se neobejde bez bezpečných rozvodů. V rámci našich rekonstrukcí bytů a jader zajišťujeme kompletní elektroinstalační a instalatérské práce přes naše ověřené a certifikované subdodavatele, včetně oficiálních revizních zpráv."
    }
  },
  seo: {
    homeTitle: "Rekonstrukce bytu Cheb & Karlovarský Kraj | HANSBAU",
    homeDesc: "Kompletní i částečné rekonstrukce bytů a koupelen v Karlovarském kraji na klíč. Pevná cena bez víceprací, osobní zaměření ZDARMA a záruka."
  }
};
