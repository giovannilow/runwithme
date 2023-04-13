import { useState, useEffect, useRef, ReactNode } from "react";

import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Text,
  Button,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 2,
  slidesToScroll: 2,
};

export default function HomeBefLogin() {
  const [slider, setSlider] = useState([]);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const cards = [
    "https://images.unsplash.com/photo-1547483238-f400e65ccd56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2764&q=80",
    "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  ];
  const images = [
    {
      url: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Welcome to Run With Me!",
      text: "Chase your personal goals together with friends",
    },
    {
      url: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2764&q=80",
      text: "Feature 1",
    },
    {
      url: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      text: "Feature 2",
    },
  ];

  const ImageSlide = ({ url, text, title }) => {
    return (
      <div
        style={{
          backgroundImage: `url(${url})`,
          height: "650px",
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "75%",
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: "150px",
          }}
        >
          <h1 style={{ color: "black", fontSize: "250%" }}> {title}</h1>
          <h2 style={{ color: "black" }}>{text}</h2>
        </div>
      </div>
    );
  };
  const StatsText = ({ children }, { children: ReactNode }) => (
    <Text as={"span"} fontWeight={700} color={"white"}>
      {children}
    </Text>
  );

  const stats = [
    {
      title: "Privacy",
      content: (
        <>
          <StatsText> Privacy and safety</StatsText> on our platform
        </>
      ),
    },
    {
      title: "Friends",
      content: (
        <>
          <StatsText>Connect with friends</StatsText>, track each other's runs
        </>
      ),
    },
    {
      title: "70%",
      content: (
        <>
          <StatsText>Of our users</StatsText> are more likely to stay committed
          to their scheduled runs with friends
        </>
      ),
    },
    {
      title: "20M+",
      content: (
        <>
          <StatsText>Runs</StatsText> on our platform, and counting...
        </>
      ),
    },
  ];

  return (
    <div>
      <Box bg={"gray.800"} position={"relative"}>
        <Flex
          flex={1}
          zIndex={0}
          display={{ base: "none", lg: "flex" }}
          backgroundImage="url(https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
          backgroundSize={"cover"}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position={"absolute"}
          width={"50%"}
          insetY={0}
          right={0}
        >
          <Flex
            bgGradient={"linear(to-r, gray.800 10%, transparent)"}
            w={"full"}
            h={"full"}
          />
        </Flex>
        <Container maxW={"7xl"} zIndex={10} position={"relative"}>
          <Stack direction={{ base: "column", lg: "row" }}>
            <Stack
              flex={1}
              color={"gray.400"}
              justify={{ lg: "center" }}
              py={{ base: 4, md: 20, xl: 60 }}
            >
              <Box mb={{ base: 8, md: 20 }}>
                <Text
                  fontFamily={"heading"}
                  fontWeight={700}
                  textTransform={"uppercase"}
                  mb={3}
                  fontSize={"xl"}
                  color={"gray.500"}
                >
                  Welcome to
                </Text>
                <Heading
                  color={"white"}
                  mb={5}
                  fontSize={{ base: "3xl", md: "5xl" }}
                >
                  RunWithMe
                </Heading>
                <Text fontSize={"xl"} color={"gray.400"}>
                  Make new friends, push each other's limits, set new records at
                  RunWithMe. We make it easy and flexible. Find nearby runners
                  or create an event on your own, and connect with new and old
                  friends. Who says running is boring?
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                {stats.map((stat) => (
                  <Box key={stat.title}>
                    <Text
                      fontFamily={"heading"}
                      fontSize={"3xl"}
                      color={"white"}
                      mb={3}
                    >
                      {stat.title}
                    </Text>
                    <Text fontSize={"xl"} color={"gray.400"}>
                      {stat.content}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
            <Flex flex={1} />
          </Stack>
        </Container>
      </Box>
      {/* 
 
      <div>
        <Box
          position={"relative"}
          height={"700px"}
          //width={"full"}
          overflow={"hidden"}
        >
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <IconButton
            aria-label="left-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt />
          </IconButton>

          <IconButton
            aria-label="right-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>

          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {images.map((image, index) => (
              <ImageSlide
                key={index}
                url={image.url}
                text={image.text}
                title={image.title}
              />

              //     key={index}
              //     height={"3xl"}
              //     position="relative"
              //     backgroundPosition="center"
              //     backgroundRepeat="no-repeat"
              //     backgroundImage={url}
              //     backgroundSize="cover"
              //   />
            ))}
          </Slider>
        </Box>
      </div>  */}
    </div>
  );
}
