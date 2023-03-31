import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { mockDataEvents } from "@/data/mockdata.js";
import { MdEvent } from "react-icons/md";
import { WrapItem, Avatar } from "@chakra-ui/react";

const Events = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-bold text-xl flex items-center">Manage Events</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer">
            <span className="text-left pl-10">Title / Date</span>
            <span className="sm:text-left text-right ml-10">Time</span>
            <span className="hidden md:grid">Distance</span>
            <span className="hidden sm:grid">Location</span>
            <span className="hidden sm:grid">Details</span>
          </div>
          <ul>
            {mockDataEvents.map((events) => (
              <li
                key={events.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MdEvent className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold whitespace-nowrap">
                      {events.title}
                    </p>
                    <p className="text-gray-800 text-sm">{events.Date}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span className="ml-10">{events.Time}</span>
                </p>
                <p className="hidden md:flex">{events.Distance}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{events.Location}</p>
                </div>
                <div className="sm:flex hidden justify-between items-center">
                  <p
                    className={
                      events.Details == "Competitive Run"
                        ? "bg-green-200 p-2 rounded-lg"
                        : events.Details == "Team Challenge"
                        ? "bg-blue-200 p-2 rounded-lg"
                        : events.Details == "Virtual Run"
                        ? "bg-yellow-200 p-2 rounded-lg"
                        : events.Details.includes("Marathon")
                        ? "bg-purple-200 p-2 rounded-lg"
                        : "bg-red-200 p-2 rounded-lg"
                    }
                  >
                    {events.Details}
                  </p>
                  <BsThreeDotsVertical />
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
