import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { mockDataProfiles } from "@/data/mockdata";
import { WrapItem, Avatar } from "@chakra-ui/react";

const Profiles = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-bold text-xl flex items-center">Manage Profiles</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name / Company</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Phone</span>
            <span className="hidden sm:grid">Address</span>
          </div>
          <ul>
            {mockDataProfiles.map((profiles) => (
              <li
                key={profiles.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BsPersonFill className="text-purple-800" />
                  </div>
                  <p className="pl-4">{profiles.name}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {profiles.email}
                </p>
                <p className="hidden md:flex">{profiles.phone}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{profiles.address}</p>
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

export default Profiles;
