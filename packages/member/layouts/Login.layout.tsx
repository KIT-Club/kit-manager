import styles from "./Login.module.css";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles["login-layout"]}>{children}</div>;
}
