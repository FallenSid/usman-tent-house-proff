import {
  CalendarCheck,
  ClipboardList,
  Eye,
  Flower2,
  Gem,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Layers,
  Landmark,
  Phone,
  ShieldCheck,
  Tent,
  Wand2,
  type LucideIcon,
} from "lucide-react";

/** Single-page navigation. `id` must match the section id in the page. */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Our Work" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = [
  "home",
  "about",
  "services",
  "work",
  "gallery",
  "collection",
  "why-us",
  "process",
  "faq",
  "contact",
  "location",
] as const;

/** Quick service highlights shown directly under the hero. */
export const highlights: { icon: LucideIcon; title: string; subtitle: string }[] = [
  { icon: Tent, title: "Tent Arrangements", subtitle: "Spacious & Elegant" },
  { icon: Flower2, title: "Wedding Decoration", subtitle: "Rich & Traditional" },
  { icon: Landmark, title: "Stage & Mandap", subtitle: "Beautiful & Custom" },
  { icon: Lightbulb, title: "Lighting & Sound", subtitle: "Modern & Reliable" },
];

export const whyChooseUs: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ClipboardList,
    title: "Complete event arrangements",
    text: "Tent, stage, florals, lighting, seating and sound coordinated by one team.",
  },
  {
    icon: Layers,
    title: "A wide range of services",
    text: "From grand weddings to birthday celebrations, choose only what your event needs.",
  },
  {
    icon: Wand2,
    title: "Made around you",
    text: "Themes, colours and layouts are customised to your family, venue and budget.",
  },
  {
    icon: Eye,
    title: "Attention to detail",
    text: "Drapes, flowers and lighting are finished carefully so the setup looks refined.",
  },
  {
    icon: ShieldCheck,
    title: "Professional execution",
    text: "Planned set-up, tidy work and timely arrangements on the day of your event.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-focused service",
    text: "Easy to reach on call or WhatsApp, and ready to listen before we plan.",
  },
];

export const processSteps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Phone, title: "Contact Us", text: "Call, WhatsApp or send the enquiry form with your event details." },
  { icon: Handshake, title: "Discuss Your Requirements", text: "We understand your ideas, venue, guest count and budget." },
  { icon: CalendarCheck, title: "Plan Your Event", text: "We agree the arrangements, designs and schedule together." },
  { icon: Gem, title: "Setup & Execution", text: "Our team sets everything up so you can simply enjoy the occasion." },
];

export const aboutHighlights = [
  "Tent, décor, lighting and sound from one team",
  "Arrangements customised to your event and budget",
  "Based in Chaubepur, Kanpur",
  "Reach us by WhatsApp, phone or enquiry form",
];

export const eventTypes = [
  "Wedding",
  "Engagement",
  "Reception",
  "Birthday",
  "Anniversary",
  "Religious / Puja",
  "Corporate Event",
  "Other",
];

export const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
  "Not sure yet",
];
