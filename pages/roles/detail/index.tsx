/* eslint-disable react/jsx-key */
export default function DetailsRole() {
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
    <section id="detais_member_role" data-theme="dark">
      <div className="detais_member_rolecontainer mx-auto py-5">
        <div className="title_member_role ml-5">
          <h1>
            <span>Tên role: </span>
            Điều hành
          </h1>
          <h2>Danh sách user thuộc role</h2>
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
        <div className="pangation_member_role flex my-3">
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
      </div>
    </section>
  );
}
