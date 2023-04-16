import React from "react";
import { useState, useEffect } from "react";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../contexts/Firebase";
import app from "../../contexts/Firebase";
import { BiRun } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";

const TopData = () => {
  const db = getFirestore(app);

  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState();

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);
        setLoading(false);
        setTotalUsers(usersArray.length); // Set the length of eventsArray as totalEvents
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="grid lg:grid-cols-3 gap-6 p-4 justify-items-center w-full">
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">300 Participants</p>
          <p className="text-gray-600">Today</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg w-4/12">
          <span className="text-green-700 text-lg font-semibold">2 Events</span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{totalEvents}</p>
          <p className="text-gray-600">Events</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg w-4/12">
          <span className="text-black-700 font-semibold">
            <BiRun className="h-11 w-11" />
          </span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{totalUsers}</p>
          <p className="text-gray-600">Active Users</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg w-4/12">
          <span className="text-black-700 font-semibold">
            <HiUsers className="h-11 w-11" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default TopData;
