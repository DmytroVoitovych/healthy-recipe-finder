"use client";
import styles from "./header.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "../logo/Logo";
import { HamburgerMenu } from "@/utils/svgimports";
import { HeaderNavigation } from "./navigation/HeaderNavigation";
import { ButtonAsLink } from "../shared/ButtonAsLink";
import { useGetCoordinateForPopup } from "@/utils/customHook/useGetCoordinateForPopup";
import { flushSync } from "react-dom";

const buttonContent = "Browse recipes";
const desktopQuery = "(min-width:1024px)";


const Header = () => {
  const [show, setShow] = useState<boolean>(false);
  const [forceVisible, setForceVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { bottom = 0, setElementRect } = useGetCoordinateForPopup(menuRef);

  const toggleMenu = () => {
    flushSync(() => setShow((prev) => !prev));
  };

  useEffect(() => {
    const checkDesktop = window.matchMedia(desktopQuery);

    if (checkDesktop.matches) return;
    
    const paddingGap = bottom - 48 * 2;
    const positionY = bottom ? paddingGap : bottom;

    document.documentElement.style.setProperty("--menuBottom", `${positionY}px`);
  }, [bottom]);

  useLayoutEffect(() => {
    const checkDesktop = window.matchMedia(desktopQuery);

    const updateVisibility = (isDesktop: boolean) => {
      if (isDesktop) {
        document.documentElement.style.removeProperty("--menuBottom");
        setForceVisible(true);
      } // desktop always visible
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

        <div
          className={styles.navContainer}
          ref={menuRef}
          onTransitionEnd={setElementRect}
        >
          <HeaderNavigation isVisible={forceVisible} />
          <ButtonAsLink
            content={buttonContent}
            stylesClass={styles.navBtn}
            link="/recipes"
          />
        </div>
      </div>
    </header>
  );
};

export { Header };
