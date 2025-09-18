# useGetCoordinateForPopup

The `useGetCoordinateForPopup` hook retrieves the coordinates of an HTML element (e.g., a button) relative to the browser's viewport. It is designed for positioning popups in browsers lacking support for the Anchor Positioning API (e.g., Firefox). The hook uses `ResizeObserver` to track window resize changes and provides methods to set, clear, or force-update coordinates programmatically.

## Parameters

- `elementRef: RefObject<HTMLButtonElement | HTMLElement | null>`  
  A React ref pointing to the HTML element (anchor) whose coordinates are to be retrieved.

## Return Value

The hook returns an object with the following properties:

- `top: number | undefined` — The top coordinate of the element relative to the viewport.
- `left: number | undefined` — The left coordinate of the element relative to the viewport.
- `right: number | undefined` — The right coordinate of the element relative to the viewport.
- `bottom: number | undefined` — The bottom coordinate of the element relative to the viewport.
- `isOpen: boolean` — Indicates whether the popup is currently open (true when coordinates are set, false when cleared).
- `setElementRect: () => void` — A function to toggle coordinates:
  - If coordinates are not set or a resize is triggered, retrieves the element's coordinates via `getBoundingClientRect` and stores them.
  - If coordinates are already set, clears them to `null` (closes the popup).
  - If `elementRef.current` is unavailable, logs a warning and does nothing.
- `forceUpdateRect: () => void` — A function to force an update of the coordinates when the popup is open. Only updates coordinates if `isOpen` is true, otherwise does nothing.

## Usage

The hook is useful for components that need to position popups relative to a specific element, such as a button, particularly when using the Popover API with polyfills.

### Example

```tsx
import { useRef } from "react";
import { useGetCoordinateForPopup } from "./useGetCoordinateForPopup";

export const PopupComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { 
    top, 
    left, 
    right, 
    bottom, 
    isOpen,
    setElementRect, 
    forceUpdateRect 
  } = useGetCoordinateForPopup(buttonRef);

  const coordinateStyle = {
    "--bottom-coordinate": `${bottom}px`,
    "--left-coordinate": `${left}px`,
  } as React.CSSProperties;

  return (
    <div>
      <button 
        ref={buttonRef} 
        type="button" 
        popoverTarget="my-popover" 
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Toggle popup
      </button>
      <div
        id="my-popover"
        popover="manual"
        onBeforeToggle={setElementRect}
        style={coordinateStyle}
        role="menu"
      >
        Popup content
      </div>
    </div>
  );
};
```

## Features

- **Compatibility**: Designed for browsers lacking Anchor Positioning API support (e.g., Firefox) with Popover API polyfills.
- **ResizeObserver**: Automatically updates coordinates on window resize when popup is open.
- **Smart Updates**: Only recalculates coordinates when necessary using internal state management with `useRef` to avoid stale closures.
- **Cleanup**: Disconnects `ResizeObserver` on component unmount to prevent memory leaks.
- **Error Handling**: Logs a warning (`"Element ref is not attached"`) if `elementRef.current` is unavailable and does not set coordinates.
- **Performance Optimized**: Uses `useRef` for internal state to prevent unnecessary re-renders and avoid infinite update loops.

## Implementation Details

The hook uses several optimization techniques:

- **Stale Closure Prevention**: Uses `useRef` to maintain current state references for the ResizeObserver callback
- **Conditional Updates**: `forceUpdateRect` only operates when popup is open, preventing unnecessary calculations
- **Memory Efficient**: ResizeObserver is created once and persists for the component lifecycle
- **Global Resize Tracking**: Observes `document.body` to catch all viewport changes

## Notes

- Ensure `elementRef` is attached to a valid DOM element (the anchor, e.g., a button) before calling `setElementRect` or `forceUpdateRect`.
- The hook returns `undefined` for all coordinates if they are not set or have been cleared.
- Use `isOpen` to conditionally render popup content or apply CSS classes.
- **When using with the Popover API**, attach `setElementRect` to the `onBeforeToggle` event of the popover element rather than the anchor button's `onClick`. The button serves as the anchor for positioning, and `setElementRect` should be called when the popover is about to be shown to ensure accurate coordinate calculation.
- **CSS Custom Properties**: The example shows using CSS custom properties for positioning, which works well with CSS-based popup positioning systems.
- **Firefox Compatibility**: This hook provides a robust polyfill solution for Firefox users until native Anchor Positioning API support is available.