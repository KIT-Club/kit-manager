import styles from "./LoginCalendar.module.css";
import Header from "@/components/Header";

export default function LoginCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="flex flex-col max-w-7xl mx-auto px-4"
        style={{ minHeight: "100vh" }}
      >
        <div className="mt-4"></div>
        <Header />
        <main className={styles["main"]}>{children}</main>
        <footer className={"text-center " + styles["main"]}>
          <span>KMA Schedule - KIT</span>
        </footer>
      </div>
    </>
  );
}
