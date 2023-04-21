/* eslint-disable prettier/prettier */
// import { useQuery } from "@tanstack/react-query";
import { getAllCommittees, deleteCommittee } from "../../repositories/Commitee.repository";
import CommitteeTable from "./CommitteeTable";
import Pagination from "../../components/pagination";
import styles from "./committee-table.module.css";
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
  const [APIData, setAPIData] = useState({});

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getAllCommittees({
        page: currentPage,
      });
      setAPIData(data);
      setCommittees(data.data);
    } catch (err: any) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
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

    if (committees) {
      return (
        <>
          <CommitteeTable committees={committees} styles={styles} deleteCommittee={deleteCommittee}/>
        </>
      );
    }

    if (!committees) {
      return <div>Không có dữ liệu</div>;
    }
  };

  return (
    <>
      <header>
        <button className={`btn btn-outline ${styles["add-committee-btn"]}`}>
          <b>+ Thêm ban</b>
        </button>
      </header>
      <section className={styles["table-wrapper"]}>
        {renderTable()}
        <div className="flex justify-center my-5">
          <Pagination data={APIData} onPageChange={onPageChange} />
        </div>
      </section>
    </>
  );
}
