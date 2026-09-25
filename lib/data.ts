export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  pageH1?: string;
  priority: "hlavní" | "priorita-2" | "podpůrná";
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  galleryImages: string[];
  features: string[];
  whyTitle?: string;
  benefits: string[];
  includedTitle?: string;
  included: string[];
  faqTitle?: string;
  faq: { q: string; a: string }[];
}

export interface LocationItem {
  id: string;
  slug: string;
  city: string;
  region: string;
  driveTime: string;
  neighborhoods: string[];
  title: string;
  metaTitle: string;
  metaDesc: string;
  perex: string;
  leadParagraph: string;
  specifics: string[];
  heroImage: string;
  realizaceImages: { src: string; title: string; desc: string }[];
  whyHere: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  neighboringLocations: { name: string; slug: string }[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: "Google" | "Ověřená poptávka";
  location: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "byty" | "koupelny" | "jadra" | "pokoje" | "zednicke";
  categoryLabel: string;
  location: string;
  image: string;
  description: string;
}

export const siteConfig = {
  name: "HANSBAU",
  legalName: "Jan Červeňak s.r.o.",
  ico: "04860837",
  dic: "CZ04860837",
  tagline: "Rekonstrukce bytů a koupelen v Karlovarském kraji",
  openingHours: "Po–Pá 8:00 – 16:30",
  phoneCZ: "+420 606 073 700",
  phoneCZRaw: "+420606073700",
  email: "team@hansbau.com",
  contactPerson: "Jan Červeňak",
  contactRole: "Jednatel společnosti",
  founderPhoto: "/images/nove/jan-cervenak-hopa.png",
  logo: "/images/Logo-17.webp",
  address: {
    street: "Potočiště 21 - Odrava",
    city: "Odrava",
    zip: "350 02",
    postCity: "Cheb",
    region: "Karlovarský kraj",
    country: "Česká republika"
  },
  url: "https://hansbau.cz",
  googleReviewsUrl: "https://www.google.com/search?sca_esv=46f3d15cfb9e1921&sxsrf=APpeQnvHDisvCKI-EN_PCX4GNyIrFCXIZQ:1788275531815&q=HANSBAU+%7C+Rekonstrukce+Byt%C5%AF&si=APenkKmVGdgpMPDQZoEWS8RIAhsqXAKlNLP0B8DNkkiU9KPI0akasRuRMpdcb-RNH7cQdMLDNamyJMeJGaYn0zrYfTQWRCWYSl5KFQ69i65vBE1hFOah5N77WApGsAXbYoWAjyPS4KaH&sa=X&ved=2ahUKEwjA-tW-1c2WAxUm9bsIHeEMNwAQ_coHegQIMxAB",
  rating: {
    score: 5.0,
    reviewCount: 28,
    maxScore: 5
  },
  coverageAreas: [
    "Cheb",
    "Karlovy Vary",
    "Sokolov",
    "Aš",
    "Františkovy Lázně",
    "Mariánské Lázně",
    "Ostrov",
    "Chodov",
    "Kraslice"
  ]
};

export const services: ServiceItem[] = [
  {
    id: "rekonstrukce-bytu",
    slug: "rekonstrukce-bytu",
    title: "Rekonstrukce bytu (kompletní i částečná)",
    pageH1: "Rekonstrukce bytu v Chebu a Karlovarském kraji",
    priority: "hlavní",
    shortDesc: "Rekonstruujeme panelové i cihlové byty, celé nebo jen vybrané místnosti. Zajistíme bourání, novou elektroinstalaci a rozvody vody, zdění a sádrokartony, omítky, obklady, podlahy i montáž sanity a dveří.",
    fullDesc: "Rekonstruujeme panelové i cihlové byty, celé nebo jen vybrané místnosti. Zajistíme vyklizení a bourání, novou elektroinstalaci a rozvody vody, zdění a sádrokartony, omítky, obklady, podlahy i montáž sanity a dveří. Rozsah prací, cenu a termín sjednáme předem ve smlouvě.",
    iconName: "Home",
    image: "/images/nove/rekonstrukce-bytu-karlovy-vary-detail.webp",
    galleryImages: [
      "/images/2.webp",
      "/images/nove/cheb-realizace.webp",
      "/images/nove/chodba-po-rekonstrukci.webp",
      "/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp",
      "/images/IMG-20250823-WA0011.webp",
      "/images/nove/balthasar-byt.webp"
    ],
    features: [
      "Kompletní realizace na klíč od A do Z",
      "Pevná smlouva o dílo a garantovaný položkový rozpočet",
      "Koordinace všech profesí (zedníci, instalatéři, elektrikáři, podlaháři)",
      "Průběžné informace o postupu prací",
      "Úklid na konci každého pracovního dne a odvoz odpadu"
    ],
    whyTitle: "Proč rekonstrukci bytu s námi",
    benefits: [
      "Nesháníte zedníka, elektrikáře, instalatéra a obkladače zvlášť. Koordinujeme je my a vy máte jednu kontaktní osobu.",
      "Záruka na celé dílo od jedné firmy, ne od pěti řemeslníků.",
      "Položkový rozpočet předem. Pokud se po odkrytí konstrukcí objeví něco nečekaného, cenu i dopad na termín s vámi písemně odsouhlasíme dřív, než se na tom začne pracovat.",
      "Panelové i cihlové byty po celém Karlovarském kraji."
    ],
    includedTitle: "Co rekonstrukce zahrnuje",
    included: [
      "Prohlídka a zaměření bytu zdarma",
      "Položkový rozpočet zdarma",
      "Ochrana společných prostor domu a výtahu",
      "Vyklizení, bourací práce a odvoz suti",
      "Nové rozvody elektřiny, vody a odpadů s revizemi",
      "Zednické práce, jádrové a štukové omítky, vyrovnání podlah",
      "Sádrokartonové podhledy včetně přípravy pro osvětlení",
      "Pokládka podlah a osazení zárubní a dveří",
      "Závěrečný úklid a předávací protokol"
    ],
    faqTitle: "Časté dotazy k rekonstrukci bytu",
    faq: [
      {
        q: "Jak dlouho rekonstrukce bytu trvá?",
        a: "Záleží na velikosti bytu, typu zástavby a rozsahu prací. Orientační dobu pro váš byt uvidíte v naší kalkulačce. Přesný termín zahájení a dokončení potvrdíme ve smlouvě."
      },
      {
        q: "Může se cena během rekonstrukce změnit?",
        a: "Za sjednaný rozsah platí cena ze smlouvy. Pokud si během prací budete přát změnu nebo se po odkrytí objeví skrytá vada, cenu i dopad na termín s vámi předem písemně odsouhlasíme. Bez vašeho souhlasu nic navíc neděláme."
      },
      {
        q: "Je prohlídka a cenová nabídka opravdu zdarma?",
        a: "Ano. Přijedeme k vám, byt zaměříme a probereme vaše požadavky. Poté připravíme položkový rozpočet. Prohlídka i rozpočet jsou zdarma a k ničemu vás nezavazují. Termín dodání rozpočtu vám potvrdíme při prohlídce."
      },
      {
        q: "Zajistíte i odvoz suti a úklid společných prostor?",
        a: "Ano. Odvoz suti je součástí rozpočtu, podle rozsahu prací kontejnerem nebo odvozem. Společné prostory domu včetně výtahu při práci chráníme a na konci každého pracovního dne uklidíme nečistoty, které vznikly naší činností."
      }
    ]
  },
  {
    id: "rekonstrukce-bytoveho-jadra",
    slug: "rekonstrukce-bytoveho-jadra",
    title: "Rekonstrukce bytového jádra",
    pageH1: "Rekonstrukce bytového jádra",
    priority: "priorita-2",
    shortDesc: "Máte v bytě původní umakartové jádro? Vybouráme ho a postavíme nové zděné z tvárnic Ytong. Vyměníme rozvody vody, odpadů a elektřiny, uděláme hydroizolaci, obklady a namontujeme vybavení.",
    fullDesc: "Máte v bytě původní umakartové jádro? Vybouráme ho a postavíme nové zděné z tvárnic Ytong. Vyměníme rozvody vody, odpadů a elektřiny, uděláme hydroizolaci, obklady a namontujeme vybavení. Rozsah prací, cenu a termín sjednáme předem ve smlouvě.",
    iconName: "Layers",
    image: "/images/nove/as-koupelna.webp",
    galleryImages: [
      "/images/nove/koupelna-po-rekonstrukci.webp",
      "/images/nove/sokolov-realizace.webp",
      "/images/nove/rekonstrukce-koupelny-cheb-detail.webp",
      "/images/IMG-20250823-WA0014.webp",
      "/images/IMG-20250823-WA0018.webp",
      "/images/1-11.webp"
    ],
    features: [
      "Rychlé vybourání a likvidace starého umakartu",
      "Vyzdění nových příček z tvárnic Ytong",
      "Kompletní výměna rozvodů vody a odpadů",
      "Nová elektroinstalace",
      "Lepší zvuková izolace než u původního umakartu"
    ],
    whyTitle: "Proč jádro s námi",
    benefits: [
      "Jedna firma pro celé jádro: bourání, zdění, rozvody, obklady i sanita. Řemeslníky koordinujeme my, vy máte jednu kontaktní osobu.",
      "Rozvody vody a odpadů až ke stoupačkám, nová elektroinstalace.",
      "Zděné jádro je pevnější, tišší a lépe se udržuje než umakart.",
      "Nové jádro zvyšuje hodnotu bytu při prodeji i pronájmu.",
      "Úpravu dispozice, např. propojení koupelny a WC, posoudíme při prohlídce."
    ],
    includedTitle: "Co výměna jádra zahrnuje",
    included: [
      "Prohlídka, zaměření a položkový rozpočet zdarma",
      "Ochrana společných prostor domu a výtahu",
      "Demontáž sanity a odpojení rozvodů",
      "Vybourání umakartu a odvoz suti",
      "Vyzdění nových stěn z tvárnic Ytong",
      "Nové rozvody vody, odpadů a elektřiny včetně ventilátoru",
      "Hydroizolace celé mokré zóny",
      "Sádrokartonový podhled s bodovými světly",
      "Obklady, dlažba a montáž sanity",
      "Revize elektro, tlaková zkouška vody, úklid a předávací protokol"
    ],
    faqTitle: "Časté dotazy k rekonstrukci bytového jádra",
    faq: [
      {
        q: "Jak dlouho výměna jádra trvá?",
        a: "Od zahájení prací do předání obvykle 3–6 týdnů, podle rozsahu, vybavení a dodacích lhůt materiálu. Orientační dobu pro váš byt uvidíte v kalkulačce, přesný termín zahájení a dokončení potvrdíme ve smlouvě."
      },
      {
        q: "Budu mít během prací funkční koupelnu a WC?",
        a: "Během výměny jádra jsou koupelna i WC mimo provoz. Harmonogram s vámi projdeme předem, abyste přesně věděli, kdy bude byt bez vody, a mohli si to zařídit."
      },
      {
        q: "Potřebuji na výměnu jádra stavební povolení?",
        a: "Výměna jádra bez zásahu do nosných konstrukcí stavební povolení obvykle nevyžaduje. Práce je ale potřeba předem oznámit správci domu nebo SVJ, hlavně kvůli odstávce vody na stoupačkách a hluku. Pokud chcete měnit dispozici, při prohlídce posoudíme, co je k tomu potřeba."
      },
      {
        q: "Může se cena během prací změnit?",
        a: "Za sjednaný rozsah platí cena ze smlouvy. Pokud si během prací budete přát změnu nebo se po vybourání objeví skrytá vada, cenu i dopad na termín s vámi předem písemně odsouhlasíme. Bez vašeho souhlasu nic navíc neděláme."
      }
    ]
  },
  {
    id: "rekonstrukce-koupelny",
    slug: "rekonstrukce-koupelny",
    title: "Rekonstrukce koupelny",
    pageH1: "Rekonstrukce koupelny",
    priority: "priorita-2",
    shortDesc: "Rekonstruujeme koupelny a WC v bytech i rodinných domech. Provedeme nové rozvody, hydroizolaci, obklady a dlažbu i montáž vybavení. Montujeme sanitu běžných značek, např. Geberit, Grohe, Hansgrohe nebo Ravak.",
    fullDesc: "Rekonstruujeme koupelny a WC v bytech i rodinných domech. Provedeme nové rozvody, hydroizolaci, obklady a dlažbu i montáž vybavení. Montujeme sanitu běžných značek, např. Geberit, Grohe, Hansgrohe nebo Ravak. Rozsah prací, cenu a termín sjednáme předem ve smlouvě.",
    iconName: "Bath",
    image: "/images/nove/rekonstrukce-koupelny-cheb-detail.webp",
    galleryImages: [
      "/images/nove/koupelna-po-rekonstrukci.webp",
      "/images/nove/as-koupelna.webp",
      "/images/nove/sokolov-realizace.webp",
      "/images/nove/karlovy-vary-realizace.webp",
      "/images/IMG-20250823-WA0014.webp"
    ],
    features: [
      "Velkoformátové keramické obklady a dlažba",
      "Kamenické rohy (seříznutí pod úhlem 45°) bez plastových lišt",
      "Moderní bezbariérové sprchové kouty Walk-in s lineárním žlabem",
      "Závěsné WC s podomítkovým modulem",
      "Podsvícené niky na kosmetiku"
    ],
    whyTitle: "Proč koupelnu s námi",
    benefits: [
      "Systémová hydroizolace celé mokré zóny, těsnicí pásky v rozích a kolem prostupů. Právě tady se u koupelen šetří nejčastěji a za pár let to teče k sousedům.",
      "Velkoformátové obklady, kamenické rohy 45° bez plastových lišt, walk-in kouty s lineárním žlabem.",
      "Pomůžeme vám s výběrem obkladů a sanity, aby vše sedělo k rozměrům a rozpočtu.",
      "Koupelna je obvykle hotová za 2–4 týdny od zahájení prací.",
      "Délku a podmínky záruky uvedeme ve smlouvě."
    ],
    includedTitle: "Co rekonstrukce koupelny zahrnuje",
    included: [
      "Prohlídka, zaměření a položkový rozpočet zdarma",
      "Ochrana společných prostor domu a výtahu",
      "Demontáž sanity, osekání obkladů a odvoz suti",
      "Vyrovnání stěn a podlahy",
      "Úprava rozvodů vody a odpadů, tlaková zkouška",
      "Elektro: světla, zásuvky, ventilátor",
      "Hydroizolace s těsnicími páskami v rozích a kolem prostupů",
      "Pokládka obkladů a dlažby, spárování",
      "Sádrokartonový podhled, podomítkové moduly, niky",
      "Montáž van, sprchových koutů, baterií, umyvadel, WC a nábytku",
      "Úklid a předávací protokol"
    ],
    faqTitle: "Časté dotazy k rekonstrukci koupelny",
    faq: [
      {
        q: "Jak dlouho rekonstrukce koupelny trvá?",
        a: "Od zahájení prací do předání obvykle 2–4 týdny, podle rozsahu, vybavení a dodacích lhůt materiálu. Přesný termín zahájení a dokončení potvrdíme ve smlouvě."
      },
      {
        q: "Pomůžete mi s výběrem obkladů a sanity?",
        a: "Ano. Probereme s vámi, co se do koupelny hodí rozměrově i cenově, a doporučíme, kde materiál vybrat. Materiál můžeme zajistit my, nebo si ho koupíte sami. Vše uvedeme v rozpočtu."
      },
      {
        q: "Děláte sprchové kouty bez vaničky (walk-in)?",
        a: "Ano. Uděláme spád podlahy k lineárnímu žlabu, hydroizolaci celé sprchové zóny a osadíme skleněnou stěnu. Zda je walk-in ve vašem bytě technicky možný (výška odpadu, skladba podlahy), posoudíme při prohlídce."
      },
      {
        q: "Může se cena během prací změnit?",
        a: "Za sjednaný rozsah platí cena ze smlouvy. Pokud si během prací budete přát změnu nebo se po osekání obkladů objeví skrytá vada, cenu i dopad na termín s vámi předem písemně odsouhlasíme. Bez vašeho souhlasu nic navíc neděláme."
      }
    ]
  },
  {
    id: "zednicke-prace",
    slug: "zednicke-prace",
    title: "Zednické práce a povrchové úpravy",
    pageH1: "Zednické práce a povrchové úpravy",
    priority: "podpůrná",
    shortDesc: "Zděné příčky, opravy zdiva, omítky, štuky a stěrky. Připravíme a vyrovnáme povrchy pro malování, obklady nebo pokládku podlah.",
    fullDesc: "Zděné příčky, opravy zdiva, omítky, štuky a stěrky. Připravíme a vyrovnáme povrchy pro malování, obklady nebo pokládku podlah. Zednické práce děláme jako součást rekonstrukcí i samostatně.",
    iconName: "Hammer",
    image: "/images/nove2/IMG_4358.webp",
    galleryImages: [
      "/images/1-3.webp",
      "/images/1-4.webp",
      "/images/1-5.webp",
      "/images/1-9.webp",
      "/images/1-10.webp",
      "/images/1-12.webp"
    ],
    features: [
      "Zdění příček a úpravy dispozic z tvárnic Ytong",
      "Vnitřní jádrové a štukové omítky, sádrové stěrky",
      "Samonivelační stěrky na podlahy",
      "Sádrokartonové podhledy a příčky (Knauf, Rigips)",
      "Opravy prasklin, zapravení drážek po elektřině a vodě"
    ],
    whyTitle: "Proč zednické práce s námi",
    benefits: [
      "Rovné stěny a pravé úhly, takže kuchyňská linka, vestavěné skříně i obklady sednou bez podkládání a řezání.",
      "Podklad připravíme tak, aby na něm malíř, obkladač i podlahář mohli rovnou pokračovat.",
      "Zednictví je náš původní obor. Děláme ho od začátku firmy.",
      "Na konci každého pracovního dne uklidíme nečistoty vzniklé naší činností."
    ],
    includedTitle: "Co zednické práce zahrnují",
    included: [
      "Zdění příček a úpravy dispozic z tvárnic Ytong",
      "Vnitřní jádrové a štukové omítky",
      "Sádrové stěrky, výztužná perlinka proti vzniku prasklin",
      "Osazení omítníků a rohových lišt",
      "Samonivelační stěrky na podlahy",
      "Sádrokartonové podhledy a příčky (Knauf, Rigips)",
      "Opravy prasklin, zapravení drážek po elektřině a vodě",
      "Penetrace a příprava podkladu pro malování, obklady a podlahy"
    ],
    faqTitle: "Časté dotazy k zednickým pracím",
    faq: [
      {
        q: "Děláte i menší zednické práce, nebo jen celé byty?",
        a: "Zednické práce děláme jako součást rekonstrukcí i samostatně. Menší opravy rádi doplníme k jiné zakázce. Napište nám, co potřebujete, a řekneme vám, jestli je to pro nás."
      },
      {
        q: "Můžete vybourat příčku a spojit kuchyň s obývákem?",
        a: "Příčky, které nejsou nosné, bouráme běžně. V panelových domech je ale řada stěn nosných a do těch bez posouzení statika nezasahujeme. Při prohlídce posoudíme, o jakou stěnu jde a co je k úpravě potřeba."
      },
      {
        q: "Jaký je rozdíl mezi štukem a sádrovou stěrkou?",
        a: "Štuk je tradiční vápenná omítka s jemnou strukturou. Sádrová stěrka je hladší, rychleji se zpracovává a je vhodná pod malbu v interiéru. Doporučíme podle stavu stěn a toho, co od povrchu čekáte."
      },
      {
        q: "Může se cena během prací změnit?",
        a: "Za sjednaný rozsah platí cena ze smlouvy. Pokud se po odkrytí objeví skrytá vada, například uvolněná omítka nebo poškozené zdivo, cenu i dopad na termín s vámi předem písemně odsouhlasíme. Bez vašeho souhlasu nic navíc neděláme."
      }
    ]
  },
  {
    id: "elektro-voda-revize",
    slug: "elektro-voda-revize",
    title: "Elektroinstalace, voda a revize",
    pageH1: "Elektroinstalace, voda a revize při rekonstrukci",
    priority: "podpůrná",
    shortDesc: "Zajistíme nové rozvody elektřiny, vody a odpadů i úpravy topení. Práce provádí naši ověření a certifikovaní subdodavatele. Součástí jsou potřebné zkoušky a revize podle rozsahu prací.",
    fullDesc: "Při rekonstrukci bytu, jádra nebo koupelny zajistíme nové rozvody elektřiny, vody a odpadů. Práce provádí náš stálý elektrikář a instalatér, se kterými dlouhodobě spolupracujeme. Na konci dostanete revizní zprávu elektro.",
    iconName: "ShieldCheck",
    image: "/images/IMG-20250823-WA0012.webp",
    galleryImages: [
      "/images/1-11.webp",
      "/images/IMG-20250823-WA0018.webp",
      "/images/1-4.webp",
      "/images/IMG-20250823-WA0019.webp"
    ],
    features: [
      "Nové rozvody elektřiny v mědi se samostatnými okruhy pro kuchyň a spotřebiče",
      "Nová jističová skříň s proudovými chrániči",
      "Rozvody vody a odpadní potrubí",
      "Úpravy topení, přesun a výměna radiátorů",
      "Příprava pro LED pásky, bodová světla v podhledu a datové rozvody",
      "Výchozí revizní zpráva elektro a potřebné zkoušky"
    ],
    whyTitle: "Proč rozvody s námi",
    benefits: [
      "Nesháníte elektrikáře, instalatéra ani revizního technika zvlášť. Vše koordinujeme my, v návaznosti na bourání, zdění a obklady.",
      "Ověření řemeslníci, se kterými pracujeme dlouhodobě, ne náhodní subdodavatelé z inzerátu.",
      "Nové rozvody v mědi se samostatnými okruhy pro kuchyň a spotřebiče a jističová skříň s proudovými chrániči.",
      "Revizní zprávu a všechny potřebné dokumenty dostanete při předání. Budete je potřebovat pro pojišťovnu i při prodeji bytu."
    ],
    includedTitle: "Co práce zahrnují",
    included: [
      "Elektro:",
      "Drážkování a uložení nových kabelů v mědi",
      "Samostatné okruhy pro kuchyň, pračku a další spotřebiče",
      "Nová jističová skříň s proudovými chrániči",
      "Osazení zásuvek, vypínačů a světel",
      "Příprava pro LED pásky, bodová světla v podhledu a datové rozvody",
      "Připojení varné desky, trouby, myčky a bojleru",
      "Výchozí revizní zpráva elektro",
      "Voda a odpady:",
      "Nové rozvody vody a odpadů od stoupačky po jednotlivá odběrná místa",
      "Příprava pro podomítkové moduly WC a baterie",
      "Připojení pračky, myčky, dřezu, umyvadla a sprchy",
      "Tlaková zkouška rozvodů vody",
      "Topení: přesun a výměna radiátorů"
    ],
    faqTitle: "Časté dotazy k elektroinstalaci a rozvodům vody",
    faq: [
      {
        q: "Dostanu k nové elektřině revizní zprávu?",
        a: "Ano. Po dokončení rozvodů provede kontrolu revizní technik s platným oprávněním a vystaví výchozí revizní zprávu a tu předáváme spolu s předávacím protokolem."
      },
      {
        q: "Děláte elektroinstalaci nebo vodu i samostatně?",
        a: "Rozvody děláme jako součást rekonstrukce bytu, bytového jádra nebo koupelny. Samostatné drobné opravy, jako výměnu jističe nebo baterie, nenabízíme."
      },
      {
        q: "Vyměníte i stoupačky?",
        a: "Stoupačky jsou společná část domu a jejich výměnu řeší SVJ nebo družstvo. My měníme rozvody vody a odpadů od stoupačky dál, tedy vše, co patří k vašemu bytu. Pokud dům výměnu stoupaček plánuje, rádi se s vaší rekonstrukcí přizpůsobíme."
      },
      {
        q: "Je potřeba měnit starou hliníkovou elektroinstalaci?",
        a: "U kompletní rekonstrukce ano. Hliníkové rozvody ve starých panelácích nejsou dimenzované na dnešní spotřebiče a spoje časem povolují a zahřívají se. Při rekonstrukci je měníme za měď. Stav posoudíme při prohlídce."
      }
    ]
  }
];

export const cityInLocative: Record<string, string> = {
  "Cheb": "v Chebu",
  "Karlovy Vary": "v Karlových Varech",
  "Sokolov": "v Sokolově",
  "Aš": "v Aši",
  "Františkovy Lázně": "ve Františkových Lázních",
  "Mariánské Lázně": "v Mariánských Lázních",
  "Ostrov": "v Ostrově",
  "Chodov": "v Chodově",
  "Kraslice": "v Kraslicích",
};

export const cityOverviewDescriptions: Record<string, string> = {
  "cheb": "Naše domovské město. Panelové byty na Skalce, Zlatém vrchu a Spáleništi i cihlové byty v centru.",
  "karlovy-vary": "Paneláky v Rybářích, Drahovicích a Staré Roli i byty s vysokými stropy v centru. Rekonstrukci umíme řídit i na dálku.",
  "sokolov": "Sídliště Michal, Slavíčkova i Šenvert. Nejčastěji výměna umakartových jader a nové rozvody.",
  "as": "Byty a koupelny v Aši a Ašském výběžku, v panelových i starších cihlových domech.",
  "frantiskovy-lazne": "Byty v lázeňských domech i novější zástavbě. Pár minut od našeho sídla.",
  "marianske-lazne": "Byty pro stálé bydlení i apartmány k pronájmu, v lázeňské zóně i na sídlištích.",
  "ostrov": "Byty v domech ve stylu sorela i v panelových domech, včetně Jáchymova a Hroznětína.",
  "chodov": "Panelové byty a bytová jádra v Chodově, Novém Sedle a Vintířově.",
  "kraslice": "Byty a koupelny v Kraslicích, Rotavě a okolních obcích.",
};

export const locations: LocationItem[] = [
  {
    id: "cheb",
    slug: "rekonstrukce-bytu-cheb",
    city: "Cheb",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 15 minut (Centrála firmy)",
    neighborhoods: ["Sídliště Skalka", "Zlatý vrch", "Spáleniště", "Háje", "Historické centrum", "Hradiště", "Dřenice", "Podhrad"],
    title: "Rekonstrukce bytu Cheb",
    metaTitle: "Rekonstrukce bytu Cheb | Koupelny a jádra na klíč HANSBAU",
    metaDesc: "Kompletní i částečné rekonstrukce bytů a koupelen v Chebu a okolí. Sídlo máme přímo v Potočišti u Chebu. Pevná cena za sjednaný rozsah, prohlídka zdarma.",
    perex: "Sídlíme v Potočišti u Chebu, takže do Chebu to máme pár minut. Rekonstruujeme panelové byty na Skalce, Zlatém vrchu i Spáleništi a cihlové byty v centru. Rozsah prací, cenu a termín sjednáme předem ve smlouvě.",
    leadParagraph: "Sídlíme v Potočišti u Chebu, takže do Chebu to máme pár minut. Rekonstruujeme panelové byty na Skalce, Zlatém vrchu i Spáleništi a cihlové byty v centru. Rozsah prací, cenu a termín sjednáme předem ve smlouvě.",
    specifics: [
      "Sídlo firmy u Chebu – prohlídku domluvíme rychle",
      "Zkušenosti s paneláky na Skalce, Zlatém vrchu a Spáleništi",
      "Odvoz suti je součástí rozpočtu",
      "Ochrana společných prostor a úklid na konci každého pracovního dne"
    ],
    heroImage: "/images/nove/cheb-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/cheb-realizace.webp", title: "Vstupní hala a chodba Cheb", desc: "Mramorová velkoformátová dlažba a černé posuvné dveře" },
      { src: "/images/nove/rekonstrukce-koupelny-cheb-detail.webp", title: "Rekonstrukce koupelny Cheb", desc: "Nové mramorové jádro s vanou a LED zrcadlem" },
      { src: "/images/nove/rekonstrukce-bytu-cheb-detail.webp", title: "Pokoj po rekonstrukci Cheb", desc: "Dřevěná plovoucí podlaha a sádrové stěrky" }
    ],
    whyHere: [
      { title: "Sídlo firmy u Chebu", desc: "Z Potočiště to máme do Chebu pár minut. Každou zakázku řídí osobně jednatel Jan Červeňák." },
      { title: "Pevná cena za sjednaný rozsah", desc: "Změny s vámi vždy předem písemně odsouhlasíme." },
      { title: "Vše pod jednou střechou", desc: "Nemusíte shánět zedníka, elektrikáře ani instalatéra. Všechny profese dodáme my." }
    ],
    faq: [
      { q: "Jak rychle můžete přijet na prohlídku bytu v Chebu?", a: "Ozveme se do 1 pracovního dne a prohlídku domluvíme obvykle během několika dní. Sídlíme přímo u Chebu, takže se přizpůsobíme i vašemu času." },
      { q: "Potřebuji na rekonstrukci bytu v Chebu stavební povolení?", a: "U běžných rekonstrukcí bez zásahu do nosných zdí stačí ohlášení na SVJ či bytové družstvo. Rádi vám pomůžeme s technickými podklady." },
      { q: "Kde v Chebu zajišťujete odvoz stavební suti?", a: "Odvoz a likvidace suti na certifikované skládce je součástí rozpočtu. Přistavíme kontejner a po práci uklidíme." }
    ],
    neighboringLocations: [
      { name: "Františkovy Lázně", slug: "rekonstrukce-bytu-frantiskovy-lazne" },
      { name: "Aš", slug: "rekonstrukce-bytu-as" },
      { name: "Sokolov", slug: "rekonstrukce-bytu-sokolov" },
      { name: "Mariánské Lázně", slug: "rekonstrukce-bytu-marianske-lazne" }
    ]
  },
  {
    id: "karlovy-vary",
    slug: "rekonstrukce-bytu-karlovy-vary",
    city: "Karlovy Vary",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 35 minut",
    neighborhoods: ["Rybáře", "Drahovice", "Stará Role", "Tuhnice", "Čankovská", "Lázeňské centrum", "Doubí", "Tašovice", "Bohatice"],
    title: "Rekonstrukce bytu Karlovy Vary",
    metaTitle: "Rekonstrukce bytu Karlovy Vary | Rekonstrukce na klíč HANSBAU",
    metaDesc: "Kompletní rekonstrukce panelových i cihlových bytů a koupelen v Karlových Varech (Rybáře, Drahovice, Stará Role, Tuhnice). Pevná cena za sjednaný rozsah, zaměření zdarma.",
    perex: "V Karlových Varech rekonstruujeme panelové byty v Rybářích, Drahovicích, Staré Roli nebo Tuhnicích i cihlové byty s vysokými stropy v centru. Pro majitele, kteří ve Varech nebydlí, umíme rekonstrukci řídit na dálku.",
    leadParagraph: "V Karlových Varech rekonstruujeme panelové byty v Rybářích, Drahovicích, Staré Roli nebo Tuhnicích i cihlové byty s vysokými stropy v centru. Pro majitele, kteří ve Varech nebydlí, umíme rekonstrukci řídit na dálku.",
    specifics: [
      "Panelové i cihlové byty napříč Karlovými Vary",
      "Byty s vysokými stropy: podhledy, nové rozvody, akustika",
      "Hlučné práce jen v časech povolených domovním řádem",
      "Rekonstrukce na dálku: předáte klíče, průběžně vás informujeme o postupu"
    ],
    heroImage: "/images/nove/rekonstrukce-bytu-karlovy-vary-detail.webp",
    realizaceImages: [
      { src: "/images/nove/rekonstrukce-bytu-karlovy-vary-detail.webp", title: "Obývací pokoj s kuchyní Karlovy Vary", desc: "Kompletní proměna bytu včetně kuchyňské linky a podlah" },
      { src: "/images/nove/karlovy-vary-realizace.webp", title: "Koupelna Karlovy Vary", desc: "Vzorovaná dlažba, kulaté zrcadlo a walk-in kout" },
      { src: "/images/nove/loznice-po-rekonstrukci.webp", title: "Ložnice Karlovy Vary", desc: "Pokoj s klenutým oknem a černými dveřmi" }
    ],
    whyHere: [
      { title: "Zkušenosti s byty napříč Vary", desc: "Pokud byt ve Varech pronajímáte nebo v něm nebydlíte, předáte nám klíče a rekonstrukci koordinujeme my." },
      { title: "Pevná cena za sjednaný rozsah", desc: "Předem vypracovaný položkový rozpočet platí. Změny s vámi vždy předem písemně odsouhlasíme." },
      { title: "Průběžná informovanost", desc: "Nemusíte denně jezdit na stavbu. Průběžně vás informujeme o postupu prací." }
    ],
    faq: [
      { q: "Jak probíhá rekonstrukce, když ve Varech trvale nebydlím?", a: "Předáte nám klíče, rekonstrukci koordinujeme my a průběžně vás informujeme o postupu. Důležitá rozhodnutí, jako změny rozsahu nebo výběr materiálu, s vámi vždy řešíme předem." },
      { q: "Zvládnete i byt s vysokými stropy v centru Varů?", a: "Ano. U domů v lázeňském území mohou platit požadavky památkové péče, například u oken nebo zásahů do konstrukcí. Při prohlídce posoudíme, co je potřeba." }
    ],
    neighboringLocations: [
      { name: "Ostrov", slug: "rekonstrukce-bytu-ostrov" },
      { name: "Chodov", slug: "rekonstrukce-bytu-chodov" },
      { name: "Sokolov", slug: "rekonstrukce-bytu-sokolov" },
      { name: "Cheb", slug: "rekonstrukce-bytu-cheb" }
    ]
  },
  {
    id: "sokolov",
    slug: "rekonstrukce-bytu-sokolov",
    city: "Sokolov",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 20 minut",
    neighborhoods: ["Sídliště Michal", "Slavíčkova", "Šenvert", "Centrum", "Kraslická", "Královské Poříčí", "Citice", "Svatava"],
    title: "Rekonstrukce bytu Sokolov",
    metaTitle: "Rekonstrukce bytu Sokolov | Jádra a koupelny HANSBAU",
    metaDesc: "Rekonstrukce panelových i cihlových bytů a bytových jader v Sokolově (sídliště Michal, Slavíčkova, Šenvert). Pevná cena za sjednaný rozsah, precizní práce.",
    perex: "V Sokolově a okolí (Královské Poříčí, Citice, Svatava, Březová) rekonstruujeme panelové i cihlové byty. Nejčastěji měníme umakartová jádra za zděná z tvárnic Ytong a staré rozvody za nové v mědi.",
    leadParagraph: "V Sokolově a okolí (Královské Poříčí, Citice, Svatava, Březová) rekonstruujeme panelové i cihlové byty. Nejčastěji měníme umakartová jádra za zděná z tvárnic Ytong a staré rozvody za nové v mědi.",
    specifics: [
      "Znalost sokolovských paneláků – Michal, Slavíčkova, Šenvert",
      "Výměna jádra obvykle za 3–6 týdnů od zahájení do předání",
      "Nové rozvody v drážkách a podhledech, bez lišt na stěnách",
      "Odvoz suti v rozpočtu, úklid nečistot po naší práci každý den"
    ],
    heroImage: "/images/nove/sokolov-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/sokolov-realizace.webp", title: "Bytové jádro Sokolov (Michal)", desc: "Nové vyzděné jádro Ytong, dřevěná lamelová skříňka a LED zrcadlo" },
      { src: "/images/IMG-20250823-WA0011.webp", title: "Obývací pokoj Sokolov", desc: "Nová plovoucí podlaha, štuky a vstup na lodžii" },
      { src: "/images/IMG-20250823-WA0014.webp", title: "Obklad vany Sokolov", desc: "Velkoformátové keramické obklady a nová sanita" }
    ],
    whyHere: [
      { title: "Rychlý dojezd do Sokolova", desc: "Z naší centrály v Potočišti jsme v Sokolově za 20 minut po dálnici D6." },
      { title: "Specialisté na panelová jádra", desc: "Zbouráme umakart, vyzdíme novou koupelnu z tvárnic Ytong a uděláme rozvody." },
      { title: "Pevná cena za sjednaný rozsah", desc: "Změny s vámi vždy předem písemně odsouhlasíme." }
    ],
    faq: [
      { q: "Lze v sokolovském paneláku propojit obývák s kuchyní?", a: "U nenosných příček ano. Nosné stěny bez posouzení statika a souhlasu stavebního úřadu nebouráme. Při prohlídce posoudíme, o jakou stěnu jde." },
      { q: "Jak dlouho trvá výměna jádra v Sokolově?", a: "Od zahájení prací do předání obvykle 3–6 týdnů, podle rozsahu, vybavení a dodacích lhůt materiálu. Přesný termín potvrdíme ve smlouvě." }
    ],
    neighboringLocations: [
      { name: "Chodov", slug: "rekonstrukce-bytu-chodov" },
      { name: "Karlovy Vary", slug: "rekonstrukce-bytu-karlovy-vary" },
      { name: "Cheb", slug: "rekonstrukce-bytu-cheb" },
      { name: "Kraslice", slug: "rekonstrukce-bytu-kraslice" }
    ]
  },
  {
    id: "as",
    slug: "rekonstrukce-bytu-as",
    city: "Aš",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 25 minut",
    neighborhoods: ["Mokřiny", "Centrum Aše", "Hranice u Aše", "Krásná", "Hazlov", "Kopaniny", "Vernéřov"],
    title: "Rekonstrukce bytu Aš",
    metaTitle: "Rekonstrukce bytu Aš | Koupelny a zednické práce HANSBAU",
    metaDesc: "Kompletní rekonstrukce bytů a koupelen v Aši a okolí. Vyzdění jader, sádrokartony, obklady a elektřina. Pevná cena za sjednaný rozsah, zaměření zdarma.",
    perex: "V Aši a Ašském výběžku (Hranice, Krásná, Hazlov) rekonstruujeme byty a koupelny v panelových i starších cihlových domech. Koupelny děláme i v rodinných domech.",
    leadParagraph: "V Aši a Ašském výběžku (Hranice, Krásná, Hazlov) rekonstruujeme byty a koupelny v panelových i starších cihlových domech. Koupelny děláme i v rodinných domech.",
    specifics: [
      "Panelové i cihlové byty v Aši a okolí",
      "Kompletní rekonstrukce od bourání po úklid – řemeslníky koordinujeme my",
      "Koupelny v bytech i rodinných domech",
      "Délku a podmínky záruky uvádíme ve smlouvě"
    ],
    heroImage: "/images/nove/as-koupelna.webp",
    realizaceImages: [
      { src: "/images/nove/as-koupelna.webp", title: "Koupelna Aš", desc: "Velkoformátový šedý obklad s integrovanou LED nikou" },
      { src: "/images/nove/rekonstrukce-bytu-as-detail.webp", title: "Pokoj po rekonstrukci Aš", desc: "Dubová plovoucí podlaha a nová elektroinstalace" },
      { src: "/images/nove/pokoj-po-rekonstrukci.webp", title: "Interiér bytu Aš", desc: "Sádrové omítky a nová okna" }
    ],
    whyHere: [
      { title: "Dostupnost v Ašském výběžku", desc: "Nastupujeme v termínu, který si sjednáme ve smlouvě." },
      { title: "Záruka a smlouva o dílo", desc: "Délku a podmínky záruky uvádíme ve smlouvě. Vše je podloženo řádnou smlouvou o dílo." }
    ],
    faq: [
      { q: "Děláte v Aši i rekonstrukce koupelen?", a: "Ano, rekonstrukce koupelen a bytových jader v Aši děláme." }
    ],
    neighboringLocations: [
      { name: "Cheb", slug: "rekonstrukce-bytu-cheb" },
      { name: "Františkovy Lázně", slug: "rekonstrukce-bytu-frantiskovy-lazne" },
      { name: "Kraslice", slug: "rekonstrukce-bytu-kraslice" }
    ]
  },
  {
    id: "frantiskovy-lazne",
    slug: "rekonstrukce-bytu-frantiskovy-lazne",
    city: "Františkovy Lázně",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 10 minut",
    neighborhoods: ["Lázeňské centrum", "Slatina", "Horní Ves", "Dlouhé Mosty", "Aleje", "Žírovice"],
    title: "Rekonstrukce bytu Františkovy Lázně",
    metaTitle: "Rekonstrukce bytu Františkovy Lázně | HANSBAU",
    metaDesc: "Kvalitní rekonstrukce bytů a koupelen ve Františkových Lázních. Sídlo máme jen 10 minut od vás. Bezplatná prohlídka a rozpočet zdarma.",
    perex: "Ve Františkových Lázních rekonstruujeme byty v lázeňských domech i v novější zástavbě. Společné prostory při práci chráníme a hlučné práce plánujeme tak, aby co nejméně obtěžovaly sousedy.",
    leadParagraph: "Ve Františkových Lázních rekonstruujeme byty v lázeňských domech i v novější zástavbě. Společné prostory při práci chráníme a hlučné práce plánujeme tak, aby co nejméně obtěžovaly sousedy.",
    specifics: [
      "Sídlo v Potočišti – jsme u vás za pár minut",
      "Zkušenosti se staršími cihlovými domy",
      "Požadavky památkové péče u lázeňských domů posoudíme při prohlídce",
      "Ochrana společných prostor a úklid na konci každého dne"
    ],
    heroImage: "/images/nove/chodba-po-rekonstrukci.webp",
    realizaceImages: [
      { src: "/images/nove/chodba-po-rekonstrukci.webp", title: "Chodba bytu Františkovy Lázně", desc: "Dlažba s dekorem dřeva a černé dveřní obložky" },
      { src: "/images/nove/koupelna-po-rekonstrukci.webp", title: "Koupelna Františkovy Lázně", desc: "Bílé obklady, černý radiátor a zástěna vany" },
      { src: "/images/nove/pokoj-2-po-rekonstrukci.webp", title: "Pokoj Františkovy Lázně", desc: "Čisté stěny s podlahovými lištami" }
    ],
    whyHere: [
      { title: "Sídlo jen pár minut od vás", desc: "Z Potočiště jsme u vás za pár minut. Když je na stavbě potřeba něco řešit, jsme rychle na místě." },
      { title: "Termín a cena ve smlouvě", desc: "Termín dokončení a cenu sjednáme ve smlouvě." }
    ],
    faq: [
      { q: "Kdy můžete přijet na prohlídku bytu ve Františkových Lázních?", a: "Ozveme se do 1 pracovního dne a prohlídku domluvíme obvykle během několika dní. Prohlídka i rozpočet jsou zdarma a nezávazné." }
    ],
    neighboringLocations: [
      { name: "Cheb", slug: "rekonstrukce-bytu-cheb" },
      { name: "Aš", slug: "rekonstrukce-bytu-as" },
      { name: "Sokolov", slug: "rekonstrukce-bytu-sokolov" }
    ]
  },
  {
    id: "marianske-lazne",
    slug: "rekonstrukce-bytu-marianske-lazne",
    city: "Mariánské Lázně",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 30 minut",
    neighborhoods: ["Lázeňská zóna", "Úšovice", "Hamrníky", "Centrum", "Dyleňská", "Velká Hleďsebe"],
    title: "Rekonstrukce bytu Mariánské Lázně",
    metaTitle: "Rekonstrukce bytu Mariánské Lázně | Koupelny HANSBAU",
    metaDesc: "Profesionální rekonstrukce bytů a apartmánů v Mariánských Lázních. Pevná cena za sjednaný rozsah, precizní práce a záruka.",
    perex: "V Mariánských Lázních rekonstruujeme byty pro stálé bydlení i apartmány k pronájmu – v lázeňské zóně, Úšovicích i na sídlištích. Majitelům, kteří na místě nebydlí, umíme rekonstrukci řídit na dálku.",
    leadParagraph: "V Mariánských Lázních rekonstruujeme byty pro stálé bydlení i apartmány k pronájmu – v lázeňské zóně, Úšovicích i na sídlištích. Majitelům, kteří na místě nebydlí, umíme rekonstrukci řídit na dálku.",
    specifics: [
      "Byty i apartmány v lázeňské zóně a na sídlištích",
      "Rekonstrukce na dálku – předáte klíče, průběžně vás informujeme",
      "Pečlivé detaily: kamenické rohy 45°, rovné spáry, hladké stěrky",
      "Revizní zprávy a předávací protokol"
    ],
    heroImage: "/images/2.webp",
    realizaceImages: [
      { src: "/images/2.webp", title: "Apartmán Mariánské Lázně", desc: "Mramorová leštěná dlažba a skryté LED osvětlení" },
      { src: "/images/nove/rekonstrukce-koupelny-cheb-detail.webp", title: "Luxusní koupelna Mariánské Lázně", desc: "Velkoformátový mramor a podomítková sanita" },
      { src: "/images/nove/pracovna-po-rekonstrukci.webp", title: "Pracovna Mariánské Lázně", desc: "Hladké stěrky a nová podlaha" }
    ],
    whyHere: [
      { title: "Detaily, které jsou vidět", desc: "Dbáme na každý detail – rovné spáry, kamenické rohy 45° a hladké stěrky." },
      { title: "Správa rekonstrukce na dálku", desc: "Rekonstrukci umíme řídit na dálku. Předáte klíče a my vás průběžně informujeme o postupu." }
    ],
    faq: [
      { q: "Provádíte rekonstrukce i v zimních měsících?", a: "Ano, interiérové rekonstrukce bytů a koupelen provádíme celoročně." }
    ],
    neighboringLocations: [
      { name: "Cheb", slug: "rekonstrukce-bytu-cheb" },
      { name: "Františkovy Lázně", slug: "rekonstrukce-bytu-frantiskovy-lazne" },
      { name: "Karlovy Vary", slug: "rekonstrukce-bytu-karlovy-vary" }
    ]
  },
  {
    id: "ostrov",
    slug: "rekonstrukce-bytu-ostrov",
    city: "Ostrov",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 40 minut",
    neighborhoods: ["Historická Sorela", "Sídliště Za Nemocnicí", "Staré město", "Lidická", "Jáchymov", "Hroznětín"],
    title: "Rekonstrukce bytu Ostrov",
    metaTitle: "Rekonstrukce bytu Ostrov nad Ohří | HANSBAU",
    metaDesc: "Kompletní i částečné rekonstrukce bytů v Ostrově (sídliště, sorela, novostavby). Pevná cena za sjednaný rozsah, zaměření zdarma.",
    perex: "V Ostrově a okolí (Jáchymov, Hroznětín) rekonstruujeme byty v domech ve stylu sorela i v panelových domech. Zajistíme nové rozvody, omítky, podhledy i koupelny.",
    leadParagraph: "V Ostrově a okolí (Jáchymov, Hroznětín) rekonstruujeme byty v domech ve stylu sorela i v panelových domech. Zajistíme nové rozvody, omítky, podhledy i koupelny.",
    specifics: [
      "Zkušenosti s cihlovými domy ve stylu sorela i s paneláky",
      "Nové rozvody elektřiny a vody s revizí a tlakovou zkouškou",
      "Řemeslníky koordinujeme my, vy máte jednu kontaktní osobu"
    ],
    heroImage: "/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp",
    realizaceImages: [
      { src: "/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp", title: "Pokoj po rekonstrukci Ostrov", desc: "Bodové LED osvětlení a tmavá podlaha" },
      { src: "/images/nove/loznice-2-po-rekonstrukci.webp", title: "Ložnice Ostrov (Sorela)", desc: "Nové omítky a vnitřní dveře" },
      { src: "/images/nove/koupelna-po-rekonstrukci.webp", title: "Koupelna Ostrov", desc: "Nové bytové jádro s vanou a zástěnou" }
    ],
    whyHere: [
      { title: "Termín zahájení a dokončení ve smlouvě", desc: "Termín zahájení a dokončení sjednáme ve smlouvě a nastupujeme v dohodnutý den." }
    ],
    faq: [
      { q: "Jak probíhá kalkulace pro byt v Ostrově?", a: "Přijedeme, byt zaměříme a připravíme položkový rozpočet zdarma. Termín jeho dodání vám potvrdíme při prohlídce. Orientační cenu si můžete předem spočítat v naší kalkulačce." }
    ],
    neighboringLocations: [
      { name: "Karlovy Vary", slug: "rekonstrukce-bytu-karlovy-vary" },
      { name: "Chodov", slug: "rekonstrukce-bytu-chodov" }
    ]
  },
  {
    id: "chodov",
    slug: "rekonstrukce-bytu-chodov",
    city: "Chodov",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 25 minut",
    neighborhoods: ["Sídliště U Koupaliště", "Tovární", "Centrum", "Nové Sedlo", "Vintířov", "Chranišov"],
    title: "Rekonstrukce bytu Chodov",
    metaTitle: "Rekonstrukce bytu Chodov | Jádra a koupelny HANSBAU",
    metaDesc: "Rekonstrukce panelových bytů a jader v Chodově u Karlových Varů. Pevná cena za sjednaný rozsah, záruka, úklid. HANSBAU.",
    perex: "V Chodově a okolí (Nové Sedlo, Vintířov) rekonstruujeme panelové byty a bytová jádra. Umakart vyměníme za zděné jádro, uděláme nové rozvody, podlahy i povrchy.",
    leadParagraph: "V Chodově a okolí (Nové Sedlo, Vintířov) rekonstruujeme panelové byty a bytová jádra. Umakart vyměníme za zděné jádro, uděláme nové rozvody, podlahy i povrchy.",
    specifics: [
      "Dobrá dostupnost po D6",
      "Výměna jádra obvykle za 3–6 týdnů od zahájení do předání",
      "Pevná cena za sjednaný rozsah, změny jen po písemném odsouhlasení"
    ],
    heroImage: "/images/nove/balthasar-byt.webp",
    realizaceImages: [
      { src: "/images/nove/balthasar-byt.webp", title: "Panelový byt Chodov", desc: "Nivelace podlah a pokládka laminátu" },
      { src: "/images/nove/sokolov-realizace.webp", title: "Jádro a koupelna Chodov", desc: "Vybourání umakartu a nové zděné jádro" },
      { src: "/images/IMG-20250823-WA0018.webp", title: "Závěsné WC Chodov", desc: "Podomítkový modul Geberit a keramická dlažba" }
    ],
    whyHere: [
      { title: "Záruka na provedené práce", desc: "Délku a podmínky záruky uvádíme ve smlouvě. Ručíme za poctivé řemeslné provedení." }
    ],
    faq: [
      { q: "Zajistíte i výměnu oken a dveří?", a: "Dveře a obložkové zárubně dodáme a osadíme v rámci rekonstrukce. Okna sami nedodáváme, ale výměnu umíme naplánovat do harmonogramu s ověřenou firmou." }
    ],
    neighboringLocations: [
      { name: "Sokolov", slug: "rekonstrukce-bytu-sokolov" },
      { name: "Karlovy Vary", slug: "rekonstrukce-bytu-karlovy-vary" },
      { name: "Ostrov", slug: "rekonstrukce-bytu-ostrov" }
    ]
  },
  {
    id: "kraslice",
    slug: "rekonstrukce-bytu-kraslice",
    city: "Kraslice",
    region: "Karlovarský kraj",
    driveTime: "Dojezd do 35 minut",
    neighborhoods: ["Centrum Kraslic", "Tisová", "Rotava", "Šindelová", "Bublava", "Stříbrná", "Jindřichovice"],
    title: "Rekonstrukce bytu Kraslice",
    metaTitle: "Rekonstrukce bytu Kraslice | Koupelny a zednické práce HANSBAU",
    metaDesc: "Rekonstrukce bytů a koupelen v Kraslicích a okolí (Rotava, Šindelová, Bublava). Pevná cena za sjednaný rozsah, záruka a kalkulace zdarma.",
    perex: "V Kraslicích, Rotavě a okolních obcích rekonstruujeme byty a koupelny v panelových i starších cihlových domech. Zajistíme nové rozvody, sádrokartony, omítky, obklady i podlahy.",
    leadParagraph: "V Kraslicích, Rotavě a okolních obcích rekonstruujeme byty a koupelny v panelových i starších cihlových domech. Zajistíme nové rozvody, sádrokartony, omítky, obklady i podlahy.",
    specifics: [
      "Byty a koupelny v Kraslicích, Rotavě a okolí",
      "Nové rozvody elektřiny a vody s revizí a tlakovou zkouškou",
      "Kompletní realizace – řemeslníky koordinujeme my"
    ],
    heroImage: "/images/nove/pokoj-po-rekonstrukci.webp",
    realizaceImages: [
      { src: "/images/nove/pokoj-po-rekonstrukci.webp", title: "Rekonstrukce bytu Kraslice", desc: "Nové omítky, sádrokartony a podlahy" },
      { src: "/images/nove/as-koupelna.webp", title: "Koupelna Kraslice", desc: "Moderní koupelna s nerezovou sanitou" },
      { src: "/images/pokladka-plovouci-podlahy_66.webp", title: "Podlahy Kraslice", desc: "Izolace a pokládka plovoucí podlahy" }
    ],
    whyHere: [
      { title: "Vše pod jednou střechou", desc: "Všechny práce zajistíme pod jednou smlouvou a řemeslníky koordinujeme my." }
    ],
    faq: [
      { q: "Děláte i rekonstrukce podkrovních bytů?", a: "Rekonstrukce stávajících podkrovních bytů ano – rozvody, sádrokartony, koupelny, povrchy. Nové půdní vestavby nenabízíme, protože vyžadují projekt a stavební řízení." }
    ],
    neighboringLocations: [
      { name: "Sokolov", slug: "rekonstrukce-bytu-sokolov" },
      { name: "Aš", slug: "rekonstrukce-bytu-as" },
      { name: "Karlovy Vary", slug: "rekonstrukce-bytu-karlovy-vary" }
    ]
  }
];

export const portfolioItems: PortfolioItem[] = [
  // 1. Koupelny (Bathrooms)
  {
    id: "realizace-koupelna-1",
    title: "Mramorová koupelna s vanou a LED zrcadlem",
    category: "koupelny",
    categoryLabel: "Koupelny",
    location: "Cheb",
    image: "/images/nove/rekonstrukce-koupelny-cheb-detail.webp",
    description: "Luxusní velkoformátový mramorový obklad, zapuštěná vana, závěsná toaleta Geberit a podsvícené zrcadlo."
  },
  {
    id: "realizace-koupelna-2",
    title: "Moderní koupelna s vanovou zástěnou a černými bateriemi",
    category: "koupelny",
    categoryLabel: "Koupelny",
    location: "Karlovy Vary",
    image: "/images/nove/koupelna-po-rekonstrukci.webp",
    description: "Bílý obklad ve stylu subway tiles, černý otopný žebřík, vana se skleněnou zástěnou a designové umyvadlo."
  },
  {
    id: "realizace-koupelna-3",
    title: "Šedá koupelna s podsvícenou LED nikou",
    category: "koupelny",
    categoryLabel: "Koupelny",
    location: "Aš",
    image: "/images/nove/as-koupelna.webp",
    description: "Velkoformátový antracitový obklad, vestavěná osvětlená nika na kosmetiku a černá sprchová baterie."
  },
  {
    id: "realizace-koupelna-4",
    title: "Koupelna s lamelovou skříňkou a kruhovým LED zrcadlem",
    category: "koupelny",
    categoryLabel: "Koupelny",
    location: "Sokolov",
    image: "/images/nove/sokolov-realizace.webp",
    description: "Šedé obklady v kombinaci s dubovými lamelami, černá baterie a kulaté podsvícené zrcadlo."
  },
  {
    id: "realizace-koupelna-5",
    title: "Designový walk-in kout s geometrickou dlažbou",
    category: "koupelny",
    categoryLabel: "Koupelny",
    location: "Mariánské Lázně",
    image: "/images/nove/karlovy-vary-realizace.webp",
    description: "Protiskluzová vzorovaná dlažba, bezbariérový sprchový kout se skleněnou stěnou a kulatým zrcadlem."
  },

  // 2. Bytová jádra (Housing cores)
  {
    id: "realizace-jadro-1",
    title: "Kompletní vyzdění jádra z Ytongu",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Sokolov (Michal)",
    image: "/images/nove/sokolov-realizace.webp",
    description: "Vybourání starého umakartového jádra, vyzdění nových stěn, nová elektroinstalace v mědi a nová sanita."
  },
  {
    id: "realizace-jadro-2",
    title: "Bytové jádro s vanou a obklady",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Cheb (Skalka)",
    image: "/images/IMG-20250823-WA0014.webp",
    description: "Nové pórobetonové stěny, hydroizolační stěrka, velkoformátové obklady a osazení vany s vývody."
  },
  {
    id: "realizace-jadro-3",
    title: "Závěsné WC a podomítkový modul Geberit",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Chodov",
    image: "/images/IMG-20250823-WA0018.webp",
    description: "Zazděný podomítkový modul Geberit, nová keramická dlažba a kompletní revize rozvodů vody."
  },
  {
    id: "realizace-jadro-4",
    title: "Sprchový kout v rekonstruovaném jádře",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Ostrov",
    image: "/images/IMG-20250823-WA0016.webp",
    description: "Nové zděné příčky jádra, instalace sprchové vaničky, rozvody vody a obkladačské práce."
  },

  // 3. Rekonstrukce bytu (Apartment full renovations)
  {
    id: "realizace-byt-1",
    title: "Obývací pokoj s moderní kuchyňskou linkou",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Karlovy Vary",
    image: "/images/nove/rekonstrukce-bytu-karlovy-vary-detail.webp",
    description: "Propojení obývacího pokoje s kuchyňským koutem, šedá moderní linka, vestavné spotřebiče a dřevěná podlaha."
  },
  {
    id: "realizace-byt-2",
    title: "Vstupní hala a chodba s mramorovou dlažbou",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Cheb",
    image: "/images/nove/cheb-realizace.webp",
    description: "Kompletní proměna bytu 3+1: leštěná mramorová dlažba, černé posuvné dveře a LED podhledy."
  },
  {
    id: "realizace-byt-3",
    title: "Reprezentativní obývací prostor s LED podsvícením",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Mariánské Lázně",
    image: "/images/2.webp",
    description: "Luxusní velkoplošná mramorová dlažba, nepřímé světelné rampy a sádrové hladké stěrky."
  },
  {
    id: "realizace-byt-4",
    title: "Pokoj s designovým osvětlením a tmavou podlahou",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Ostrov",
    image: "/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp",
    description: "Kompletní elektroinstalace, vestavná bodová světla, designová nástěnná svítidla a nová podlaha."
  },
  {
    id: "realizace-byt-5",
    title: "Prosvětlený obývací pokoj se vstupem na lodžii",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Sokolov",
    image: "/images/IMG-20250823-WA0011.webp",
    description: "Nové omítky, dřevěná podlaha, plastové balkonové dveře a příprava elektroinstalace pro osvětlení."
  },

  // 4. Pokoje & Interiéry (Rooms & Interiors)
  {
    id: "realizace-pokoj-1",
    title: "Centrální chodba s dřevěnou dlažbou a černými dveřmi",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Františkovy Lázně",
    image: "/images/nove/chodba-po-rekonstrukci.webp",
    description: "Dlažba s dekorem přírodního dřeva, černé obložkové zárubně a moderní bodové i nástěnné osvětlení."
  },
  {
    id: "realizace-pokoj-2",
    title: "Ložnice s klenutým oknem a černými dveřmi",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Karlovy Vary",
    image: "/images/nove/loznice-po-rekonstrukci.webp",
    description: "Sádrové omítky, nová šedá podlaha s bílými soklovými lištami a černé interiérové dveře."
  },
  {
    id: "realizace-pokoj-3",
    title: "Pokoj s dubovou podlahou a výhledem",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Aš",
    image: "/images/nove/rekonstrukce-bytu-as-detail.webp",
    description: "Plovoucí dubová podlaha, nový radiátor s termohlavicí a hladká sněhově bílá výmalba."
  },
  {
    id: "realizace-pokoj-4",
    title: "Moderní pokoj po rekonstrukci",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Cheb",
    image: "/images/nove/rekonstrukce-bytu-cheb-detail.webp",
    description: "Teplá dřevěná podlaha, bílé interiérové dveře s nerezovými klikami a nová elektroinstalace."
  },
  {
    id: "realizace-pokoj-5",
    title: "Pracovna a pokoj pro hosty",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Mariánské Lázně",
    image: "/images/nove/pracovna-po-rekonstrukci.webp",
    description: "Nová elektroinstalace pro pracovní stůl, sádrokartony a stropní stmívatelné LED svítidlo."
  },

  // 5. Zednické práce, Podlahy & Přípravy (Masonry & Floors)
  {
    id: "realizace-zednicke-1",
    title: "Pokládka plovoucí podlahy s izolační fólií",
    category: "zednicke",
    categoryLabel: "Zednické práce",
    location: "Karlovarský kraj",
    image: "/images/nove2/IMG_4483.webp",
    description: "Přesné kladení zámkové podlahy na kročejovou a tepelně izolační podložku v nově zrekonstruovaném pokoji."
  },
  {
    id: "realizace-zednicke-2",
    title: "Sádrové stěrky a štukování stěn a stropu",
    category: "zednicke",
    categoryLabel: "Zednické práce",
    location: "Cheb",
    image: "/images/nove2/IMG_4358.webp",
    description: "Hlazení a finální povrchová úprava stěn sádrovou stěrkou pro dokonale hladký a rovný podklad."
  },
  {
    id: "realizace-zednicke-3",
    title: "Jádrové omítky a zapravení stěn po bourání",
    category: "zednicke",
    categoryLabel: "Zednické práce",
    location: "Karlovarský kraj",
    image: "/images/nove2/IMG_4229.webp",
    description: "Vyrovnání nerovností původního zdiva jádrovou maltou a perlinkou s flexibilním lepidlem."
  },
  {
    id: "realizace-zednicke-4",
    title: "Sádrokartonové konstrukce a úprava dispozice",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Cheb",
    image: "/images/nove2/IMG_3194.webp",
    description: "Montáž pevných ocelových CW/UW profilů pro nové rozdělení místností a otevření prostoru bytu."
  },
  {
    id: "realizace-jadro-nove-1",
    title: "Vyzdění nového bytového jádra z tvárnic Ytong",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Cheb",
    image: "/images/nove2/IMG_5701.webp",
    description: "Přesné vyzdění obvodových i vnitřních stěn nového jádra po vybourání původního umakartu."
  },
  {
    id: "realizace-jadro-nove-2",
    title: "Příprava drážek pro rozvody vody a elektroinstalace",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Sokolov",
    image: "/images/nove2/IMG_5784.webp",
    description: "Vyfrézované drážky a osazení elektroinstalačních krabic a rozvodů vody ve zděném jádře Ytong."
  },
  {
    id: "realizace-koupelna-nove-1",
    title: "Hydroizolační stěrka a laserové zaměření koupelny",
    category: "koupelny",
    categoryLabel: "Rekonstrukce koupelny",
    location: "Karlovy Vary",
    image: "/images/nove2/IMG_5864.webp",
    description: "Vodotěsná hydroizolační vrstva s těsnicími páskami v rozích a laserové nivelování pro pokládku obkladů."
  },
  {
    id: "realizace-koupelna-nove-2",
    title: "Precizní obklad koupelny s dřevěným chevron dekorem",
    category: "koupelny",
    categoryLabel: "Rekonstrukce koupelny",
    location: "Karlovarský kraj",
    image: "/images/nove2/IMG_5914-1.webp",
    description: "Kombinace velkoformátových obkladů a diagonálního dekoru dřeva s vyrovnávacími nivelačními klíny."
  }
];

export const reviews: ReviewItem[] = [
  {
    id: "rev-hamrle",
    author: "Lukas Hamrle",
    rating: 5,
    date: "Před rokem",
    text: "Nechal jsem si od firmy Hansbau zrekonstruovat 4 byty a velka spokojenost. Flexibilita na jednicku, komunikace na jednicku , bez chybicky Velice doporucuji",
    source: "Google",
    location: "Karlovarský kraj"
  },
  {
    id: "rev-pock",
    author: "Vasek Pock",
    rating: 5,
    date: "Před 9 měsíci",
    text: "S rekonstrukcí bytového jádra jsme velice spokojeni, profesionalita od samotného začátku až po samotný závěr. Výborná komunikace a flexibilita. Jsou ochotni se přizpůsobit vašim požadavkům. LUXUSNÍ PRÁCE. Doporučuji.",
    source: "Google",
    location: "Karlovarský kraj"
  },
  {
    id: "rev-kriz",
    author: "Jiří Kříž",
    rating: 5,
    date: "Před rokem",
    text: "Naprosto skvělá spolupráce, úžasná domluva a profesionálně odvedená práce. Předčilo to mé očekávání. Instalatér i elektrikář domluven panem Červeňákem. Vřele doporučuji.",
    source: "Google",
    location: "Karlovarský kraj"
  },
  {
    id: "rev-fiegenbaum",
    author: "MARTA FIEGENBAUM",
    rating: 5,
    date: "Před rokem",
    text: "Firma Zednictví Červeňak u nás pracovala na rekonstrukci vnitřních prostorů v nemovitosti, nadále opravila fasádu a venkovní schody. Velká spokojenost, precizní práce a spolehlivost.",
    source: "Google",
    location: "Karlovarský kraj"
  },
  {
    id: "rev-motorcycle",
    author: "Motorcycle Traveling",
    rating: 5,
    date: "Před rokem",
    text: "Nechal jsem si dělat nový plot původní vybourat . Skvělý přístup, ochota, cena a rychlost provedení. Jsem s panem Červeňakem velmi spokojen.",
    source: "Google",
    location: "Cheb a okolí"
  }
];

export const whyUsPoints = [
  {
    icon: "BadgeCheck",
    title: "Pevná cena a smlouva o dílo",
    desc: "Přesnou cenu znáte předem. Žádné nepříjemné vícepráce a skryté doplatky během stavby."
  },
  {
    icon: "Clock",
    title: "Garance termínu dokončení",
    desc: "Časový harmonogram je závazný. Nastupujeme včas a předáváme v domluveném termínu."
  },
  {
    icon: "Users",
    title: "Vše pod jednou střechou",
    desc: "Zajistíme všechny profese od bourání po elektro a vodu. Nemusíte koordinovat 5 různých firem."
  },
  {
    icon: "Sparkles",
    title: "Čistota a ohled na sousedy",
    desc: "Každý den po sobě uklízíme, chráníme společné prostory domu včetně výtahu a chodeb."
  },
  {
    icon: "ShieldAlert",
    title: "Záruka a pojištění odpovědnosti",
    desc: "Na veškeré provedené stavební práce poskytujeme plnou záruku a máme sjednané pojištění odpovědnosti."
  },
  {
    icon: "MapPin",
    title: "Místní firma z Chebu",
    desc: "Působíme v celém Karlovarském kraji. Známe specifika místních panelových i cihlových domů."
  }
];

export const workProcess = [
  {
    step: "01",
    title: "Nezávazná poptávka",
    desc: "Vyplníte jednoduchý formulář nebo nám zavoláte na +420 606 073 700. Probereme základní představu."
  },
  {
    step: "02",
    title: "Osobní prohlídka a zaměření",
    desc: "Přijedeme přímo k vám do bytu, prostor pečlivě zaměříme a probereme technické možnosti ZDARMA."
  },
  {
    step: "03",
    title: "Položkový rozpočet ZDARMA",
    desc: "Připravíme přehledný položkový rozpočet s pevnou cenou za sjednaný rozsah prací."
  },
  {
    step: "04",
    title: "Podpis smlouvy a realizace",
    desc: "Podepíšeme smlouvu o dílo s harmonogramem a náš tým nastupuje na stavbu."
  },
  {
    step: "05",
    title: "Čisté předání s revizemi",
    desc: "Po dokončení prostor kompletně uklidíme, předáme revizní zprávy, protokol a předáme vám klíče."
  }
];

export const homeFaq = [
  {
    q: "Jak probíhá kalkulace a je skutečně bezplatná?",
    a: "Ano, kalkulace i zaměření jsou nezávazné a zdarma. Přijedeme na místo do vašeho bytu, prostor zaměříme, prodiskutujeme materiály a připravíme detailní položkový rozpočet."
  },
  {
    q: "V jakých lokalitách stavební práce provádíte?",
    a: "Působíme po celém Karlovarském kraji – především Cheb, Františkovy Lázně, Aš, Sokolov, Karlovy Vary, Mariánské Lázně, Ostrov, Chodov a Kraslice."
  },
  {
    q: "Jak je to s nákupem stavebního materiálu, obkladů a sanity?",
    a: "Hrubý stavební materiál (lepidla, SDK, Ytong, hydroizolace, kabely) zajistíme my v nejvyšší kvalitě za výhodné velkoobchodní ceny. Obklady, dlažby a sanitu si můžete vybrat sami nebo vám pomůžeme v partnerských studiích s výraznou slevou."
  },
  {
    q: "Poskytujete záruku na provedené práce?",
    a: "Ano, na veškeré stavební a řemeslné práce poskytujeme plnou záruku. Máme také uzavřené pojištění odpovědnosti pro maximální bezpečí vašeho majetku."
  },
  {
    q: "Zajistíte i elektroinstalaci a revize?",
    a: "Ano, elektroinstalatérské a vodoinstalatérské práce zajišťujeme v rámci rekonstrukce přes naše ověřené certifikované subdodavatele včetně oficiálních revizních zpráv."
  }
];
