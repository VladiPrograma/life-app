import { ImagePlaceholder } from '@/features/home/components/image-placeholder';
import { aboutScenes, type AboutTabId } from '@/features/home/home-content';

/**
 * Player artwork side of the supplied design. The arch is a window
 * onto the scene of the selected tab; a scene without artwork shows a
 * placeholder. Landscape photos nearly match the frame's 6:5 ratio; portrait
 * photos are cropped vertically around the position set in their scene.
 */
export function AboutShowcase({ tab }: { tab: AboutTabId }) {
  const scene = aboutScenes[tab];

  return (
    <div className="relative mx-auto mb-24 flex w-full max-w-[600px] flex-col pt-8 md:mb-16 lg:mb-0 lg:max-w-[720px] lg:self-center lg:pt-0">
      <div className="relative">
        <div
          className={`relative aspect-[6/5] overflow-hidden rounded-t-full border-[3px] border-ink shadow-[6px_6px_0_var(--color-ink)] ${scene.backdropClassName}`}
        >
          {scene.image ? (
            <img
              src={scene.image.src}
              alt={scene.imageLabel}
              width={scene.image.width}
              height={scene.image.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: scene.image.position }}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <ImagePlaceholder
              label={scene.imageLabel}
              caption="Image coming soon"
              className="absolute inset-3 rounded-t-full md:inset-4"
            />
          )}
        </div>
      </div>

      {/* Hangs below the frame without affecting the column height, so the
          window itself centres against the player card. */}
      <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-[70%] md:translate-y-1/2">
        <div className="rounded-[6px] border-[3px] border-ink bg-cream px-3 pt-2 pb-2.5 text-ink shadow-[5px_5px_0_var(--color-ink)]">
          <p className="font-mono text-[13px] leading-none font-black uppercase">
            Equipment:
          </p>
          <ul className="mt-2 flex gap-2.5">
            {scene.equipment.map((item) => (
              <li key={item.label} className="flex flex-col items-center">
                <div
                  className={`size-[clamp(56px,6vw,78px)] overflow-hidden rounded-[4px] border-[3px] border-ink ${item.className}`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="size-full object-contain p-[14%]"
                  />
                </div>
                <span className="mt-1 font-mono text-[11px] leading-none font-black uppercase">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
