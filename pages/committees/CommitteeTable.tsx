import Pagination from "@/components/Pagination";

function CommitteeTable({
  committees,
  deleteCommitteeFunc,
  data,
  onPageChange,
}: {
  committees: Array<any>;
  deleteCommitteeFunc: (id: number) => any;
  data: any;
  onPageChange: any;
}) {
  return (
    <>
      <table className={`table w-full mt-4`}>
        {/* head */}
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên ban</th>
            <th>Số thành viên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {committees.map((committee) => {
            const {
              id,
              name,
              created_at,
            }: {
              id: number;
              name: string;
              created_at: string;
            } = committee;

            return (
              <tr key={id}>
                <th>{id}</th>
                <td>{name}</td>
                <td>{0}</td>
                <td>
                  <div>
                    <button
                      className={`btn btn-sm bg-cyan-500 text-white mr-1`}
                    >
                      Cập nhật
                    </button>
                    <div className="dropdown ">
                      <button
                        className={`btn btn-sm bg-error-500 text-white mr-1`}
                      >
                        Xóa
                      </button>
                      <button
                        tabIndex={0}
                        className="btn btn-error dropdown-content menu p-2 shadow
                         text-white rounded-box"
                        onClick={() => deleteCommitteeFunc(id)}
                      >
                        Chắc chắn xóa!
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination data={data} onPageChange={onPageChange} />
      </div>
    </>
  );
}

export default CommitteeTable;
