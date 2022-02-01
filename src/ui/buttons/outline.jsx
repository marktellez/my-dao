import Button from "./";
import styles from "./styles.module.css";

export default function OutlineButton({ children, ...rest }) {
  return (
    <Button className={styles.outline} {...rest}>
      <div className={styles.inner}>{children}</div>
    </Button>
  );
}
