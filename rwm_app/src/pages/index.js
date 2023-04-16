import HomeBefLogin from "./HomeBefLogin";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const {
    currentUser,

    setHasLoaded,
  } = useAuth();

  useEffect(() => {
    setHasLoaded(true);
  }, [currentUser]);

  //default page before log in
  return (
    <>
      <HomeBefLogin />
    </>
  );
};

export default Home;
