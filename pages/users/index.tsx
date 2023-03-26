import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { getAllUsers, addUser } from "../../repositories/User.repository";
import { getAllCommittees } from "../../repositories/Commitee.repository";
import { getAllRoles } from "../../repositories/Role.repository";
import ErrorAlert from "../alert/error";
import Pagination from "../../components/pagination";

function App() {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers({ includes: "roles,committees" }),
  });

  // --- Add user
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
  });

  const roleData = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      getAllRoles({
        page: 1,
        limit: 9999,
      }),
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

  const addUserPopupEl = () => {
    return (
      <>
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
              <div className="content-add-user">
                <form className="form-add-user" onSubmit={handleAddUser}>
                  <h3 className="font-bold text-center mt-2">
                    Thêm thành viên
                  </h3>
                  <div className="form-control">
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
                          (createUserMutation.error as any).response?.data
                            ?.error
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
  };
  // ---

  if (isLoading)
    return (
      <progress className="progress progress-info w-56 mt-8 mb-8"></progress>
    );

  if (error) return <ErrorAlert msg={(error as any).response?.data?.error} />;

  return (
    <div className="App">
      <div className="main-content">
        <div className="btn-add-user mb-4">
          <label htmlFor="add-user-popup" className="btn">
            Thêm thành viên
          </label>
        </div>

        <div className="user-table mb-4">
          <div className="overflow-x-auto w-full">
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
                {data.data.map((item: any) => {
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
                            <div className="text-sm opacity-50">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="class">{item.class}</div>
                      </td>
                      <td>
                        {item.committees.length &&
                          item.committees
                            .map((item: any) => item.name)
                            .join(", ")}
                      </td>
                      <td>{item.roles.length && item.roles[0].name}</td>
                      <th>
                        <div className="btn-table">
                          <button className="btn btn-sm bg-cyan-500 text-white mr-1">
                            Update
                          </button>
                          <button className="btn btn-ghost btn-xs">
                            Delete
                          </button>
                        </div>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination data={data} />

        <div className="footer"></div>
      </div>

      {addUserPopupEl()}
    </div>
  );
}

export default App;
