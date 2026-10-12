import { aboutScenes, type AboutTabId } from '@/features/home/home-content';

/**
 * Player artwork side of the supplied design. The arch is a window
 * onto the scene of the selected tab. Landscape photos nearly match the
 * frame's 6:5 ratio; portrait photos are cropped vertically around the
 * position set in their scene.
 */
export function AboutShowcase({ tab }: { tab: AboutTabId }) {
  const scene = aboutScenes[tab];

  return (
    // Below `lg` the artwork comes first: it sits right above the tabs that
    // switch it, instead of changing out of sight below the long card.
    <div className="relative order-first mx-auto mb-24 flex w-full max-w-[600px] flex-col pt-8 md:mb-16 lg:order-none lg:mb-0 lg:max-w-[720px] lg:self-center lg:pt-0">
      <div className="relative aspect-[6/5] overflow-hidden rounded-t-full border-3 border-ink bg-cream shadow-brutal-lg">
        <img
          src={scene.image.src}
          alt={scene.image.alt}
          width={scene.image.width}
          height={scene.image.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: scene.image.position }}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Hangs below the frame without affecting the column height, so the
          window itself centres against the player card. */}
      <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-[70%] md:translate-y-1/2">
        <div className="rounded-md border-3 border-ink bg-cream px-3 pt-2 pb-2.5 text-ink shadow-brutal-lg">
          <p className="font-mono text-xs leading-none font-black uppercase">
            Equipment:
          </p>
          <ul className="mt-2 flex gap-2.5">
            {scene.equipment.map((item) => (
              <li key={item.label} className="flex flex-col items-center">
                <div
                  className={`size-[clamp(56px,6vw,78px)] overflow-hidden rounded-sm border-3 border-ink ${item.className}`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="size-full object-contain p-[14%]"
                  />
                </div>
                <span className="mt-1 font-mono text-xs leading-none font-black uppercase">
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
