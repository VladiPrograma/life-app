import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendContactRequest } from '@/features/home/api/send-contact-request';
import { ActionLink } from '@/features/home/components/action-link';
import {
  ArrowRightIcon,
  CalendarIcon,
  ChatIcon,
  MailIcon,
  PuzzleIcon,
  RocketIcon,
  SparkleIcon,
} from '@/features/home/components/icons';
import { SocialLinks } from '@/features/home/components/social-links';
import { emailHref, meetingHref, profile } from '@/features/home/home-content';
import {
  contactFormSchema,
  type ContactFormInput,
  type ContactRequest,
} from '@/features/home/schemas/contact-form-schema';
import { launchConfetti } from '@/features/home/utils/launch-confetti';

const emptyForm: ContactFormInput = { name: '', email: '', message: '' };

const fieldClassName =
  'w-full rounded-[10px] border-[2.5px] border-ink bg-paper px-4 py-3.5 text-[17px] leading-[1.4] text-ink shadow-brutal transition-shadow duration-150 placeholder:text-copy-lighter focus-visible:shadow-[6px_6px_0_var(--color-ink)] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue aria-invalid:bg-[#fff0f8]';

function FieldError({
  id,
  message,
}: {
  id: string;
  message: string | undefined;
}) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-2.5 inline-flex rounded-[4px] border-2 border-ink bg-pink px-2 py-1 font-mono text-[12px] leading-none font-black text-ink uppercase"
    >
      {message}
    </p>
  );
}

const reasons = [
  {
    Icon: PuzzleIcon,
    title: 'Stuck on a problem?',
    text: 'Let’s look at it together, with no strings attached.',
    className: 'shadow-[3px_3px_0_var(--color-yellow)]',
  },
  {
    Icon: RocketIcon,
    title: 'Building something?',
    text: 'I’d love to hear about it, and even join your project.',
    className: 'shadow-[3px_3px_0_var(--color-pink)]',
  },
  {
    Icon: ChatIcon,
    title: 'Just want to talk?',
    text: 'That’s more than enough. Say hi, I’m all ears.',
    className: 'shadow-[3px_3px_0_var(--color-green)]',
  },
];

type Status = 'idle' | 'sent' | 'failed';

// Dark banner at the user's request. Elements sitting directly on it use pink
// hard shadows (ink ones disappear); the form lives in a cream window where the
// usual ink shadows apply. Labels are visually hidden to keep the
// placeholder-only look.
export function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactRequest>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: emptyForm,
  });

  async function onSubmit(request: ContactRequest) {
    try {
      await sendContactRequest(request);
      setStatus('sent');
      reset(emptyForm);
      launchConfetti();
    } catch (error) {
      console.error('[contact] request failed', error);
      setStatus('failed');
    }
  }

  function describedBy(name: keyof ContactFormInput) {
    return errors[name] ? `contact-${name}-error` : undefined;
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-4 overflow-clip border-t-[3px] border-ink bg-night text-paper"
    >
      {/* Dot grid behind the content, echoing the hero's blueprint grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-line)_2px,transparent_2px)] bg-size-[28px_28px]"
      />

      <div className="relative mx-auto grid max-w-[1360px] gap-14 px-4 py-16 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20 lg:py-24">
        <div>
          <p className="inline-flex -rotate-2 items-center gap-2 rounded-[6px] border-[3px] border-ink bg-paper px-3 py-1.5 font-mono text-[14px] leading-none font-black text-ink uppercase shadow-[4px_4px_0_var(--color-pink)]">
            <SparkleIcon className="size-4 text-pink" />
            My door is open
          </p>

          <h2
            id="contact-title"
            className="mt-7 flex flex-col items-start gap-[0.14em] font-display text-[clamp(40px,5vw,68px)] leading-[1] font-black tracking-[-0.02em]"
          >
            <span>Let’s build</span>{' '}
            <span className="-rotate-1 border-[3px] border-ink bg-yellow px-[0.14em] pt-[0.06em] pb-[0.04em] text-ink shadow-[6px_6px_0_var(--color-pink)] md:border-4">
              something cool.
            </span>
          </h2>

          <ul className="mt-9 grid gap-4 text-[17px] leading-[1.5]">
            {reasons.map(({ Icon, title, text, className }) => (
              <li key={title} className="flex items-start gap-4">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-[8px] border-[2.5px] border-ink bg-paper ${className}`}
                >
                  <Icon className="size-6" />
                </span>
                <span>
                  <strong className="font-display font-black">{title}</strong>{' '}
                  <span className="text-paper/80">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-[540px] text-[17px] leading-[1.6] text-paper/90">
            Whatever brings you here, you’ll get a real reply from a real
            person. I read every message, and I genuinely care about the people
            behind them.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ActionLink
              href={meetingHref}
              className="bg-yellow text-ink shadow-[4px_4px_0_var(--color-pink)]! hover:shadow-[2px_2px_0_var(--color-pink)]! focus-visible:outline-yellow!"
            >
              <CalendarIcon className="size-5" />
              Book a meeting
            </ActionLink>
            <ActionLink
              href={emailHref}
              className="bg-paper text-ink shadow-[4px_4px_0_var(--color-pink)]! hover:shadow-[2px_2px_0_var(--color-pink)]! focus-visible:outline-yellow!"
            >
              <MailIcon className="size-5" />
              Email Me
            </ActionLink>
          </div>
          <div className="mt-7 empty:hidden">
            <SocialLinks tone="dark" />
          </div>
        </div>

        <div className="relative lg:pt-6">
          {/* Sticker hanging off the window corner. */}
          <span
            aria-hidden="true"
            className="absolute -top-5 right-4 z-10 rotate-6 rounded-[10px] border-[3px] border-ink bg-yellow px-3 py-1.5 font-display text-[18px] leading-none font-black text-ink shadow-brutal md:right-8 lg:top-0"
          >
            say hi!
          </span>

          <div className="overflow-hidden rounded-[12px] border-[3px] border-ink bg-cream text-ink shadow-[8px_8px_0_var(--color-pink)]">
            <div className="flex items-center gap-2 border-b-[3px] border-ink bg-pink px-4 py-2.5">
              <span className="size-3.5 rounded-full border-2 border-ink bg-paper" />
              <span className="size-3.5 rounded-full border-2 border-ink bg-yellow" />
              <span className="size-3.5 rounded-full border-2 border-ink bg-green" />
              <span className="ml-2 font-mono text-[14px] leading-none font-black">
                new_message.txt
              </span>
            </div>

            <form
              noValidate
              aria-label="Contact form"
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              className="grid content-start gap-5 p-5 md:grid-cols-2 md:p-7"
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy('name')}
                  className={fieldClassName}
                  {...register('name')}
                />
                <FieldError
                  id="contact-name-error"
                  message={errors.name?.message}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy('email')}
                  className={fieldClassName}
                  {...register('email')}
                />
                <FieldError
                  id="contact-email-error"
                  message={errors.email?.message}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  rows={7}
                  placeholder="Tell me what you have in mind…"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={describedBy('message')}
                  className={`${fieldClassName} min-h-[220px] resize-y`}
                  {...register('message')}
                />
                <FieldError
                  id="contact-message-error"
                  message={errors.message?.message}
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-4 md:col-span-2">
                <p role="status" className="text-[15px] font-bold empty:hidden">
                  {status === 'sent'
                    ? 'Thanks! Your email app should open with the message ready to send.'
                    : null}
                </p>
                {status === 'failed' ? (
                  <p role="alert" className="text-[15px] font-bold">
                    Something went wrong. Please email me directly at{' '}
                    {profile.email}.
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2.5 rounded-brutal border-[2.5px] border-ink bg-yellow px-7 py-4 text-[17px] leading-none font-bold text-ink shadow-brutal transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-ink disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending…' : 'Get in touch'}
                  <ArrowRightIcon className="size-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
