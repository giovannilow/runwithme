import React from "react";
import { WrapItem, Avatar } from "@chakra-ui/react";

const AdminHeader = () => {
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2 className="font-bold text-xl flex items-center">Dashboard</h2>
      <h2 className="font-bold text-xl flex items-center gap-4">
        Welcome Back
        <WrapItem>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </WrapItem>
      </h2>
    </div>
  );
};

export default AdminHeader;
