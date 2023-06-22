import { useState, useEffect } from "react";
import UserTable from "@/components/UserTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getEventById, updateEvent } from "@/repositories/Event.repository";
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
    queryKey: ["events", { id: parsedId }],
    queryFn: () =>
      parsedId
        ? getEventById(parsedId ?? 0, {
            includes: "users",
          })
        : null,
  });

  const [updateData, setUpdateData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const handleChangeData = (event: any) => {
    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value,
    });
  };

  const updateUserMutation = useMutation({
    mutationFn: () =>
      parsedId
        ? updateEvent({
            id: parsedId ?? 0,
            data: {
              ...data.data,
              ...updateData,
              user_ids: Object.keys(rowSelection),
              end_date: updateData.end_date.length
                ? updateData.end_date
                : undefined,
            },
          })
        : Promise.reject(),
    onSuccess: (_data) => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      updateUserMutation.mutate();
    }
  };

  useEffect(() => {
    setUpdateData({
      name: data?.data?.name ?? "",
      description: data?.data?.description ?? "",
      start_date: data?.data?.start_date ?? "",
      end_date: data?.data?.end_date ?? "",
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
        <Link href="/members/events" className="btn mb-4">
          Danh sách sự kiện
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
                  Tên sự kiện
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

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-lg">Mô tả</span>
              </label>
              <input
                name="description"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={updateData.description}
                onChange={handleChangeData}
                onKeyUp={handleKeyPress}
                disabled={updateUserMutation.isLoading}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Ngày bắt đầu
                  <span className="text-[red] ml-1">*</span>
                </span>
              </label>
              <input
                name="start_date"
                value={updateData.start_date}
                onChange={handleChangeData}
                onKeyUp={handleKeyPress}
                disabled={updateUserMutation.isLoading}
                className="input input-bordered cursor-text rounded-lg w-full"
                type="date"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Ngày kết thúc
                </span>
              </label>
              <input
                name="end_date"
                value={updateData.end_date}
                onChange={handleChangeData}
                onKeyUp={handleKeyPress}
                disabled={updateUserMutation.isLoading}
                className="input input-bordered cursor-text rounded-lg w-full"
                type="date"
              />
            </div>
          </div>
          {/* Search user */}

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
            <Link href={"/members/events/" + parsedId} className="btn">
              Trang xem sự kiện
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
