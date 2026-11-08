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
  ]
};
