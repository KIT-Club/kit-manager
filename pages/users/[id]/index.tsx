import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Image from "next/image";
import { getUserById, updateUser } from "../../../repositories/User.repository";
import ErrorAlert from "../../alert/error";
import { useState, useEffect } from "react";

export default function User() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = router.query;
  const parsedId = typeof id === "string" ? parseInt(id, 10) : undefined;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users", { id: parsedId }],
    queryFn: () =>
      parsedId
        ? getUserById(parsedId ?? 0, {
            includes: "committees,roles,events",
          })
        : null,
  });

  useEffect(() => {
    refetch();
  }, []);

  // --- Update user
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState({
    facebook: "",
    github: "",
  });
  const handleChangeData = (event: any) => {
    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (!isUpdateMode && data?.data)
      setUpdateData({
        facebook: data.data.facebook ?? "",
        github: data.data.github ?? "",
      });
  }, [isUpdateMode, data]);
  const updateUserMutation = useMutation({
    mutationFn: () =>
      parsedId
        ? updateUser({
            id: parsedId ?? 0,
            data: { ...data.data, ...updateData },
          })
        : Promise.reject(),
    onSuccess: (_data) => {
      queryClient.invalidateQueries(["users"]);
      setIsUpdateMode(false);
    },
  });
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      updateUserMutation.mutate();
    }
  };
  // ---

  const formatedBirthday = (birthday: string) => {
    const dateParts = birthday.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    return new Date(year, month, day).toLocaleDateString("en-GB");
  };

  if (isLoading)
    return (
      <progress className="progress progress-info w-56 mt-8 mb-8"></progress>
    );
  if (error)
    return (
      <ErrorAlert
        msg={(error as any).response?.data?.error ?? "Có lỗi xảy ra"}
      />
    );
  if (!data?.data) return null;
  return (
    <div className="p-8 prose lg:prose-md">
      <button
        className={`btn btn-primary mb-4`}
        onClick={() => router.push("/users")}
      >
        Quay lại
      </button>
      <br />
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image
            src="/sample-avatar.jpg"
            alt="John Doe"
            width="96"
            height="96"
            className="my-0"
            priority
          />
        </div>
      </div>
      <h2 className="card-title mt-2">{data.data.name}</h2>
      <table className={`table ${styles["user-table"]}`}>
        <tbody>
          <tr>
            <th className="w-32">Email</th>
            <td>{data.data.email}</td>
          </tr>
          <tr>
            <th>MSSV</th>
            <td>{data.data.username}</td>
          </tr>
          <tr>
            <th>Lớp</th>
            <td>{data.data.class}</td>
          </tr>
          <tr>
            <th>Ngành học</th>
            <td>{data.data.major}</td>
          </tr>
          <tr>
            <th>Ngày sinh</th>
            <td>{formatedBirthday(data.data.birthday)}</td>
          </tr>
          {!isUpdateMode && (
            <>
              <tr>
                <th>Facebook</th>
                <td>
                  <a href={data.data.facebook} target="_blank" rel="noreferrer">
                    {data.data.facebook}
                  </a>
                </td>
              </tr>
              <tr>
                <th>Github</th>
                <td>
                  <a href={data.data.github} target="_blank" rel="noreferrer">
                    {data.data.github}
                  </a>
                </td>
              </tr>
            </>
          )}
          {isUpdateMode && (
            <>
              <tr>
                <th>Facebook</th>
                <td>
                  <input
                    className="input input-sm w-full"
                    type="text"
                    name="facebook"
                    placeholder="Facebook URL..."
                    value={updateData.facebook}
                    onChange={handleChangeData}
                    onKeyUp={handleKeyPress}
                    disabled={updateUserMutation.isLoading}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>Github</th>
                <td>
                  <input
                    className="input input-sm w-full"
                    type="text"
                    name="github"
                    placeholder="Github URL..."
                    value={updateData.github}
                    onChange={handleChangeData}
                    onKeyUp={handleKeyPress}
                    disabled={updateUserMutation.isLoading}
                  ></input>
                </td>
              </tr>
            </>
          )}
          <tr>
            <th>Ban</th>
            <td>{data.data.committees.map((item: any) => item.name)}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{data.data.roles.map((item: any) => item.name)}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="">Event đã tham gia</h3>
      {data.data.events.length == 0 && <p>Chưa tham gia event nào</p>}
      {data.data.events.length > 0 && (
        <table className={`table mb-4`}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {data.data.events.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {updateUserMutation.isError && (
        <ErrorAlert
          className="mb-4"
          msg={
            (updateUserMutation.error as any).response?.data?.error ??
            "Có lỗi xảy ra"
          }
        />
      )}
      <button
        className={
          `btn ` +
          (updateUserMutation.isLoading ? "loading" : "") +
          (isUpdateMode ? "btn-success" : "btn-info")
        }
        disabled={updateUserMutation.isLoading}
        onClick={() =>
          isUpdateMode ? updateUserMutation.mutate() : setIsUpdateMode(true)
        }
      >
        {isUpdateMode ? "Lưu" : "Cập nhật"}
      </button>
      {isUpdateMode && (
        <button
          onClick={() => setIsUpdateMode(false)}
          className={`btn btn-error ml-2`}
          disabled={updateUserMutation.isLoading}
        >
          Hủy
        </button>
      )}
    </div>
  );
}
