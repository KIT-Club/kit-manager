// import { useQuery } from "@tanstack/react-query";
import { getAllCommittees } from "../../repositories/Commitee.repository";
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
          <table>
            <thead>
              <tr>
                <th className="text-left">Id</th>
                <th className="text-left">Name</th>
                <th className="text-left">Created at</th>
                <td className="text-right">Actions</td>
              </tr>
            </thead>
            <tbody>
              {committees.map((committee) => (
                <tr key={committee.id}>
                  <td>{committee.id}</td>
                  <td>{committee.name}</td>
                  <td>{committee.created_at}</td>
                  <td>
                    <button className="btn">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (committees.length === 0) {
      return <div>Không có dữ liệu</div>;
    }
  };

  return (
    <>
      <button className="btn">Create +</button>
      {renderTable()}
      <div>
        <button className="btn" onClick={prevPage}>
          Trang trước
        </button>
        <button className="text-white inline-block ml-2 mr-2" disabled>
          Trang hiện tại: {currentPage}
        </button>
        <button className="btn" onClick={nextPage}>
          Trang sau
        </button>
      </div>
    </>
  );
}
