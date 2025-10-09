import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const useFilterBasedOnChange = (fields: Record<string, string>) => {
  const [filters, setFilters] = useState(fields);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePopState = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newFilters = { ...fields };

    Object.keys(fields).forEach((key) => (newFilters[key] = fields[key]));

    urlParams.forEach((value, key) => {
      if (key in fields) newFilters[key] = value;
    });

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

    startTransition(() => {
      urlChangeAction("set", filterName, value);
    });
  };

  const clearFilter = (filterName: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: fields[filterName],
    }));

    startTransition(() => {
      urlChangeAction("delete", filterName, "");
    });
  };

  return {
    filters,
    updateFilter,
    clearFilter,
    isEmpty: Object.values(filters).every((val) => val === ""),
    isPending,
  };
};
