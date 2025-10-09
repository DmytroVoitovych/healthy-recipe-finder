import styles from "./recipesSearchInput.module.css";
interface RecipesSearchInputProps {
  updateField: (filterName: string, value: string) => void;
  value: string;
}

export const RecipesSearchInput = ({
  updateField,
  value,
}: RecipesSearchInputProps) => {
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
        value={value}
        onChange={(e) => updateField("q", e.target.value)}
      />
    </div>
  );
};
