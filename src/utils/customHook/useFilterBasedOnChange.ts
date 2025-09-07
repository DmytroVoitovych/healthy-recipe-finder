import { useState } from "react";

export const useFilterBasedOnChange = (fields: Record<string, string | number>) => {
  const [filters, setFilters] = useState(fields);

  const updateFilter = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilter = (filterName: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: fields[filterName],
    }));
  };

  return {
    filters,
    updateFilter,
    clearFilter,
  };
};
