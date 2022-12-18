import Link from "next/link";

export default function DetailEvent() {
  interface fakeData {
    id: number;
    avatar: string;
    full_name: string;
    username: string;
    Ma_SV: string;
    role: string;
    class: string;
  }

  interface fakeDataEvent {
    id: number;
    name: String;
    description: String;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }

  const fakeData = [
    {
      id: 1,
      avatar:
        "https://cdn.dribbble.com/userupload/4047250/file/original-fa17d9af58a0b2122fd6a424c9618a0f.jpg?compress=1&resize=1024x768",
      username: "phanhuuviet",
      full_name: "phan huu viet",
      Ma_SV: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 2,
      avatar:
        "https://cdn.dribbble.com/userupload/4047250/file/original-fa17d9af58a0b2122fd6a424c9618a0f.jpg?compress=1&resize=1024x768",
      username: "phanhuuviet",
      full_name: "phan huu viet",
      Ma_SV: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 3,
      avatar:
        "https://cdn.dribbble.com/userupload/4047250/file/original-fa17d9af58a0b2122fd6a424c9618a0f.jpg?compress=1&resize=1024x768",
      username: "phanhuuviet",
      full_name: "phan huu viet",
      Ma_SV: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 4,
      avatar:
        "https://cdn.dribbble.com/userupload/4047250/file/original-fa17d9af58a0b2122fd6a424c9618a0f.jpg?compress=1&resize=1024x768",
      username: "phanhuuviet",
      full_name: "phan huu viet",
      Ma_SV: "ct050455",
      role: "dev",
      class: "KIT",
    },
    {
      id: 5,
      avatar:
        "https://cdn.dribbble.com/userupload/4047250/file/original-fa17d9af58a0b2122fd6a424c9618a0f.jpg?compress=1&resize=1024x768",
      username: "phanhuuviet",
      full_name: "phan huu viet",
      Ma_SV: "ct050455",
      role: "dev",
      class: "KIT",
    },
  ];

  const fakeDataEvent = {
    id: 1,
    name: "Tham dự buổi offline",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ligula gravida, sagittis lectus in, ornare ex. Duis ut nibh arcu. Maecenas quis massa consequat, feugiat eros dapibus",
    start_date: "2002-07-06",
    end_date: "2002-07-06",
    created_at: "2002-07-06",
    updated_at: "2002-07-06",
    deleted_at: "2002-07-06",
  };

  return (
    <div className="m-5">
      <div className="my-0 mx-auto w-[1150px] p-5 bg-gray-100 rounded-xl">
        {/* Title */}
        <div className="pb-4 border-b-2 mb-2">
          <h2 className="text-3xl font-semibold">{fakeDataEvent.name}</h2>
          <h3 className="font-normal text-[#8b8b8b]">
            {fakeDataEvent.description}
          </h3>
        </div>

        <div className="border-b-2 border-dashed mb-6 pb-7">
          <div className="w-full max-w-sm pb-5">
            <span className="label-text font-semibold text-[20px]">
              Chi tiết
            </span>
          </div>

          <div className="flex gap-[100px] ">
            <div className="flex flex-col w-full max-w-sm">
              <label className="label-text font-semibold text-[16px] mb-2 inline-flex">
                Ngày bắt đầu: {fakeDataEvent.start_date}
              </label>
            </div>
            <div className="flex flex-col w-full max-w-sm">
              <label className="label-text font-semibold text-[16px] mb-2 inline-flex">
                Ngày kết thúc: {fakeDataEvent.end_date}
              </label>
            </div>
          </div>
        </div>

        {/* Participant list  */}
        <div className="mb-4">
          <div className="w-full max-w-sm pb-5">
            <span className="label-text font-semibold text-[20px]">
              Danh sách người tham gia
            </span>
          </div>
          {/* List of user */}
          <div className="max-h-[350px] overflow-y-scroll">
            <table className="table w-full border-collapse relative">
              {/* head */}
              <thead className="h-[74px]">
                <tr className="sticky top-0 z-10">
                  <th className="static"></th>
                  <th>Họ và tên</th>
                  <th>Role</th>
                  <th>Ban</th>
                  <th className="min-w-[150px]"></th>
                </tr>
              </thead>
              <tbody>
                {fakeData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th className="static"></th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={data.avatar}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data.full_name}</div>
                            <div className="text-sm opacity-50">
                              {data.Ma_SV}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{data.role}</td>
                      <td>{data.class}</td>
                      <th>
                        <Link href={`/user/${data.id}`}>
                          <button className="btn btn-ghost btn-xs">
                            Chi tiết
                          </button>
                        </Link>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
