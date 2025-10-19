"use client";
import Link from "next/link";
import styles from "./headerNavigation.module.css";
import { usePathname } from "next/navigation";
import { getFavorites } from "@/lib/api/getFavorites";
import { KEY } from "@/components/shared/StoreButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type menuVisibility = {
  isVisible: boolean;
};

const HeaderNavigation = ({ isVisible }: menuVisibility) => {
  const pathname = usePathname();
  const [isClient, setClient] = useState(false);
  const [isFavorite, setFlag] = useState(!!Object.keys(getFavorites(KEY)).length);
  const router = useRouter();

  const isActive = (linkName: string): string | "activeLink" =>
    pathname === linkName ? styles?.activeLink || "" : "";

  useEffect(() => setClient(true), []);

  useEffect(() => {
    const interceptStorageSignal = (e: CustomEvent) => {
      const itemsLength = Object.keys(getFavorites(KEY)).length;
      if (e.detail.key === KEY) setFlag(!!itemsLength);

      if (pathname === "/favorite" && !itemsLength) router.replace("/");
    };

    window.addEventListener(
      "localstorage-signal",
      interceptStorageSignal as EventListener
    );

    return () =>
      window.removeEventListener(
        "localstorage-signal",
        interceptStorageSignal as EventListener
      );
  }, [pathname, router]);

  return (
    <nav
      className={`${styles.navBlock} text-preset-7`}
      id="navigation"
      aria-hidden={!isVisible}
    >
      <Link
        className={isActive("/")}
        href="/"
        aria-current={pathname === "/" ? "page" : undefined}
      >
        Home
      </Link>
      <Link
        className={isActive("/about")}
        href="/about"
        aria-current={pathname === "/about" ? "page" : undefined}
      >
        About
      </Link>
      <Link
        className={isActive("/recipes")}
        href="/recipes"
        aria-current={pathname === "/recipes" ? "page" : undefined}
      >
        Recipes
      </Link>
      {isFavorite && isClient && (
        <Link
          className={isActive("/favorite")}
          href="/favorite"
          aria-current={pathname === "/favorite" ? "page" : undefined}
        >
          Favorite
        </Link>
      )}
    </nav>
  );
};

export { HeaderNavigation };
