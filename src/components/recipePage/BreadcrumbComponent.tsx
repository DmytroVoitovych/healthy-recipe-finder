import Link from "next/link";
import styles from "./breadcrumbComponent.module.css";

export const BreadcrumbComponent = ({children}:{children:string}) => (
  <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
    <ol>
      <li>
        <Link href="/recipes">Recipes</Link>
      </li>
      <li>
        <span aria-current="page">{children}</span>
      </li>
    </ol>
  </nav>
);
