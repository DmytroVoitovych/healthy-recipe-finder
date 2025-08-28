import Link from "next/link";
import styles from "./buttonAsLink.module.css";

interface contentType {
  content: string;
  stylesClass: string;
}

export const ButtonAsLink = ({ content, stylesClass }: contentType) => {
  return <Link href="/recipes" className={`${stylesClass} ${styles.btnConstant}`}>{content}</Link>;
};
