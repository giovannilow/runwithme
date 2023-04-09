import React from "react";
import { mockDataEvents } from "@/data/mockdata";
import { BiRun } from "react-icons/bi";

const RecentRuns = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1 className="font-bold">Recent Runs</h1>
      <ul>
        {mockDataEvents.map((events) => (
          <li
            key={events.id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-purple-100 rounded-lg p-3">
              <BiRun className="text-purple-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">{events.title}</p>
              <p className="text-gray-400 text-sm">{events.Date}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">
              {events.Distance}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentRuns;
