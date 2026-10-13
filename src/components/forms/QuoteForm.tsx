import { CircleAlert, CircleCheck, FlaskConical, LoaderCircle, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { PropertyType } from '@/types';

interface QuoteValues {
  name: string;
  email: string;
  phone: string;
  propertyType: PropertyType | '';
  message: string;
}

type Errors = Partial<Record<keyof QuoteValues, string>>;
type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; demo: boolean }
  | { state: 'error'; message: string };

const propertyOptions: Array<{ value: PropertyType; label: string }> = [
  { value: 'residential', label: 'Residential (home)' },
  { value: 'commercial', label: 'Commercial (business)' },
  { value: 'industrial', label: 'Industrial (factory / warehouse)' },
  { value: 'maintenance', label: 'Maintenance of an existing system' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{7,20}$/;

function validate(v: QuoteValues): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (!PHONE_RE.test(v.phone.trim()) || v.phone.replace(/\D/g, '').length < 7)
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  if (!v.propertyType) errors.propertyType = 'Please choose a property type.';
  if (v.message.trim().length > 0 && v.message.trim().length < 10)
    errors.message = 'Please add a little more detail (10+ characters) or leave this blank.';
  return errors;
}

interface QuoteFormProps {
  defaultPropertyType?: PropertyType;
  /** Called after the user dismisses the success message. */
  onDone?: () => void;
}

/**
 * Quote request form.
 * - With VITE_QUOTE_ENDPOINT set, POSTs JSON to that URL.
 * - Without it, runs in a clearly labelled demo mode and does NOT claim to have sent anything.
 */
export function QuoteForm({ defaultPropertyType, onDone }: QuoteFormProps) {
  const uid = useId();
  const demo = CONFIG.quoteEndpoint === '';
  const empty: QuoteValues = { name: '', email: '', phone: '', propertyType: defaultPropertyType ?? '', message: '' };

  const [values, setValues] = useState<QuoteValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteValues, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const fieldId = (k: keyof QuoteValues) => `${uid}-${k}`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof QuoteValues;
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };

  const onBlur = (key: keyof QuoteValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, propertyType: true, message: true });
    const firstInvalid = (Object.keys(found) as Array<keyof QuoteValues>)[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus({ state: 'submitting' });
    if (demo) {
      // Demo mode: nothing leaves the browser. Short pause so the loading state is visible.
      await new Promise((r) => window.setTimeout(r, 700));
      setStatus({ state: 'success', demo: true });
      return;
    }

    try {
      const res = await fetch(CONFIG.quoteEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setStatus({ state: 'success', demo: false });
    } catch (err) {
      setStatus({
        state: 'error',
        message:
          err instanceof Error
            ? `We couldn't send your request (${err.message}). Please try again or call us.`
            : 'We couldn’t send your request. Please try again or call us.',
      });
    }
  };

  if (status.state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-center gap-4 py-6 text-center"
      >
        <span
          className={cn(
            'flex size-14 items-center justify-center rounded-full',
            status.demo ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700',
          )}
        >
          {status.demo ? <FlaskConical aria-hidden className="size-7" /> : <CircleCheck aria-hidden className="size-7" />}
        </span>
        {status.demo ? (
          <>
            <h3 className="text-xl">Demo mode — request not sent</h3>
            <p className="max-w-sm text-sm leading-relaxed">
              Your details passed validation, but this site has no quote endpoint configured, so nothing was
              submitted. Set <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_QUOTE_ENDPOINT</code> to
              receive real requests.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl">Thank you, {values.name.split(' ')[0]}!</h3>
            <p className="max-w-sm text-sm leading-relaxed">
              Your quote request has been received. A solar specialist will contact you within one business day.
            </p>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setTouched({});
            setStatus({ state: 'idle' });
            onDone?.();
          }}
          className="mt-2 inline-flex h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-semibold text-white hover:bg-primary-700"
        >
          {onDone ? 'Close' : 'Send another request'}
        </button>
      </motion.div>
    );
  }

  const submitting = status.state === 'submitting';

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" aria-busy={submitting}>
      {demo && (
        <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-amber-800 sm:col-span-2">
          <FlaskConical aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            <strong>Demo mode:</strong> no quote endpoint is configured, so submissions are validated but not sent.
          </span>
        </p>
      )}

      <Field label="Full name" id={fieldId('name')} error={touched.name ? errors.name : undefined} required>
        <input
          id={fieldId('name')}
          name="name"
          type="text"
          autoComplete="name"
          data-autofocus
          value={values.name}
          onChange={onChange}
          onBlur={() => onBlur('name')}
          {...ariaFor(fieldId('name'), touched.name ? errors.name : undefined)}
          className={inputClass(touched.name && errors.name)}
        />
      </Field>

      <Field label="Email" id={fieldId('email')} error={touched.email ? errors.email : undefined} required>
        <input
          id={fieldId('email')}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={onChange}
          onBlur={() => onBlur('email')}
          {...ariaFor(fieldId('email'), touched.email ? errors.email : undefined)}
          className={inputClass(touched.email && errors.email)}
        />
      </Field>

      <Field label="Phone" id={fieldId('phone')} error={touched.phone ? errors.phone : undefined} required>
        <input
          id={fieldId('phone')}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={onChange}
          onBlur={() => onBlur('phone')}
          {...ariaFor(fieldId('phone'), touched.phone ? errors.phone : undefined)}
          className={inputClass(touched.phone && errors.phone)}
        />
      </Field>

      <Field
        label="Property type"
        id={fieldId('propertyType')}
        error={touched.propertyType ? errors.propertyType : undefined}
        required
      >
        <select
          id={fieldId('propertyType')}
          name="propertyType"
          value={values.propertyType}
          onChange={onChange}
          onBlur={() => onBlur('propertyType')}
          {...ariaFor(fieldId('propertyType'), touched.propertyType ? errors.propertyType : undefined)}
          className={cn(inputClass(touched.propertyType && errors.propertyType), 'appearance-none bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23445063' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Select…
          </option>
          {propertyOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        optional
        id={fieldId('message')}
        error={touched.message ? errors.message : undefined}
        className="sm:col-span-2"
      >
        <textarea
          id={fieldId('message')}
          name="message"
          rows={4}
          value={values.message}
          onChange={onChange}
          onBlur={() => onBlur('message')}
          placeholder="Tell us about your property, roof or average monthly bill."
          {...ariaFor(fieldId('message'), touched.message ? errors.message : undefined)}
          className={cn(inputClass(touched.message && errors.message), 'h-auto resize-y py-3')}
        />
      </Field>

      <AnimatePresence>
        {status.state === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700 sm:col-span-2"
          >
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {status.message}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-body/90">We’ll never share your details. Fields marked * are required.</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Request My Free Quote <Send aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function ariaFor(id: string, error: string | undefined) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  } as const;
}

function inputClass(invalid: string | false | undefined) {
  return cn(
    'h-12 w-full min-w-0 rounded-xl border bg-white px-4 text-[0.9375rem] text-navy placeholder:text-body/60',
    'transition-colors focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none',
    invalid ? 'border-red-500' : 'border-line',
  );
}

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

function Field({ label, id, error, required, optional, className, children }: FieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required && <span aria-hidden className="text-red-600"> *</span>}
        {optional && <span className="font-normal text-body/80"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <CircleAlert aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
