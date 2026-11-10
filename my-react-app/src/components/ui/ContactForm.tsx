import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import type { EnquiryErrors, EnquiryValues } from "@/types";
import { budgetRanges, eventTypes } from "@/data/content";
import { buildWhatsAppUrl, formatEnquiryMessage } from "@/lib/whatsapp";
import { todayISO, validateEnquiry } from "@/lib/validation";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

const initialValues: EnquiryValues = {
  name: "",
  mobile: "",
  eventType: "",
  eventDate: "",
  guests: "",
  budget: "",
  message: "",
};

type Status = "idle" | "opening" | "opened";

const inputBase =
  "w-full rounded-sm border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/50 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

interface FieldProps {
  id: keyof EnquiryValues;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: { id: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => ReactNode;
}

function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  const fieldId = `field-${id}`;
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-maroon-800">
        {label}
        {required ? (
          <span className="text-maroon-600" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-soft"> (optional)</span>
        )}
      </label>
      {children({
        id: fieldId,
        className: cn(inputBase, error ? "border-red-600" : "border-sand"),
        "aria-invalid": !!error,
        "aria-describedby": describedBy,
        "aria-required": required,
      })}
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<EnquiryValues>(initialValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [waUrl, setWaUrl] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof EnquiryValues]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const url = buildWhatsAppUrl(formatEnquiryMessage(values));
    setWaUrl(url);
    setStatus("opening");
    // Open synchronously from the click so mobile browsers don't block it.
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setStatus("opened"), 900);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  const busy = status === "opening";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Event enquiry form" className="rounded-sm border border-gold/30 bg-ivory p-6 shadow-[0_30px_60px_-35px_rgba(74,13,22,0.55)] sm:p-9">
      <h3 className="font-serif text-3xl font-semibold text-maroon-800">Send an Enquiry</h3>
      <p className="mt-2 text-[15px] text-ink-soft">
        Fill in the details and we will open WhatsApp with your enquiry ready to send. Nothing is submitted until you press Send in WhatsApp.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name} className="sm:col-span-2">
          {(p) => <input {...p} name="name" type="text" autoComplete="name" value={values.name} onChange={onChange} placeholder="Your full name" />}
        </Field>

        <Field id="mobile" label="Mobile number" required error={errors.mobile} hint="10-digit Indian mobile number">
          {(p) => <input {...p} name="mobile" type="tel" inputMode="tel" autoComplete="tel" value={values.mobile} onChange={onChange} placeholder="98765 43210" />}
        </Field>

        <Field id="eventType" label="Event type" required error={errors.eventType}>
          {(p) => (
            <select {...p} name="eventType" value={values.eventType} onChange={onChange}>
              <option value="">Select event type</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id="eventDate" label="Event date" required error={errors.eventDate}>
          {(p) => <input {...p} name="eventDate" type="date" min={todayISO()} value={values.eventDate} onChange={onChange} />}
        </Field>

        <Field id="guests" label="Approximate guests" error={errors.guests}>
          {(p) => <input {...p} name="guests" type="number" inputMode="numeric" min={1} value={values.guests} onChange={onChange} placeholder="e.g. 300" />}
        </Field>

        <Field id="budget" label="Budget range" error={errors.budget} className="sm:col-span-2">
          {(p) => (
            <select {...p} name="budget" value={values.budget} onChange={onChange}>
              <option value="">Prefer not to say</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id="message" label="Additional requirements" error={errors.message} className="sm:col-span-2">
          {(p) => (
            <textarea {...p} name="message" rows={4} value={values.message} onChange={onChange} placeholder="Venue, theme, colours, services you need…" className={cn(p.className, "resize-y")} />
          )}
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="whatsapp" size="lg" disabled={busy} className="w-full sm:w-auto">
          {busy ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Opening WhatsApp…
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" /> Send via WhatsApp
            </>
          )}
        </Button>
        <p className="text-sm text-ink-soft">Prefer to talk? Use the Call Now button above.</p>
      </div>

      <div aria-live="polite" className="mt-5">
        {status === "opened" && (
          <div className="flex gap-3 rounded-sm border border-whatsapp/40 bg-whatsapp/10 p-4 text-sm text-ink">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-whatsapp" aria-hidden="true" />
            <div>
              <p className="font-medium">WhatsApp should now be open with your enquiry.</p>
              <p className="mt-1 text-ink-soft">
                Your enquiry has <strong>not</strong> been sent yet — please press Send in WhatsApp.{" "}
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-whatsapp-dark underline underline-offset-2">
                  Didn’t open? Tap here.
                </a>{" "}
                <button type="button" onClick={reset} className="font-medium text-maroon-700 underline underline-offset-2">
                  Start a new enquiry
                </button>
              </p>
            </div>
          </div>
        )}
        {Object.keys(errors).some((k) => errors[k as keyof EnquiryValues]) && (
          <p role="alert" className="text-sm text-red-700">
            Please correct the highlighted fields and try again.
          </p>
        )}
      </div>
    </form>
  );
}
