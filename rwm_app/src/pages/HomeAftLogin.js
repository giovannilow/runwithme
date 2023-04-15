import { useState, useEffect, useRef } from "react";
import { firestore } from "./firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Button,
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
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
    breakpoint: { max: 1500, min: 1024 },
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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const randomIds = Array.from
        const q = query(
          collection(firestore, "events"),
          where("id", "==", "1")
        );
        const querySnapshot = await getDocs(q);
        const eventsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ padding: "15px" }}>
        <p
          style={{
            fontFamily: "georgia,garamond,serif",
            fontSize: "22px",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        >
          Find Events near you:{" "}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="carousel" style={{ display: "block", width: "1000px" }}>
          <Carousel responsive={responsive}>
            <div className="card" style={{ padding: "20px" }}>
              <img
                src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
                alt="eventLocation"
              />{" "}
              <h2>Jonny's Evening Run</h2>
              <p> Time: 7pm etcetc </p>
              <Button> Join Event</Button>
            </div>
            <div className="card2" style={{ padding: "20px" }}>
              <img
                src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
                alt="eventLocation"
              />{" "}
              <h2>Timmy's Evening Run</h2>
              <p> Time: 1pm etcetc </p>
              <Button> Join Event</Button>
            </div>
            <div>Item 3</div>
            <div>Item 4</div>
          </Carousel>
        </div>
      </div>
      <div>
        {events.map((event) => (
          <Box
            key={event.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
          >
            <Text fontWeight="bold">Title: {event.title}</Text>
            <Text fontWeight="bold">
              Date & Time: {new Date(event.date).toLocaleString()}
            </Text>
            <Text>Start Location: {event.startLocation}</Text>
            <Text>Distance: {event.distance} km</Text>
            <Text>Pace: {event.pace} min/km</Text>
            <Text>Type: {event.recurrence}</Text>

            {event.recurrence === "recurrent" && (
              <Text>Recurrence Frequency: {event.recurrenceFrequency}</Text>
            )}
          </Box>
        ))}
      </div>
    </>
  );
}
