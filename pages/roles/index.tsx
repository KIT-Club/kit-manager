export default function MemberRole() {
  const fakeData = [
    {
      id: 1,
      name: "Điều hành",
      amount_member: 10,
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 2,
      amount_member: 10,
      name: "Chuyên môn",
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 3,
      amount_member: 10,
      name: "Truyền thông",
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 4,
      amount_member: 10,
      name: "Hậu cần",
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 5,
      name: "Hậu cần",
      amount_member: 10,
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 6,
      name: "Hậu cần",
      amount_member: 10,
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 7,
      name: "Hậu cần",
      amount_member: 10,
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 8,
      amount_member: 10,
      name: "Hậu cần",
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 9,
      amount_member: 10,
      name: "Hậu cần",
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
    {
      id: 10,
      amount_member: 10,
      name: "Hậu cần",
      created_at: "2022-12-30T06:00:35.000000Z",
      updated_at: "2022-12-30T06:00:35.000000Z",
    },
  ];
  return (
    <section id="member_role m-5" data-theme="dark" className="m-5">
      <div className="container mx-auto my-5">
        <div className="btn_add_member py-5 ml-5">
          <label htmlFor="Create-modal" className="btn btn-primary">
            Tạo role
          </label>
        </div>
        <div className="overflow-x-auto">
          <table
            className="table w-full text-center table-compact"
            style={{
              backgroundColor: "#3d4451 !important",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderRadius: "0" }}>Name</th>
                <th>Amount of role</th>
                <th>Update role</th>
                <th style={{ borderRadius: "0" }}>Delete role</th>
              </tr>
            </thead>
            <tbody>
              {fakeData.map((el, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr style={{ borderRadius: "0" }}>
                    <th>
                      <a href={"/member-role/details-role"}>{el.name}</a>
                    </th>
                    <td>{el.amount_member}</td>
                    <td>
                      <a href={"/member-role/Update-role"}>
                        <button className="btn btn-accent">Update</button>
                      </a>
                    </td>
                    <td style={{ borderRadius: "0" }}>
                      <label htmlFor="Delete-modal" className="btn btn-error">
                        Delete
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <input type="checkbox" id="Delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Sau khi xoá thì toàn bộ user sẽ bị loại khỏi role? Bạn có chắc chắn
            xoá role X?
          </h3>
          <div className="modal-action">
            <label htmlFor="Delete-modal" className="btn btn-error">
              Xóa
            </label>
            <label htmlFor="Delete-modal" className="btn btn-neutral-content">
              Hủy
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="Create-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-between mt-5">
            <label className="py-3 text-lg font-bold">Hãy nhập role: </label>
            <input
              type="text"
              placeholder="Tên role"
              className="input input-bordered input-info w-full max-w-xs input_creat_role"
            />
          </div>
          <div className="modal-action">
            <label htmlFor="Create-modal" className="btn">
              Hủy
            </label>
          </div>
        </div>
      </div>
      <div className="pangation_member_role flex my-5">
        <div className="mx-auto">
          <div className="btn-group col mx-auto my-5">
            <button className="btn" id="btn_prev">
              Prev Page
            </button>
            <button className="btn btn-active">1</button>
            <button className="btn">2</button>
            <button className="btn">3</button>
            <button className="btn" id="btn_next">
              Next Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
