// import { useQuery } from "@tanstack/react-query";
import { getAllCommittees } from "../../repositories/Commitee.repository";
import CommitteeTable from "./CommitteeTable.js";
import styles from './committee-table.module.css';
import { useState, useEffect } from "react";

// const useCommittee = () => {
//   return useQuery({
//     queryKey: "committees",
//     queryFn: getAllCommittees,
//   });
// };

export default function CommitteeTablePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [committees, setCommittees] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getData = async () => {
  
    try {
      setLoading(true);
      const data = await getAllCommittees({
        page: currentPage,
      });
      setCommittees(data.data);
    } catch (err: any) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const renderTable = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (err && err.length > 0) {
      return <div>{err}</div>;
    }

    if (committees.length > 0) {
      return (
        <>
          <CommitteeTable committees={committees} styles={styles}/>
        </>
      );
    }

    if (committees.length === 0) {
      return <div>Không có dữ liệu</div>;
    }
  };

  return (
    <>
    <header>
      <button className={`btn btn-outline ${styles["add-committee-btn"]}`}><b>+ Thêm ban</b></button>
    </header>
    <section className={styles["table-wrapper"]}>
      {renderTable()}
      <div className={`btn-group ${styles.pagnitation}`}> {/*btn-group is DasyUI class} */}
      <button 
      className="btn pagnitation-button" 
      onClick={prevPage}
      >«</button>
      <button className="btn pagnitation-button" disabled>Page {currentPage}</button>
      <button className="btn pagnitation-button" 
      onClick={nextPage}
      disabled={currentPage == committees["last_page"] ? false : true}>»</button>
      </div>
    </section>
    </>
  );
}