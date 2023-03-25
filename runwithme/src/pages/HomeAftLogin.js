import { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Text,
  Button,
} from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function HomeAftLogin() {
  return (
    <Carousel responsive={responsive}>
      <div className="card">
        <img
          src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
          alt="eventLocation"
        />{" "}
        <h2>Jonny's Evening Run</h2>
        <p> Time: 7pm etcetc </p>
        <Button> Join Event</Button>
      </div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Carousel>
  );
}
