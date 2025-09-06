
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));


const mockGetBoundingClientRect = jest.fn();
Object.defineProperty(Element.prototype, "getBoundingClientRect", {
  writable: true,
  configurable: true,
  value: mockGetBoundingClientRect,
});


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

  
  it("should return undefined for coordinates initially", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup({ current: null }));

    expect(result.current.top).toBeUndefined();
    expect(result.current.left).toBeUndefined();
    expect(result.current.right).toBeUndefined();
    expect(result.current.bottom).toBeUndefined();
  });

  
  it("should set coordinates when setElementRect is called with a valid element", () => {
    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
      configurable: true, 
    });

    const { result } = renderHook(() => useGetCoordinateForPopup({ current: mockButton }));

    act(() => {
      result.current.setElementRect();
    });

    expect(result.current.top).toBe(100);
    expect(result.current.left).toBe(50);
    expect(result.current.right).toBe(150);
    expect(result.current.bottom).toBe(120);
  });

  
  it("should toggle coordinates off when setElementRect is called multiple times", () => {
    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
      configurable: true,
    });

    const { result } = renderHook(() => useGetCoordinateForPopup({ current: mockButton }));

    
    act(() => {
      result.current.setElementRect();
    });
    expect(result.current.top).toBe(100);

    
    act(() => {
      result.current.setElementRect();
    });
    expect(result.current.top).toBeUndefined();
    expect(result.current.left).toBeUndefined();
    expect(result.current.right).toBeUndefined();
    expect(result.current.bottom).toBeUndefined();
  });

 
 it("should force set coordinates when forceUpdateRect is called", () => {
  const mockButton = document.createElement("button");
  Object.defineProperty(mockButton, "getBoundingClientRect", {
    value: () => mockRect,
    configurable: true,
  });

  const { result } = renderHook(() => useGetCoordinateForPopup({ current: mockButton }));

  act(() => {
    result.current.setElementRect();
  });
  expect(result.current.top).toBe(100);

  const newMockRect = { ...mockRect, top: 200, bottom: 220 };
  Object.defineProperty(mockButton, "getBoundingClientRect", {
    value: () => newMockRect,
    configurable: true,
  });

  act(() => {
    result.current.forceUpdateRect();
  });
  expect(result.current.top).toBe(200);
  expect(result.current.bottom).toBe(220);
});

  
  it("should warn and not set coordinates when element ref is not attached", () => {
    const { result } = renderHook(() => useGetCoordinateForPopup({ current: null }));

    act(() => {
      result.current.setElementRect();
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith("Element ref is not attached");
    expect(result.current.top).toBeUndefined();
    expect(result.current.left).toBeUndefined();
    expect(result.current.right).toBeUndefined();
    expect(result.current.bottom).toBeUndefined();
  });

  
  it("should set up ResizeObserver when targetRect is set", () => {
    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
      configurable: true, 
    });

    const { result } = renderHook(() => useGetCoordinateForPopup({ current: mockButton }));

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

    const mockButton = document.createElement("button");
    Object.defineProperty(mockButton, "getBoundingClientRect", {
      value: () => mockRect,
      configurable: true, 
    });

    const { result, unmount } = renderHook(() => useGetCoordinateForPopup({ current: mockButton }));

    act(() => {
      result.current.setElementRect();
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});