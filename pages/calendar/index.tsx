import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import { createRef, RefObject, useEffect, useState } from "react";
import { tokenCalendar } from "@/repositories/Calendar.repository";
import LocalStorageService from "@/service/LocalStorage.service";
import { loadData, saveData } from "@/libs/storage";
import { logout } from "@/libs/user";
import { useRouter } from "next/router";
import {
  fetchCalendarWithPost,
  processCalendar,
  processMainForm,
  processSemesters,
  processStudent,
  filterTrashInHtml,
  exportToGoogleCalendar,
} from "@/libs/calendar";

export default function CalendarIndex() {
  const calendarRef: RefObject<FullCalendar> = createRef();

  // const handleDateClick = (arg: any) => {
  //   // bind with an arrow function
  //   //   alert(arg.title);
  // };

  // const renderEventContent = (event: any) => {
  //   return (
  //     <>
  //       <div>
  //         <p>
  //           <b>{event.title}</b>
  //           <i>{event.date}</i>
  //         </p>
  //       </div>
  //     </>
  //   );
  // };

  // const someMethod = () => {
  //   const calendarApi = calendarRef?.current?.getApi();
  //   calendarApi?.prev();
  // };
  const calendarLoginPath = "/calendar/login";
  let { calendar, signInToken, semesters, mainForm, student } = loadData();
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const res = await tokenCalendar(token || "");
          LocalStorageService.set("tokenCalender", res.request);
        } catch {
          console.log("Có lỗi xảy ra");
        }
      })();
    }
  }, [token]);

  const onChangeSemester = async (e: any) => {
    setErrorMessage("");
    setLoading(true);
    let oldValue = semesters.currentSemester;
    try {
      semesters.currentSemester = e.target.value;
      saveData({ semesters });

      const hidSemester = semesters.semesters.find((v: any) =>
        v.value == semesters.currentSemester ? v : undefined
      );

      mainForm["drpSemester"] = semesters.currentSemester;
      mainForm["hidSemester"] =
        hidSemester.from + "_" + hidSemester.to + "_" + hidSemester.th;

      let response = await fetchCalendarWithPost(mainForm, signInToken);
      response = filterTrashInHtml(response);
      calendar = await processCalendar(response);
      student = processStudent(response);
      mainForm = processMainForm(response);
      semesters = processSemesters(response);

      saveData({
        mainForm,
        semesters,
        calendar,
        student,
      });
    } catch (_) {
      setErrorMessage("Có lỗi xảy ra khi lấy dữ liệu!");
      semesters.currentSemester = oldValue;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
    router.push(calendarLoginPath);
  };

  if (!(signInToken && signInToken.length)) {
    logout();
    router.push(calendarLoginPath);
    return;
  }

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <span>Chọn học kỳ</span>
        <select
          value={semesters.currentSemester}
          onChange={onChangeSemester}
          className="select"
          disabled={loading}
        >
          {semesters.semesters.map((item: any) => {
            return (
              <option
                key={item.value}
                value={item.value}
              >{`${item.from} - ${item.to} - KỲ ${item.th}`}</option>
            );
          })}
        </select>
        <div className="flex-1"></div>
        <button
          type="button"
          className="btn"
          disabled={loading}
          onClick={logoutUser}
        >
          Thoát
        </button>
      </div>
      {/* <button onClick={someMethod}>Next</button> */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendar?.data_subject}
        //   dateClick={handleDateClick}
        //   eventContent={renderEventContent}
      />
    </>
  );
}
