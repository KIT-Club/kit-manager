import styles from "./index.module.css";
import Image from "next/image";

export default function User() {
  return (
    <div className="p-8 prose lg:prose-md">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image
            src="/sample-avatar.jpg"
            alt="John Doe"
            width="96"
            height="96"
            className="my-0"
          />
        </div>
      </div>
      <h2 className="card-title mt-2">John Doe</h2>
      <table className={`table ${styles["user-table"]}`}>
        <tbody>
          <tr>
            <th>Email</th>
            <td>example@gmail.com</td>
          </tr>
          <tr>
            <th>MSSV</th>
            <td>AT010101</td>
          </tr>
          <tr>
            <th>Lớp</th>
            <td>AT01</td>
          </tr>
          <tr>
            <th>Ngành học</th>
            <td>An Toàn Thông Tin</td>
          </tr>
          <tr>
            <th>Ngày sinh</th>
            <td>01/01/1980</td>
          </tr>
          <tr>
            <th>Facebook</th>
            <td>
              <input
                className="input input-sm"
                type="text"
                name="facebook"
                placeholder="Facebook URL..."
                value="https://www.facebook.com/zuck"
              ></input>
            </td>
          </tr>
          <tr>
            <th>Github</th>
            <td>
              <input
                className="input input-sm"
                type="text"
                name="Github"
                placeholder="Github URL..."
                value="https://github.com"
              ></input>
            </td>
          </tr>
          <tr>
            <th>Ban</th>
            <td>Điều hành</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>Admin</td>
          </tr>
        </tbody>
      </table>

      <h3 className="">Event đã tham gia</h3>
      <table className={`table mb-4`}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>KIT Hack</th>
            <td>20/03/2023</td>
            <td>21/03/2023</td>
          </tr>
          <tr>
            <th>KIT Hack</th>
            <td>20/03/2023</td>
            <td>21/03/2023</td>
          </tr>
          <tr>
            <th>KIT Hack</th>
            <td>20/03/2023</td>
            <td>21/03/2023</td>
          </tr>
        </tbody>
      </table>
      <button className={`btn btn-primary`}>Lưu</button>
    </div>
  );
}
