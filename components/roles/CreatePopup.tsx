import { useRef, useState } from "react";
import { createRole } from "@/repositories/Role.repository";
import ErrorAlert from "@/components/alert/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const queryClient = useQueryClient();
  const [updateData, setUpdateData] = useState({
    name: "",
  });
  const closePopupCreateEv = useRef<HTMLLabelElement>(null);

  const handleChangeData = (role: any) => {
    setUpdateData({
      ...updateData,
      [role.target.name]: role.target.value,
    });
  };

  const resetCreateEvForm = () => {
    setUpdateData({
      name: "",
    });
    closePopupCreateEv.current?.click();
  };

  const updateUserMutation = useMutation({
    mutationFn: () => {
      return createRole({
        ...updateData,
      });
    },
    onSuccess: (_data: any) => {
      queryClient.invalidateQueries(["roles"]);
      resetCreateEvForm();
    },
  });

  const handleKeyPress = (role: any) => {
    if (role.key === "Enter") {
      updateUserMutation.mutate();
    }
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="input_add-ev" className="btn">
          Thêm vai trò
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
                Tạo vai trò
              </h3>
              <div className="grid gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Tên vai trò
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
