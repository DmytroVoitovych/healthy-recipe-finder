"use client";
import styles from "./header.module.css";
import { useState } from "react";
import { Logo } from "../logo/Logo";
import { HamburgerMenu } from "@/utils/svgimports";
import { HeaderNavigation } from "./navigation/HeaderNavigation";
import { ButtonAsLink } from "../shared/ButtonAsLink";

const buttonContent = 'Browse recipes';

const Header = () => {
  const [show, setShow] = useState<boolean>(false);

  const toggleMenu = () => setShow((prev) => !prev);

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
        <div className={styles.navContainer} >
        <HeaderNavigation isVisible={show}/>
        <ButtonAsLink content={buttonContent} stylesClass={styles.navBtn}  />
        </div>
      </div>
    </header>
  );
};

export { Header };
