import { InstagramIco, TiktokIco, TrueSocialeIco } from "@/utils/svgimports";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer>
      <ul className={styles.footerSocialLinks}>
        <li>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            <InstagramIco />
          </a>
        </li>
        <li>
          <a href="https://bsky.app/" target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Blue Sky">
            <TrueSocialeIco />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/" target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Tiktok">
            <TiktokIco />
          </a>
        </li>
      </ul>
      <span className="text-preset-9">Made with ❤️ and 🥑</span>
    </footer>
  );
};
