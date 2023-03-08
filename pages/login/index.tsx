import Image from "next/image";
import styles from "./index.module.css";

export default function Login() {
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
        <form className={`${styles["login_content"]}`}>
          <div className={`${styles["login_header"]}`}>
            <h1 className={`${styles["login_header-h1"]}`}>Sign in</h1>
          </div>
          <div className={`${styles["login_item"]}`}>
            <svg
              width="40px"
              height="40px"
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M18 18.7023C18 15.6706 14.5 15 12 15C9.5 15 6 15.6706 6 18.7023M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
                  stroke="#8d8b8b"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <input
              placeholder="Username"
              type="text"
              className={`${styles["login-input"]}`}
              required
            />
          </div>
          <div className={`${styles["login_item"]}`}>
            <svg
              fill="#8d8b8b"
              width="40px"
              height="40px"
              viewBox="-2.4 -2.4 28.80 28.80"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#8d8b8b"
              strokeWidth="0.00024000000000000003"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M16.9499909,19 C16.7183558,20.1411202 15.709479,21 14.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,11.5 C3,10.290521 3.85887984,9.28164422 5,9.05000906 L5,8 C5,5.23857625 7.23857625,3 10,3 C12.7614237,3 15,5.23857625 15,8 L15,9.05000906 C16.1411202,9.28164422 17,10.290521 17,11.5 L17,13 L18.5,13 C19.8807119,13 21,14.1192881 21,15.5 L21,16.5 C21,17.8807119 19.8807119,19 18.5,19 L16.9499909,19 L16.9499909,19 Z M15.9146471,19 L11.5,19 C10.1192881,19 9,17.8807119 9,16.5 L9,15.5 C9,14.1192881 10.1192881,13 11.5,13 L16,13 L16,11.5 C16,10.710487 15.3900375,10.0634383 14.6156506,10.0043921 C14.5785296,10.0131823 14.5398081,10.0178344 14.5,10.0178344 C14.4540106,10.0178344 14.4094714,10.0116254 14.367175,10 L5.5,10 C4.67157288,10 4,10.6715729 4,11.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L14.5,20 C15.1531094,20 15.7087289,19.5825962 15.9146471,19 L15.9146471,19 Z M6,9 L14,9 L14,8 C14,5.790861 12.209139,4 10,4 C7.790861,4 6,5.790861 6,8 L6,9 Z M20,16.5 L20,15.5 C20,14.6715729 19.3284271,14 18.5,14 L11.5,14 C10.6715729,14 10,14.6715729 10,15.5 L10,16.5 C10,17.3284271 10.6715729,18 11.5,18 L18.5,18 C19.3284271,18 20,17.3284271 20,16.5 Z M11.5,15 L12.5,15 C12.7761424,15 13,15.2238576 13,15.5 L13,16.5 C13,16.7761424 12.7761424,17 12.5,17 L11.5,17 C11.2238576,17 11,16.7761424 11,16.5 L11,15.5 C11,15.2238576 11.2238576,15 11.5,15 Z M14.5,15 L15.5,15 C15.7761424,15 16,15.2238576 16,15.5 L16,16.5 C16,16.7761424 15.7761424,17 15.5,17 L14.5,17 C14.2238576,17 14,16.7761424 14,16.5 L14,15.5 C14,15.2238576 14.2238576,15 14.5,15 Z M17.5,15 L18.5,15 C18.7761424,15 19,15.2238576 19,15.5 L19,16.5 C19,16.7761424 18.7761424,17 18.5,17 L17.5,17 C17.2238576,17 17,16.7761424 17,16.5 L17,15.5 C17,15.2238576 17.2238576,15 17.5,15 Z"></path>{" "}
              </g>
            </svg>
            <input
              placeholder="Password"
              type="password"
              className={`${styles["login-input"]}`}
              required
            />
          </div>
          <button type="submit" className={`${styles["submit-button"]}`}>
            <svg
              width="35px"
              height="35px"
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              strokeWidth="0.00024000000000000003"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 6C8 3.79086 9.79086 2 12 2H17.5C19.9853 2 22 4.01472 22 6.5V17.5C22 19.9853 19.9853 22 17.5 22H12C9.79086 22 8 20.2091 8 18V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V18C10 19.1046 10.8954 20 12 20H17.5C18.8807 20 20 18.8807 20 17.5V6.5C20 5.11929 18.8807 4 17.5 4H12C10.8954 4 10 4.89543 10 6V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V6ZM12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L13.7071 15.7071C13.3166 16.0976 12.6834 16.0976 12.2929 15.7071C11.9024 15.3166 11.9024 14.6834 12.2929 14.2929L13.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L13.5858 11L12.2929 9.70711C11.9024 9.31658 11.9024 8.68342 12.2929 8.29289Z"
                  fill="#0F1729"
                ></path>
              </g>
            </svg>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
