import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const Links = [
  {
    name: "Events",
    url: "/Events",
  },
  {
    name: "Post Feed",
    url: "/Feed",
  },
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={children.url}
  >
    {children.name}
  </Link>
);

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const toast = useToast();
  const router = useRouter();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      router.push("/Login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        {error &&
          toast({
            position: "top-center",
            render: () => (
              <Box color="white" p={3} bg="red.500">
                {error}
              </Box>
            ),
          })}
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box onClick={() => router.push("/HomeAftLogin")}>
              <IconButton icon={<Image src="/runwithme.png" w="40" />} />
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={() => {
                router.push("/CreateEvent");
              }}
            >
              New Run
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={currentUser.photoURL} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/ProfilePage")}>
                  Profile Page
                </MenuItem>
                <MenuItem onClick={() => router.push("/UpdateProfile")}>
                  Update Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
