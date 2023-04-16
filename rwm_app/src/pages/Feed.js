// import custom components

import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Feed({ posts }) {
  const { setWallPosts } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (posts && posts.length !== 0) {
      setWallPosts(posts);
    }
  }, [posts]);

  return (
    <Flex
      //height="100vh"
      //width="1500px"
      paddingTop="60px"
      paddingBottom="40px"
      alignItems="center"
      direction={"column"}
      justifyContent={"center"}
      minHeight="calc(100vh - 100px + 10vh)"
    >
      <div className="feed__container">
        <Heading mb={6}> Post Feed </Heading>
        <Button
          onClick={() => router.push("/NewPost")}
          mb={5}
          colorScheme="teal"
        >
          Add a Post
        </Button>
        <Posts />
      </div>
    </Flex>
  );
}

export default Feed;

export async function getServerSideProps() {
  const docs = [];

  // get list of wall posts from Firebase.
  const firestore = getFirestore();
  const postRef = await collection(firestore, "posts");
  const snapshot = await getDocs(postRef);

  const posts = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      timestamp: new Date(data.timestamp).toLocaleString("en-SG", {
        timeZone: "Asia/Singapore",
        hour12: false,
      }),
    };
  });

  if (posts && posts.length !== 0) {
    const keys = Object.keys(posts);
    keys.forEach((key) => {
      docs.push(posts[key]);
    });
  }

  // pass posts to Home component as props.
  return {
    props: {
      posts: docs.sort((a, b) => {
        return b.timestamp - a.timestamp;
      }),
    },
  };
}
