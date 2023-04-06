import { Heading, Flex, Input, Button, Link } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  Avatar,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogout(e) {
    setError("");

    try {
      await logout();
      router.push("/Login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      direction={"column"}
      justifyContent={"center"}
    >
      <Flex
        direction="column"
        alignItems="center"
        gap="2"
        background="gray.100"
        p={12}
        rounded={6}
      >
        <Heading mb={6}> Profile Page </Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Avatar size="2xl" src={currentUser.photoURL} />
        <strong>Name:</strong>
        {currentUser.displayName}
        <strong>Email:</strong>
        {currentUser.email}
        <Link href="/UpdateProfile">
          <Button colorScheme={"teal"} w-100 text-center mt={5}>
            Update Profile
          </Button>
        </Link>
      </Flex>
      <Button colorScheme={"red"} onClick={handleLogout} mt={2}>
        Log out
      </Button>
    </Flex>
  );
}
