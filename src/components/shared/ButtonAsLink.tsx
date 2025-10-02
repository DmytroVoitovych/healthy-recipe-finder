import Link from "next/link";
import styles from "./buttonAsLink.module.css";

interface contentType {
  content: string;
  stylesClass: string;
  link: string;
  ariaLabel?: string;
  itemProp?: string;
}

export const ButtonAsLink = ({ content, stylesClass, link, ...props }: contentType) => {
  return (
    <Link href={link} {...props} className={`${stylesClass} ${styles.btnConstant}`}>
      {content}
    </Link>
  );
};
