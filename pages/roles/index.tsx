import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllRoles,
  createRole,
  deleteRole,
} from "@/repositories/Role.repository";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Loading from "@/components/Loading";
import CreatePopup from "@/components/roles/CreatePopup";
import ErrorAlert from "@/components/alert/Error";

const queryClient = new QueryClient();

function TableRole() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const limit = 5;
      const params = {
        page: currentPage,
        limit: limit,
      };
      return await getAllRoles(params);
    },
  });

  const pageData = data;

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handlePageChange = async (page: any) => {
    setCurrentPage(page);
  };

  const queryClient = useQueryClient();

  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);

  const handleDelete = async (id: any) => {
    try {
      await deleteRole(id);
      setNum(0);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      refetch();
    } catch (err) {
      alert("Đã xảy ra lỗi");
    }
  };

  const handleAdd = async (value: string) => {
    try {
      await createRole({
        name: value,
      });
      setCount(0);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      refetch();
    } catch (err) {
      alert("Đã xảy ra lỗi");
    }
  };

  const [valueRole, setValueRole] = useState("");

  const showBtn = () => {
    if (num === 0) {
      setNum(1);
    }

    if (num === 1) {
      setNum(0);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if (typeof error === "object" && "message" in error) {
      console.log(error.message);
    } else {
      console.log("An error has occurred");
    }
  }

  return (
    <section className="relative">
      <table className={`table w-full mt-4 text-white z-[1]`}>
        {/* head */}
        <thead>
          <tr>
            <th>Tên role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {pageData.data.map((dt: any, index: any) => (
            <tr key={index}>
              <td>
                <Link href={"/roles/" + dt.id} className="underline">
                  {dt.name}
                </Link>
              </td>
              <td>
                <div>
                  <Link
                    href={`/roles/${dt.id}/update`}
                    className="btn btn-sm bg-cyan-500 text-white mr-1"
                  >
                    Cập nhật
                  </Link>
                  <div className="dropdown ">
                    <button
                      className={`btn btn-sm bg-error-500 text-white mr-1`}
                      onClick={showBtn}
                    >
                      Xóa
                    </button>
                    {num === 1 && (
                      <button
                        className="btn btn-error dropdown-content menu p-2 shadow
                         text-white rounded-box"
                        onClick={() => handleDelete(dt.id)}
                      >
                        Chắc chắn xóa!
                      </button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4"></div>
      <Pagination data={pageData} onPageChange={handlePageChange} />
    </section>
  );
}

export default function App() {
  return (
    <>
      <CreatePopup />
      <TableRole />
    </>
  );
}
