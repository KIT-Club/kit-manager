import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "@/repositories/Event.repository";
import Pagination from "@/components/Pagination";
import ErrorAlert from "@/components/alert/Error";
import CreatePopup from "@/components/events/CreatePopup";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import Loading from "@/components/Loading";

const renderTable = ({
  deleteEventMutation,
  deleteEventId,
  data,
  handleDeleteEvent,
  onPageChange,
}: any) => {
  return (
    <>
      <div className="mb-4 w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tên event</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="msv">
                      <Link href={`/events/${item.id}`} className="underline">
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{item.start_date}</div>
                  </td>
                  <td>
                    <div className="class">{item.end_date}</div>
                  </td>
                  <th>
                    <div>
                      <Link
                        href={`/events/${item.id}/update`}
                        className="btn btn-sm bg-cyan-500 text-white mr-1"
                      >
                        Cập nhật
                      </Link>
                      <div className="dropdown">
                        <label
                          tabIndex={
                            deleteEventMutation.isLoading &&
                            deleteEventId == item.id
                              ? undefined
                              : 0
                          }
                          className={
                            "btn btn-sm bg-error-500 text-white mr-1 " +
                            (deleteEventMutation.isLoading &&
                              deleteEventId == item.id &&
                              "loading")
                          }
                        >
                          {!(
                            deleteEventMutation.isLoading &&
                            deleteEventId == item.id
                          ) && "Xóa"}
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu rounded-box"
                        >
                          <li>
                            <button
                              className={
                                "btn btn-error " +
                                (deleteEventMutation.isLoading &&
                                deleteEventId == item.id
                                  ? "loading"
                                  : "")
                              }
                              onClick={() => handleDeleteEvent(item.id)}
                              disabled={
                                deleteEventMutation.isLoading &&
                                deleteEventId == item.id
                              }
                            >
                              Chắc chắn xóa!
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination data={data} onPageChange={onPageChange} />
    </>
  );
};

export default function Events() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["events", currentPage],
    queryFn: () =>
      getAllEvents({
        page: currentPage,
        limit: currentLimit,
      }),
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  // --- Delete event
  const [deleteEventId, setDeleteEventId] = useState(0);
  const deleteEventMutation = useMutation(deleteEvent, {
    onSuccess: () => {
      deleteEventMutation.reset();
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err: any) => {
      alert(err?.message?.response?.data?.error ?? "Có lỗi xảy ra");
    },
    onSettled: (data: any, error: any, variables: any, context: any) => {
      setDeleteEventId(0);
    },
  });
  const handleDeleteEvent = (id: number) => {
    setDeleteEventId(id);
    deleteEventMutation.mutate(id);
  };
  // ---

  return (
    <>
      <CreatePopup />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert
          msg={(error as any).response?.data?.error ?? "Có lỗi xảy ra"}
        />
      ) : (
        renderTable({
          deleteEventMutation,
          deleteEventId,
          data,
          handleDeleteEvent,
          onPageChange,
        })
      )}
    </>
  );
}
