import { RefObject, useEffect, useState } from "react";

type RectType = {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
} | null;

export const useGetCoordinateForPopup = (
  elementRef: RefObject<HTMLButtonElement | HTMLElement | null>
) => {
  const [targetRect, setTargetRect] = useState<RectType>(null);
  let isResizing = false;

  function setElementRect() {
    const rect = elementRef?.current?.getBoundingClientRect();
    if (!rect) {
      console.warn("Element ref is not attached");
      return;
    }

    if (!targetRect || isResizing) {
      setTargetRect({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      });
      isResizing = false;
    } else {
      setTargetRect(null);
    }
  }

  const forceUpdateRect = () => {
    isResizing = true;
    setElementRect();
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => forceUpdateRect());
    if (targetRect && elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [targetRect]);

  return {
    top: targetRect?.top,
    bottom: targetRect?.bottom,
    left: targetRect?.left,
    right: targetRect?.right,
    setElementRect,
    forceUpdateRect,
  };
};
