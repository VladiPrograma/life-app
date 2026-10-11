import type { ReactNode } from 'react';

type ActionLinkProps = {
  href: string;
  /** Background and text color utilities for the button surface. */
  className: string;
  /** Saves the target under this file name instead of navigating to it. */
  download?: string;
  children: ReactNode;
};

/** Bordered neobrutalist call to action with a hard offset shadow. */
export function ActionLink({
  href,
  className,
  download,
  children,
}: ActionLinkProps) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      download={download}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center gap-2.5 rounded-brutal border-[2.5px] border-ink px-5 py-3 text-[16px] leading-none font-bold whitespace-nowrap shadow-brutal transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-ink ${className}`}
    >
      {children}
    </a>
  );
}
