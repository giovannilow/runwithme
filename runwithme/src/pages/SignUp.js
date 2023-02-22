import { Heading, Flex, Input, Button, Link } from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      router.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent={"center"}>
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}> Sign Up </Heading>
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
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="confirm password"
              variant="filled"
              ref={passwordConfirmRef}
              mb={6}
              type="password"
            />
          </FormControl>
          <Button disabled={loading} colorScheme="teal" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link href="/Login">Log In</Link>
        </div>
      </Flex>
    </Flex>
  );
}
