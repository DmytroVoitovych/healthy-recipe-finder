"use client";
import styles from "./header.module.css";
import { useLayoutEffect, useState } from "react";
import { Logo } from "../logo/Logo";
import { HamburgerMenu } from "@/utils/svgimports";
import { HeaderNavigation } from "./navigation/HeaderNavigation";
import { ButtonAsLink } from "../shared/ButtonAsLink";

const buttonContent = "Browse recipes";
const desktopQuery = "(min-width:1024px)";

const Header = () => {
  const [show, setShow] = useState<boolean>(false);
  const [forceVisible, setForceVisible] = useState(false);

  const toggleMenu = () => {
    setShow((prev) => !prev);
  };

  useLayoutEffect(() => {
    const checkDesktop = window.matchMedia(desktopQuery);

    const updateVisibility = (isDesktop: boolean) => {
      if (isDesktop) setForceVisible(true); // desktop always visible
      else setForceVisible(show); // mobile depens on menu btn
    };

    updateVisibility(checkDesktop.matches);

    const changeAriaByMediaQuery = (e: MediaQueryListEvent) => {
      updateVisibility(e.matches);
    };

    checkDesktop.addEventListener("change", changeAriaByMediaQuery);
    return () => checkDesktop.removeEventListener("change", changeAriaByMediaQuery);
  }, [show]);

  return (
    <header className={styles.header} data-menu={show}>
      <Logo />

      <div className={styles.rightBlock}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={show ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={show}
          aria-controls="navigation"
        >
          <HamburgerMenu />
        </button>
        <div className={styles.navContainer}>
          <HeaderNavigation isVisible={forceVisible} />
          <ButtonAsLink content={buttonContent} stylesClass={styles.navBtn} />
        </div>
      </div>
    </header>
  );
};

export { Header };
