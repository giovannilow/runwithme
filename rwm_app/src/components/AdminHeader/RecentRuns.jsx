import React from "react";
import app from "@/pages/firebase";
import { mockDataEvents } from "@/data/mockdata";
import { BiRun } from "react-icons/bi";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  setDoc,
  firestore,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const RecentRuns = () => {
  const db = getFirestore(app);
  // const querySnapShot = getDocs(collection(db, "events"));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1 className="font-bold">Recent Events</h1>
      <ul>
        {events.map((data) => (
          <li
            key={events.recurrence}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-purple-100 rounded-lg p-3">
              <BiRun className="text-purple-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">{data.title}</p>
              <p className="text-gray-400 text-sm">
                {new Date(data.date.seconds * 1000).toLocaleString()}
              </p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm font-semibold">
              {data.distance} KM
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentRuns;
