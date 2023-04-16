import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { database } from "../contexts/Firebase";
import { ref, onValue } from "firebase/database";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const eventsRef = ref(database, "events/");

      onValue(eventsRef, (snapshot) => {
        try {
          console.log(snapshot.val());
          const eventsData = snapshot.val();
          const eventsArray = Object.entries(eventsData).map(([id, data]) => ({
            id,
            ...data,
          }));
          setEvents(eventsArray);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching events:", error);
          setLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading events...</Text>;
  }

  return (
    <Box>
      <VStack spacing={4} align="center" paddingTop="20px">
        <Heading>My Events</Heading>
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
