import { useState, useEffect } from "react";
import UserTable from "@/components/UserTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getRoleById, updateRole } from "@/repositories/Role.repository";
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
    queryKey: ["roles", { id: parsedId }],
    queryFn: () =>
      parsedId
        ? getRoleById(parsedId ?? 0, {
            includes: "users",
          })
        : null,
  });

  const [updateData, setUpdateData] = useState({
    name: "",
  });

  const handleChangeData = (role: any) => {
    setUpdateData({
      ...updateData,
      [role.target.name]: role.target.value,
    });
  };

  const updateUserMutation = useMutation({
    mutationFn: () =>
      parsedId
        ? updateRole({
            id: parsedId ?? 0,
            data: {
              ...data.data,
              ...updateData,
              user_ids: Object.keys(rowSelection),
            },
          })
        : Promise.reject(),
    onSuccess: (_data) => {
      queryClient.invalidateQueries(["roles"]);
    },
  });

  const handleKeyPress = (role: any) => {
    if (role.key === "Enter") {
      updateUserMutation.mutate();
    }
  };

  useEffect(() => {
    setUpdateData({
      name: data?.data?.name ?? "",
    });
    setRowSelection(
      data?.data?.users?.reduce((acc: any, item: any) => {
        acc[item.id] = true;
        return acc;
      }, {})
    );
  }, [data]);

  return (
    <>
      <div className="flex gap-2">
        <Link href="/roles" className="btn mb-4">
          Danh sách vai trò
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert
          msg={(error as any).response?.data?.error ?? "Có lỗi xảy ra"}
        />
      ) : !data?.data ? null : (
        <div className="block my-0 p-5 bg-base-100 rounded-xl">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Tên vai trò
                  <span className="text-[red] ml-1">*</span>
                </span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={updateData.name}
                onChange={handleChangeData}
                onKeyUp={handleKeyPress}
                disabled={updateUserMutation.isLoading}
              />
            </div>
          </div>

          <label className="label">
            <span className="label-text font-semibold text-lg">
              Thành viên tham gia
            </span>
          </label>

          <UserTable
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />

          <div className="mb-4"></div>

          {updateUserMutation.isError && (
            <ErrorAlert
              className="mb-4"
              msg={
                (updateUserMutation.error as any).response?.data?.error ??
                "Có lỗi xảy ra"
              }
            />
          )}

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                updateUserMutation.mutate();
              }}
              className={
                `btn ` + (updateUserMutation.isLoading ? "loading" : "")
              }
              disabled={updateUserMutation.isLoading}
            >
              Cập nhật
            </button>
            <Link href={"/roles/" + parsedId} className="btn">
              Trang xem vai trò
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
