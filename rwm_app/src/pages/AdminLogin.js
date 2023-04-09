import { Heading, Flex, Input, Button, Link, Box } from "@chakra-ui/react";
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

  const image = [
    "https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/Admin");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <Box
      style={{
        backgroundImage: `url(${image})`,
        height: "650px",
        backgroundSize: "cover",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      <Flex
        //height="100vh"
        //width="1500px"
        paddingTop="100px"
        alignItems="center"
        direction={"column"}
        justifyContent={"center"}
      >
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}> Admin Login </Heading>
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
