import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { MdEvent } from "react-icons/md";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const AdminTopBar = ({ children }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { currentUser, logout, setisAdmin } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      setisAdmin(false);
      router.push("/Login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full bg-white h-16 px-4 border-b-2 border-gray-300">
        <div className="flex items-center space-x-4">
          <Link href="/Admin">
            <div
              className={`p-2 rounded-lg ${
                router.pathname === "/Admin"
                  ? "bg-purple-800 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <h2 className="text: font-semibold">Dashboard</h2>
            </div>
          </Link>
          <Link href="/Profiles">
            <div
              className={`ml-2 p-2 rounded-lg ${
                router.pathname === "/Profiles"
                  ? "bg-purple-800 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <h2 className="text: font-semibold">Profiles</h2>
            </div>
          </Link>
          <Link href="/EventsAdmin">
            <div
              className={`ml-2 p-2 rounded-lg ${
                router.pathname === "/EventsAdmin"
                  ? "bg-purple-800 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              <h2 className="text: font-semibold">Events</h2>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/" onClick={() => handleLogout()}>
            <div
              className="ml-2 p-2 rounded-lg bg-gray-100 text-gray-800
             hover:bg-gray-200 cursor-pointer"
            >
              <h2 className="text: font-normal">Logout</h2>
            </div>
          </Link>
        </div>
      </div>
      <main className="w-full flex-grow">{children}</main>
    </div>
  );
};

export default AdminTopBar;
