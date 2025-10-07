import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import Link from "next/link";
import { SmoothPaginationScroll } from "./SmoothPaginationScroll";
import styles from "./paginationComponent.module.css";
import { useSimplePagination } from "@/utils/customHook/useSimplePagination";
import { ButtonAsLink } from "../shared/ButtonAsLink";

const MAX_PAG_LINK = 7;
const leftArrow = "←";
const rightArrow = "→";

interface PaginationProps {
  pagination: RecipeResponse["pagination"];
}

export const PaginationComponent = ({ pagination }: PaginationProps) => {
  const { page: currentPage, totalPages, hasPrev, hasNext } = pagination;

  const visibleButtons = Math.min(MAX_PAG_LINK, totalPages);
  const firstBased = currentPage + 1;
  const pageNumbers = useSimplePagination(firstBased, totalPages, visibleButtons);

  return (
    <nav aria-label="Pagination Navigation" className={styles.pagination}>
      <SmoothPaginationScroll page={currentPage} />
      {hasPrev && (
        <ButtonAsLink
          content={leftArrow}
          link={firstBased === 1 ? "/recipes" : `/recipes?page=${firstBased - 1}`}
          stylesClass={styles.arrowBtn}
          prefetch={false}
          scroll={false}
          aria-label="Go to previous page"
          rel="prev"
        />
      )}
      <ul>
        {pageNumbers.map((pageNum, i) => {
          const hasGap = i > 0 && pageNum - pageNumbers[i - 1] > 1;
          return (
            <li key={pageNum} {...(hasGap && { "data-page-gap": "" })}>
              <Link
                href={pageNum === 1 ? "/recipes" : `/recipes?page=${pageNum}`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === firstBased ? "page" : undefined}
                prefetch={false}
                scroll={false}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}
      </ul>
      {hasNext && (
        <ButtonAsLink
          content={rightArrow}
          link={`/recipes?page=${firstBased + 1}`}
          stylesClass={styles.arrowBtn}
          prefetch={false}
          scroll={false}
          aria-label="Go to next page"
          rel="next"
        />
      )}
    </nav>
  );
};
