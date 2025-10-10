import { renderHook, act } from "@testing-library/react";
import { useFilterBasedOnChange } from "./useFilterBasedOnChange";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation");

describe("useFilterBasedOnChange", () => {
  const mockReplace = jest.fn();
  let mockSearchParams: URLSearchParams;

  const setSearch = (search: string) => {
    const url = `http://localhost${search}`;
    window.history.pushState({}, "", url);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (usePathname as jest.Mock).mockReturnValue("/recipes");
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    Object.defineProperty(window.history, "scrollRestoration", {
      configurable: true,
      writable: true,
      value: "auto",
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialFields = {
    q: "",
    prepTime: "",
    cookTime: "",
  };

  it("should initialize filters with provided values", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));
    expect(result.current.filters).toEqual(initialFields);
  });

  it("should update filter and URL when updateFilter is called", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      result.current.updateFilter("q", "test");
    });

    expect(result.current.filters.q).toBe("test");
    expect(mockReplace).toHaveBeenCalledWith("/recipes?q=test", { scroll: false });
  });

  it("should remove parameter from URL when value is empty", () => {
    const fieldsWithValue = { ...initialFields, q: "test" };
    const { result } = renderHook(() => useFilterBasedOnChange(fieldsWithValue));

    act(() => {
      result.current.updateFilter("q", "");
    });

    expect(result.current.filters.q).toBe("");
    expect(mockReplace).toHaveBeenCalledWith("/recipes?", { scroll: false });
  });

  it("should clear filter when clearFilter is called", () => {
    const fieldsWithValue = { ...initialFields, q: "test" };
    const { result } = renderHook(() => useFilterBasedOnChange(fieldsWithValue));

    act(() => {
      result.current.clearFilter("q");
    });

    expect(result.current.filters.q).toBe("");
    expect(mockReplace).toHaveBeenCalledWith("/recipes?", { scroll: false });
  });

  it("should always remove page parameter when filter changes", () => {
    mockSearchParams.set("page", "2");
    mockSearchParams.set("q", "old");

    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      result.current.updateFilter("q", "new");
    });

    expect(mockReplace).toHaveBeenCalledWith("/recipes?q=new", { scroll: false });
    expect(mockReplace.mock.calls[0][0]).not.toContain("page=2");
  });

  it("should set scrollRestoration to manual on mount", () => {
    renderHook(() => useFilterBasedOnChange(initialFields));
    expect(window.history.scrollRestoration).toBe("manual");
  });

  it("should restore scrollRestoration on unmount", () => {
    const { unmount } = renderHook(() => useFilterBasedOnChange(initialFields));
    unmount();
    expect(window.history.scrollRestoration).toBe("auto");
  });

  it("should sync state with URL on popstate event", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      setSearch("/?q=test&prepTime=5+minutes");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.filters.q).toBe("test");
    expect(result.current.filters.prepTime).toBe("5 minutes");
  });

  it("should reset filters to defaults if parameter is missing in URL on popstate", () => {
    const fieldsWithValue = { ...initialFields, q: "test", prepTime: "10 minutes" };
    const { result } = renderHook(() => useFilterBasedOnChange(fieldsWithValue));

    act(() => {
      setSearch("/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.filters).toEqual(initialFields);
  });

  it("should ignore unknown parameters from URL", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      setSearch("/?q=test&unknownParam=value");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.filters.q).toBe("test");
    expect(result.current.filters).not.toHaveProperty("unknownParam");
  });

  it("should handle multiple filters simultaneously", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      result.current.updateFilter("q", "chicken");
    });

    act(() => {
      result.current.updateFilter("prepTime", "10 minutes");
    });

    expect(result.current.filters.q).toBe("chicken");
    expect(result.current.filters.prepTime).toBe("10 minutes");
    expect(mockReplace).toHaveBeenCalledTimes(2);
  });

  it("should handle multiple filter updates in sequence", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      result.current.updateFilter("q", "pasta");
      result.current.updateFilter("q", "pizza");
      result.current.updateFilter("q", "salad");
    });

    expect(result.current.filters.q).toBe("salad");
  });

  it("should preserve other filters when updating one", () => {
    const { result } = renderHook(() => useFilterBasedOnChange(initialFields));

    act(() => {
      result.current.updateFilter("q", "test");
      result.current.updateFilter("prepTime", "5 minutes");
    });

    expect(result.current.filters.q).toBe("test");
    expect(result.current.filters.prepTime).toBe("5 minutes");
    expect(result.current.filters.cookTime).toBe("");
  });
});
