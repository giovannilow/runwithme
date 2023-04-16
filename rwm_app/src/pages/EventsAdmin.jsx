import React from "react";
import { useState, useEffect } from "react";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  setDoc,
  firestore,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "../contexts/Firebase";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash, BsPencilSquare } from "react-icons/bs";
import { mockDataEvents } from "@/data/mockdata.js";
import { MdEvent, MdEdit, MdDelete } from "react-icons/md";
import { WrapItem, Avatar } from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const Events = () => {
  const db = getFirestore(app);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState();
  const [loading, setLoading] = useState(true);

  const deleteEvent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id, fetchData) => {
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
    Swal.fire("Deleted!", "Your event has been deleted.", "success");
  };

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
        setTotalEvents(eventsArray.length); // Set the length of eventsArray as totalEvents
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-bold text-xl flex items-center">Manage Events</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer">
            <span className="text-left pl-10">Title / Date & Time</span>
            <span className="sm:text-left text-right ml-10">
              Pace (mins/km)
            </span>
            <span className="hidden md:grid">Distance (km)</span>
            <span className="hidden sm:grid">Start Location</span>
            <span className="hidden sm:grid">Recurrence</span>
          </div>
          <ul>
            {events.map((data) => (
              <li
                key={data.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MdEvent className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold whitespace-nowrap">
                      {data.title}
                    </p>
                    <p className="text-gray-800 text-sm">
                      {new Date(data.date.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span className="ml-10">{data.pace}</span>
                </p>
                <p className="hidden md:flex">{data.distance}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{data.startLocation}</p>
                </div>
                <div className="sm:flex hidden justify-between items-center">
                  <p
                    className={
                      data.recurrence === "one-off"
                        ? "bg-green-200 p-2 rounded-lg"
                        : data.recurrence === "recurrent"
                        ? data.recurrenceFrequency === "biweekly"
                          ? "bg-blue-200 p-2 rounded-lg"
                          : data.recurrenceFrequency === "monthly"
                          ? "bg-yellow-200 p-2 rounded-lg"
                          : data.recurrenceFrequency === "daily"
                          ? "bg-red-200 p-2 rounded-lg"
                          : "bg-purple-200 p-2 rounded-lg"
                        : ""
                    }
                  >
                    {data.recurrence === "one-off"
                      ? "one-off"
                      : data.recurrence === "recurrent" &&
                        data.recurrenceFrequency}
                  </p>
                  <div className="flex items-center ml-1">
                    {/* <MdEdit className="text-gray-500 hover:text-blue-500 cursor-pointer text-2xl" />
                    <div className="w-4"></div> */}
                    <MdDelete
                      className="text-gray-500 hover:text-red-500 cursor-pointer text-2xl mr-10"
                      onClick={() => deleteEvent(data.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Events;
