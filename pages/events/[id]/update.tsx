import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UserTable from "@/components/UserTable";

export default function UpdateEvent() {
  const [rowSelection, setRowSelection] = useState({});
  const [startDate, setStartDate] = useState("2020-12-09");
  const [endDate, setEndDate] = useState("2022-12-23");

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
          </div>

          <UserTable
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
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
