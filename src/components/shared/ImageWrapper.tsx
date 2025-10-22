import styles from './imageWrapper.module.css';

export const ImageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.imageWrapper}>{children}</div>;
};
