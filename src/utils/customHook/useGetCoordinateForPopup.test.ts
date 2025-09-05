// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock getBoundingClientRect
const mockGetBoundingClientRect = jest.fn();
Object.defineProperty(Element.prototype, "getBoundingClientRect", {
  writable: true,
  configurable: true,
  value: mockGetBoundingClientRect,
});

// Mock console.warn to avoid noise in tests
const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

import { renderHook, act } from "@testing-library/react";
import { useGetCoordinateForPopup } from "./useGetCoordinateForPopup";
import "@testing-library/jest-dom";

describe("useGetCoordinateForPopup", () => {
  let mockRect: DOMRect;

  beforeEach(() => {
    mockRect = {
      top: 100,
      left: 50,
      right: 150,
      bottom: 120,
      width: 100,
      height: 20,
      x: 50,
      y: 100,
      toJSON: jest.fn(),
    };

    mockGetBoundingClientRect.mockReturnValue(mockRect);
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  it("should return result null and coordinates are undefined initially", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup());
    
    expect(result.current.top).toBeUndefined();
    expect(result.current.left).toBeUndefined();
    expect(result.current.right).toBeUndefined();
    expect(result.current.bottom).toBeUndefined();
  });

  it("should set coordinates when setElementRect is called with valid element", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup());

    // Create mock button element
    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
    });

    // Set the ref
    act(() => {
      result.current.elementRef.current = mockButton as HTMLButtonElement;
    });

    act(() => {
      result.current.setElementRect();
    });

    expect(result.current.top).toBe(100);
    expect(result.current.left).toBe(50);
    expect(result.current.right).toBe(150);
    expect(result.current.bottom).toBe(120);
  });

  it("should toggle coordinates when called multiple times", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup());

    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
    });

    act(() => {
      result.current.elementRef.current = mockButton as HTMLButtonElement;
    });

    // First call - should set coordinates
    act(() => {
      result.current.setElementRect();
    });
    expect(result.current.top).toBe(100);

    // Second call - should clear coordinates (toggle off)
    act(() => {
      result.current.setElementRect();
    });
    expect(result.current.top).toBeUndefined();
    expect(result.current.left).toBeUndefined();
    expect(result.current.right).toBeUndefined();
    expect(result.current.bottom).toBeUndefined();
  });

  it("should force set coordinates when flagResize is true", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup());

    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
      configurable:true
    });

    act(() => {
      result.current.elementRef.current = mockButton as HTMLButtonElement;
    });

    // Set initial coordinates
    act(() => {
      result.current.setElementRect(true);
    });
    expect(result.current.top).toBe(100);

    // Update mock rect (simulate resize)
    const newMockRect = { ...mockRect, top: 200, bottom: 220 };
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => newMockRect,
    });

    // Call with flagResize - should update coordinates
    act(() => {
      result.current.setElementRect(true);
    });
    expect(result.current.top).toBe(200);
    expect(result.current.bottom).toBe(220);
  });

  it("should warn and return early when element ref is not available", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup());

    act(() => {
      result.current.setElementRect();
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith("Element ref is not attached");
    expect(result.current.top).toBeUndefined();
  });

  it("should setup ResizeObserver when targetRect is set", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup());

    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
    });

    act(() => {
      result.current.elementRef.current = mockButton as HTMLButtonElement;
    });

    act(() => {
      result.current.setElementRect();
    });

    expect(global.ResizeObserver).toHaveBeenCalled();
  });

  it("should disconnect ResizeObserver on unmount", () => {
    const mockDisconnect = jest.fn();
    (global.ResizeObserver as jest.Mock).mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: mockDisconnect,
    }));

    const { result, unmount } = renderHook(() => useGetCoordinateForPopup());

    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
    });

    act(() => {
      result.current.elementRef.current = mockButton;
    });

    act(() => {
      result.current.setElementRect();
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
