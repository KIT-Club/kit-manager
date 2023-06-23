import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAllCommittees,
  deleteCommittee,
} from "@/repositories/Committee.repository";
import Pagination from "@/components/Pagination";
import ErrorAlert from "@/components/alert/Error";
import CreatePopup from "@/components/committees/CreatePopup";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import Loading from "@/components/Loading";

const renderTable = ({
  deleteCommitteeMutation,
  deleteCommitteeId,
  data,
  handleDeleteCommittee,
  onPageChange,
}: any) => {
  return (
    <>
      <div className="mb-4 w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tên committee</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="msv">
                      <Link
                        href={`/committees/${item.id}`}
                        className="underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <th>
                    <div>
                      <Link
                        href={`/committees/${item.id}/update`}
                        className="btn btn-sm bg-cyan-500 text-white mr-1"
                      >
                        Cập nhật
                      </Link>
                      <div className="dropdown">
                        <label
                          tabIndex={
                            deleteCommitteeMutation.isLoading &&
                            deleteCommitteeId == item.id
                              ? undefined
                              : 0
                          }
                          className={
                            "btn btn-sm bg-error-500 text-white mr-1 " +
                            (deleteCommitteeMutation.isLoading &&
                              deleteCommitteeId == item.id &&
                              "loading")
                          }
                        >
                          {!(
                            deleteCommitteeMutation.isLoading &&
                            deleteCommitteeId == item.id
                          ) && "Xóa"}
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu rounded-box"
                        >
                          <li>
                            <button
                              className={
                                "btn btn-error dropdown-content menu p-2 shadow text-white rounded-box " +
                                (deleteCommitteeMutation.isLoading &&
                                deleteCommitteeId == item.id
                                  ? "loading"
                                  : "")
                              }
                              onClick={() => handleDeleteCommittee(item.id)}
                              disabled={
                                deleteCommitteeMutation.isLoading &&
                                deleteCommitteeId == item.id
                              }
                            >
                              Chắc chắn xóa!
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination data={data} onPageChange={onPageChange} />
    </>
  );
};

export default function Committees() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["committees", currentPage],
    queryFn: () =>
      getAllCommittees({
        page: currentPage,
        limit: currentLimit,
      }),
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  // --- Delete committee
  const [deleteCommitteeId, setDeleteCommitteeId] = useState(0);
  const deleteCommitteeMutation = useMutation(deleteCommittee, {
    onSuccess: () => {
      deleteCommitteeMutation.reset();
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
    onError: (err: any) => {
      alert(err?.message?.response?.data?.error ?? "Có lỗi xảy ra");
    },
    onSettled: (data: any, error: any, variables: any, context: any) => {
      setDeleteCommitteeId(0);
    },
  });
  const handleDeleteCommittee = (id: number) => {
    setDeleteCommitteeId(id);
    deleteCommitteeMutation.mutate(id);
  };
  // ---

  return (
    <>
      <CreatePopup />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert
          msg={(error as any).response?.data?.error ?? "Có lỗi xảy ra"}
        />
      ) : (
        renderTable({
          deleteCommitteeMutation,
          deleteCommitteeId,
          data,
          handleDeleteCommittee,
          onPageChange,
        })
      )}
    </>
  );
}
