import React from "react";
import { WrapItem, Avatar } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";

const AdminHeader = () => {
  const { currentUser } = useAuth();
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2 className="font-bold text-xl flex items-center">Dashboard</h2>
      <h2 className="font-bold text-xl flex items-center gap-4">
        Welcome Back
        <WrapItem>
          <Avatar name={currentUser.displayName} src={currentUser.photoURL} />
        </WrapItem>
      </h2>
    </div>
  );
};

export default AdminHeader;
