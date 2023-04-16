import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { FcStackOfPhotos } from "react-icons/fc";
import { firestore, storage } from "../components/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  CloseButton,
} from "@chakra-ui/react";

function InputBox() {
  const [imageToPost, setImageToPost] = useState(null);
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const { currentUser, setIsLoading, wallPosts, setWallPosts } = useAuth();
  const router = useRouter();

  const updateWallPosts = (post) => {
    if (post) {
      const updatedwallPosts = [...wallPosts, post];
      setWallPosts(
        updatedwallPosts.sort((a, b) => {
          return b.timestamp - a.timestamp;
        })
      );
    }
  };

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;
    const timestamp = new Date();
    const dateString = timestamp.toString();

    setIsLoading(true);
    const postUuid = uuidv4();
    const post = {
      id: postUuid,
      message: inputRef.current.value,
      timestamp: dateString,
      createdBy: currentUser.displayName,
      userAvatar: currentUser.photoURL,
      imageUrl: "",
      likes: 0,
      likedBy: [],
    };

    function dataURLtoBlob(dataURL) {
      const parts = dataURL.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const byteCharacters = atob(parts[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    }

    setDoc(doc(collection(firestore, "posts"), postUuid), post).then(() => {
      if (imageToPost) {
        setIsLoading(true);
        const imageBlob = dataURLtoBlob(imageToPost);
        const uploadTask = uploadBytesResumable(
          ref(storage, `posts/${postUuid}` + ".png"),
          imageBlob
        );
        removeImage();
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            alert(error);
            setIsLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              post.imageUrl = url;
              setDoc(doc(collection(firestore, "posts"), postUuid), post, {
                merge: true,
              }).then(() => {
                updateWallPosts(post);
                setIsLoading(false);
              });
            });
          }
        );
      } else {
        updateWallPosts(post);
      }
      setIsLoading(false);
    });
    inputRef.current.value = "";
    router.push("/Feed");
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    filepickerRef.current.value = null;
    setImageToPost(null);
  };

  return (
    <>
      <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar src={currentUser?.photoURL} />

              <Box>
                <Heading size="sm">{currentUser?.displayName}</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody alignItems="center">
          <form onSubmit={sendPost}>
            <FormControl>
              <Input
                type="text"
                variant="filled"
                placeholder="What's on your mind?"
                ref={inputRef}
              />
            </FormControl>
          </form>

          {imageToPost && (
            <Box mb="4" mt="4">
              <img src={imageToPost} alt="" />
            </Box>
          )}
          {imageToPost && <CloseButton onClick={removeImage} />}
        </CardBody>

        <CardFooter
          sx={{
            "& > button": {
              minW: "180px",
            },
          }}
          justifyContent="space-between"
        >
          <>
            <Button
              variant="ghost"
              leftIcon={<FcStackOfPhotos />}
              onClick={() => filepickerRef.current.click()}
            >
              Add a picture
            </Button>
            <input // Add this element
              onChange={addImageToPost}
              ref={filepickerRef}
              type="file"
              hidden
            />
            <Button onClick={sendPost} colorScheme="teal">
              Post
            </Button>
          </>
        </CardFooter>
      </Card>
    </>
  );
}

export default InputBox;
