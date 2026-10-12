import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
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
  createContactFormSchema,
  type ContactFormInput,
  type ContactRequest,
} from '@/features/home/schemas/contact-form-schema';
import { launchConfetti } from '@/features/home/utils/launch-confetti';
import { localized, useLocale } from '@/lib/i18n/locale';

const emptyForm: ContactFormInput = { name: '', email: '', message: '' };

const fieldClassName =
  'w-full rounded-lg border-3 border-ink bg-paper px-4 py-3.5 text-base leading-relaxed text-ink shadow-brutal transition-shadow duration-150 placeholder:text-ink/45 focus-visible:shadow-brutal-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink aria-invalid:bg-pink/15';

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
      className="mt-2.5 inline-flex rounded-sm border-2 border-ink bg-pink px-2 py-1 font-mono text-xs leading-none font-black text-ink uppercase"
    >
      {message}
    </p>
  );
}

const reasonIcons = [PuzzleIcon, RocketIcon, ChatIcon];

const copy = localized({
  en: {
    badge: 'My door is open',
    titleStart: 'Let’s build',
    titleHighlight: 'something cool.',
    reasons: [
      {
        title: 'Stuck on a problem?',
        text: 'Let’s look at it together, with no strings attached.',
      },
      {
        title: 'Building something?',
        text: 'I’d love to hear about it, and even join your project.',
      },
      {
        title: 'Just want to talk?',
        text: 'That’s more than enough. Say hi, I’m all ears.',
      },
    ],
    promise:
      'Whatever brings you here, you’ll get a real reply from a real person. I read every message, and I genuinely care about the people behind them.',
    bookMeeting: 'Book a meeting',
    emailMe: 'Email Me',
    sticker: 'say hi!',
    fileName: 'new_message.txt',
    form: 'Contact form',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    messagePlaceholder: 'Tell me what you have in mind…',
    sent: 'Thanks! Your email app should open with the message ready to send.',
    failed: (email: string) =>
      `Something went wrong. Please email me directly at ${email}.`,
    sending: 'Sending…',
    submit: 'Get in touch',
    validation: {
      nameRequired: 'Tell me your name.',
      emailInvalid: 'Enter a valid email address.',
      messageTooShort: 'Add a few more details (at least 20 characters).',
    },
  },
  es: {
    badge: 'Mi puerta está abierta',
    titleStart: 'Construyamos',
    titleHighlight: 'algo cool.',
    reasons: [
      {
        title: '¿Atascado con un problema?',
        text: 'Veámoslo juntos, sin ningún compromiso.',
      },
      {
        title: '¿Estás construyendo algo?',
        text: 'Me encantaría que me lo contaras, e incluso unirme a tu proyecto.',
      },
      {
        title: '¿Solo quieres hablar?',
        text: 'Con eso basta. Salúdame, soy todo oídos.',
      },
    ],
    promise:
      'Te traiga lo que te traiga por aquí, recibirás una respuesta real de una persona real. Leo todos los mensajes y me importan de verdad las personas que hay detrás.',
    bookMeeting: 'Reserva una reunión',
    emailMe: 'Escríbeme',
    sticker: '¡saluda!',
    fileName: 'nuevo_mensaje.txt',
    form: 'Formulario de contacto',
    name: 'Tu nombre',
    email: 'Tu email',
    message: 'Tu mensaje',
    messagePlaceholder: 'Cuéntame qué tienes en mente…',
    sent: '¡Gracias! Tu aplicación de correo debería abrirse con el mensaje listo para enviar.',
    failed: (email: string) =>
      `Algo ha fallado. Escríbeme directamente a ${email}.`,
    sending: 'Enviando…',
    submit: 'Contactar',
    validation: {
      nameRequired: 'Dime tu nombre.',
      emailInvalid: 'Introduce un email válido.',
      messageTooShort: 'Añade algún detalle más (al menos 20 caracteres).',
    },
  },
});

type Status = 'idle' | 'sent' | 'failed';

// Dark banner at the user's request. Elements sitting directly on it use blue
// hard shadows (ink ones disappear); the form lives in a cream window where the
// usual ink shadows apply. Labels are visually hidden to keep the
// placeholder-only look.
export function ContactSection() {
  const locale = useLocale();
  const text = copy[locale];
  const schema = useMemo(
    () => createContactFormSchema(text.validation),
    [text.validation],
  );
  const [status, setStatus] = useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactRequest>({
    resolver: zodResolver(schema),
    defaultValues: emptyForm,
  });

  async function onSubmit(request: ContactRequest) {
    try {
      await sendContactRequest(request, locale);
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
      className="relative scroll-mt-4 overflow-clip border-t-3 border-ink bg-night text-paper"
    >
      {/* Dot grid behind the content, echoing the hero's blueprint grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-line)_2px,transparent_2px)] bg-size-[28px_28px]"
      />

      <div className="relative mx-auto grid max-w-page gap-14 px-4 py-16 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20 lg:py-24">
        <div>
          <p
            data-reveal="pop"
            className="inline-flex -rotate-2 items-center gap-2 rounded-md border-3 border-ink bg-paper px-3 py-1.5 font-mono text-sm leading-none font-black text-ink uppercase shadow-brutal shadow-blue"
          >
            <SparkleIcon className="size-4" />
            {text.badge}
          </p>

          <h2
            id="contact-title"
            data-reveal="rise"
            className="mt-7 flex flex-col items-start gap-[0.14em] font-display text-h2 leading-tight font-black"
          >
            <span>{text.titleStart}</span>{' '}
            <span className="-rotate-1 border-3 border-ink bg-yellow px-[0.14em] pt-[0.06em] pb-[0.04em] text-ink shadow-brutal-lg shadow-blue md:border-4">
              {text.titleHighlight}
            </span>
          </h2>

          <ul
            data-reveal-children="rise"
            className="mt-9 grid gap-4 text-base leading-relaxed"
          >
            {text.reasons.map((reason, index) => {
              const Icon = reasonIcons[index] ?? ChatIcon;
              return (
                <li key={reason.title} className="flex items-start gap-4">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-lg border-3 border-ink bg-paper shadow-brutal-sm shadow-blue`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span>
                    <strong className="font-display font-black">
                      {reason.title}
                    </strong>{' '}
                    <span className="text-paper/80">{reason.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <p
            data-reveal="rise"
            className="mt-7 max-w-[540px] text-base leading-relaxed text-paper/80"
          >
            {text.promise}
          </p>

          <div data-reveal-children="pop" className="mt-8 flex flex-wrap gap-4">
            <ActionLink href={meetingHref} onDark className="bg-yellow">
              <CalendarIcon className="size-5" />
              {text.bookMeeting}
            </ActionLink>
            <ActionLink href={emailHref} onDark className="bg-paper">
              <MailIcon className="size-5" />
              {text.emailMe}
            </ActionLink>
          </div>
          <div className="mt-7 empty:hidden">
            <SocialLinks tone="dark" />
          </div>
        </div>

        <div data-reveal="rise" className="relative lg:pt-6">
          {/* Sticker hanging off the window corner. */}
          <span
            aria-hidden="true"
            data-reveal="pop"
            className="absolute -top-5 right-4 z-10 rotate-6 rounded-lg border-3 border-ink bg-yellow px-3 py-1.5 font-display text-lg leading-none font-black text-ink shadow-brutal md:right-8 lg:top-0"
          >
            {text.sticker}
          </span>

          <div className="overflow-hidden rounded-lg border-3 border-ink bg-cream text-ink shadow-brutal-xl shadow-blue">
            <div className="flex items-center gap-2 border-b-3 border-ink bg-sky px-4 py-2.5">
              <span className="size-3.5 rounded-full border-2 border-ink bg-paper" />
              <span className="size-3.5 rounded-full border-2 border-ink bg-yellow" />
              <span className="size-3.5 rounded-full border-2 border-ink bg-green" />
              <span className="ml-2 font-mono text-sm leading-none font-black">
                {text.fileName}
              </span>
            </div>

            <form
              noValidate
              aria-label={text.form}
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              className="grid content-start gap-5 p-5 md:grid-cols-2 md:p-7"
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  {text.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder={text.name}
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
                  {text.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder={text.email}
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
                  {text.message}
                </label>
                <textarea
                  id="contact-message"
                  rows={7}
                  placeholder={text.messagePlaceholder}
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
                <p role="status" className="text-sm font-bold empty:hidden">
                  {status === 'sent' ? text.sent : null}
                </p>
                {status === 'failed' ? (
                  <p role="alert" className="text-sm font-bold">
                    {text.failed(profile.email)}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2.5 rounded-lg border-3 border-ink bg-yellow px-7 py-4 text-base leading-none font-bold text-ink shadow-brutal transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink disabled:opacity-60"
                >
                  {isSubmitting ? text.sending : text.submit}
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
