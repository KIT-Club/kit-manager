import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { createRef, RefObject, useEffect, useState } from "react";
import { parseJwt } from "../../service/Index.service";
// import { tokenCalendar } from "../../repositories/Calendar.repository";

const calendarRef: RefObject<FullCalendar> = createRef();

const events = [
  { title: "event 1", date: "2023-03-01 07:20" },
  { title: "event 2", date: "2023-03-02 07:50" },
];

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

export default function CalendarIndex() {
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) handleFetchCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleFetchCalendar = async () => {
    // const tokenData = parseJwt(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    // );
    // await tokenCalendar(tokenData);
  };

  return (
    <>
      {/* <button onClick={someMethod}>Next</button> */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        //   dateClick={handleDateClick}
        //   eventContent={renderEventContent}
      />
    </>
  );
}
