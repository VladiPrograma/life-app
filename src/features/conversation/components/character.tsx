import styles from '@/features/conversation/components/character.module.css';

type CharacterProps = {
  kind: 'guide' | 'player';
  label: string;
  /** Replaces the placeholder once final artwork exists. */
  imageSrc?: string | undefined;
};

export function Character({ kind, label, imageSrc }: CharacterProps) {
  const isGuide = kind === 'guide';

  return (
    <div
      className={[styles.character, isGuide ? styles.guide : styles.player]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.figure}>
        {imageSrc ? (
          <img className={styles.image} src={imageSrc} alt={label} />
        ) : isGuide ? (
          <div className={styles.guideBody} role="img" aria-label={label}>
            {/* The eyes look right, towards the player. */}
            <span className={styles.eye} />
            <span className={styles.eye} />
          </div>
        ) : (
          <div className={styles.playerBody} role="img" aria-label={label}>
            <span className={styles.unknownMark} aria-hidden="true">
              ?
            </span>
          </div>
        )}
      </div>
      <span className={styles.shadow} aria-hidden="true" />
    </div>
  );
}
