import Link from "next/link";

export default function Events() {
  // fake data API
  const fakeData = [
    {
      id: 1,
      name: "Chào tân",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 2,
      name: "Chào tân 1",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 3,
      name: "Chào tân 2",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 4,
      name: "Chào tân 3",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 5,
      name: "Chào tân 4",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 6,
      name: "Chào tân 5",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 7,
      name: "Chào tân 6",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 8,
      name: "Chào tân 7",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 9,
      name: "Chào tân 8",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 10,
      name: "Chào tân 9",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
  ];

  return (
    <div className="m-5">
      <div className="mx-auto my-0 w-[68.75rem]">
        <button className="btn w-36 mb-4 mr-3 float-right">Thêm event</button>
        <div className="overflow-x-auto w-full mb-6">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Tên event</th>
                <th>Số lượng</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fakeData.map((data, key) => {
                return (
                  <tr key={key}>
                    <th>{key + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.amount}</td>
                    <td>{data.startDay}</td>
                    <td>{data.endDay}</td>
                    <td>
                      <Link href={`/events/${data.id}/update`}>
                        <button className="btn btn-success mr-4">Update</button>
                      </Link>
                      <button className="btn btn-error">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center">
          <div className="btn-group">
            <button className="btn">1</button>
            <button className="btn btn-active">2</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
          </div>
        </div>
      </div>
    </div>
  );
}
