import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import Link from "next/link";
import { SmoothPaginationScroll } from "./SmoothPaginationScroll";
import styles from "./paginationComponent.module.css";
import { useSimplePagination } from "@/utils/customHook/useSimplePagination";
import { ButtonAsLink } from "../shared/ButtonAsLink";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";

const MAX_PAG_LINK = 7;
const leftArrow = "←";
const rightArrow = "→";

interface PaginationProps {
  pagination: RecipeResponse["pagination"];
  params: FetchRecipesParams;
}

export const PaginationComponent = ({ pagination, params }: PaginationProps) => {
  const { page: currentPage, totalPages, hasPrev, hasNext } = pagination;

  const { page, ...rest } = params;
  const showPagination = totalPages > 1;
  const firstBased = currentPage + 1;
  const pageNumbers = useSimplePagination(firstBased, totalPages, MAX_PAG_LINK);

  const urlParams = new URLSearchParams(rest).toString();
  const buildedLink = urlParams ? `?${urlParams}` : "";
  const buildedLinkWithPage = urlParams ? `&${urlParams}` : "";

  return (
    <nav aria-label="Pagination Navigation" className={styles.pagination}>
      <SmoothPaginationScroll page={currentPage} />
      {hasPrev && (
        <ButtonAsLink
          content={leftArrow}
          link={
            firstBased === 1
              ? `/recipes${buildedLink}`
              : `/recipes?page=${firstBased - 1}${buildedLinkWithPage}`
          }
          stylesClass={styles.arrowBtn}
          prefetch={false}
          scroll={false}
          aria-label="Go to previous page"
          rel="prev"
        />
      )}
      {showPagination && (
        <ul>
          {pageNumbers.map((pageNum, i) => {
            const hasGap = i > 0 && pageNum - pageNumbers[i - 1] > 1;
            return (
              <li key={pageNum} {...(hasGap && { "data-page-gap": "" })}>
                <Link
                  href={
                    pageNum === 1
                      ? `/recipes${buildedLink}`
                      : `/recipes?page=${pageNum}${buildedLinkWithPage}`
                  }
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
      )}
      {hasNext && (
        <ButtonAsLink
          content={rightArrow}
          link={`/recipes?page=${firstBased + 1}${buildedLinkWithPage}`}
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
