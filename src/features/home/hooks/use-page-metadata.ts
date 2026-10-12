import { useEffect } from 'react';

/**
 * Points the description and canonical link in index.html at the current
 * language. Search engines that render JavaScript read these; social previews
 * only see the static English head.
 */
export function usePageMetadata({
  description,
  canonicalUrl,
}: {
  description: string;
  canonicalUrl: string;
}) {
  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', canonicalUrl);
  }, [description, canonicalUrl]);
}
