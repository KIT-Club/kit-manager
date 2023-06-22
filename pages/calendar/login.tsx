import { useState } from "react";
import { saveData } from "@/libs/storage";
import {
  fetchCalendarWithGet,
  processCalendar,
  processMainForm,
  processSemesters,
  processStudent,
  filterTrashInHtml,
} from "@/libs/calendar";
import { login, logout } from "@/libs/user";
import { useRouter } from "next/router";

export default function MyComponent() {
  const history = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const signInToken = await login(username, password);
      const response = filterTrashInHtml(
        await fetchCalendarWithGet(signInToken)
      );
      const calendar = await processCalendar(response);
      const student = processStudent(response);
      const mainForm = processMainForm(response);
      const semesters = processSemesters(response);

      saveData({
        signInToken,
        mainForm,
        semesters,
        calendar,
        student,
      });

      history.push("/calendar");
    } catch (e) {
      setErrorMessage(
        "Có lỗi xảy ra khi lấy thông tin thời khóa biểu hoặc tài khoản/mật khẩu không đúng!"
      );
      logout();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUserResponse = async (e: any) => {
    e.preventDefault();
    setErrorMessage2("");

    try {
      const response = filterTrashInHtml(userResponse);
      const calendar = await processCalendar(response);
      const student = processStudent(response);
      const mainForm = processMainForm(response);
      const semesters = processSemesters(response);

      saveData({
        mainForm,
        semesters,
        calendar,
        student,
      });

      history.push("/calendar");
    } catch (e) {
      setErrorMessage2("Có lỗi xảy ra khi lấy thông tin thời khóa biểu!");
      logout();
    }
  };

  return (
    <section>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card w-100 bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-lg">
              XEM THỜI KHÓA BIỂU TỪ TÀI KHOẢN TRƯỜNG
            </h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="input input-md w-full input-bordered"
                required
                disabled={loading}
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="input input-md w-full input-bordered mt-3"
                required
                disabled={loading}
              />

              <button
                type="submit"
                className="btn w-full mt-4"
                disabled={loading}
              >
                Đăng nhập
              </button>

              {errorMessage && errorMessage.length && (
                <div className="alert alert-error shadow-lg mt-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="card w-100 bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">
              XEM THỜI KHÓA BIỂU TỪ MÃ NGUỒN
            </h2>
            <p className="text-sm">
              Nhằm tăng tính bảo mật cho tài khoản của các bạn, web đã hỗ trợ
              thêm tính năng dịch thời khoá biểu từ mã nguồn HTML.
            </p>
            <p className="text-sm">Hướng dẫn:</p>
            <ul className="steps steps-vertical bg-base-100 rounded-lg px-2 py-2">
              <li className="step">
                <span className="text-left text-sm">
                  Bạn vào trang quản lí của trường tại địa chỉ{" "}
                  <i>
                    <u>
                      <a
                        href="http://qldt.actvn.edu.vn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        http://qldt.actvn.edu.vn
                      </a>
                    </u>
                  </i>{" "}
                  và tiến hành đăng nhập.
                </span>
              </li>
              <li className="step text-sm">
                <span>
                  Vào mục:{" "}
                  <i>
                    <b>Đăng ký học</b>
                  </i>{" "}
                  →{" "}
                  <i>
                    <b>Xem kết quả ĐKH</b>
                  </i>
                  .
                </span>
              </li>
              <li className="step">
                <span className="text-left text-sm">
                  Chuột phải chọn{" "}
                  <i>
                    <b>Xem mã nguồn (View page source)</b>
                  </i>{" "}
                  và copy toàn bộ code.
                </span>
              </li>
              <li className="step text-sm">
                <span>
                  Dán code đó vào ô bên dưới và bấm <b>Xem lịch học</b>.
                </span>
              </li>
            </ul>
            <form className="mt-4" onSubmit={handleSubmitUserResponse}>
              <textarea
                rows={1}
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Dán mã nguồn của trang xem lịch học tại đây..."
                className="textarea w-full input-bordered"
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="btn w-full bg-neural-focus mt-4"
                disabled={loading}
              >
                Xem lịch học
              </button>

              {errorMessage2 && errorMessage2.length && (
                <div className="alert alert-error shadow-lg mt-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errorMessage2}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
