import type { ReactNode } from 'react';

type ActionLinkProps = {
  href: string;
  /** Background utility for the button surface, plus any spacing tweaks. */
  className: string;
  /** Blue shadow and yellow focus ring: ink ones disappear on dark sections. */
  onDark?: boolean;
  /** Saves the target under this file name instead of navigating to it. */
  download?: string;
  children: ReactNode;
};

/** Bordered neobrutalist call to action with a hard offset shadow. */
export function ActionLink({
  href,
  className,
  onDark = false,
  download,
  children,
}: ActionLinkProps) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      download={download}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center gap-2.5 rounded-lg border-3 border-ink px-5 py-3 text-base leading-none font-bold whitespace-nowrap text-ink shadow-brutal transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm focus-visible:outline-3 focus-visible:outline-offset-3 ${
        onDark
          ? 'shadow-blue focus-visible:outline-yellow'
          : 'focus-visible:outline-ink'
      } ${className}`}
    >
      {children}
    </a>
  );
}
