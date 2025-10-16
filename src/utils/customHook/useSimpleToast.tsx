import { createElement, ReactNode, useEffect, useRef, useState } from "react";

interface ToastConfig {
  containerClass?: string;
  itemClass?: string;
  duration?: number;
  ico?: React.JSX.Element;
  icoClass?: string;
  animationClass?: string;
}

interface ToastOutput {
  list: React.JSX.Element;
  showToast: () => void;
}

const fallbackClass: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 999,
  pointerEvents: "none",
  display: "grid",
  gap: "8px",
  backdropFilter: "blur(10px)",
};

const fallbackItemPolite: React.CSSProperties = {
  padding: "16px 20px",
  backgroundColor: "#004526",
  border: "1px solid #ffffff",
  color: "#ffffff",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
};

const fallbackItemAssertive: React.CSSProperties = {
  padding: "16px 20px",
  border: "1px solid #8B0000",
  backgroundColor: "#FF0000",
  color: "#ffffff",
};

const icoFallback: React.CSSProperties = {
  marginRight: "8px",
};

export const useSimpleToast = (
  toastMessage: string,
  config: ToastConfig
): ToastOutput => {
  const [list, setList] = useState<ReactNode[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {
    itemClass,
    containerClass,
    duration = 3000,
    ico,
    icoClass = "",
    animationClass,
  } = config;

  const showToast = (type: "polite" | "assertive" = "polite", message?: string) => {
    const itemFallback =
      type === "polite" ? fallbackItemPolite : fallbackItemAssertive;

    const toast = createElement(
      "div",
      {
        key: crypto.randomUUID(),
        className: itemClass || animationClass || "",
        role: "status",
        "aria-live": type,
        style: !itemClass
          ? { ...itemFallback, "--duration": `${duration}ms` }
          : { "--duration": `${duration}ms` },
      },

      <>
        {ico && (
          <span
            aria-hidden="true"
            {...(icoClass ? {} : { style: icoFallback })}
            className={icoClass}
          >
            {ico}
          </span>
        )}
        {message || toastMessage}
      </>
    );

    setList((prev) => [...prev, toast]);

    timeoutRef.current = setTimeout(
      () => setList((prev) => prev.slice(1)),
      duration
    );
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return {
    list: (
      <div
        {...(containerClass ? {} : { style: fallbackClass })}
        className={containerClass}
      >
        {list}
      </div>
    ),
    showToast,
  };
};
