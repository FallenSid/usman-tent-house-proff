import { business } from "@/data/business";
import type { EnquiryValues } from "@/types";

export const phoneHref = `tel:${business.phone}`;

/** Build a wa.me link, optionally with a prefilled message. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const generalEnquiryUrl = buildWhatsAppUrl(
  `Hello ${business.name}, I would like to enquire about your tent and event decoration services.`
);

export function serviceEnquiryUrl(serviceTitle: string): string {
  return buildWhatsAppUrl(
    `Hello ${business.name}, I would like to enquire about *${serviceTitle}*. Please share more details.`
  );
}

export const feedbackUrl = buildWhatsAppUrl(
  `Hello ${business.name}, I would like to share feedback about your service.`
);

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/** Turn the contact form values into a readable WhatsApp enquiry. */
export function formatEnquiryMessage(v: EnquiryValues): string {
  const lines = [
    `Hello ${business.name}, I would like to make an enquiry.`,
    "",
    `*Name:* ${v.name.trim()}`,
    `*Mobile:* ${v.mobile.trim()}`,
    `*Event type:* ${v.eventType}`,
    `*Event date:* ${formatDate(v.eventDate)}`,
  ];
  if (v.guests.trim()) lines.push(`*Approx. guests:* ${v.guests.trim()}`);
  if (v.budget) lines.push(`*Budget range:* ${v.budget}`);
  if (v.message.trim()) lines.push("", `*Requirements:*`, v.message.trim());
  lines.push("", "Please get in touch. Thank you.");
  return lines.join("\n");
}
