import styles from "./[id].module.css";
import Image from "next/image";

export default function User() {
  return (
    <div className="p-4">
      <div className="avatar ml-4 mt-2">
        <div className="w-24 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="John Doe"
          />
        </div>
      </div>
      <h2 className="card-title ml-4 mb-4">John Doe</h2>
      <table className={`table bg-transparent ${styles["user-index-table"]}`}>
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
              <a href="https://facebook.com">https://facebook.com</a>
            </td>
          </tr>
          <tr>
            <th>Github</th>
            <td>
              <a href="https://github.com">https://github.com</a>
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
      <table className={`table`}>
        <thead>
          <th>Tên</th>
          <th>Ngày bắt đầu</th>
          <th>Ngày kết thúc</th>
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
      <button className={`btn btn-primary mt-4 ml-4`}>Cập nhật</button>
    </div>
  );
}
