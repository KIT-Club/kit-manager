import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCommittees } from "@/repositories/Commitee.repository";
import { getAllRoles } from "@/repositories/Role.repository";
import ErrorAlert from "@/components/alert/Error";
import { addUser } from "@/repositories/User.repository";

function App() {
  const queryClient = useQueryClient();

  const [formCreateData, setFormCreateData] = useState({
    username: "",
    role_id: 0,
    committee_ids: {},
  });

  const addUserPopupBtnEl = useRef(null);

  const createUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleChangeInAddUser = (event: any) => {
    const { name, value, checked } = event.target;

    if (name === "committee_ids") {
      setFormCreateData((prevState) => ({
        ...prevState,
        committee_ids: {
          ...prevState.committee_ids,
          [value]: checked,
        },
      }));
      return;
    }

    setFormCreateData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = async (event: any) => {
    event.preventDefault();

    createUserMutation.mutate(
      {
        username: formCreateData.username,
        role_ids: +formCreateData.role_id ? [+formCreateData.role_id] : [],
        committee_ids: Object.keys(formCreateData.committee_ids)
          .filter((key) => (formCreateData.committee_ids as any)[key])
          .map((key) => parseInt(key)),
      },
      {
        onSuccess: () => {
          createUserMutation.reset();
          setFormCreateData({
            username: "",
            role_id: 0,
            committee_ids: {},
          });
          if (addUserPopupBtnEl.current)
            (addUserPopupBtnEl.current as any).checked = false;
        },
      }
    );
  };

  const committeeData = useQuery({
    queryKey: ["committees"],
    queryFn: () =>
      getAllCommittees({
        page: 1,
        limit: 9999,
      }),
    refetchOnWindowFocus: false,
  });

  const roleData = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      getAllRoles({
        page: 1,
        limit: 9999,
      }),
    refetchOnWindowFocus: false,
  });

  const committeeEl = () => {
    if (committeeData.error) return null;
    return (
      <div className="w-[12rem]">
        {committeeData.isLoading && <span>Loading...</span>}
        {!committeeData.isLoading &&
          committeeData.data.data.map((item: any) => {
            return (
              <label
                key={item.id}
                className="label cursor-pointer justify-start"
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  id={"committee" + item.id}
                  value={item.id}
                  onChange={handleChangeInAddUser}
                  name="committee_ids"
                  checked={(formCreateData.committee_ids as any)[item.id]}
                  disabled={createUserMutation.isLoading}
                />
                <label
                  htmlFor={"committee" + item.id}
                  className="label-text inline-block pl-2"
                >
                  {item.name}
                </label>
              </label>
            );
          })}
      </div>
    );
  };

  const roleEl = () => {
    if (roleData.error) return null;
    return (
      <select
        name="role_id"
        className="select select-bordered w-[12rem]"
        value={formCreateData.role_id}
        onChange={handleChangeInAddUser}
        disabled={roleData.isLoading || createUserMutation.isLoading}
      >
        {(() => {
          if (roleData.isLoading) return <option>Loading...</option>;
          return (
            <>
              <option>Chọn vai trò</option>
              {roleData.data.data.map((item: any) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </>
          );
        })()}
      </select>
    );
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="add-user-popup" className="btn">
          Thêm thành viên
        </label>
      </div>
      <input
        type="checkbox"
        ref={addUserPopupBtnEl}
        id="add-user-popup"
        className="modal-toggle"
      />
      <label htmlFor="add-user-popup" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="popup-add-user">
            <label
              htmlFor="add-user-popup"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div>
              <form className="form-add-user" onSubmit={handleAddUser}>
                <h3 className="font-bold text-center mt-2">Thêm thành viên</h3>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Mã số sinh viên</span>
                    <input
                      className="input input-bordered w-[12rem]"
                      name="username"
                      placeholder="Mã số sinh viên"
                      value={formCreateData.username}
                      onChange={handleChangeInAddUser}
                      required
                      min="8"
                      max="8"
                      disabled={createUserMutation.isLoading}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Vai trò</span>
                    {roleEl()}
                  </div>
                  <div className="label">
                    <span className="label-text">Ban</span>
                    {committeeEl()}
                  </div>
                </div>
                {!createUserMutation.isLoading &&
                  createUserMutation.isError && (
                    <ErrorAlert
                      msg={
                        (createUserMutation.error as any).response?.data?.error
                      }
                    />
                  )}
                <div className="modal-action justify-start">
                  <button
                    type="submit"
                    className={
                      "btn btn-primary " +
                      (createUserMutation.isLoading ? "loading" : "")
                    }
                    disabled={createUserMutation.isLoading}
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}

export default App;
