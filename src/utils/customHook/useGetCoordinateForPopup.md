# useGetCoordinateForPopup

The `useGetCoordinateForPopup` hook retrieves the coordinates of an HTML element (e.g., a button) relative to the browser's viewport. It is designed for positioning popups in browsers lacking support for the Anchor Positioning API (e.g., Firefox). The hook uses `ResizeObserver` to track element size changes and provides methods to set, clear, or force-update coordinates programmatically.

## Parameters

- `elementRef: RefObject<HTMLButtonElement | HTMLElement | null>`  
  A React ref pointing to the HTML element (anchor) whose coordinates are to be retrieved.

## Return Value

The hook returns an object with the following properties:

- `top: number | undefined` — The top coordinate of the element relative to the viewport.
- `left: number | undefined` — The left coordinate of the element relative to the viewport.
- `right: number | undefined` — The right coordinate of the element relative to the viewport.
- `bottom: number | undefined` — The bottom coordinate of the element relative to the viewport.
- `setElementRect: () => void` — A function to set or clear coordinates:
  - If coordinates are not set or a resize is triggered, retrieves the element's coordinates via `getBoundingClientRect` and stores them.
  - If coordinates are already set, clears them to `undefined`.
  - If `elementRef.current` is unavailable, logs a warning and does nothing.
- `forceUpdateRect: () => void` — A function to force an update of the coordinates, regardless of their current state.

## Usage

The hook is useful for components that need to position popups relative to a specific element, such as a button, particularly when using the Popover API.

### Example

```tsx
import { useRef } from "react";
import { useGetCoordinateForPopup } from "./useGetCoordinateForPopup";

export const PopupComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { top, left, right, bottom, setElementRect, forceUpdateRect } = useGetCoordinateForPopup(buttonRef);

  return (
    <div>
      <button ref={buttonRef} type="button" popoverTarget="my-popover" aria-haspopup="true">
        Toggle popup
      </button>
      <div
        id="my-popover"
        popover="auto"
        onBeforeToggle={setElementRect}
        style={{
          position: "absolute",
          top: `${top + 20}px`,
          left: `${left}px`,
          background: "white",
          border: "1px solid black",
        }}
      >
        Popup content
      </div>
      <button onClick={() => forceUpdateRect()}>
        Force update coordinates
      </button>
    </div>
  );
};
```

## Features

- **Compatibility**: Designed for browsers lacking Anchor Positioning API support (e.g., Firefox).
- **ResizeObserver**: Automatically updates coordinates on element size changes when coordinates are set.
- **Cleanup**: Disconnects `ResizeObserver` on component unmount to prevent memory leaks.
- **Error Handling**: Logs a warning (`"Element ref is not attached"`) if `elementRef.current` is unavailable and does not set coordinates.

## Notes

- Ensure `elementRef` is attached to a valid DOM element (the anchor, e.g., a button) before calling `setElementRect` or `forceUpdateRect`.
- The hook returns `undefined` for all coordinates if they are not set or have been cleared.
- Use `forceUpdateRect` to refresh coordinates manually, e.g., after a window resize or layout change.
- **When using with the Popover API**, attach `setElementRect` to the `onBeforeToggle` event of the popover element rather than the anchor button's `onClick`. The button serves as the anchor for positioning, and `setElementRect` should be called when the popover is about to be shown to ensure accurate coordinate calculation.