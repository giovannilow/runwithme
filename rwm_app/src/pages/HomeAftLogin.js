import { useState, useEffect, useRef } from "react";
import { firestore } from "../contexts/Firebase";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  Box,
  Center,
  Avatar,
  IconButton,
  useBreakpointValue,
  Button,
  Container,
  Badge,
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
import { useAuth } from "../contexts/AuthContext";

const responsive = {
  superLargeDesktop: {
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
  const { currentUser } = useAuth();
  const today = new Date();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const q = query(
        collection(firestore, "events"),
        where("date", ">", today),
        orderBy("date", "asc"),
        limit(5)
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
  }
  if (!events) {
    return <Text>Loading events...</Text>;
  }

  return (
    <div
      style={{
        height: "110vh",
        //backgroundImage:
        // 'url("https://images.unsplash.com/photo-1547483238-f400e65ccd56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
        // backgroundPosition: "center",
        // backgroundsize: "cover",
        // backgroudColour: "red",
      }}
    >
      <div style={{ padding: "15px" }}></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        {events.length > 0 && (
          <div
            className="carousel"
            style={{
              width: "80%",
              boxShadow: "5px 5px 10px 5px #888888",
              marginBottom: "8px",
            }}
          >
            {/* <Badge style={{ paddingTop: "10px" }}>
              <p
                style={{
                  fontFamily: "georgia,garamond,serif",
                  fontSize: "22px",
                  fontStyle: "italic",
                  fontWeight: "bolder",
                  paddingTop: "10px",
                }}
              >
                Upcoming runs:{" "}
              </p>
            </Badge> */}
            <p
              style={{
                fontFamily: "georgia,garamond,serif",
                fontSize: "22px",
                fontStyle: "italic",
                fontWeight: "bolder",
                paddingTop: "10px",
                marginLeft: "10px",
              }}
            >
              Upcoming runs:
            </p>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              //autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              //deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              width="100%"
            >
              {events.map((event) => (
                <Center py={6} key={event.id}>
                  <Box
                    maxW={"445px"}
                    w={"full"}
                    bg="white"
                    boxShadow={"2xl"}
                    rounded={"md"}
                    margin="15px"
                    p={6}
                    overflow={"hidden"}
                  >
                    <Box
                      h={"210px"}
                      bg={"gray.100"}
                      mt={-6}
                      mx={-6}
                      mb={6}
                      pos={"relative"}
                    >
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
                        }
                        alt="LocationImage"
                        layout={"fill"}
                      />
                    </Box>
                    <Stack>
                      <Heading
                        color="gray.700"
                        fontSize={"2xl"}
                        fontFamily={"body"}
                      >
                        <br />
                        {event.title}
                      </Heading>
                      <Text color={"gray.700"}>
                        Date: {event.date.toDate().toLocaleString()}
                      </Text>
                      <Text color={"gray.700"}>
                        Start Location: {event.startLocation}
                      </Text>

                      <Text>Distance: {event.distance} km</Text>
                      <Text>Pace: {event.pace} min/km</Text>
                      <Text>Type: {event.recurrence}</Text>

                      {event.recurrence === "recurrent" ? (
                        <Text>
                          Recurrence Frequency: {event.recurrenceFrequency}
                        </Text>
                      ) : (
                        <Text>
                          <br />{" "}
                        </Text>
                      )}
                    </Stack>
                    <Stack
                      mt={6}
                      direction={"row"}
                      spacing={4}
                      align={"center"}
                    >
                      <Avatar src={event.userAvatar} alt={"Author"} />
                      <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text fontWeight={600}></Text>
                        <Text color={"gray.500"}></Text>
                        <Button> Join Run </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>

                /* <div
                  key={event.id}
                  style={{
                    padding: "25px",
                    borderRight: "2px solid black",
                    backgroundColor: "#D2E5EE",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
                    alt="eventLocation"
                  />
                  <Text fontWeight="bold">Title: {event.title}</Text>
                  <Text fontWeight="bold">
                    Date & Time: {event.date.toDate().toLocaleString()}
                  </Text>
                  <Text>Start Location: {event.startLocation}</Text>
                  <Text>Distance: {event.distance} km</Text>
                  <Text>Pace: {event.pace} min/km</Text>
                  <Text>Type: {event.recurrence}</Text>

                  {event.recurrence === "recurrent" ? (
                    <Text>
                      Recurrence Frequency: {event.recurrenceFrequency}
                    </Text>
                  ) : (
                    <Text>
                      <br />{" "}
                    </Text>
                  )} */
                // </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
