import type { Dictionary } from "./types";
import { en } from "./en";

/*
  VARIANT A: "prikk lik" TON Media.

  Dette er TON Medias egen tekst fra tonmedia.com/en, ord for ord, der bare
  navn og geografi er byttet (TON Media -> Chen Media, Michiel -> Kai,
  NL + EU -> NO + EU, nederlandske byer -> nordiske).

  ADVARSEL: Denne varianten er ment som sammenligningsgrunnlag, ikke som
  publisert tekst. To grunner:
    1. Teksten er TONs åndsverk. Publisert ordrett på et kommersielt
       nettsted er det plagiat.
    2. Flere av påstandene gjelder TON, ikke Chen Media: «2000+ events
       since 2012», «14 years», «Team of 9 photographers», og hele
       AI-verktøyet under «Social content». Chen Media har ikke dette.

  Undersidene (foto, film, prosjekter, nyheter) finnes ikke i TON-kilden,
  så de arves uendret fra variant B.
*/
export const enTon: Dictionary = {
  ...en,
  meta: {
    ...en.meta,
    siteName: "Chen Media",
    home: {
      title: "Chen Media · Event Photography & Social Content",
      description:
        "Event photographer for trade shows, conferences and festivals. 2000+ events since 2012. Photos and social posts, ready within 24 hours.",
    },
  },
  nav: {
    home: "Home",
    services: "Services",
    photo: "Trade Shows & Expos",
    photoSub: "Trade shows · Exhibitions",
    film: "Conferences",
    filmSub: "Congresses · Keynotes",
    projects: "Our work",
    news: "News",
    about: "The photographer",
    contact: "Contact",
    cta: "Request a quote",
  },
  hero: {
    badge: "Available for events across NO + EU",
    title: "Your event, seen through the eyes of a",
    titleAccent: "pro.",
    lead: "Event photographer for trade shows, conferences and festivals. 2000+ events since 2012. Photos and social posts, ready within 24 hours.",
    ctaPrimary: "Request a no-obligation proposal",
    ctaSecondary: "See the work",
    clientsLabel: "Solo or with a complete content team",
    polaroidBadge: "2000+ events since 2012",
  },
  services: {
    label: "What we do",
    heading: "What we do",
    lead: "Three services, one goal: to make your event reach as far as possible.",
    cards: [
      {
        title: "Event photo & videography",
        body: "Sharp, atmospheric images of every moment, keynotes, networking, workshops. No highlight is missed.",
        points: ["Full event coverage", "Fast editing", "Same-day delivery"],
        linkLabel: "More info",
        slug: "eventfoto",
      },
      {
        title: "Content · Teams · Coordination",
        body: "Big event? We help you draw up a detailed briefing for both photography and video, so no moment is missed. Coordinated and consistent in style.",
        points: [
          "Photo & video under one roof",
          "Preparation fully off your plate",
          "Smooth collaboration",
        ],
        linkLabel: "More info",
        slug: "eventfilm",
      },
      {
        title: "Social content",
        body: "Not just photos, but ready-to-post content for Instagram, LinkedIn and Facebook. Per tone, per platform, ready to publish.",
        points: [
          "Tailored AI captions",
          "Multiple tones & platforms",
          "Personal preview link",
        ],
        linkLabel: "More info",
        slug: "prosjekter",
      },
    ],
  },
  liveOn: {
    label: "Unique in the market",
    heading: "Your event lives on, long after the last photo.",
    body: [
      "Most photographers hand over a folder of photos. We deliver a complete social media strategy. Our tool analyses the images, writes catchy captions and prepares them per platform.",
      "You pick the posts you want to use, tweak the text to your liking and download everything in one click. No more hours spent writing.",
    ],
    points: ["AI analyses", "Writes posts", "7 posts · 3 platforms · 4 tones"],
    cta: "Learn more",
  },
  work: {
    label: "Our work",
    heading: "Our work",
    lead: "From international trade shows to intimate company parties, explore the work by event type.",
    cards: [
      { title: "Trade Shows & Expos", sub: "Trade shows · Exhibitions", slug: "eventfoto" },
      { title: "Conferences", sub: "Congresses · Keynotes", slug: "eventfilm" },
      { title: "Corporate Events", sub: "Company parties · Galas", slug: "prosjekter" },
      { title: "Festivals", sub: "Tomorrowland · Defqon.1 · more", slug: "prosjekter" },
    ],
    linkLabel: "View work",
  },
  process: {
    label: "How it works",
    heading: "How it works",
    lead: "Our promise: we make every step easier for you.",
    steps: [
      {
        number: "01",
        title: "Request",
        body: "Let us know the date, location and times, and we'll send you an obligation-free quote.",
        promise: "Quote within 24 hours",
      },
      {
        number: "02",
        title: "Plan",
        body: "Let us know the schedule and special wishes, and we'll help you create a thoughtful briefing.",
        promise: "Our own Chen tool for large, complex briefings",
      },
      {
        number: "03",
        title: "Location",
        body: "We always arrive at least 30 minutes before the start, ready to shoot and full of positive energy.",
        promise: "10 to 15 preview photos straight to your socials",
      },
      {
        number: "04",
        title: "Delivery",
        body: "Receive the images in a private album, so you can easily share them with your guests.",
        promise: "Full album within 24 to 48 hours",
      },
    ],
    note: "",
  },
  about: {
    label: "The photographer",
    heading: "Hi, I'm Kai",
    body: [
      "For more than 14 years I've been photographing events, from small company parties to international trade shows in Copenhagen, Berlin and Amsterdam.",
      "I believe a great event deserves more than a folder full of photos. That's why I'm building Chen Media: a combination of professional photography and smart content tools that truly bring your event to life.",
      "When the event is at its busiest, I'm already there. When everyone is waiting for the highlight, I've already captured it.",
    ],
    facts: [
      { value: "2000+", caption: "Events" },
      { value: "14", caption: "Years of experience" },
      { value: "NO + EU", caption: "Locations" },
    ],
  },
  audience: {
    label: "Who we work for",
    heading: "Who is Chen Media for?",
    lead: "We work with organisations that understand a great event also needs to be communicated well.",
    groups: [
      {
        title: "Trade show & expo",
        items: [
          "Trade show organisers",
          "Festival organisers",
          "Hotels & conference venues",
        ],
      },
      {
        title: "Conference",
        items: [
          "Congress & conference organisers",
          "Associations & industry bodies",
          "Healthcare & education institutions",
        ],
      },
      {
        title: "Gala & award",
        items: [
          "Celebrations & galas",
          "Foundations & charities",
          "PR & event agencies",
        ],
      },
      {
        title: "Corporate event",
        items: [
          "Corporate events",
          "Marketing & communications teams",
          "Tech companies & product launches",
        ],
      },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Get a proposal",
    headingAccent: "tailored to your event",
    lead: "Date, venue and times are enough. We'll discuss the rest afterwards.",
    photographerRole: "Event photographer · Chen Media",
    stats: [
      { value: "90", caption: "events this year" },
      { value: "45+", caption: "happy clients" },
      { value: "6", caption: "countries" },
    ],
    agenda: {
      label: "Our upcoming agenda",
      confirmedLabel: "confirmed",
      freeLabel: "free",
      freeOneLabel: "free",
      fullLabel: "fully booked",
      emptyLabel: "No dates published yet.",
      note: "There is still room for your event on these dates too.",
      autoNote:
        "All public events through December. New confirmed bookings appear here automatically.",
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
      messagePh: "date, venue and times are enough",
      points: ["No obligation", "Reply usually within 4 hours", "Photos + social content"],
      submit: "Request a no-obligation proposal",
    },
    direct: "Or email directly:",
    reply: "Kai replies personally, usually within 4 hours.",
    emailLabel: "Email",
  },
  sticky: {
    available: "Available for your event",
    cta: "Request a quote",
  },
  footer: {
    tagline: "Event Photography & Social Content",
    rights: "All rights reserved.",
    orgLabel: "Chen Media AS",
  },
  ticker: { alt: "Solo or with a complete content team" },
};
