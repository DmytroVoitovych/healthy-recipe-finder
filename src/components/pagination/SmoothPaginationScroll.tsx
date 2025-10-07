"use client";
import { useEffect } from "react";

export const SmoothPaginationScroll = ({ page }: { page: number }) => {
  useEffect(() => {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, [page]);

  return null;
};
