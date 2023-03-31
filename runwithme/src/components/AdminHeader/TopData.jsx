import React from "react";

const TopData = () => {
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
          <p className="text-2xl font-bold">25</p>
          <p className="text-gray-600">Events</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg w-4/12">
          <span className="text-green-700 text-lg font-semibold">+ 11%</span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">100</p>
          <p className="text-gray-600">Users</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg w-4/12">
          <span className="text-green-700 text-lg font-semibold">+ 17%</span>
        </p>
      </div>
    </div>
  );
};

export default TopData;
