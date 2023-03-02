import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function UpdateEvent() {
  interface fakeData {
    id: number;
    avatar: string;
    fullname: string;
    username: string;
    masv: string;
    role: string;
    class: string;
  }

  const fakeData = [
    {
      id: 1,
      avatar: "/sample-avatar.jpg",
      username: "phanhuuviet",
      fullname: "phan huu viet 1",
      masv: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 2,
      avatar: "/sample-avatar.jpg",
      username: "phanhuuviet",
      fullname: "phan huu viet",
      masv: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 3,
      avatar: "/sample-avatar.jpg",
      username: "phanhuuviet",
      fullname: "phan huu viet",
      masv: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 4,
      avatar: "/sample-avatar.jpg",
      username: "phanhuuviet",
      fullname: "phan huu viet",
      masv: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 5,
      avatar: "/sample-avatar.jpg",
      username: "phanhuuviet",
      fullname: "phan huu viet",
      masv: "ct050455",
      role: "dev",
      class: "KIT",
    },
  ];

  // State
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<Array<number>>([]);
  const [list, setList] = useState<Array<fakeData>>(fakeData);

  const [startDate, setStartDate] = useState("2020-12-09");
  const [endDate, setEndDate] = useState("2022-12-23");

  // Function
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: any) => {
    const { id, checked } = e.target;
    const idTypeNumber: number = +id;

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== idTypeNumber));
      return;
    }

    setIsCheck([...isCheck, idTypeNumber]);
  };

  return (
    <div className="m-5">
      <form className="block my-0 mx-auto w-[68.75rem] p-5 bg-base-100 rounded-xl">
        {/* Title */}
        <h2 className="text-2xl font-semibold pb-4 border-b-2 mb-2">
          Update Event
        </h2>

        {/* Name and time event */}
        <div className="border-b-2 border-dashed mb-6 pb-7">
          {/* Change name of event */}
          <div className="form-control w-full max-w-sm pb-5">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                Title
                <span className="text-[red]">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>

          {/* Change time of event */}
          <div className="flex mx gap-24">
            <div className="flex flex-col w-full max-w-sm">
              <label
                className="label-text font-semibold text-base mb-2 inline-flex"
                htmlFor="startDay"
              >
                Ngày bắt đầu
                <span className="text-[red]">*</span>
              </label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered cursor-text rounded-lg w-full"
                type="date"
                id="startDay"
              />
            </div>
            <div className="flex flex-col w-full max-w-sm">
              <label
                className="label-text font-semibold text-base mb-2 inline-flex"
                htmlFor="endDay"
              >
                Ngày kết thúc
              </label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered cursor-text rounded-lg w-full"
                type="date"
                id="endDay"
              />
            </div>
          </div>
        </div>

        {/* Participant list  */}
        <div className="mb-4">
          {/* Search user */}
          <div className="form-control w-full max-w-sm mb-4">
            <label htmlFor="searchUser" className="label">
              <span className="label-text font-semibold text-[16px]">
                Thêm người tham gia
              </span>
            </label>
            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Search for user..."
                id="searchUser"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* List of user */}
          <div className="max-h-80 overflow-y-scroll">
            <table className="table w-full border-collapse relative">
              {/* head */}
              <thead className="h-20 ">
                <tr className="sticky top-0 z-10">
                  <th className="rounded-none">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={isCheckAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </th>
                  <th>Họ và tên</th>
                  <th>Role</th>
                  <th>Ban</th>
                  <th className="min-w-[9rem] rounded-none">
                    {isCheck.length > 0 && (
                      <button className="btn gap-2 text-[12px] h-[2.5rem] min-h-[2.5rem]">
                        <svg
                          xmlns="http://w...content-available-to-author-only...3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Xóa
                      </button>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fakeData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="rounded-none">
                        <label>
                          <input
                            name="checkbox"
                            type="checkbox"
                            className="checkbox"
                            id={`${data.id}`}
                            checked={isCheck.includes(data.id)}
                            onChange={handleClick}
                          />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                width="20"
                                height="20"
                                src={data.avatar}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data.fullname}</div>
                            <div className="text-sm opacity-50">
                              {data.masv}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{data.role}</td>
                      <td>{data.class}</td>
                      <td className="rounded-none">
                        <Link href={`/user/${data.id}`}>
                          <button className="btn btn-ghost btn-xs">
                            Chi tiết
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accept or delete */}
        <div>
          <button className="btn btn-success text-white min-w-[6.25rem] mr-3 bg-[#5cb85c]">
            Update
          </button>
          <button className="btn btn-error text-white min-w-[6.25rem] bg-[red]">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
