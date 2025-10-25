import styles from "./loading.module.css";

export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading recipes section"
      className={styles.loadingContainer}
    >
      <form className={styles.loadingForm} aria-hidden="true">
        <div className={styles.loadingFilter} />
        <div className={styles.loadingFilter} />
        <div className={styles.loadingFilter} />
        <div className={styles.loadingSearch} />
      </form>

      <div className={styles.loadingGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.loadingCard}>
            <div className={styles.loadingImage} />
            <div className={styles.loadingTitle} />
            <ul className={styles.loadingTags}>
              {Array.from({ length: 3 }).map((_, j) => (
                <li
                  key={j}
                  className={styles.loadingTag}
                  style={{ width: `${40 + j * 15}%` }}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
