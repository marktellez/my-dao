import Button from "./";
import styles from "./styles.module.css";

export default function TxButton({ children, ...rest }) {
  return (
    <Button className={styles.tx} {...rest}>
      <div className={styles.inner}>{children}</div>
    </Button>
  );
}
