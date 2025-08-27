import Link from "next/link";
import styles from './logo.module.css';
import { MainLogo } from "@/utils/svgimports";

export const Logo = () => {
  return (
    <div>
      <Link className={styles.linkLogo} href="/" aria-label="Go to homepage">
        <MainLogo className={styles.mainLogo} /> Healthy Recipe Finder
      </Link>
    </div>
  );
};
