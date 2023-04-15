import {
  Heading,
  Flex,
  Input,
  Button,
  Link,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
          <Heading mb={6}> Reset Password </Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
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
              />
            </FormControl>
            <Button
              disabled={loading}
              colorScheme="teal"
              type="submit"
              alignSelf="flex-end"
            >
              Reset Password
            </Button>
          </form>
          <Flex width="100" mt="5">
            Need an account? <Link href="/SignUp">Sign Up</Link>
          </Flex>
          <Flex width="100" mt="5">
            Already have an account? <Link href="/Login">Login</Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
