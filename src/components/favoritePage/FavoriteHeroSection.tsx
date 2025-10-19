import styles from './favoriteHeroSection.module.css';

export const FavoriteHeroSection = () => {
  return (
    <section className={styles.favoriteSection}>
      <h1 className="text-preset-2">Your favorites helthy recipes </h1>
      <p className='text-preset-6'>Here are your stored recipes to ensure helthy cooking to be helthy and happy!</p>
    </section>
  );
};
