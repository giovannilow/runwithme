import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { generateDate } from "@/components/Calendar";
import cn from "@/components/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { firestore } from "../contexts/Firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [events, setEvents] = useState([
  // 	{
  // 	  title: "Event 1",
  // 	  date: "Tue Apr 11 2023",
  // 	  distance: "5 miles",
  // 	  pace: "9:30/mile",
  // 	  recurrence: "Weekly",
  // 	  startLocation: "Central Park"
  // 	},
  // 	{
  // 	  title: "Event 2",
  // 	  date: "Fri Apr 14 2023",
  // 	  distance: "10 miles",
  // 	  pace: "8:45/mile",
  // 	  recurrence: "Monthly",
  // 	  startLocation: "Battery Park"
  // 	}
  //   ]);
  const eventDate = new Date();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  useEffect(() => {
    const fetchData = async () => {
      //   try {
      const querySnapshot = await getDocs(collection(firestore, "events"));
      const eventsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsArray);
      setLoading(false);
      //   } catch (error) {
      // 	console.error("Error fetching events:", error);
      // 	setLoading(false);
      //   }
    };

    fetchData();
  }, []);

  // if (loading) {
  // return <Text>Loading events...</Text>;
  // }

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
      <div className="w-96 h-96 ">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center ">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className=" grid grid-cols-7 ">
          {generateDate(today.month(), today.year(), events).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-14 grid place-content-center text-sm border-t relative"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                  {events.filter(
                    (event) =>
                      event.date.toDate().toDateString() ===
                      date.toDate().toDateString()
                  ).length > 0 && (
                    <div className="absolute top-12 right-4 -mt-2 -mr-2 flex">
                      {events
                        .filter(
                          (event) =>
                            event.date.toDate().toDateString() ===
                            date.toDate().toDateString()
                        )
                        .map((event, index) => (
                          <div
                            key={index}
                            className="w-1 h-1 bg-red-600 rounded-full mr-1"
                            title={event.title}
                          ></div>
                        ))}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="h-96 w-96 sm:px-5">
        <h1 className="font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <div className="mt-5">
          {events
            .filter((event) => {
              // const eventDate = new Date(event.date);
              const eventDate = event.date.toDate();
              return (
                eventDate.toDateString() === selectDate.toDate().toDateString()
              );
            })
            .map((event, index) => (
              <div key={index} className="mb-2">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p>
                  Distance: {event.distance}, Pace: {event.pace}, Recurrence:{" "}
                  {event.recurrence}
                </p>
                <p>Start Location: {event.startLocation}</p>
              </div>
            ))}
          {events.filter(
            (event) =>
              event.date.toDate().toDateString() ===
              selectDate.toDate().toDateString()
          ).length === 0 && (
            <p className="text-gray-400">No events for today.</p>
          )}
        </div>
      </div>
    </div>
  );
}
