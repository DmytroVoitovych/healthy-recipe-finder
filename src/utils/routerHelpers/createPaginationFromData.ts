import { Recipe } from "@/lib/api/fetchRecipesTypes";

export const createPaginationFromData = (
  offset: number,
  page: number,
  data: Recipe[]
) => {
  const total = data.length;
  const totalPages = Math.ceil(total / offset);
  const startIndex = page * offset;
  const endIndex = Math.min(startIndex + offset, total);

  const paginated = data.slice(startIndex, endIndex);

  return {paginated,totalPages,total};
};
