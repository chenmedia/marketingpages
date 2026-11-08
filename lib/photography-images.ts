import type { Locale } from "@/lib/i18n";

/*
  GENERERT fra manifestene som ble laget da bildene ble valgt ut fra
  Dropbox (Marketing Pages Assets - Folder structure). Rediger gjerne
  alt-tekst og fokuspunkt for hånd. Bildet nummer én i hver liste er cover.

  Filene ligger i public/portfolio/<kategori>/ som WebP, maks 2400 px.
*/
export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  /** Fokuspunkt [x, y] fra 0 til 1, blir object-position */
  focal: readonly [number, number];
  alt: Record<Locale, string>;
}

export const PROJECT_IMAGES: Record<string, ProjectImage[]> = {
  "awan": [
    {
      "src": "/portfolio/fashion/awan-1.webp",
      "width": 2400,
      "height": 1600,
      "focal": [
        0.5,
        0.55
      ],
      "alt": {
        "no": "Fire modeller i minimalistiske kjoler poserer på en rød benk i en industrihall",
        "en": "Four models in minimalist dresses posing on a red bench in an industrial hall"
      }
    },
    {
      "src": "/portfolio/fashion/awan-2.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.5,
        0.4
      ],
      "alt": {
        "no": "Tatovert modell i lang hvit kjole og svarte støvler foran maskiner på rødt gulv",
        "en": "Tattooed model in a long white dress and black boots beside machinery on a red floor"
      }
    },
    {
      "src": "/portfolio/fashion/awan-3.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.6,
        0.4
      ],
      "alt": {
        "no": "Modell i svart drapert kjole med belte lener seg mot stablede trepaller",
        "en": "Model in a belted black draped dress leaning on stacked wooden pallets"
      }
    }
  ],
  "ellen-aabol": [
    {
      "src": "/portfolio/studio/ellen-aabol-1.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.45,
        0.3
      ],
      "alt": {
        "no": "Smilende kvinne med rødt krøllete hår og hvit skjorte i mykt vinduslys",
        "en": "Smiling woman with red curly hair and a white shirt in soft window light"
      }
    }
  ],
  "handmadedresses": [
    {
      "src": "/portfolio/fashion/handmadedresses-1.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.48,
        0.3
      ],
      "alt": {
        "no": "Modell i hvit brudekjole med høy hals, blondedetaljer og vide gjennomsiktige ermer",
        "en": "Model in a high-neck white bridal gown with lace detailing and wide sheer sleeves"
      }
    },
    {
      "src": "/portfolio/fashion/handmadedresses-2.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.5,
        0.55
      ],
      "alt": {
        "no": "Brud i voluminøs tyllkjole står på en hagetrapp foran en glassfasade",
        "en": "Bride in a voluminous tulle gown standing on a garden staircase in front of a glass building"
      }
    },
    {
      "src": "/portfolio/fashion/handmadedresses-3.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.55,
        0.4
      ],
      "alt": {
        "no": "Modell i hvit kjole med perledetaljer snakker i telefon i en rød telefonkiosk",
        "en": "Model in a white pearl-detailed dress holding the receiver inside a red phone booth"
      }
    },
    {
      "src": "/portfolio/fashion/handmadedresses-4.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.5,
        0.35
      ],
      "alt": {
        "no": "Modell i lyseblå enskulderkjole i sateng lener seg mot en lys steinvegg",
        "en": "Model in a light-blue one-shoulder satin dress leaning against a pale stone wall"
      }
    }
  ],
  "nkf-studio": [
    {
      "src": "/portfolio/studio/nkf-studio-1.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.45,
        0.5
      ],
      "alt": {
        "no": "To utøvere i hvite drakter griper hverandre foran et rødt stoffbånd i hvitt studio",
        "en": "Two martial artists in white gis grappling in front of a flowing red fabric in a white studio"
      }
    },
    {
      "src": "/portfolio/studio/nkf-studio-2.webp",
      "width": 2048,
      "height": 2048,
      "focal": [
        0.55,
        0.45
      ],
      "alt": {
        "no": "Taekwondo-utøver med hjelm sparker høyt mot motstander i rød vest, rødt stoff i bakgrunnen",
        "en": "Taekwondo athlete in helmet throwing a high kick at an opponent in a red chest guard, red fabric behind"
      }
    },
    {
      "src": "/portfolio/studio/nkf-studio-3.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.5,
        0.5
      ],
      "alt": {
        "no": "Tre smilende karateutøvere med svart belte slår et slag synkront i hvitt studio",
        "en": "Three smiling black-belt karateka punching in unison in a white studio"
      }
    },
    {
      "src": "/portfolio/studio/nkf-studio-4.webp",
      "width": 2048,
      "height": 1366,
      "focal": [
        0.5,
        0.45
      ],
      "alt": {
        "no": "Taekwondo-utøver i luften med flyvende spark mot hvit studiobakgrunn",
        "en": "Taekwondo athlete mid-air performing a flying kick against a white studio backdrop"
      }
    }
  ],
  "nkf-talent": [
    {
      "src": "/portfolio/sport/nkf-talent-1.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.55,
        0.45
      ],
      "alt": {
        "no": "Ung utøver slår et høyt spark mot treningspartner som dekker seg på matta",
        "en": "Young athlete throwing a high kick at a training partner covering up on the mat"
      }
    },
    {
      "src": "/portfolio/sport/nkf-talent-2.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.55,
        0.45
      ],
      "alt": {
        "no": "To utøvere i svarte t-skjorter trener på garde og slag",
        "en": "Two athletes in black T-shirts drilling guard and punches"
      }
    },
    {
      "src": "/portfolio/sport/nkf-talent-3.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.5,
        0.65
      ],
      "alt": {
        "no": "Utøvere står på rekke på rød og blå matte i lys idrettshall med trepanel",
        "en": "Athletes lined up on a red and blue mat in a bright wood-panelled sports hall"
      }
    },
    {
      "src": "/portfolio/sport/nkf-talent-4.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.55,
        0.45
      ],
      "alt": {
        "no": "Trener går gjennom øvelser med tre unge utøvere foran store vinduer",
        "en": "Coach going over drills with three young athletes in front of large windows"
      }
    }
  ],
  "obos-3x3": [
    {
      "src": "/portfolio/sport/obos-3x3-1.webp",
      "width": 1365,
      "height": 2048,
      "focal": [
        0.45,
        0.55
      ],
      "alt": {
        "no": "Basketballspiller driver mot kurven forbi forsvarer på utendørsbane med OBOS-flagg",
        "en": "Basketball player driving past a defender on an outdoor court lined with OBOS flags"
      }
    },
    {
      "src": "/portfolio/sport/obos-3x3-2.webp",
      "width": 1365,
      "height": 2048,
      "focal": [
        0.5,
        0.4
      ],
      "alt": {
        "no": "Spillere strekker seg etter returen under kurven i 3x3-finale i parken",
        "en": "Players reaching for a rebound under the hoop during a 3x3 final in the park"
      }
    },
    {
      "src": "/portfolio/sport/obos-3x3-3.webp",
      "width": 1365,
      "height": 2048,
      "focal": [
        0.5,
        0.45
      ],
      "alt": {
        "no": "Lag jubler og ler sammen på banen etter en avgjørende kurv",
        "en": "Team cheering and laughing together on court after a decisive basket"
      }
    },
    {
      "src": "/portfolio/sport/obos-3x3-4.webp",
      "width": 1365,
      "height": 2048,
      "focal": [
        0.65,
        0.6
      ],
      "alt": {
        "no": "Spiller fra Asker Aliens henter ball fra ballstativet foran publikum",
        "en": "Asker Aliens player taking a ball from the ball rack in front of spectators"
      }
    }
  ],
  "shaping-new-tomorrow": [
    {
      "src": "/portfolio/fashion/shaping-new-tomorrow-1.webp",
      "width": 720,
      "height": 1080,
      "focal": [
        0.5,
        0.45
      ],
      "alt": {
        "no": "Mann i hvit langermet genser sitter på en steinsokkel i lavt kveldslys",
        "en": "Man in a white long-sleeve top sitting on a stone plinth in low evening sun"
      }
    },
    {
      "src": "/portfolio/fashion/shaping-new-tomorrow-2.webp",
      "width": 720,
      "height": 1080,
      "focal": [
        0.5,
        0.4
      ],
      "alt": {
        "no": "Mann i grønn genser og mørke bukser går ned trappen foran store steinsøyler",
        "en": "Man in a green top and dark trousers walking down steps in front of large stone columns"
      }
    }
  ],
  "via-vika": [
    {
      "src": "/portfolio/interior/via-vika-1.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.5,
        0.55
      ],
      "alt": {
        "no": "Village Bar med lilla neonskilt, trehyller med flasker og bartendere bak disken",
        "en": "Village Bar with a purple neon sign, wooden shelving full of bottles and bartenders behind the counter"
      }
    },
    {
      "src": "/portfolio/interior/via-vika-2.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.5,
        0.6
      ],
      "alt": {
        "no": "Full mathall med gjester ved lange trebord under hengende planter og lyslenker",
        "en": "Packed food hall with guests at long wooden tables under hanging plants and string lights"
      }
    },
    {
      "src": "/portfolio/interior/via-vika-3.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.55,
        0.45
      ],
      "alt": {
        "no": "Venner skåler med cocktails ved et bord under et tre med papirlykter i mathallen",
        "en": "Friends toasting with cocktails at a table beneath a tree hung with paper lanterns in the food hall"
      }
    },
    {
      "src": "/portfolio/interior/via-vika-4.webp",
      "width": 2400,
      "height": 1600,
      "focal": [
        0.5,
        0.5
      ],
      "alt": {
        "no": "To venninner deler retter fra flere kjøkken ved et fullt dekket bord",
        "en": "Two friends sharing dishes from several kitchens at a fully laden table"
      }
    }
  ],
  "vpt": [
    {
      "src": "/portfolio/sport/vpt-1.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.5,
        0.6
      ],
      "alt": {
        "no": "Padelspillere jubler med racketer i været på blå innendørsbane",
        "en": "Padel players cheering with rackets raised on a blue indoor court"
      }
    },
    {
      "src": "/portfolio/sport/vpt-2.webp",
      "width": 1365,
      "height": 2048,
      "focal": [
        0.5,
        0.5
      ],
      "alt": {
        "no": "Padelspiller slår forehand bak nettet på innendørsbane",
        "en": "Padel player hitting a forehand behind the net on an indoor court"
      }
    },
    {
      "src": "/portfolio/sport/vpt-3.webp",
      "width": 1365,
      "height": 2048,
      "focal": [
        0.5,
        0.4
      ],
      "alt": {
        "no": "Kvinnelig padelspiller i svart antrekk gjør seg klar til slag",
        "en": "Female padel player in black getting ready to hit the ball"
      }
    },
    {
      "src": "/portfolio/sport/vpt-4.webp",
      "width": 2048,
      "height": 1365,
      "focal": [
        0.5,
        0.6
      ],
      "alt": {
        "no": "Gruppebilde av alle deltakerne på padelarrangementet med racketer på banen",
        "en": "Group photo of all the padel event participants with rackets on court"
      }
    }
  ],
  "wineandbarrels": [
    {
      "src": "/portfolio/interior/wineandbarrels-1.webp",
      "width": 2400,
      "height": 1600,
      "focal": [
        0.42,
        0.5
      ],
      "alt": {
        "no": "Glassvegg med opplyste vinreoler i restaurant på Sommerro, med sjakkrutet gulv og lenestoler foran",
        "en": "Glass-fronted, backlit wine wall in a Sommerro restaurant, with a checkered floor and armchairs in front"
      }
    },
    {
      "src": "/portfolio/interior/wineandbarrels-2.webp",
      "width": 2400,
      "height": 1600,
      "focal": [
        0.55,
        0.55
      ],
      "alt": {
        "no": "Vinkjeller med flaskeholdere langs veggene, marmorbenk i midten og lysstriper i taket",
        "en": "Wine cellar with bottle racks along the walls, a marble tasting island and linear ceiling lights"
      }
    },
    {
      "src": "/portfolio/interior/wineandbarrels-3.webp",
      "width": 2400,
      "height": 1600,
      "focal": [
        0.72,
        0.45
      ],
      "alt": {
        "no": "Bar på Hotel Continental med buet marmordisk og innebygde vinskap med glassdører",
        "en": "Bar at Hotel Continental with a curved marble counter and built-in glass-door wine cabinets"
      }
    },
    {
      "src": "/portfolio/interior/wineandbarrels-4.webp",
      "width": 1600,
      "height": 2400,
      "focal": [
        0.5,
        0.45
      ],
      "alt": {
        "no": "Nærbilde av opplyst vinreol i svart metall med liggende flasker og trekasse",
        "en": "Close-up of a lit black metal wine rack with bottles lying on their sides and a wooden case"
      }
    }
  ]
};
