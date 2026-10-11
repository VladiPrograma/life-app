import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from '@/features/home/components/icons';
import { socialLinks, type SocialNetwork } from '@/features/home/home-content';

const icons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  WhatsApp: WhatsAppIcon,
} satisfies Record<SocialNetwork, unknown>;

// Ink shadows disappear on the dark contact banner, so it uses blue ones.
const toneClassNames = {
  light: 'shadow-brutal hover:shadow-brutal-sm focus-visible:outline-ink',
  dark: 'shadow-brutal shadow-blue hover:shadow-brutal-sm focus-visible:outline-yellow',
};

/** Bordered icon buttons for every social profile that has a URL. */
export function SocialLinks({
  tone = 'light',
}: {
  tone?: keyof typeof toneClassNames;
}) {
  const links = socialLinks.filter((link) => link.href !== '');
  if (links.length === 0) return null;

  return (
    <ul aria-label="Social profiles" className="flex flex-wrap gap-4">
      {links.map(({ label, href }) => {
        const Icon = icons[label];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`grid size-12 place-items-center rounded-lg border-3 border-ink bg-paper text-ink transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] focus-visible:outline-3 focus-visible:outline-offset-3 ${toneClassNames[tone]}`}
            >
              <Icon className="size-6" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
