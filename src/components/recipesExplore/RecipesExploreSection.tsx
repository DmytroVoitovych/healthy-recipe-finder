import styles from './recipesExploreSection.module.css';

export const RecipesExploreSection = () => {
  return (
    <section className={styles.exploreSection}>
      <h1 className='text-preset-2'>Explore our simple, healthy recipes</h1>
      <p className='text-preset-6'>
        Discover eight quick, whole-food dishes that fit real-life schedules and
        taste amazing. Use the search bar to find a recipe by name or ingredient, or
        simply scroll the list and let something delicious catch your eye.
      </p>
    </section>
  );
};
