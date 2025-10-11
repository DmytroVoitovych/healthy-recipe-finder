import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook for managing URL-synced filter state with browser history support.
 *
 * @description
 * This hook synchronizes filter state with URL search parameters, enabling:
 * - Shareable URLs with filter state
 * - Browser back/forward navigation support
 * - Automatic cleanup of pagination when filters change
 *
 * @param {Record<string, string>} fields - Initial filter configuration object
 *
 * @returns {Object} Hook interface
 * @returns {Record<string, string>} filters - Current filter state
 * @returns {Function} updateFilter - Updates a single filter and syncs with URL
 * @returns {Function} clearFilter - Clears a single filter and removes from URL
 *
 * @example
 * ```tsx
 * const { filters, updateFilter, clearFilter } = useFilterBasedOnChange({
 *   search: params?.search || "",
 *   category: params?.category || "",
 * });
 *
 * // Update filter
 * updateFilter('search', 'pizza');
 *
 * // Clear filter
 * clearFilter('category');
 * ```
 *
 * @remarks
 * - Automatically removes 'page' parameter when filters change
 * - Manages scroll restoration (manual during popstate)
 * - Syncs with external field changes (e.g., server-side params)
 */

export const useFilterBasedOnChange = (fields: Record<string, string>) => {
  const [filters, setFilters] = useState(fields);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePopState = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newFilters = { ...fields };

    if (!urlParams.size) for (const key in newFilters) newFilters[key] = "";

    for (const [key, value] of urlParams.entries()) {
      if (key in newFilters) newFilters[key] = value;
    }

    setFilters(newFilters);
  };

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      history.scrollRestoration = "auto";
    };
  }, []);

  const urlChangeAction = (key: "set" | "delete", field: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params[key](field, value);
    else params.delete(field);

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateFilter = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));

    urlChangeAction("set", filterName, value);
  };

  const clearFilter = (filterName: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: "",
    }));

    urlChangeAction("delete", filterName, "");
  };

  useEffect(() => {
    // for external changes to fields
    setFilters(fields);
  }, [fields]);

  return {
    filters,
    updateFilter,
    clearFilter,
  };
};
