import Button from "./";
import styles from "./styles.module.css";

export default function LinkButton({ children, ...rest }) {
  return (
    <Button className={styles.link} {...rest}>
      <div className={styles.link}>{children}</div>
    </Button>
  );
}
