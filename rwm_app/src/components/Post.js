import { useState } from "react";
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
} from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import "firebase/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../pages/firebase";

function Post({
  createdBy,
  message,
  imageUrl,
  timestamp,
  userAvatar,
  likes,
  postId,
}) {
  const [like, setLike] = useState(null);
  const [likesNum, setLikesNum] = useState(likes);

  const handleLike = async () => {
    if (like) {
      // If user already liked the post, decrease likes by 1
      await updateDoc(doc(collection(firestore, "posts"), postId), {
        likes: likes - 1,
      });
      setLike(false);
      setLikesNum(likes); // Update likes state
    } else {
      // If user hasn't liked the post, increase likes by 1
      await updateDoc(doc(collection(firestore, "posts"), postId), {
        likes: likes + 1,
      });
      setLike(true);
      setLikesNum(likes + 1); // Update likes state
    }
  };

  return (
    <div className="post__container">
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
            {like ? "Liked" : "Like"}
          </Button>
          <Flex alignItems={"center"}>
            <Stat>
              <StatNumber fontSize="md">{likesNum} likes</StatNumber>
            </Stat>
          </Flex>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Post;
