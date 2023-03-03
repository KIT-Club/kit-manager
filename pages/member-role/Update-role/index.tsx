/* eslint-disable react/jsx-key */
export default function UpdateRole() {
  const fakeUser = [
    {
      id: 0,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 1,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 2,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 3,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 4,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 5,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 6,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 7,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 8,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
    {
      id: 9,
      name: "Nguyen Van A",
      major: "An toàn thông tin",
      MSSV: "AT000000",
    },
  ];
  return (
    <section id="Update-role" data-theme="dark">
      <div className="container mx-auto">
        <form className="grid grid-cols-12 text-center gap-4">
          <div className="col-span-12 md:col-span-10 lg:col-span-8 md:col-start-2 lg:col-start-3 col-start-1">
            <input
              required
              type="text"
              placeholder="Tên role"
              className="input w-full max-w-xs md:max-w-md lg:max-w-lg input-brodered input-secondary mt-3"
            />
          </div>
        </form>
      </div>
      <h2 className="text-center text-2xl my-3">Danh sách user thuộc role</h2>
      <div className="search_user text-center">
        <input
          type="text"
          placeholder="Tìm kiếm user"
          className="input w-full max-w-lg input-brodered input-secondary"
        />
      </div>
      <div className="overflow-x-auto my-3">
        <table className="table table-normal w-full text-center">
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ và tên</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody id="listingTable">
            {fakeUser.map((el, index) => {
              return (
                <tr>
                  <td>{el.MSSV}</td>
                  <td>{el.name}</td>
                  <td>{el.major}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="btn btn-error mr-5">Xóa role</button>
        <button className="btn btn-accent">Cập nhật</button>
      </div>
      <div className="pangation_member_role flex my-2">
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
