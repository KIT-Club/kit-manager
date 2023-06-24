import Header from "../components/Header";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-4 max-w-7xl mx-auto" style={{ minHeight: "100vh" }}>
        <Header />
        {children}
        <footer className="mx-auto text-center dark:text-gray-400 mt-12">
          <span>&copy; 2023 - KIT Manager</span>
        </footer>
      </div>
    </>
  );
}
