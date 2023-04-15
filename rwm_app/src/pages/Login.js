import {
  Heading,
  Flex,
  Input,
  Button,
  Link,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const checkAdmin = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (checkAdmin) {
        router.push("/Admin");
      } else {
        router.push("/");
      }
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <Box
      style={{
        backgroundImage: `url(/groupRunning.svg)`,
        height: "90vh",
        backgroundSize: "cover",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      <Flex
        height="90vh"
        width="full"
        paddingTop="100px"
        alignItems="center"
        direction={"column"}
        justifyContent={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}> Log In </Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                placeholder="enter email"
                ref={emailRef}
                variant="filled"
                mb={3}
                type="email"
                width="300px"
                // onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                placeholder="password"
                variant="filled"
                ref={passwordRef}
                mb={6}
                type="password"
                // onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <Button disabled={loading} colorScheme="teal" type="submit">
              Log In
            </Button>
          </form>
          <Flex w-100 text-center mt-3 style={{ paddingTop: "15px" }}>
            <Link href={"/ForgotPassword"}>Forgot Password?</Link>
          </Flex>
          <Flex w-100 text-center mt-2 style={{ paddingTop: "15px" }}>
            Need an account? &nbsp; <Link href="/SignUp"> Sign Up</Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
