import styles from "./styles.module.css";

export default function Notice({ type, children }) {
  return (
    <div className={`p-4 rounded-sm font-medium opacity-90 ${styles[type]}`}>
      {children}
    </div>
  );
}
