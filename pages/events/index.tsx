import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  getAllEvents,
  deleteEvent,
  createEvent,
} from "@/repositories/Event.repository";
import Pagination from "@/components/Pagination";

export default function Events() {
  interface evData {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    users: [];
  }

  // Function
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetCreateEvForm = () => {
    setTitle("");
    setDesciption("");
    setStartDate("");
    setEndDate("");
    setErrMess("");
    closePopupCreateEv.current?.click();
  };

  // --- fetch data
  const [currentPage, setCurrentPage] = useState(1);
  const [evData, setEvData] = useState<Array<evData>>([]);
  const [APIData, setAPIData] = useState({});

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const events = await getAllEvents({ page: currentPage });
      setEvData(events.data);
      setAPIData(events);
    } catch (err: any) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };
  // ---

  // --- delete event
  const [errMess, setErrMess] = useState("");
  const [currentEv, setCurrentEv] = useState(0);

  const closePopupDelEv = useRef<HTMLLabelElement>(null);

  const delEv = async () => {
    try {
      await deleteEvent(currentEv);
      closePopupDelEv.current?.click();
      getData();
    } catch (err: any) {
      setErr(err.message);
    }
  };
  // ---

  // --- create event
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const closePopupCreateEv = useRef<HTMLLabelElement>(null);

  const postEv = async (e: any) => {
    e.preventDefault();
    const data = {
      name: title,
      description: description,
      start_date: startDate,
      end_date: endDate,
      user_ids: [],
    };

    try {
      await createEvent(data);
      getData();
      resetCreateEvForm();
    } catch (err: any) {
      setErrMess(err.response.data.error);
    }
  };
  // ---

  const renderTable = () => {
    if (loading) {
      return (
        <>
          <div className="flex items-center justify-center min-h-[3rem]">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </>
      );
    }

    if (err && err.length > 0) {
      return <div>{err}</div>;
    }

    if (evData.length > 0) {
      return (
        <>
          <div className="w-full mb-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên event</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {evData.map((data, key) => {
                  return (
                    <tr className="relative align-top" key={key}>
                      <td>{key + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.start_date}</td>
                      <td>{data.end_date ?? "_"}</td>
                      <td className="relative">
                        <Link href={`/events/${data.id}/update`}>
                          <button className="btn btn-sm bg-cyan-500 text-white mr-1">
                            Cập nhật
                          </button>
                        </Link>
                        <label
                          htmlFor="input_del-ev"
                          className="btn btn-sm bg-error-500 text-white mr-1"
                          onClick={() => setCurrentEv(data.id)}
                        >
                          Xóa
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="mt-4">
              <Pagination data={APIData} onPageChange={onPageChange} />
            </div>
          </div>
        </>
      );
    }

    if (evData.length === 0) {
      return <div>Không có data</div>;
    }
  };

  const addEventPopupEl = () => {
    return (
      <>
        <input type="checkbox" id="input_add-ev" className="modal-toggle" />
        <label
          htmlFor="input_add-ev"
          className="modal"
          ref={closePopupCreateEv}
        >
          <label htmlFor="" className="w-[50rem]">
            <form className="modal-box max-w-none" onSubmit={postEv}>
              {/* Wrapper for content */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <h3 className="text-2xl font-semibold pb-4 border-b-2 mb-2">
                  Thêm Event
                </h3>

                {/* Name + Number of participants */}
                <div className="flex justify-between mx">
                  <div className="form-control basis-2/3  max-w-sm pb-5">
                    <label htmlFor="input_title" className="label">
                      <span className="label-text font-semibold text-base">
                        Title
                        <span className="text-[red]">*</span>
                      </span>
                    </label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      id="input_title"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered "
                      required
                    />
                  </div>
                  <div className="form-control basis-1/3 w-full max-w-sm pb-5">
                    <label htmlFor="input_amount" className="label">
                      <span className="label-text font-semibold text-base">
                        Mô tả
                      </span>
                    </label>
                    <input
                      onChange={(e) => setDesciption(e.target.value)}
                      value={description}
                      id="input_amount"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                {/* Start day + end day */}
                <div className="flex mx gap-12 relative">
                  <div className="flex flex-col w-full max-w-sm">
                    <label
                      className="label-text font-semibold text-base mb-2 inline-flex"
                      htmlFor="startDay"
                    >
                      Ngày bắt đầu
                      <span className="text-[red]">*</span>
                    </label>
                    <input
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      className="input input-bordered cursor-text rounded-lg w-full"
                      type="date"
                      id="startDay"
                      required
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
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      className="input input-bordered cursor-text rounded-lg w-full"
                      type="date"
                      id="endDay"
                      required
                    />
                  </div>
                  {errMess && (
                    <span className="absolute -bottom-7 text-red-500">
                      {errMess}
                    </span>
                  )}
                </div>
              </div>

              {/* Wrapper for accept or cancel */}
              <div className="modal-action">
                <button className="btn">Tạo</button>
              </div>
            </form>
          </label>
        </label>
      </>
    );
  };

  const delEventPopupEl = () => {
    return (
      <>
        <input type="checkbox" id="input_del-ev" className="modal-toggle" />
        <label htmlFor="input_del-ev" className="modal" ref={closePopupDelEv}>
          <div className="w-[30rem]">
            {/* Wrapper for content */}
            <div className="modal-box max-w-none">
              {/* Title */}
              <h3 className="text-2xl font-semibold pb-4 mb-5 text-center">
                Bạn có chắc chắn xóa event {currentEv} ?
              </h3>

              {/* Wrapper for accept or cancel */}
              <div className="flex justify-center items-center gap-6">
                <button
                  className="btn min-w-[10rem] btn-error text-white"
                  onClick={delEv}
                >
                  Xóa
                </button>
                <label htmlFor="input_del-ev" className="btn min-w-[10rem]">
                  Hủy
                </label>
              </div>
            </div>
          </div>
        </label>
      </>
    );
  };

  // Hooks
  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <div>
      <div className="my-0 w-full">
        {/* add event btn */}
        <label htmlFor="input_add-ev" className="btn w-36 mb-4 mr-3">
          Thêm event
        </label>

        {/* Modal add event */}
        {addEventPopupEl()}

        {/* table event */}
        {renderTable()}

        {/* Modal delete event */}
        {delEventPopupEl()}
      </div>
    </div>
  );
}
