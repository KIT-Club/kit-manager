import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { createRef, RefObject } from "react";

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
