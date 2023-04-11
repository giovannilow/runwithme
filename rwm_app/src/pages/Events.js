import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "events"));
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

  if (loading) {
    return <Text>Loading events...</Text>;
  }

  return (
    <Box>
      <VStack spacing={4} align="center" paddingTop="20px">
        <Heading>Events</Heading>
        <SimpleGrid
          columns={[1, null, 3]}
          spacing="40px"
          width="100%"
          paddingBottom="20px"
        >
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
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default AllEvents;
