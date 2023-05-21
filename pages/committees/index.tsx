/* eslint-disable prettier/prettier */
// import { useQuery } from "@tanstack/react-query";
import {
  getAllCommittees,
  deleteCommittee,
  createCommittee,
} from "../../repositories/Commitee.repository";
import CommitteeTable from "./CommitteeTable";
import Pagination from "../../components/pagination";
import styles from "./committee-table.module.css";
import { useState, useEffect, useRef } from "react";
import { dA } from "@fullcalendar/core/internal-common";

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

  const [addCommitteeName, setAddCommitteeName] = useState<string>(""); //FORM STATE
  const closePopupCreateCommittee = useRef<HTMLLabelElement>(null);
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

  const deleteCommitteeFunc = async (id: number) => {
    try {
      await deleteCommittee(id);
      getData();
    } catch (error: any) {
      setErr(err);
    }
  };

  const createCommitteeFunc = async (e: any) => {
    e.preventDefault();
    const data = {
      name: addCommitteeName,
      user: [1],
    };
    try {
      await createCommittee(data);
      getData();
      setAddCommitteeName("");
      closePopupCreateCommittee.current?.click();
      console.log("siuuuuuuuu");
    } catch (error: any) {
      setErr(error);
    }
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
          <CommitteeTable
            committees={committees}
            styles={styles}
            deleteCommitteeFunc={deleteCommitteeFunc}
          />
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
        {/**ADD COMMITTEE BUTTON */}
        <label
          htmlFor="add_committee_input"
          className="btn btn-outline w-36 mt-8 ml-8 mb-16"
        >
          + Thêm Ban
        </label>

        <input
          type="checkbox"
          id="add_committee_input"
          className="modal-toggle"
        />
        <label htmlFor="add_committee_input" className="modal" ref={closePopupCreateCommittee}>
          <label htmlFor="" className="w-[35rem]">
            <form className="modal-box max-w-none"  onSubmit={createCommitteeFunc}>
              <h3 className="text-2xl font-semibold pb-4 border-b-2 mb-2">
                Thêm Ban
              </h3>
              <div className="form-control  first-letter:max-w-sm pb-5">
                <label htmlFor="input_committee_name" className="label">
                  <span className="label-text font-semibold text-base">
                    Tên Ban
                    <span className="text-[red]">*</span>
                  </span>
                </label>
                <input
                  onChange={(e) => setAddCommitteeName(e.target.value)}
                  value={addCommitteeName}
                  id="input_committee_name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered "
                  required
                />
              </div>
              <div className="modal-action">
                <button className="btn">
                  Thêm
                </button>
              </div>
            </form>
          </label>
        </label>
      </header>
      {/*Committee table*/}
      <section className={styles["table-wrapper"]}>
        {renderTable()}
        <div className="flex justify-center my-5">
          <Pagination data={APIData} onPageChange={onPageChange} />
        </div>
      </section>
    </>
  );
}
