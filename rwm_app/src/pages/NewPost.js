import { Heading, Flex, Input, Button, Link, Box } from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import InputBox from "../components/InputBox";

export default function NewPost() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Flex
      //height="100vh"
      //width="1500px"
      paddingTop="100px"
      alignItems="center"
      direction={"column"}
      justifyContent={"center"}
    >
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}> New Post </Heading>
        <InputBox />
      </Flex>
    </Flex>
  );
}
