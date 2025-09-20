import styles from "./recipesSearchInput.module.css";

export const RecipesSearchInput = () => {
  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="recipe-search" className="visually-hidden">
        Search recipes by name or ingredient…
      </label>
      <input
        type="search"
        id="recipe-search"
        name="q"
        placeholder="Search by name or ingredient…"
        aria-label="Search recipe through page content"
        className="text-preset-7"
        spellCheck="false"
      />
    </div>
  );
};
