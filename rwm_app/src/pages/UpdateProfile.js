import { Heading, Flex, Input, Button, Link } from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, setNewPassword, setNewEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(setNewEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(setNewPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent={"center"}>
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}> Update Profile </Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl isRequired defaultValue={currentUser.email}>
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
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              id="password"
              placeholder="Leave black to keep the same"
              variant="filled"
              ref={passwordRef}
              mb={6}
              type="password"
              width="300px"
              // onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="Leave black to keep the same"
              variant="filled"
              ref={passwordConfirmRef}
              mb={6}
              type="password"
            />
          </FormControl>
          <Button disabled={loading} colorScheme="teal" type="submit">
            Update
          </Button>
        </form>
        <div className="w-100 text-center mt-2">
          <Link href="/">Cancel</Link>
        </div>
      </Flex>
    </Flex>
  );
}
