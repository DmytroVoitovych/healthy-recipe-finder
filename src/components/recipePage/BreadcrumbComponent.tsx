import Link from "next/link";
import styles from "./breadcrumbComponent.module.css";

export const BreadcrumbComponent = ({children}:{children:string}) => (
  <nav aria-label="Breadcrumb" className={`text-preset-7 ${styles.breadcrumb}`} >
    <ol className={styles.breadcrumbList}>
      <li>
        <Link href="/recipes">Recipes</Link>
      </li>
      <li>
        <span aria-current="page">{children}</span>
      </li>
    </ol>
  </nav>
);
