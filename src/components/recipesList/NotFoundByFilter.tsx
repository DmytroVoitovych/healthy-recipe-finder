import styles from "./NotFoundByFilter.module.css";
import { ButtonAsLink } from "../shared/ButtonAsLink";
import { SearchFeatureIco } from "@/utils/svgimports";

export const NotFoundByFilter = () => (
  <div role="status" aria-live="polite" className={styles.noResults}>
    <SearchFeatureIco width="64" height="64" className={styles.noResultsIcon} />

    <>
      <h2 className="text-preset-2">No recipes found</h2>
      <p className="text-preset-6">Try adjusting your filters or search term</p>
      <ButtonAsLink
        link="/recipes"
        replace={true}
        stylesClass={styles.clearFiltersButton}
        aria-label="Clear all active filters"
        content={"Clear all filters"}
      />
    </>

    <>
      <h2 className="text-preset-2">No recipes available</h2>
      <p className="text-preset-6">Check back later for new recipes</p>
    </>
  </div>
);
