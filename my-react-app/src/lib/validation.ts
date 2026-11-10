import type { EnquiryErrors, EnquiryValues } from "@/types";

/** Normalise an Indian mobile number to 10 digits (strips +91 / 0 / spaces). */
export function normaliseMobile(raw: string): string {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return digits;
}

export function isValidMobile(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normaliseMobile(raw));
}

export function todayISO(): string {
  const d = new Date();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = v.name.trim();
  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 2) errors.name = "Name looks too short.";

  if (!v.mobile.trim()) errors.mobile = "Please enter your mobile number.";
  else if (!isValidMobile(v.mobile)) errors.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!v.eventType) errors.eventType = "Please select an event type.";

  if (!v.eventDate) errors.eventDate = "Please choose your event date.";
  else if (v.eventDate < todayISO()) errors.eventDate = "Event date cannot be in the past.";

  if (v.guests.trim()) {
    const n = Number(v.guests);
    if (!Number.isInteger(n) || n < 1) errors.guests = "Enter a whole number of guests (1 or more).";
    else if (n > 100000) errors.guests = "Please enter a realistic guest count.";
  }

  if (v.message.length > 1000) errors.message = "Please keep requirements under 1000 characters.";

  return errors;
}
