import {
  Box,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Container,
  Heading,
  Flex,
  Button,
  SimpleGrid,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

import { ReactElement } from "react";
import {
  FcOvertime,
  FcGlobe,
  FcCollaboration,
  FcSportsMode,
  FcAdvertising,
} from "react-icons/fc";

const Feature = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function About() {
  return (
    <>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={"/coupleRunning.svg"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack
            maxW={"2xl"}
            align={"flex-start"}
            spacing={6}
            alignItems="center"
            marginLeft={"40%"}
          >
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              About Us
            </Text>
            <Stack direction={"column"}>
              <Card align="right" bg={"blackAlpha.600"} color={"white"}>
                <CardBody>
                  <Text fontSize="24px">
                    Welcome to RunWithMe! We are a team of passionate runners
                    and fitness enthusiasts who believe that running is not just
                    a physical activity, but a way of life. Our mission is to
                    create a community where runners from all over the world can
                    connect, motivate each other, and share their love for the
                    sport. Whether you are a beginner or a seasoned pro, our
                    platform offers a variety of features to help you achieve
                    your running goals. By creating and joining running events,
                    we strive to provide a fun and supportive environment for
                    all runners. Join us today and become a part of our global
                    running community!
                  </Text>
                </CardBody>
              </Card>
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                Show me more
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
            Why run alone when you can run together?
          </Heading>
          <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
            RunWithMe is a platform for runners to connect with one another to
            run. What can you get in RunWithMe?
          </Text>
        </Stack>

        <Container maxW={"5xl"} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Feature
              heading={"Meet new friends"}
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              description={"Meet your new friends to enjoy running together"}
            />
            <Feature
              heading={"Run new routes"}
              icon={<Icon as={FcGlobe} w={10} h={10} />}
              description={
                "Explore the unkown by trying routes you haven't ran before"
              }
            />
            <Feature
              heading={"Join running events"}
              icon={<Icon as={FcSportsMode} w={10} h={10} />}
              description={"Join events created by other runners"}
            />
            <Feature
              heading={"Create running events"}
              icon={<Icon as={FcAdvertising} w={10} h={10} />}
              description={
                "You can create new events to invite people to accompany your run"
              }
            />
            <Feature
              heading={"Track your runs"}
              icon={<Icon as={FcOvertime} w={10} h={10} />}
              description={
                "By creating and joining events in RunWithMe, you can track your running activities"
              }
            />
          </Flex>
        </Container>
      </Box>
    </>
  );
}
