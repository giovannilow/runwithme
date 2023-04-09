import { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Text,
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
          maxWidth: "75%"
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
  return (
    <div>
      <Box
        position={"relative"}
        height={"700px"}
        //width={"full"}
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}
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
        {/* Left Icon */}
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
        {/* Right Icon */}
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

        {/* Slider */}
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
    </div>
  );
}
