import { Heading, Flex, Input, Button, Link } from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      direction={"column"}
      justifyContent={"center"}
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
        <Flex w-100 text-center mt-3>
          <Link href={"/ForgotPassword"}>Forgot Password?</Link>
        </Flex>
      </Flex>
      <Flex w-100 text-center mt-2>
        Need an account? <Link href="/SignUp">Sign Up</Link>
      </Flex>
    </Flex>
  );
}
