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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import app from "@/pages/firebase";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { mockDataProfiles } from "@/data/mockdata";
import { WrapItem, Avatar } from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdEvent, MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Profiles = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUvents] = useState();
  const db = getFirestore(app);

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
        setTotalUvents(usersArray.length); // Set the length of eventsArray as totalEvents
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteProfile = (id) => {
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

  // const deleteApi = async (id, fetchData) => {
  //   const usersDoc = doc(db, "users", id);
  //   await deleteDoc(usersDoc);
  //   Swal.fire("Deleted!", "User profile has been deleted.", "success");
  // };

  const deleteApi = async (id, fetchData) => {
    const usersDoc = doc(db, "users", id);
    await deleteDoc(usersDoc);
    Swal.fire("Deleted!", "User profile has been deleted.", "success");
    router.push("/Admin");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between p-4">
        <h2 className="font-bold text-xl flex items-center">Manage Profiles</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span className="sm:text-left text-right ml-9 font-bold">ID</span>
            <span className="sm:text-left text-right font-bold">Name</span>
            <span className="hidden md:grid font-bold">Email</span>
            <span className="hidden sm:grid font-bold">Password</span>
          </div>
          <ul>
            {users.map((profiles) => (
              <li
                key={profiles.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BsPersonFill className="text-purple-800" />
                  </div>
                  <p className="pl-4 truncate w-24">{profiles.id}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {profiles.userName}
                </p>
                <p className="hidden md:flex">{profiles.userEmail}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{profiles.userPassword}</p>
                  <div className="sm:flex hidden justify-between items-center">
                    <MdDelete
                      className="text-gray-500 hover:text-red-500 cursor-pointer text-2xl mr-10"
                      onClick={() => deleteProfile(profiles.id)}
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

export default Profiles;
