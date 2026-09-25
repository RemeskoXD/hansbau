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
    servicesTitle: "Rekonstrukce bytů, jader a koupelen",
    servicesPerex: "Rekonstruujeme byty, bytová jádra a koupelny. Zajistíme bourání, nové rozvody, zdění, obklady, podlahy i závěrečný úklid. Rozsah prací, cenu a termín sjednáme předem ve smlouvě."
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
      shortDesc: "Rekonstruujeme panelové i cihlové byty, celé nebo jen vybrané místnosti. Zajistíme bourání, novou elektroinstalaci a rozvody vody, zdění a sádrokartony, omítky, obklady, podlahy i montáž sanity a dveří.",
      fullDesc: "Rekonstruujeme panelové i cihlové byty, celé nebo jen vybrané místnosti. Zajistíme vyklizení a bourání, novou elektroinstalaci a rozvody vody, zdění a sádrokartony, omítky, obklady, podlahy i montáž sanity a dveří. Rozsah prací, cenu a termín sjednáme předem ve smlouvě."
    },
    "rekonstrukce-bytoveho-jadra": {
      id: "rekonstrukce-bytoveho-jadra",
      title: "Rekonstrukce bytového jádra",
      shortDesc: "Máte v bytě původní umakartové jádro? Vybouráme ho a postavíme nové zděné z tvárnic Ytong. Vyměníme rozvody vody, odpadů a elektřiny, uděláme hydroizolaci, obklady a namontujeme vybavení.",
      fullDesc: "Máte v bytě původní umakartové jádro? Vybouráme ho a postavíme nové zděné z tvárnic Ytong. Vyměníme rozvody vody, odpadů a elektřiny, uděláme hydroizolaci, obklady a namontujeme vybavení. Rozsah prací, cenu a termín sjednáme předem ve smlouvě."
    },
    "rekonstrukce-koupelny": {
      id: "rekonstrukce-koupelny",
      title: "Rekonstrukce koupelny",
      shortDesc: "Rekonstruujeme koupelny a WC v bytech i rodinných domech. Provedeme nové rozvody, hydroizolaci, obklady a dlažbu i montáž vybavení. Montujeme sanitu běžných značek, např. Geberit, Grohe, Hansgrohe nebo Ravak.",
      fullDesc: "Rekonstruujeme koupelny a WC v bytech i rodinných domech. Provedeme nové rozvody, hydroizolaci, obklady a dlažbu i montáž vybavení. Montujeme sanitu běžných značek, např. Geberit, Grohe, Hansgrohe nebo Ravak. Rozsah prací, cenu a termín sjednáme předem ve smlouvě."
    },
    "zednicke-prace": {
      id: "zednicke-prace",
      title: "Zednické práce a povrchové úpravy",
      shortDesc: "Zděné příčky, opravy zdiva, omítky, štuky a stěrky. Připravíme a vyrovnáme povrchy pro malování, obklady nebo pokládku podlah.",
      fullDesc: "Zděné příčky, opravy zdiva, omítky, štuky a stěrky. Připravíme a vyrovnáme povrchy pro malování, obklady nebo pokládku podlah. Zednické práce děláme jako součást rekonstrukcí i samostatně."
    },
    "elektro-voda-revize": {
      id: "elektro-voda-revize",
      title: "Elektroinstalace, voda a revize",
      shortDesc: "Zajistíme nové rozvody elektřiny, vody a odpadů i úpravy topení. Práce provádí naši ověření a certifikovaní subdodavatele. Součástí jsou potřebné zkoušky a revize podle rozsahu prací.",
      fullDesc: "Při rekonstrukci bytu, jádra nebo koupelny zajistíme nové rozvody elektřiny, vody a odpadů. Práce provádí náš stálý elektrikář a instalatér, se kterými dlouhodobě spolupracujeme. Na konci dostanete revizní zprávu elektro."
    }
  },
  seo: {
    homeTitle: "Rekonstrukce bytu Cheb & Karlovarský Kraj | HANSBAU",
    homeDesc: "Kompletní i částečné rekonstrukce bytů a koupelen v Karlovarském kraji na klíč. Pevná cena bez víceprací, osobní zaměření ZDARMA a záruka."
  }
};
