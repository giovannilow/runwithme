// import useContext to get shared data.

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Stat,
  StatNumber,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "firebase/firestore";
import { useRouter } from "next/router";

import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";

function Post({
  createdBy,
  message,
  imageUrl,
  timestamp,
  userAvatar,
  likes,
  likedBy,
  postId,
}) {
  const [likesNum, setLikesNum] = useState(likes);
  const firestore = getFirestore();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [like, setLike] = useState(
    Object.values(likedBy).includes(currentUser.uid)
  );

  const handleLike = async () => {
    const postRef = doc(collection(firestore, "posts"), postId);
    const postDoc = await getDoc(postRef);

    // Get list of users who have liked this post
    const likedBy = postDoc.data().likedBy;

    if (!likedBy.includes(currentUser.uid)) {
      // Add user to list of users who have liked this post
      likedBy.push(currentUser.uid);

      // Update post document with new likes and likedBy fields
      await updateDoc(postRef, {
        likes: likesNum + 1,
        likedBy,
      });

      setLike(true);
      setLikesNum(likesNum + 1);
    } else {
      const index = likedBy.indexOf(currentUser.uid);
      if (index !== -1) {
        likedBy.splice(index, 1);
      }

      // Update post document with new likes and likedBy fields
      await updateDoc(postRef, {
        likes: likesNum - 1,
        likedBy,
      });

      setLike(false);
      setLikesNum(likesNum - 1);
    }
  };

  const handleDelete = async () => {
    const postRef = doc(firestore, "posts", postId);
    await deleteDoc(postRef);
    router.push("/Feed");
  };

  return (
    <Card maxW="md" boxShadow="xl">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={createdBy} src={userAvatar} />

            <Box>
              <Heading size="sm">{createdBy}</Heading>
              <Text>{timestamp}</Text>
            </Box>
          </Flex>
          {createdBy == currentUser?.displayName && (
            <Menu mr="auto">
              <MenuButton>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{message}</Text>
        <Box mb="4" mt="4">
          {imageUrl && (
            <Box mb="4" mt="4">
              <Image src={imageUrl} alt="" />
            </Box>
          )}
        </Box>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
            maxW: "140px",
          },
        }}
      >
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<BiLike />}
          onClick={handleLike}
        >
          {like === true ? "Liked" : "Like"}
        </Button>
        <Flex alignItems={"center"}>
          <Stat>
            <StatNumber fontSize="md">{likesNum} likes</StatNumber>
          </Stat>
        </Flex>
      </CardFooter>
    </Card>
  );
}

function Posts() {
  const { wallPosts } = useAuth();
  const firestore = getFirestore();

  const [posts, setPosts] = useState([]);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.postId !== postId));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {wallPosts.map((post) => (
        <Post
          key={post.id}
          createdBy={post.createdBy}
          message={post.message}
          timestamp={post.timestamp}
          imageUrl={post.imageUrl}
          userAvatar={post.userAvatar}
          likes={post.likes}
          postId={post.id}
          likedBy={post.likedBy}
        />
      ))}
    </div>
  );
}

export default Posts;
