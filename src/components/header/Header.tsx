"use client";
import styles from "./Header.module.css";
// import { ThemeSwitcher } from "./temeSwitcher/ThemeSwitcher";
// import { NavComponent } from "./navComponent/NavComponent";
// import { Close, Menu } from "@/utils/svglist";
import { useState } from "react";
import { Logo } from "../logo/Logo";

const Header = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <header className={styles.header} data-menu={show}>
    <Logo/>

      <div className={styles.rightBlock}>
        {/* <NavComponent mobile={false} /> */}
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setShow((prev) => !prev)}
        >
          {/* {show ? <Close /> : <Menu />} */}
        </button>
        {/* <ThemeSwitcher /> */}
      </div>
    </header>
  );
};

export { Header };
