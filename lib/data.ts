export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  priority: "hlavní" | "priorita-2" | "podpůrná";
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  galleryImages: string[];
  features: string[];
  benefits: string[];
  included: string[];
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
  name: "HANSBAU s.r.o.",
  tagline: "Rekonstrukce bytů a koupelen v Karlovarském kraji",
  phoneCZ: "+420 606 073 700",
  phoneCZRaw: "+420606073700",
  email: "team@hansbau.com",
  contactPerson: "Jan Červeňak",
  contactRole: "Jednatel společnosti",
  founderPhoto: "/images/nove/jan-cervenak-jednatel.webp",
  logo: "/images/Logo-17.webp",
  address: {
    street: "Potočiště 21 - Odrava",
    city: "Cheb",
    zip: "350 02",
    region: "Karlovarský kraj",
    country: "Česká republika"
  },
  url: "https://hansbau.cz",
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
    priority: "hlavní",
    shortDesc: "Kompletní proměna bytu na klíč od vyklizení a bourání po finální předání. Žádné starosti se sháněním 5 různých řemeslníků. Pevná cena a termín.",
    fullDesc: "Plánujete rekonstrukci panelového nebo cihlového bytu v Karlovarském kraji? HANSBAU se postará o celou proměnu vašeho domova. Zajistíme vyklizení, bourací práce, novou elektroinstalaci, vodoinstalaci, sádrokartony, omítky, obklady, podlahy i montáž sanitární keramiky a dveří.",
    iconName: "Home",
    image: "/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp",
    galleryImages: [
      "/images/nove/obyvak-po-rekonstrukci.webp",
      "/images/nove/loznice-po-rekonstrukci.webp",
      "/images/nove/chodba-po-rekonstrukci.webp",
      "/images/nove/pokoj-po-rekonstrukci.webp"
    ],
    features: [
      "Kompletní realizace na klíč od A do Z",
      "Pevná smlouva o dílo a garantovaný položkový rozpočet",
      "Koordinace všech profesí (zedníci, instalatéři, elektrikáři, podlaháři)",
      "Pravidelný kontrolní den a fotodokumentace postupu",
      "Každodenní úklid a ekologická likvidace stavebního odpadu"
    ],
    benefits: [
      "Nemusíte shánět a koordinovat 5 různých part řemeslníků",
      "Záruka na celé dílo od jedné prověřené české firmy",
      "Přesný rozpočet bez skrytých víceprací a nepříjemných překvapení",
      "Bohaté zkušenosti s panelovými i cihlovými byty v celém kraji"
    ],
    included: [
      "Bezplatná osobní prohlídka a přesné zaměření bytu",
      "Příprava detailního položkového rozpočtu ZDARMA",
      "Ochrana společných prostor domu a výtahu",
      "Bourací a vyklízecí práce včetně odvozu suti na skládku",
      "Nové rozvody elektřiny, vody, odpadů a topení s revizemi",
      "Zednické práce, jádrové a štukové omítky, nivelace podlah",
      "Sádrokartonové podhledy s LED osvětlením",
      "Pokládka podlahových krytin a osazení obložek dveří",
      "Závěrečný úklid a předávací protokol"
    ],
    faq: [
      {
        q: "Jak dlouho trvá kompletní rekonstrukce bytu 2+1 nebo 3+1?",
        a: "Běžná kompletní rekonstrukce bytu trvá obvykle 4 až 8 týdnů podle rozsahu stavebních úprav, změn dispozic a technologických pauz při schnutí podlah a omítek."
      },
      {
        q: "Je zaměření a cenová nabídka opravdu nezávazná a zdarma?",
        a: "Ano, přijedeme k vám do bytu, prostor pečlivě zaměříme, prodiskutujeme vaše požadavky a vypracujeme položkový rozpočet zcela zdarma."
      },
      {
        q: "Zajistíte i odvoz suti a úklid společných prostor?",
        a: "Samozřejmě. V ceně je vždy zahrnut kontejner, odvoz suti a každodenní úklid společných chodeb a výtahu, abychom neobtěžovali sousedy."
      }
    ]
  },
  {
    id: "rekonstrukce-bytoveho-jadra",
    slug: "rekonstrukce-bytoveho-jadra",
    title: "Rekonstrukce bytového jádra",
    priority: "priorita-2",
    shortDesc: "Výměna starého umakartového jádra za moderní zděné z pórobetonu (Ytong). Vybourání, nové rozvody, hydroizolace a obklady hotové za 10–14 dní.",
    fullDesc: "Máte v bytě staré umakartové jádro, kde hučí stoupačky a opadávají obklady? Provedeme kompletní vybourání a vyzdění nového pórobetonového jádra s novými rozvody vody, odpadů a elektřiny.",
    iconName: "Layers",
    image: "/images/Rekonstrukce-bytoveho-jadra-Cheb-Karlovarsky-kraj.webp",
    galleryImages: [
      "/images/nove/koupelna-po-rekonstrukci.webp",
      "/images/nove/as-koupelna.webp",
      "/images/nove/rekonstrukce-koupelny-cheb-detail.webp",
      "/images/1-6.webp"
    ],
    features: [
      "Rychlé vybourání a ekologická likvidace starého umakartu",
      "Vyzdění nových příček z přesných tvárnic Ytong",
      "Kompletní výměna rozvodů vody a odpadů až ke stoupačkám",
      "Nová elektroinstalace včetně proudových chráničů a ventilátorů",
      "Zvýšení akustické a tepelné izolace koupelny a WC"
    ],
    benefits: [
      "Kompletní výměna jádra hotová za 10 až 14 pracovních dní",
      "Moderní dispozice – možnost zvětšení koupelny či propojení s WC",
      "Bezpečné rozvody v mědi a plastohliníku s revizní zprávou",
      "Výrazné zvýšení hodnoty vašeho bytu"
    ],
    included: [
      "Demontáž sanity a bezpečné odpojení sítí",
      "Odvoz suti a starého umakartu",
      "Vyzdění nových stěn z Ytongu s perlinkou a lepidlem",
      "Nové rozvody vody, odpadů a elektroinstalace",
      "Sádrokartonový podhled s bodovými LED světly",
      "Hydroizolační stěrky v celé mokré zóně",
      "Obkladačské práce a osazení sanity"
    ],
    faq: [
      {
        q: "Jak dlouho rekonstrukce bytového jádra trvá?",
        a: "Kompletní proměna bytového jádra na klíč trvá zpravidla 10 až 14 pracovních dní."
      },
      {
        q: "Musím mít na rekonstrukci jádra stavební povolení?",
        a: "Pokud neměníte nosné konstrukce a zachováváte půdorys bytu, stačí ohlášení na SVJ či bytové družstvo. Rádi vám s podklady poradíme."
      }
    ]
  },
  {
    id: "rekonstrukce-koupelny",
    slug: "rekonstrukce-koupelny",
    title: "Rekonstrukce koupelny",
    priority: "priorita-2",
    shortDesc: "Designové koupelny na míru v panelácích i rodinných domech. Velkoformátové obklady, walk-in sprchové kouty s lineárními žlaby, podomítková sanita a LED niky.",
    fullDesc: "Koupelna je místem každodenní relaxace. Provádíme rekonstrukce koupelen a WC s důrazem na špičkovou hydroizolaci, dokonale rovné kamenické rohy (jolly hrany 45°) a spolehlivou instalaci sanity značek Geberit, Grohe, Hansgrohe či Ravak.",
    iconName: "Bath",
    image: "/images/nove/koupelna-po-rekonstrukci.webp",
    galleryImages: [
      "/images/nove/as-koupelna.webp",
      "/images/nove/koupelna-detail.webp",
      "/images/nove/rekonstrukce-koupelny-cheb-detail.webp",
      "/images/1-5.webp"
    ],
    features: [
      "Velkoformátové keramické obklady a dlažba",
      "Kamenické rohy (seříznutí pod úhlem 45°) bez plastových lišt",
      "Moderní bezbariérové sprchové kouty Walk-in s lineárním žlabem",
      "Závěsné toalety s podomítkovým modulem Geberit",
      "Podsvícené LED niky na šampony a kosmetiku"
    ],
    benefits: [
      "100% garance vodotěsnosti díky systémové hydroizolaci Mapei / Ceresit",
      "Pomoc s výběrem obkladů v partnerských studiích se slevou",
      "Dokonalá rovinnost ověřená laserovými nivelačními klínky",
      "Záruka na provedené řemeslné práce"
    ],
    included: [
      "Osekání starých obkladů a vyrovnání podkladu",
      "Úprava vodoinstalace a kanalizace",
      "Dvouvrstvá hydroizolační stěrka s těsnicími páskami v rozích",
      "Pokládka obkladů a dlažby včetně přesného spárování",
      "Montáž van, sprchových zástěn, baterií, umyvadel a nábytku"
    ],
    faq: [
      {
        q: "Pomůžete mi s výběrem a nákupem obkladů a sanity?",
        a: "Ano, spolupracujeme s předními koupelnovými studii v Karlovarském kraji a zajistíme vám výhodnější ceny materiálu."
      },
      {
        q: "Děláte i spádování sprchových koutů bez vaničky (walk-in)?",
        a: "Ano, na bezbariérové sprchové kouty s nerezovým odtokovým žlabem a dokonalým spádem se přímo specializujeme."
      }
    ]
  },
  {
    id: "zednicke-prace",
    slug: "zednicke-prace",
    title: "Zednické práce a povrchové úpravy",
    priority: "podpůrná",
    shortDesc: "Přesné zednické práce, bourání příček, zdění Ytongem, jádrové a štukové omítky, stěrky, nivelace podlah a pokládka dlažeb.",
    fullDesc: "Kvalitní zednické práce jsou základem každé úspěšné rekonstrukce. Provádíme veškeré zednické práce v interiérech od přípravy podkladů přes zdění příček až po finální štuky, sádrové stěrky a pokládku podlah.",
    iconName: "Hammer",
    image: "/images/nove/balthasar-byt.webp",
    galleryImages: [
      "/images/nove/loznice-2-po-rekonstrukci.webp",
      "/images/nove/pokoj-2-po-rekonstrukci.webp",
      "/images/nove/pracovna-po-rekonstrukci.webp",
      "/images/1-9.webp"
    ],
    features: [
      "Zdění příček a úpravy dispozic z tvárnic Ytong / Porofix",
      "Vnitřní jádrové a štukové omítky, moderní sádrové hladké stěrky",
      "Samonivelační stěrky pro perfektně rovné podlahy",
      "Montáž sádrokartonových podhledů a příček Knauf / Rigips",
      "Opravy prasklin, zapravení šliců po elektřině a vodě"
    ],
    benefits: [
      "Rovné zdi a pravé úhly pro snadnou montáž kuchyní a nábytku",
      "Použití certifikovaných stavebních směsí a lepidel",
      "Rychlý a čistý průběh prací"
    ],
    included: [
      "Penetrace podkladu a osazení omítníků a rohových lišt",
      "Natažení lepidla s výztužnou perlinkou proti prasklinám",
      "Finální štuk nebo broušená sádrová stěrka",
      "Vylití samonivelační podlahové stěrky"
    ],
    faq: [
      {
        q: "Děláte i menší zednické práce nebo jen celé byty?",
        a: "Přednostně realizujeme ucelené rekonstrukce bytů a koupelen, ale v rámci zakázek zajistíme jakékoliv navazující zednické úpravy."
      }
    ]
  },
  {
    id: "elektro-voda-revize",
    slug: "elektro-voda-revize",
    title: "Elektroinstalace, voda a revize",
    priority: "podpůrná",
    shortDesc: "Kompletní rozvody elektřiny v mědi, nové rozvody vody a odpadů, topenářské práce a oficiální revizní zprávy pro kolaudaci a SVJ.",
    fullDesc: "Žádná rekonstrukce se neobejde bez bezpečných rozvodů. V rámci našich rekonstrukcí bytů a jader zajišťujeme kompletní elektroinstalační a instalatérské práce přes naše ověřené a certifikované subdodavatele, včetně oficiálních revizních zpráv.",
    iconName: "ShieldCheck",
    image: "/images/nove/chodba-po-rekonstrukci.webp",
    galleryImages: [
      "/images/nove/obyvak-po-rekonstrukci.webp",
      "/images/nove/koupelna-po-rekonstrukci.webp",
      "/images/1-13.webp",
      "/images/1-14.webp"
    ],
    features: [
      "Nové rozvody elektřiny v mědi (CYKY) se samostatnými okruhy pro kuchyň a spotřebiče",
      "Nová jističová skříň s proudovými chrániči pro maximální bezpečnost",
      "Rozvody vody v plastohliníku a odpadní potrubí",
      "Příprava pro LED pásky, podhledová bodová světla a internetové rozvody",
      "Oficiální výchozí revizní zpráva elektro a tlakové zkoušky vody"
    ],
    benefits: [
      "Nemusíte shánět revizního technika ani elektrikáře zvlášť",
      "Veškeré koordinace instalací probíhají hladce podle harmonogramu",
      "Plná bezpečnost a certifikace pro pojišťovny a SVJ"
    ],
    included: [
      "Drážkování a uložení kabelů a potrubí",
      "Zapojení nového rozvaděče a osazení zásuvek a vypínačů",
      "Připojení bojlerů, praček, myček a varných desek",
      "Předání kompletní revizní dokumentace"
    ],
    faq: [
      {
        q: "Dostanu k nové elektřině platnou revizní zprávu?",
        a: "Ano, po dokončení rozvodů provede certifikovaný revizní technik kontrolu a vystaví oficiální revizní zprávu."
      }
    ]
  }
];

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
    metaDesc: "Kompletní i částečné rekonstrukce bytů a koupelen v Chebu a okolí. Sídlo máme přímo v Potočišti u Chebu. Přesná cena předem, prohlídka zdarma.",
    perex: "Hledáte spolehlivou stavební firmu na rekonstrukci bytu v Chebu? Máme centrálu přímo u Chebu (Potočiště) a nabízíme kompletní servis od bourání po klíč.",
    leadParagraph: "Jako lokální stavební firma sídlící v Potočišti u Chebu máme Cheb a přilehlé obce v malíku. Ať už plánujete rekonstrukci panelového bytu na sídlišti Skalka, Zlatém vrchu, Spáleništi, nebo renovaci historického cihlového bytu v centru Chebu, zajistíme pro vás kompletní proměnu bez stresu a s pevnou smluvní cenou.",
    specifics: [
      "Sídlo firmy přímo u Chebu – dojezd na zaměření do 15 minut",
      "Zkušenosti s panelovými domy na sídlištích Skalka, Zlatý vrch i Spáleniště",
      "Zajištění kontejneru na suť a vyřízení povolení záboru u MěÚ Cheb",
      "Pravidelný každodenní úklid společných prostor a výtahů SVJ"
    ],
    heroImage: "/images/nove/cheb-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/cheb-realizace.webp", title: "Rekonstrukce bytu Cheb", desc: "Kompletní přestavba bytu 3+1 na Skalce" },
      { src: "/images/nove/rekonstrukce-koupelny-cheb-detail.webp", title: "Rekonstrukce koupelny Cheb", desc: "Nové zděné jádro a velkoformátové obklady" },
      { src: "/images/nove/obyvak-po-rekonstrukci.webp", title: "Obývací pokoj Cheb", desc: "Nové stěrky, podlahy a LED osvětlení" }
    ],
    whyHere: [
      { title: "Jsme místní firma z Chebu", desc: "Naše zázemí v Potočišti znamená okamžitou dostupnost, nulové prostoje a osobní dohled jednatele Jana Červeňaka." },
      { title: "Garantovaný rozpočet", desc: "V Chebu známe specifika místních staveb. Cenová nabídka po zaměření je konečná a závazná." },
      { title: "Vše pod jednou střechou", desc: "Nemusíte shánět zedníka, elektrikáře ani instalatéra. Všechny profese dodáme my." }
    ],
    faq: [
      { q: "Jak rychle můžete přijet na zaměření bytu v Chebu?", a: "Jelikož sídlíme přímo u Chebu, zaměření a konzultaci můžeme provést obvykle do 24 až 48 hodin od poptávky." },
      { q: "Potřebuji na rekonstrukci bytu v Chebu stavební povolení?", a: "U běžných rekonstrukcí bez zásahu do nosných zdí stačí ohlášení na SVJ či bytové družstvo. Rádi vám pomůžeme s technickými podklady." },
      { q: "Kde v Chebu zajišťujete odvoz stavební suti?", a: "Přistavíme vlastní kontejner a suť odvážíme na certifikovanou skládku v souladu s předpisy města Cheb." }
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
    metaDesc: "Kompletní rekonstrukce bytů, koupelen a bytových jader v Karlových Varech (Rybáře, Drahovice, Stará Role, Tuhnice). Pevná cena, zaměření zdarma.",
    perex: "Profesionální rekonstrukce bytů v Karlových Varech na klíč. Realizujeme proměny panelových bytů i náročné renovace historických cihlových interiérů.",
    leadParagraph: "V Karlových Varech provádíme komplexní stavební rekonstrukce pro majitele bytů i investory. Ať už se jedná o panelové byty v Rybářích, Drahovicích, Staré Roli či Tuhnicích, nebo stylové byty v lázeňském centru s vysokými stropy, dodáme špičkové řemeslo, moderní materiály a bezchybný finální výsledek.",
    specifics: [
      "Pravidelné realizace v lokalitách Rybáře, Drahovice, Stará Role, Čankovská a Tuhnice",
      "Zkušenosti s renovací historických bytů (vysoké stropy, sádrokartony, akustika)",
      "Kompletní výměna rozvodů elektřiny, vody i topení s revizemi",
      "Dodržování nočního klidu a přísných pravidel domovních řádů SVJ"
    ],
    heroImage: "/images/nove/karlovy-vary-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/karlovy-vary-realizace.webp", title: "Rekonstrukce Karlovy Vary", desc: "Kompletní rekonstrukce interiéru bytu" },
      { src: "/images/nove/rekonstrukce-bytu-karlovy-vary-detail.webp", title: "Byt Drahovice Karlovy Vary", desc: "Nové podlahy, omítky a moderní koupelna" },
      { src: "/images/nove/koupelna-po-rekonstrukci.webp", title: "Koupelna Karlovy Vary", desc: "Walk-in sprchový kout a velkoformát" }
    ],
    whyHere: [
      { title: "Zkušenosti s náročnými interiéry", desc: "V Karlových Varech máme za sebou desítky úspěšných rekonstrukcí včetně investičních apartmánů." },
      { title: "Pevná smluvní cena", desc: "Předem vypracovaný položkový rozpočet platí. Žádná nečekaná navýšení během stavby." },
      { title: "Kompletní servis bez starostí", desc: "Nemusíte denně jezdit na stavbu. Posíláme fotoreporty a koordinujeme všechny profese." }
    ],
    faq: [
      { q: "Jak probíhá rekonstrukce bytu v Karlových Varech, pokud tam trvale nebydlím?", a: "Často rekonstruujeme byty pro klienty na dálku. Předáme si klíče, stavbu řídíme a pravidelně vám posíláme fotodokumentaci a videoreporty." },
      { q: "Zvládnete i rekonstrukci bytu s vysokými stropy v centru Varů?", a: "Ano, máme bohaté zkušenosti se snížením stropů pomocí sádrokartonových podhledů, zateplením a protihlukovou izolací." }
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
    metaDesc: "Rekonstrukce panelových bytů a bytových jader v Sokolově (sídliště Michal, Slavíčkova, Šenvert). Rychle, precizně, za pevnou cenu.",
    perex: "Hledáte spolehlivé řemeslníky pro rekonstrukci bytu či jádra v Sokolově? HANSBAU zajistí kompletní práce na klíč za 4-8 týdnů.",
    leadParagraph: "V Sokolově a přilehlém okolí (Královské Poříčí, Citice, Svatava, Březová) rekonstruujeme desítky panelových i cihlových bytů. Specializujeme se na rychlé a čisté vybourání starých umakartových jader, zdění nových koupelen z Ytongu a kompletní elektroinstalaci v mědi.",
    specifics: [
      "Skvělá znalost sokolovských panelových domů (Michal, Slavíčkova, Šenvert)",
      "Výměna bytového jádra hotová za 10 až 14 pracovních dní",
      "Nové rozvody elektřiny bez nutnosti povrchových lišt (drážkování a podhledy)",
      "Pravidelný odvoz suti a úklid chodeb"
    ],
    heroImage: "/images/nove/sokolov-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/sokolov-realizace.webp", title: "Rekonstrukce bytu Sokolov", desc: "Kompletní proměna panelového bytu 2+1 na sídlišti Michal" },
      { src: "/images/nove/loznice-po-rekonstrukci.webp", title: "Ložnice Sokolov", desc: "Hladké stěrky, nivelace a vinylová podlaha" },
      { src: "/images/nove/koupelna-detail.webp", title: "Koupelna Sokolov", desc: "Nové jádro, Geberit a moderní baterie" }
    ],
    whyHere: [
      { title: "Rychlý dojezd do Sokolova", desc: "Z naší centrály v Potočišti jsme v Sokolově za 20 minut po dálnici D6." },
      { title: "Specialisté na panelová jádra", desc: "Zbouráme umakart, vyzdíme novou koupelnu a uděláme rozvody bez zbytečných průtahů." },
      { title: "Férové ceny bez víceprací", desc: "Rozpočet schválený na začátku je neměnný." }
    ],
    faq: [
      { q: "Lze v sokolovském paneláku propojit obývák s kuchyní?", a: "U nenosných příček ano. Na místě posoudíme stavbu a případně doporučíme statické posouzení." },
      { q: "Jak dlouho trvá rekonstrukce jádra v Sokolově?", a: "Běžné panelákové jádro zvládneme vybourat a nově vyzdít a vybavit za 10–14 dní." }
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
    metaDesc: "Kompletní rekonstrukce bytů a koupelen v Aši a okolí. Vyzdění jader, sádrokartony, obklady a elektřina. Pevná cena, zaměření zdarma.",
    perex: "Spolehlivá rekonstrukce bytu v Aši a okolí. Přijedeme, prostor zaměříme a vypracujeme nezávazný rozpočet ZDARMA.",
    leadParagraph: "V Aši a celém Ašském výběžku (Hranice, Krásná, Hazlov) nabízíme komplexní stavební a řemeslné práce pro byty i rodinné domy. Od vyklizení starého nábytku a bourání přes nové instalace až po moderní designové koupelny a podlahy.",
    specifics: [
      "Dojezd do Aše do 25 minut",
      "Zkušenosti s panelovými byty i kamennými/cihlovými stavbami v Aši",
      "Kompletní servis od A do Z – nemusíte shánět řemeslníky zvlášť",
      "Záruka na provedené dílo stvrzená smlouvou"
    ],
    heroImage: "/images/nove/rekonstrukce-bytu-as-detail.webp",
    realizaceImages: [
      { src: "/images/nove/rekonstrukce-bytu-as-detail.webp", title: "Rekonstrukce bytu Aš", desc: "Celková rekonstrukce bytu 3+1 v Aši" },
      { src: "/images/nove/as-koupelna.webp", title: "Koupelna Aš", desc: "Rekonstrukce koupelny s velkoformátovým obkladem" },
      { src: "/images/nove/pokoj-po-rekonstrukci.webp", title: "Interiér Aš", desc: "Sádrokartonové podhledy a vinylové podlahy" }
    ],
    whyHere: [
      { title: "Dostupnost v Ašském výběžku", desc: "Pravidelně zde realizujeme zakázky a garantujeme spolehlivý nástup." },
      { title: "Záruka a smlouva o dílo", desc: "Žádná práce na dobré slovo. Vše je podloženo řádnou smlouvou a zárukou." }
    ],
    faq: [
      { q: "Děláte v Aši i rekonstrukce koupelen?", a: "Ano, rekonstrukce koupelen a bytových jader v Aši patří k našim nejčastějším realizacím." }
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
    metaDesc: "Kvalitní rekonstrukce bytů a koupelen ve Františkových Lázních. Sídlo máme jen 10 minut od vás. Bezplatná prohlídka a pevný rozpočet.",
    perex: "Rekonstrukce bytů a koupelen ve Františkových Lázních. Rychlý dojezd do 10 minut z Potočiště, precizní řemeslo a čistota na pracovišti.",
    leadParagraph: "Ve Františkových Lázních provádíme rekonstrukce bytů v historické zástavbě i v modernějších bytových domech. Klademe maximální důraz na čistotu, nehlučný provoz v rámci možností a špičkové řemeslné zpracování detailů.",
    specifics: [
      "Bleskový dojezd do 10 minut z naší centrály v Potočišti",
      "Citlivý přístup k lázeňské architektuře a interiérům",
      "Využití moderních velkoformátových materiálů a sádrokartonů",
      "100% dodržení termínů a rozpočtu"
    ],
    heroImage: "/images/nove/cheb-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/cheb-realizace.webp", title: "Byt Františkovy Lázně", desc: "Kompletní proměna bytu" },
      { src: "/images/nove/koupelna-po-rekonstrukci.webp", title: "Koupelna Františkovy Lázně", desc: "Designová koupelna s černými prvky" }
    ],
    whyHere: [
      { title: "Jsme vaši sousedé", desc: "Z Potočiště jsme u vás za pár minut. Okamžitá reakce na jakékoliv potřeby na stavbě." },
      { title: "Čistota a pořádek", desc: "Chráníme společné prostory a po práci vždy uklidíme." }
    ],
    faq: [
      { q: "Kdy můžete přijet na prohlídku bytu ve Fr. Lázních?", a: "Obvykle ještě dnes nebo zítra, zaměření je nezávazné a zdarma." }
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
    metaDesc: "Profesionální rekonstrukce bytů a koupelen v Mariánských Lázních. Stylové rekonstrukce interiérů, pevná cena a záruka.",
    perex: "Hledáte stavební firmu pro rekonstrukci bytu v Mariánských Lázních? Nabízíme kompletní rekonstrukce na klíč od návrhu po realizaci.",
    leadParagraph: "V Mariánských Lázních realizujeme rekonstrukce bytů pro stálé obyvatele i pro majitele rekreačních a investičních apartmánů. Zajistíme veškeré řemeslné práce, nové instalace, luxusní koupelny a moderní podlahy.",
    specifics: [
      "Dojezd z centrály do 30 minut",
      "Zkušenosti s lázeňskými apartmány a náročnými klienty",
      "Kompletní realizace na klíč včetně možnosti správy na dálku",
      "Oficiální revize a předávací protokoly"
    ],
    heroImage: "/images/nove/balthasar-byt.webp",
    realizaceImages: [
      { src: "/images/nove/balthasar-byt.webp", title: "Apartmán Mariánské Lázně", desc: "Stylová rekonstrukce apartmánu" },
      { src: "/images/nove/koupelna-po-rekonstrukci.webp", title: "Koupelna Mariánské Lázně", desc: "Luxusní velkoformátové obklady" }
    ],
    whyHere: [
      { title: "Prémiová kvalita zpracování", desc: "Dbáme na každý detail – přesné spáry, kamenické rohy a bezvadné povrchy." }
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
    metaDesc: "Kompletní i částečné rekonstrukce bytů v Ostrově (sídliště, sorela, novostavby). Pevná cena, zaměření zdarma.",
    perex: "Rekonstrukce bytů a bytových jader v Ostrově nad Ohří. Od bourání po finální malby a podlahy s pevnou smlouvou o dílo.",
    leadParagraph: "V Ostrově nad Ohří a okolí (Jáchymov, Hroznětín) provádíme kompletní rekonstrukce bytů jak v historické zástavbě ve stylu sorela, tak v klasických panelových domech. Zajistíme nové rozvody, rovné omítky, zateplené podhledy a moderní koupelny.",
    specifics: [
      "Zkušenosti se specifickou zástavbou v Ostrově (cihlové domy i paneláky)",
      "Nové rozvody elektřiny a vody s revizí",
      "Kompletní servis bez nutnosti shánět další řemeslníky"
    ],
    heroImage: "/images/nove/karlovy-vary-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/karlovy-vary-realizace.webp", title: "Byt Ostrov", desc: "Kompletní proměna bytu 3+1" }
    ],
    whyHere: [
      { title: "Spolehlivost a dodržení termínů", desc: "Nastupujeme v dohodnutý den a předáváme hotové dílo včas." }
    ],
    faq: [
      { q: "Jak probíhá kalkulace pro byt v Ostrově?", a: "Přijedeme, byt zaměříme a do 48 hodin vám zašleme položkový rozpočet zdarma." }
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
    metaDesc: "Rekonstrukce panelových bytů a jader v Chodově u Karlových Varů. Pevná cena, záruka, úklid. HANSBAU.",
    perex: "Hledáte ověřenou firmu na rekonstrukci bytu v Chodově? HANSBAU zajistí kompletní proměnu vašeho domova na klíč.",
    leadParagraph: "V Chodově u Karlových Varů a okolí (Nové Sedlo, Vintířov) rekonstruujeme panelové byty a bytová jádra. Pomůžeme vám proměnit starý panelákový byt v moderní a vzdušné bydlení.",
    specifics: [
      "Skvělá dostupnost do Chodova z D6",
      "Rychlá výměna bytových jader za 10–14 dní",
      "Pevná kalkulace předem bez skrytých poplatků"
    ],
    heroImage: "/images/nove/sokolov-realizace.webp",
    realizaceImages: [
      { src: "/images/nove/sokolov-realizace.webp", title: "Byt Chodov", desc: "Rekonstrukce panelového bytu" }
    ],
    whyHere: [
      { title: "Záruka od prověřené české firmy", desc: "Ručíme za kvalitu všech prací a materiálů." }
    ],
    faq: [
      { q: "Zvládnete i výměnu oken a dveří?", a: "V rámci kompletní rekonstrukce zajistíme i obložkové zárubně a dveře." }
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
    metaDesc: "Rekonstrukce bytů a domů v Kraslicích a okolí (Rotava, Šindelová, Bublava). Férové ceny, záruka, bezplatná kalkulace.",
    perex: "Kompletní stavební rekonstrukce bytů a koupelen v Kraslicích a Krušných horách. Pevný rozpočet a spolehliví řemeslníci.",
    leadParagraph: "V Kraslicích, Rotavě a okolních horských obcích provádíme rekonstrukce bytů, koupelen a půdních vestaveb. Zvládneme zateplení, sádrokartony, nové rozvody i pokládku odolných podlahových krytin.",
    specifics: [
      "Dojezd do Kraslic a Krušných hor",
      "Zateplení sádrokartonových podkroví a půdních prostor",
      "Kompletní realizace na klíč s revizemi"
    ],
    heroImage: "/images/nove/balthasar-byt.webp",
    realizaceImages: [
      { src: "/images/nove/balthasar-byt.webp", title: "Byt Kraslice", desc: "Kompletní rekonstrukce interiéru" }
    ],
    whyHere: [
      { title: "Kvalitní tepelná a zvuková izolace", desc: "Pro horské podmínky volíme prémiové izolační materiály." }
    ],
    faq: [
      { q: "Děláte i rekonstrukce podkrovních bytů?", a: "Ano, půdní vestavby a sádrokartony jsou naší specializací." }
    ],
    neighboringLocations: [
      { name: "Sokolov", slug: "rekonstrukce-bytu-sokolov" },
      { name: "Aš", slug: "rekonstrukce-bytu-as" },
      { name: "Karlovy Vary", slug: "rekonstrukce-bytu-karlovy-vary" }
    ]
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "realizace-1",
    title: "Kompletní rekonstrukce bytu Cheb",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Cheb (Skalka)",
    image: "/images/nove/cheb-realizace.webp",
    description: "Kompletní proměna panelového bytu 3+1: nové jádro, nivelace podlah, sádrokartony s LED osvětlením a nová elektřina."
  },
  {
    id: "realizace-2",
    title: "Designová rekonstrukce koupelny",
    category: "koupelny",
    categoryLabel: "Koupelny",
    location: "Karlovy Vary",
    image: "/images/nove/koupelna-po-rekonstrukci.webp",
    description: "Vybourání starého jádra, walk-in sprchový kout s lineárním žlabem, velkoformátový obklad a podomítkový Geberit."
  },
  {
    id: "realizace-3",
    title: "Rekonstrukce bytu Sokolov",
    category: "byty",
    categoryLabel: "Rekonstrukce bytu",
    location: "Sokolov (Michal)",
    image: "/images/nove/sokolov-realizace.webp",
    description: "Nové omítky, vinylové podlahy, úprava dispozice obývacího pokoje a propojení s kuchyňským koutem."
  },
  {
    id: "realizace-4",
    title: "Rekonstrukce koupelny a jádra Aš",
    category: "jadra",
    categoryLabel: "Bytové jádro",
    location: "Aš",
    image: "/images/nove/as-koupelna.webp",
    description: "Kompletní vyzdění nového jádra z Ytongu, precizní kamenické rohy (jolly hrany 45°) a nová elektroinstalace."
  },
  {
    id: "realizace-5",
    title: "Moderní obývací pokoj po rekonstrukci",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Cheb",
    image: "/images/nove/obyvak-po-rekonstrukci.webp",
    description: "Sádrové hladké stěrky, lepený vinyl s vysokou zátěží a snížený podhled s bodovým LED osvětlením."
  },
  {
    id: "realizace-6",
    title: "Ložnice a šatní zóna",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Karlovy Vary",
    image: "/images/nove/loznice-po-rekonstrukci.webp",
    description: "Akustická izolace stěn, nová elektroinstalace s přepínači u lůžka a nová plovoucí podlaha."
  },
  {
    id: "realizace-7",
    title: "Chodba a vstupní prostor bytu",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Františkovy Lázně",
    image: "/images/nove/chodba-po-rekonstrukci.webp",
    description: "Dlažba s vysokým stupněm otěru, vestavěný jističový rozvaděč a zapravené rozvody."
  },
  {
    id: "realizace-8",
    title: "Pracovna a pokoj pro hosty",
    category: "pokoje",
    categoryLabel: "Pokoje & Interiéry",
    location: "Mariánské Lázně",
    image: "/images/nove/pracovna-po-rekonstrukci.webp",
    description: "Sádrokartonové podhledy, nová výmalba a designové osvětlení."
  }
];

export const reviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Petr Novotný",
    rating: 5,
    date: "Před 1 měsícem",
    text: "S firmou HANSBAU jsme rekonstruovali byt 3+1 v Chebu na Skalce. Pan Červeňak dodržel do koruny domluvený rozpočet i termín. Zedníci i obkladači byli precizní a po práci vždy uklidili. Jednoznačně doporučuji!",
    source: "Google",
    location: "Cheb"
  },
  {
    id: "rev-2",
    author: "Michaela Dvořáková",
    rating: 5,
    date: "Před 2 měsíci",
    text: "Rekonstrukce koupelny a bytového jádra v Karlových Varech proběhla naprosto hladce. Velkoformátový obklad je položený dokonale rovně a kamenické rohy jsou jako z katalogu. Skvělá komunikace.",
    source: "Google",
    location: "Karlovy Vary"
  },
  {
    id: "rev-3",
    author: "Tomáš Král",
    rating: 5,
    date: "Před 3 měsíci",
    text: "Oceňuji férové jednání. Poptali jsme kompletní rekonstrukci bytu v Sokolově. Práce byla hotová dokonce o 3 dny dříve, než byl původní plán. Profesionálové.",
    source: "Google",
    location: "Sokolov"
  },
  {
    id: "rev-4",
    author: "Ing. Vladimír Šulc",
    rating: 5,
    date: "Před 4 měsíci",
    text: "Velká spokojenost s vyzděním jádra a novou elektroinstalací v Aši. Vše včetně revize proběhlo bez zádrhelů.",
    source: "Google",
    location: "Aš"
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
    desc: "Do 48 hodin vám zašleme přehledný položkový rozpočet s garantovanou pevnou cenou."
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
    a: "Ano, kalkulace je 100% nezávazná a zdarma. Přijedeme na místo do vašeho bytu, prostor zaměříme, prodiskutujeme materiály a do 48 hodin vám pošleme detailní položkový rozpočet."
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
