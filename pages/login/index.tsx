import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
import { login } from "@/repositories/User.repository";
import ErrorAlert from "@/components/alert/Error";
import { useRouter } from "next/router";
import useUserStore from "@/stores/User.store";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { token, setToken } = useUserStore((state: any) => ({
    token: state.token,
    setToken: state.setToken,
  }));

  const _login = async (event: any) => {
    try {
      event.preventDefault();
      setLoading(true);
      setErr("");
      const res = await login(username, password);
      setToken(res.token);
      router.push("/users");
    } catch (err: any) {
      setErr(err.response?.data?.error ?? "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  const errorEl = () => {
    if (err && err.length > 0) {
      return <ErrorAlert msg={err} className="w-96" />;
    }
  };

  return (
    <div className={`${styles.login}`}>
      <div className={`${styles["login_left"]}`}>
        <Image
          className={`${styles.logo}`}
          src="/kit-branding.png"
          alt=""
          width="500"
          height="300"
        />
        <h1 className={`${styles.heading1}`}>Manager</h1>
      </div>
      <div className={`${styles["login_right"]}`}>
        <form className={`${styles["login_content"]}`} onSubmit={_login}>
          <div className={`${styles["login_header"]}`}>
            <h1 className={`${styles["login_header-h1"]}`}>Sign in</h1>
          </div>
          <div className={`${styles["login_item"]}`}>
            <Image src="/user.svg" alt="" width="32" height="32" />
            <input
              placeholder="Username"
              type="text"
              className={`${styles["login-input"]}`}
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className={`${styles["login_item"]}`}>
            <Image src="/lock.svg" alt="" width="32" height="32" />
            <input
              placeholder="Password"
              type="password"
              className={`${styles["login-input"]}`}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {errorEl()}

          <button
            type="submit"
            className={"btn btn-info w-60 " + (loading ? "loading" : "")}
          >
            {!loading && (
              <Image src="/logout.svg" alt="" width="32" height="32" />
            )}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
