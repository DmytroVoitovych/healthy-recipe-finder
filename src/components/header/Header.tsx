"use client";
import styles from "./Header.module.css";

// import { NavComponent } from "./navComponent/NavComponent";

import { useState } from "react";
import { Logo } from "../logo/Logo";
import { HamburgerMenu } from "@/utils/svgimports";

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
        {/* <NavComponent mobile={false} /> */}
      </div>
    </header>
  );
};

export { Header };
