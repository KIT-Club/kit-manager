import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import ErrorAlert from "@/components/alert/Error";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { getAllUsers, deleteUser } from "@/repositories/User.repository";
import CreatePopup from "./components/CreatePopup";
import Loading from "@/components/Loading";

const renderTable = ({
  deleteUserMutation,
  deleteUserId,
  data,
  handleDeleteUser,
  onPageChange,
}: any) => {
  return (
    <>
      <div className="mb-4 w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
              <th>Ban</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="msv">{item.username}</div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src="/kit-logo.png"
                            alt=""
                            width="32"
                            height="32"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm opacity-50">{item.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="class">{item.class}</div>
                  </td>
                  <td>
                    {item.committees.length
                      ? item.committees.map((item: any) => item.name).join(", ")
                      : "_"}
                  </td>
                  <td>{item.roles.length ? item.roles[0].name : "_"}</td>
                  <th>
                    <div>
                      <Link
                        href={`/users/${item.id}`}
                        className="btn btn-sm bg-cyan-500 text-white mr-1"
                      >
                        Cập nhật
                      </Link>
                      <div className="dropdown">
                        <label
                          tabIndex={
                            deleteUserMutation.isLoading &&
                            deleteUserId == item.id
                              ? undefined
                              : 0
                          }
                          className={
                            "btn btn-sm bg-error-500 text-white mr-1 " +
                            (deleteUserMutation.isLoading &&
                              deleteUserId == item.id &&
                              "loading")
                          }
                        >
                          {!(
                            deleteUserMutation.isLoading &&
                            deleteUserId == item.id
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
                                (deleteUserMutation.isLoading &&
                                deleteUserId == item.id
                                  ? "loading"
                                  : "")
                              }
                              onClick={() => handleDeleteUser(item.id)}
                              disabled={
                                deleteUserMutation.isLoading &&
                                deleteUserId == item.id
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

function App() {
  // --- Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  // ---

  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () =>
      getAllUsers({
        includes: "roles,committees",
        page: currentPage,
        limit: currentLimit,
      }),
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  // --- Delete user
  const [deleteUserId, setDeleteUserId] = useState(0);
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      deleteUserMutation.reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      alert(err?.message?.response?.data?.error ?? "Có lỗi xảy ra");
    },
    onSettled: (data: any, error: any, variables: any, context: any) => {
      setDeleteUserId(0);
    },
  });
  const handleDeleteUser = (id: number) => {
    setDeleteUserId(id);
    deleteUserMutation.mutate(id);
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
          deleteUserMutation,
          deleteUserId,
          data,
          handleDeleteUser,
          onPageChange,
        })
      )}
    </>
  );
}

export default App;
