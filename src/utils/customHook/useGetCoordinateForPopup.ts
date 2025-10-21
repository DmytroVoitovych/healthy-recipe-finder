import { RefObject, useEffect, useRef, useState } from "react";

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
  const isResizing = useRef(false);
  const targetRectRef = useRef(targetRect);

  function setElementRect() {
    const rect = elementRef?.current?.getBoundingClientRect();
    const setRectCondition = !targetRect || (targetRect && isResizing.current);

    if (!rect) {
      console.warn("Element ref is not attached");
      return;
    }

    if (setRectCondition) {
      setTargetRect({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      });
      isResizing.current = false;
    } else {
      setTargetRect(null);
    }
  }

  useEffect(() => {
    targetRectRef.current = targetRect;
  }, [targetRect]);

  const forceUpdateRect = () => {
    if (!targetRectRef.current) return;
    isResizing.current = true;
    setElementRect();
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(forceUpdateRect);
    if (elementRef.current) resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef]);

  return {
    top: targetRect?.top,
    bottom: targetRect?.bottom,
    left: targetRect?.left,
    right: targetRect?.right,
    isOpen:!!targetRect,
    setElementRect,
    forceUpdateRect,
  };
};
