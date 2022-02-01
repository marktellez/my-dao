import Button from "./";
import styles from "./styles.module.css";

export default function SecondaryButton({ children, ...rest }) {
  return (
    <Button className={styles.secondary} {...rest}>
      <div className={styles.inner}>{children}</div>
    </Button>
  );
}
