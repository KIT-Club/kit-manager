import { useRef, useState } from "react";
import { createEvent } from "@/repositories/Event.repository";
import ErrorAlert from "@/components/alert/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const queryClient = useQueryClient();
  const [updateData, setUpdateData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const closePopupCreateEv = useRef<HTMLLabelElement>(null);

  const handleChangeData = (event: any) => {
    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value,
    });
  };

  const resetCreateEvForm = () => {
    setUpdateData({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
    });
    closePopupCreateEv.current?.click();
  };

  const updateUserMutation = useMutation({
    mutationFn: () => {
      return createEvent({
        ...updateData,
        end_date: updateData.end_date.length ? updateData.end_date : undefined,
      });
    },
    onSuccess: (_data: any) => {
      queryClient.invalidateQueries(["events"]);
      resetCreateEvForm();
    },
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      updateUserMutation.mutate();
    }
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="input_add-ev" className="btn">
          Thêm sự kiện
        </label>
      </div>
      <input type="checkbox" id="input_add-ev" className="modal-toggle" />
      <label htmlFor="input_add-ev" className="modal" ref={closePopupCreateEv}>
        <label className="w-[50rem]">
          <form
            className="modal-box max-w-none"
            onSubmit={(e) => {
              e.preventDefault();
              updateUserMutation.mutate();
            }}
          >
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-semibold pb-4 border-b-2">
                Tạo sự kiện
              </h3>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Tên sự kiện
                      <span className="text-[red] ml-1">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered"
                    name="name"
                    value={updateData.name}
                    onChange={handleChangeData}
                    onKeyUp={handleKeyPress}
                    disabled={updateUserMutation.isLoading}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Mô tả
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="description"
                    value={updateData.description}
                    onChange={handleChangeData}
                    onKeyUp={handleKeyPress}
                    disabled={updateUserMutation.isLoading}
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold text-base mb-2 inline-flex">
                    Ngày bắt đầu
                    <span className="text-[red] ml-1">*</span>
                  </label>
                  <input
                    className="input input-bordered cursor-text rounded-lg w-full"
                    type="date"
                    name="start_date"
                    value={updateData.start_date}
                    onChange={handleChangeData}
                    onKeyUp={handleKeyPress}
                    disabled={updateUserMutation.isLoading}
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-semibold text-base mb-2 inline-flex">
                    Ngày kết thúc
                  </label>
                  <input
                    className="input input-bordered cursor-text rounded-lg w-full"
                    type="date"
                    name="end_date"
                    value={updateData.end_date}
                    onChange={handleChangeData}
                    onKeyUp={handleKeyPress}
                    disabled={updateUserMutation.isLoading}
                  />
                </div>
              </div>

              {updateUserMutation.isError && (
                <ErrorAlert
                  msg={
                    (updateUserMutation.error as any).response?.data?.error ??
                    "Có lỗi xảy ra"
                  }
                />
              )}
            </div>
            <div className="modal-action">
              <button className="btn">Tạo</button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
}
