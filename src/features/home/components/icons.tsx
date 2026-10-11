import type { SVGProps } from 'react';
import instagramLogo from '@/assets/icons/brands/instagram.svg';
import linkedinLogo from '@/assets/icons/brands/linkedin.svg';
import whatsappLogo from '@/assets/icons/brands/whatsapp.svg';
import envelope from '@/assets/icons/emoji/envelope.svg';
import gear from '@/assets/icons/emoji/gear.svg';
import keyboard from '@/assets/icons/emoji/keyboard.svg';
import openBook from '@/assets/icons/emoji/open-book.svg';
import openFileFolder from '@/assets/icons/emoji/open-file-folder.svg';
import pageFacingUp from '@/assets/icons/emoji/page-facing-up.svg';
import puzzlePiece from '@/assets/icons/emoji/puzzle-piece.svg';
import rocket from '@/assets/icons/emoji/rocket.svg';
import sparkles from '@/assets/icons/emoji/sparkles.svg';
import spiralCalendar from '@/assets/icons/emoji/spiral-calendar.svg';
import wavingHand from '@/assets/icons/emoji/waving-hand.svg';

type IconProps = { className?: string };

// Full-colour Fluent Emoji (Microsoft, MIT) and brand logos (skill-icons, MIT;
// WhatsApp from the Iconify "logos" set, CC0). Every icon sits beside a visible or accessible label, so
// it is decorative.
function ColorIcon({ src, className }: IconProps & { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      className={`shrink-0 ${className ?? ''}`}
    />
  );
}

export function PlayIcon(props: IconProps) {
  return <ColorIcon src={openFileFolder} {...props} />;
}

export function RocketIcon(props: IconProps) {
  return <ColorIcon src={rocket} {...props} />;
}

export function MailIcon(props: IconProps) {
  return <ColorIcon src={envelope} {...props} />;
}

export function DownloadIcon(props: IconProps) {
  return <ColorIcon src={pageFacingUp} {...props} />;
}

export function CalendarIcon(props: IconProps) {
  return <ColorIcon src={spiralCalendar} {...props} />;
}

export function LinkedInIcon(props: IconProps) {
  return <ColorIcon src={linkedinLogo} {...props} />;
}

export function InstagramIcon(props: IconProps) {
  return <ColorIcon src={instagramLogo} {...props} />;
}

export function WhatsAppIcon(props: IconProps) {
  return <ColorIcon src={whatsappLogo} {...props} />;
}

export function CodeMarkIcon(props: IconProps) {
  return <ColorIcon src={keyboard} {...props} />;
}

export function BookIcon(props: IconProps) {
  return <ColorIcon src={openBook} {...props} />;
}

export function GearIcon(props: IconProps) {
  return <ColorIcon src={gear} {...props} />;
}

export function PuzzleIcon(props: IconProps) {
  return <ColorIcon src={puzzlePiece} {...props} />;
}

export function ChatIcon(props: IconProps) {
  return <ColorIcon src={wavingHand} {...props} />;
}

export function SparkleIcon(props: IconProps) {
  return <ColorIcon src={sparkles} {...props} />;
}

// Directional arrows stay plain strokes in the text colour.
const arrowProps = {
  'aria-hidden': true,
  focusable: false,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...arrowProps} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...arrowProps} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
