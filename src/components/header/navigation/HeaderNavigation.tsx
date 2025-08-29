"use client";
import Link from "next/link";
import styles from "./headerNavigation.module.css";
import { usePathname } from "next/navigation";

export type menuVisibility = {
 isVisible: boolean;   
}

const HeaderNavigation = ({isVisible}:menuVisibility) => {
  const pathname = usePathname();

  const isActive = (linkName: string): string | "activeLink" =>
    pathname === linkName ? styles?.activeLink || "" : "";

  return (
    <nav className={`${styles.navBlock} text-preset-7`} id='navigation' aria-hidden={!isVisible}>
      <Link className={isActive("/")} href="/" aria-current={pathname === "/" ? "page" : undefined}>
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
    </nav>
  );
};

export { HeaderNavigation };