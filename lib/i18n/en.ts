import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    siteName: "Chen Media",
    home: {
      title: "Chen Media | Event photography and film for businesses",
      description:
        "Chen Media shoots photo and film at conferences, launches and company events. You get content you will actually use.",
    },
    photo: {
      title: "Event photography | Chen Media",
      description:
        "Event photographer for businesses. We build a shot list from your schedule, work discreetly and deliver a fully edited selection.",
    },
    film: {
      title: "Event film | Chen Media",
      description:
        "Event films with high production quality. From pitch nights to launches, cut to keep people watching.",
    },
    projects: {
      title: "Projects | Chen Media",
      description:
        "A selection of our work in event photography and film, from Snap Session for Snapchat to launches and client events.",
    },
    news: {
      title: "News | Chen Media",
      description:
        "News from Chen Media. Projects, lessons and things we picked up along the way.",
    },
  },
  nav: {
    home: "Home",
    services: "Our services",
    photo: "Event photo",
    photoSub: "Conferences, launches and company events",
    film: "Event film",
    filmSub: "Main film and short cuts for social media",
    projects: "Projects",
    news: "News",
    about: "About",
    contact: "Contact",
    cta: "Request a quote",
  },
  hero: {
    badge: "Available for events in Oslo and across Norway",
    title: "Your event, seen through the eyes of a",
    titleAccent: "photographer.",
    lead: "Event photographer for conferences, launches and company events. Photo and film since 2020. An edited first selection in your hands the next day.",
    ctaPrimary: "Request a no obligation quote",
    ctaSecondary: "See the work",
    clientsLabel: "Solo, or with a full crew when the event calls for it",
    polaroidBadge: "Photo + film since 2020",
  },
  services: {
    label: "What we do",
    heading: "Our services",
    lead: "Three services, one goal: your event should reach further than the venue.",
    cards: [
      {
        title: "Event photography",
        body: "Sharp, atmospheric images of the whole event. The stage, the audience and everything happening between sessions. No highlight is missed.",
        points: [
          "A shot list built from your schedule",
          "Discreet presence, no flash",
          "Edited selection in high resolution",
        ],
        linkLabel: "More about event photography",
        slug: "eventfoto",
      },
      {
        title: "Event film",
        body: "A film that captures the atmosphere and carries your message. Dynamic footage, proper sound and production quality that holds up on a big screen.",
        points: [
          "Main film of one to three minutes",
          "Vertical cuts for social media",
          "Licensed music, cleared for your channels",
        ],
        linkLabel: "More about event film",
        slug: "eventfilm",
      },
      {
        title: "Photo and film together",
        body: "Big event? Then we shoot photo and film in the same production, with one briefing and one timeline. The preparation comes off your plate.",
        points: [
          "Photo and film under one roof",
          "One contact, one agreement, one timeline",
          "The same look across all content",
        ],
        linkLabel: "See the projects",
        slug: "prosjekter",
      },
    ],
  },
  liveOn: {
    label: "The value afterwards",
    heading: "Your event lives on long after the last photo is taken.",
    body: [
      "Most photographers hand over a folder of images and call it a day. We deliver content that is already usable, sorted by highlight and adapted to the channels you actually publish in.",
      "You pick what you want. Everything is ready for websites, social media and internal communication, without hours of extra work.",
    ],
    points: [
      "Edited selection, sorted by highlights",
      "Formats for web, social media and print",
      "Delivery on time",
    ],
    cta: "How we work",
  },
  work: {
    label: "Our work",
    heading: "From big brands to small breakfast seminars",
    lead: "Browse the work by event type, or see every project in one place.",
    cards: [
      { title: "Event photo", sub: "Snapchat · DNT · OBOS · JCP", slug: "eventfoto" },
      {
        title: "Event film",
        sub: "Optiver · Varner x Levi's · Nordisk Film Kino",
        slug: "eventfilm",
      },
      { title: "All projects", sub: "Photo and film in one place", slug: "prosjekter" },
    ],
    linkLabel: "See the work",
  },
  process: {
    label: "The process",
    heading: "How we work",
    // NB: the timings below are a starting point. Kai adjusts them to what he actually promises.
    lead: "Our promise is simple: every step should be easier for you than the one before it.",
    steps: [
      {
        number: "01",
        title: "Request",
        body: "Give us the date, venue and times. Then we'll tell you what we would do with it, and what it costs.",
        promise: "Kai replies personally within one business day",
      },
      {
        number: "02",
        title: "Planning",
        body: "About a month ahead we go through your schedule and build a shot list of the moments, people and details that must be secured.",
        promise: "Shot list ready before the event",
      },
      {
        number: "03",
        title: "On site",
        body: "We arrive in good time and are set up before the doors open. Then we document the event as it happens, without getting in its way.",
        promise: "Set up and ready before the first guest",
      },
      {
        number: "04",
        title: "Delivery and evaluation",
        body: "We select and edit the best of it, deliver in a private album you can easily share, and catch up for an evaluation the week after.",
        promise: "Delivery on time, every time",
      },
    ],
    note: "We never say goodbye. We say see you again.",
  },
  about: {
    label: "The photographer",
    heading: "Hi, I'm Kai Chen.",
    body: [
      "I'm the one you'll meet behind the camera. Behind me is Chen Media AS, doing event and brand photography for businesses and organisers.",
      "I believe a good event deserves more than a folder full of photos. That's why I'm building Chen Media around two things at once: the craft in front of the camera, and the content you're left with afterwards.",
      "When the event is at its busiest, I'm already in place. When everyone is waiting for the highlight, I already have it.",
    ],
    facts: [
      { value: "Photo + film", caption: "One partner for the whole delivery" },
      { value: "Oslo", caption: "Based in Oslo, working across Norway" },
      { value: "AS", caption: "Proper contracts and invoicing" },
    ],
  },
  audience: {
    label: "Who we work for",
    heading: "Who is Chen Media for?",
    lead: "We work with people who know a good event also needs to be told well afterwards.",
    groups: [
      {
        title: "Conferences and seminars",
        items: ["Conference organisers", "Industry associations", "Courses and seminars"],
      },
      {
        title: "Company events and parties",
        items: ["Company parties and anniversaries", "Internal gatherings", "Team days and culture events"],
      },
      {
        title: "Launches and brands",
        items: ["Product launches", "In store brand events", "PR and press events"],
      },
      {
        title: "Agencies and organisations",
        items: ["Event agencies and production companies", "Organisations and associations", "Cultural institutions"],
      },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Get a quote tailored to",
    headingAccent: "your event",
    lead: "Date, venue and times are enough. We'll sort out the rest in a conversation.",
    photographerRole: "Event photographer · Chen Media",
    // NB: placeholder numbers (TON's values), Kai swaps in his own
    stats: [
      { value: "90", caption: "events this year" },
      { value: "45+", caption: "happy clients" },
      { value: "6", caption: "countries" },
    ],
    agenda: {
      label: "Upcoming agenda",
      confirmedLabel: "confirmed",
      freeLabel: "available",
      freeOneLabel: "available",
      fullLabel: "fully booked",
      emptyLabel: "No dates published yet.",
      note: "The number on the right shows how many of us are still available on that date.",
      autoNote: "Public dates ahead. New bookings show up here automatically.",
    },
    form: {
      name: "Name",
      namePh: "Your name",
      org: "Organisation",
      orgPh: "Company name",
      email: "Email address",
      emailPh: "you@yourcompany.com",
      message: "Tell us about your event",
      messageHint: "(date, venue and times are enough)",
      messagePh: "E.g. annual conference on 12 March 2027, Oslo, 9am to 5pm",
      points: ["No obligation", "Reply within one business day", "Photo and film together"],
      submit: "Request a no obligation quote",
    },
    direct: "Or email directly:",
    reply: "Kai replies personally, usually within one business day.",
    emailLabel: "Email",
  },
  sticky: {
    available: "Available for your event",
    cta: "Request a quote",
  },
  footer: {
    tagline: "Event photography and film for businesses",
    rights: "All rights reserved.",
    orgLabel: "Chen Media AS",
  },
  photoPage: {
    kicker: "Event photography",
    title: "The moments, documented.",
    lead: "An event lasts a few hours. The images should last much longer and do a job in marketing, recruitment and internal communication.",
    approach: {
      label: "The approach",
      heading: "Documentary, not staged",
      body: [
        "Good event photography is rarely about asking people to smile at the camera. We work documentary style, close enough to catch what actually happens and discreet enough that nobody notices us.",
        "That means the stage and the speakers, but just as much the reactions in the room, the conversations between sessions and the details that make the event yours.",
      ],
    },
    shotlist: {
      heading: "The shot list is our insurance against chance",
      body: [
        "Before every job we turn your schedule into a concrete shot list: which moments, people and details must be secured, minute by minute. We build it with you about a month ahead.",
        "During the event it gives us room to improvise. The planned images are secured, so we can spend the rest of the time on the moments nobody could have planned.",
      ],
    },
    galleryLabel: "Work",
    galleryHeading: "From the assignments",
    caseHighlights: [
      {
        client: "Snapchat",
        project: "Snap Session Breakfast Seminar",
        kind: "Event photo",
        context:
          "Breakfast seminar for advertisers and agencies, from the first talk to the last cup of coffee.",
      },
      {
        client: "DNT",
        project: "Events",
        kind: "Event photo",
        context: "Documentation for the Norwegian Trekking Association.",
      },
      {
        client: "OBOS",
        project: "Events",
        kind: "Event photo",
        context: "Event documentation for OBOS.",
      },
      {
        client: "JCP",
        project: "Event productions",
        kind: "Event photo",
        context: "Photography for events produced by the event agency JCP.",
      },
    ],
    faq: {
      label: "Questions we often get",
      heading: "Before you ask",
      items: [
        {
          q: "How discreetly do you work during dinners and speeches?",
          a: "We shoot without flash wherever we can, move along the edges of the room and time our movements to the programme. The goal is for guests to forget we're there. That's when the best images happen.",
        },
        {
          q: "What about employees who prefer not to be photographed?",
          a: "We sort that out in advance. We agree on a practical solution, like separate zones or discreet marking, and stick to it throughout the event.",
        },
        {
          q: "What formats are the images delivered in?",
          a: "Fully edited images in high resolution for print and web, in the formats you need. We agree on formats and delivery time before the event, not after.",
        },
        {
          q: "Who owns the images, and what can we use them for?",
          a: "The usage rights are spelled out in the quote: channels, duration and scope. So you know exactly what the images can be used for.",
        },
      ],
    },
    cta: {
      heading: "Planning an event?",
      lead: "Tell us the date and venue and we'll have a quick chat about what the images should do for you.",
    },
  },
  filmPage: {
    kicker: "Event film",
    title: "Create memorable experiences with video.",
    lead: "We capture the atmosphere, the energy and the defining moments of your event, then cut it into a film that carries your message.",
    craft: {
      label: "The craft",
      heading: "More than documentation",
      body: [
        "An event film should do more than prove the event took place. We combine dynamic footage, good storytelling and high production quality, so the film brings out the atmosphere and energy in the room.",
        "The result is a film people actually watch to the end. Internally as proof of your culture, externally as a reason to join next time.",
      ],
    },
    formats: {
      heading: "One production, several channels",
      items: [
        {
          title: "Main film",
          body: "The story of your event told in one film, for websites, presentations and next year's invitation.",
        },
        {
          title: "Short cuts for social media",
          body: "Vertical cuts from the same production, ready for Instagram, TikTok and LinkedIn while the event is still fresh.",
        },
        {
          title: "Raw footage by agreement",
          body: "If you need footage for your own use, we agree on scope and rights in the quote.",
        },
      ],
    },
    galleryLabel: "Work",
    galleryHeading: "From the productions",
    caseHighlights: [
      {
        client: "Optiver",
        project: "Pitch Event",
        kind: "Event film",
        context: "A pitch night on film, with the energy in the room and the moments that defined the evening.",
      },
      {
        client: "Aktiv Eiendomsmegling",
        project: "Pitch Event",
        kind: "Event film",
        context: "A pitch night documented on film for internal and external use.",
      },
      {
        client: "Nordisk Film Kino",
        project: "Event film",
        kind: "Event film",
        context: "Film production for Nordisk Film Kino.",
      },
      {
        client: "Av-og-til",
        project: "Campaign event",
        kind: "Event film",
        context: "Film for the Norwegian moderation organisation Av-og-til.",
      },
    ],
    faq: {
      label: "Questions we often get",
      heading: "Before you ask",
      items: [
        {
          q: "How long will the film be?",
          a: "It depends on what the film needs to do. A main film usually lands between one and three minutes. Long enough to tell the story, short enough that people watch it to the end.",
        },
        {
          q: "What about music and rights?",
          a: "We use licensed music cleared for the channels the film will run in. The usage rights for the film itself are spelled out in the quote.",
        },
        {
          q: "Can we get short social media cuts quickly?",
          a: "Yes. Vertical cuts can be prioritised in the delivery, so you have content to publish while the event is still fresh.",
        },
        {
          q: "Do you need a lot of equipment and space?",
          a: "Less than you'd think. We plan camera positions in advance based on the venue and the programme, and work discreetly. The event is the main character, not the production.",
        },
      ],
    },
    cta: {
      heading: "Have a production in mind?",
      lead: "Tell us about your event and we'll suggest a setup that fits the format and the budget.",
    },
  },
  projectsPage: {
    kicker: "Projects",
    title: "The work, collected.",
    lead: "Every assignment we show, in one place. Photo and film, from small breakfast seminars to big productions.",
    filterAll: "All",
    items: [
      {
        client: "Snapchat",
        project: "Snap Session Breakfast Seminar",
        kind: "Event photo",
        context:
          "Breakfast seminar in Oslo for advertisers and agencies, documented from the first talk to the last cup of coffee.",
      },
      {
        client: "Optiver",
        project: "Pitch Event",
        kind: "Event film",
        context:
          "A pitch night on film, with the energy in the room and the moments that defined the evening.",
      },
      {
        client: "Aktiv Eiendomsmegling",
        project: "Pitch Event",
        kind: "Event film",
        context: "A pitch night documented on film for internal and external use.",
      },
      {
        client: "Varner x Levi's",
        project: "In store event",
        kind: "Event film",
        context:
          "Brand event for Levi's at Varner, with a film made for social media and internal use.",
      },
      {
        client: "Ignite Procurement x Hurtigruten",
        project: "Client event",
        kind: "Event film",
        context:
          "A client event documented on film, celebrating the partnership between two brands.",
      },
      {
        client: "Nordisk Film Kino",
        project: "Event film",
        kind: "Event film",
        context: "Film production for Nordisk Film Kino.",
      },
      {
        client: "Av-og-til",
        project: "Campaign event",
        kind: "Event film",
        context: "Film for the Norwegian moderation organisation Av-og-til.",
      },
      {
        client: "DNT",
        project: "Events",
        kind: "Event photo",
        context: "Documentation for the Norwegian Trekking Association.",
      },
      {
        client: "OBOS",
        project: "Events",
        kind: "Event photo",
        context: "Event documentation for OBOS.",
      },
      {
        client: "JCP",
        project: "Event productions",
        kind: "Event photo",
        context: "Photography for events produced by the event agency JCP.",
      },
    ],
  },
  newsPage: {
    kicker: "News",
    title: "Notes from the work.",
    lead: "News from Chen Media: projects, lessons and things we picked up along the way.",
    readLabel: "From the assignment",
    entries: [
      {
        tag: "Event photo",
        title: "Snap Session: how to document a breakfast seminar without disturbing it",
        body: "At Snapchat's breakfast seminar in Oslo we worked along the edges of the room, no flash, timed to the programme. The result was images where nobody poses and the mood is real.",
      },
      {
        tag: "Event film",
        title: "Pitch nights on film: the energy is the point",
        body: "Two pitch nights, for Optiver and Aktiv Eiendomsmegling, taught us the same thing. The film shouldn't retell the programme, it should recreate the feeling of being in the room.",
      },
      {
        tag: "Behind the camera",
        title: "Why we always build a shot list",
        body: "Your schedule becomes a concrete list of moments that must be secured. That gives us room to improvise, because the planned images are already in the bag.",
      },
    ],
  },
  ticker: { alt: "A selection of our work" },
};
