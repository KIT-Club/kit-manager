import { useState, useEffect } from "react";
import UserTable from "@/components/UserTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  getCommitteeById,
  updateCommittee,
} from "@/repositories/Committee.repository";
import Loading from "@/components/Loading";
import ErrorAlert from "@/components/alert/Error";
import Link from "next/link";

export default function App() {
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const parsedId = typeof id === "string" ? parseInt(id, 10) : undefined;

  const { isLoading, error, data } = useQuery({
    queryKey: ["committees", { id: parsedId }],
    queryFn: () =>
      parsedId
        ? getCommitteeById(parsedId ?? 0, {
            includes: "users",
          })
        : null,
  });

  const [updateData, setUpdateData] = useState({
    name: "",
    users: [],
  });

  useEffect(() => {
    setUpdateData({
      name: data?.data?.name ?? "",
      users: data?.data?.users ?? [],
    });
  }, [data]);

  return (
    <>
      <Link href="/committees" className="btn mb-4">
        Danh sách các ban
      </Link>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert
          msg={(error as any).response?.data?.error ?? "Có lỗi xảy ra"}
        />
      ) : !data?.data ? null : (
        <div className="block my-0 p-5 bg-base-100 rounded-xl">
          <label className="label">
            <span className="label-text font-semibold text-lg">Thông tin</span>
          </label>
          <table className="table w-full mb-4">
            <tbody>
              <tr>
                <td>Tên ban</td>
                <td>{updateData.name}</td>
              </tr>
            </tbody>
          </table>

          <label className="label">
            <span className="label-text font-semibold text-lg">
              Thành viên tham gia
            </span>
          </label>

          {updateData.users.length === 0 ? (
            <>
              <p className="p-1">Chưa có ai trong ban này</p>
            </>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Họ và tên</th>
                  <th>MSSV</th>
                </tr>
              </thead>
              <tbody>
                {updateData.users.map((row: any) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.username}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <div className="mb-4"></div>

          <div className="flex gap-2">
            <Link href={"/committees/" + parsedId + "/update"} className="btn">
              Cập nhật
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
