import { RefObject, useEffect, useRef, useState } from "react";

type RectType = {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
} | null;

// Must use this hook until Firefox will not have support for Anchor-Position
export const useGetCoordinateForPopup = (
  elementRef: RefObject<HTMLButtonElement | HTMLElement | null>
) => {
  const [targetRect, setTargetRect] = useState<RectType>(null);

  const setElementRect = (flagResize?: boolean) => {
    const rect = elementRef?.current?.getBoundingClientRect();
    if (!rect) {
      console.warn("Element ref is not attached");
      return;
    }

    if (!targetRect || flagResize)
      setTargetRect({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      });
    else setTargetRect(null);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => setElementRect(true));
    if (targetRect && elementRef.current) resizeObserver.observe(elementRef.current);
    return () => resizeObserver.disconnect();
  }, [targetRect]);

  return {
    top: targetRect?.top,
    bottom: targetRect?.bottom,
    left: targetRect?.left,
    right: targetRect?.right,
    setElementRect,
    elementRef,
  };
};
