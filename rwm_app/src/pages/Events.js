import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Radio,
  Stack,
  RadioGroup,
} from "@chakra-ui/react";
import { firestore } from "../contexts/Firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Input } from "postcss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [eventToLeave, setEventToLeave] = useState(null);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [eventToEdit, setEventToEdit] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const startLocationRef = useRef();
  const distanceRef = useRef();
  const paceRef = useRef();
  const titleRef = useRef();
  const [recurrence, setRecurrence] = useState("one-off");

  const { currentUser } = getAuth();

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

  const myEvents = events.filter(
    (event) => event.createdBy === currentUser.uid
  );
  const openEvents = events.filter(
    (event) => event.createdBy !== currentUser.uid
  );

  // Function to join an event
  const joinEvent = async (eventId) => {
    try {
      const eventRef = doc(firestore, "events", eventId);
      await setDoc(
        eventRef,
        { participants: arrayUnion(currentUser.uid) },
        { merge: true }
      );
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                participants: [...event.participants, currentUser.uid],
              }
            : event
        )
      );
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };
  // Function to leave an event
  const leaveEvent = async (eventId) => {
    try {
      const eventRef = doc(firestore, "events", eventId);
      await updateDoc(eventRef, {
        participants: arrayRemove(currentUser.uid),
      });
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                participants: event.participants.filter(
                  (uid) => uid !== currentUser.uid
                ),
              }
            : event
        )
      );
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  // Function to delete an event
  const onClose = () => setIsDeleteOpen(false);

  const deleteEvent = async () => {
    try {
      const eventRef = doc(firestore, "events", eventToDelete);
      await deleteDoc(eventRef);
      setEvents(events.filter((event) => event.id !== eventToDelete));
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const openLeaveDialog = (eventId) => {
    setEventToLeave(eventId);
    setIsLeaveOpen(true);
  };

  const openEditDialog = (event) => {
    setEventToEdit(event);
    onEditOpen();
  };
  async function handleEditSubmit(e) {
    e.preventDefault();

    // Update the eventToEdit object with the new values from the form inputs
    const updatedEvent = {
      ...eventToEdit,
      title: titleRef.current.value,
      date: startDate,
      startLocation: startLocationRef.current.value,
      distance: distanceRef.current.value,
      pace: paceRef.current.value,
      recurrence,
    };

    if (recurrence === "recurrent") {
      updatedEvent.recurrenceFrequency = document.getElementById(
        "recurrenceFrequency"
      ).value;
    }

    try {
      setError("");
      setLoading(true);

      // Update the event document in Firestore
      const eventRef = doc(firestore, "events", eventToEdit.id);
      await updateDoc(eventRef, updatedEvent);

      // Close the edit modal after saving the changes
      onEditClose();

      // Refresh the events list
      fetchData();
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event");
    }

    setLoading(false);
  }
  if (loading) {
    return <Text>Loading events...</Text>;
  }

  return (
    <Box>
      <VStack spacing={4} align="center" paddingTop="20px">
        <Heading>Events</Heading>
        <Heading size="md">My Events</Heading>
        <SimpleGrid
          columns={[1, null, 3]}
          spacing="40px"
          width="100%"
          paddingBottom="20px"
        >
          {myEvents.length > 0 ? (
            myEvents.map((event) => (
              <Box
                key={event.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
              >
                <Text fontWeight="bold">Title: {event.title}</Text>
                <Text fontWeight="bold">
                  Date & Time: {event.date.toDate().toLocaleString()}
                </Text>
                <Text>Start Location: {event.startLocation}</Text>
                <Text>Distance: {event.distance} km</Text>
                <Text>Pace: {event.pace} min/km</Text>
                <Text>Type: {event.recurrence}</Text>

                {event.recurrence === "recurrent" && (
                  <Text>Recurrence Frequency: {event.recurrenceFrequency}</Text>
                )}
                <Button
                  colorScheme="blue"
                  mt={3}
                  mr={3}
                  onClick={() => openEditDialog(event)}
                >
                  Edit
                </Button>

                <Button
                  colorScheme="red"
                  mt={3}
                  onClick={() => {
                    setEventToDelete(event.id);
                    setIsDeleteOpen(true);
                  }}
                >
                  Delete
                </Button>
              </Box>
            ))
          ) : (
            <Text>No events</Text>
          )}
        </SimpleGrid>
        <Heading size="md">Open Events</Heading>
        {currentUser && (
          <SimpleGrid
            columns={[1, null, 3]}
            spacing="40px"
            width="100%"
            paddingBottom="20px"
          >
            {openEvents.length > 0 ? (
              openEvents.map((event) => (
                <Box
                  key={event.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p="4"
                >
                  <Text fontWeight="bold">Title: {event.title}</Text>
                  <Text fontWeight="bold">
                    Date & Time: {event.date.toDate().toLocaleString()}
                  </Text>
                  <Text>Start Location: {event.startLocation}</Text>
                  <Text>Distance: {event.distance} km</Text>
                  <Text>Pace: {event.pace} min/km</Text>
                  <Text>Type: {event.recurrence}</Text>

                  {event.recurrence === "recurrent" && (
                    <Text>
                      Recurrence Frequency: {event.recurrenceFrequency}
                    </Text>
                  )}
                  <Button
                    colorScheme={
                      event.participants.includes(currentUser.uid)
                        ? "red"
                        : "blue"
                    }
                    mt={3}
                    onClick={() =>
                      event.participants.includes(currentUser.uid)
                        ? openLeaveDialog(event.id)
                        : joinEvent(event.id)
                    }
                  >
                    {event.participants.includes(currentUser.uid)
                      ? "Leave"
                      : "Join"}{" "}
                    Event
                  </Button>
                </Box>
              ))
            ) : (
              <Text>No events</Text>
            )}
          </SimpleGrid>
        )}

        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={undefined}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Event
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this event? This action cannot
                be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="red" onClick={deleteEvent} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <AlertDialog
          isOpen={isLeaveOpen}
          leastDestructiveRef={undefined}
          onClose={() => setIsLeaveOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Leave Event
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to leave this event?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={() => setIsLeaveOpen(false)}>Cancel</Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    leaveEvent(eventToLeave);
                    setIsLeaveOpen(false);
                  }}
                  ml={3}
                >
                  Leave
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Adapted CreateEvent form */}
              <form onSubmit={handleEditSubmit}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    id="title"
                    placeholder="Enter Title of Event"
                    ref={titleRef}
                    defaultValue={eventToEdit?.title}
                    variant="filled"
                    mb={3}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date & Time</FormLabel>
                  <Box mb={3} width="400px">
                    <DatePicker
                      id="date"
                      selected={startDate || eventToEdit?.date.toDate()}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="Pp"
                      placeholderText="Select date & time"
                      mb={3}
                    />
                  </Box>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Start Location</FormLabel>
                  <Input
                    id="startLocation"
                    placeholder="Enter start location (postal code)"
                    ref={startLocationRef}
                    defaultValue={eventToEdit?.startLocation}
                    variant="filled"
                    mb={3}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Distance (km)</FormLabel>
                  <Input
                    id="distance"
                    placeholder="Enter distance"
                    ref={distanceRef}
                    defaultValue={eventToEdit?.distance}
                    variant="filled"
                    mb={3}
                    type="number"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Pace (min per km)</FormLabel>
                  <Input
                    id="pace"
                    placeholder="Enter pace"
                    ref={paceRef}
                    defaultValue={eventToEdit?.pace}
                    variant="filled"
                    mb={3}
                    type="number"
                    step="0.01"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Recurrent or One-off</FormLabel>
                  <RadioGroup
                    onChange={(value) => setRecurrence(value)}
                    value={recurrence}
                    mb={6}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio value="one-off">One-off</Radio>
                      <Radio value="recurrent">Recurrent</Radio>
                    </Stack>
                  </RadioGroup>
                  {recurrence === "recurrent" && (
                    <FormControl isRequired>
                      <FormLabel>Recurrence Frequency</FormLabel>
                      <Select
                        id="recurrenceFrequency"
                        value={eventToEdit?.recurrenceFrequency}
                        placeholder="Select recurrence frequency"
                        mb={3}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    </FormControl>
                  )}
                </FormControl>
                <Button disabled={loading} colorScheme="teal" type="submit">
                  Save Changes
                </Button>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleEditSubmit}>
                Save Changes
              </Button>
              <Button colorScheme="gray" ml={3} onClick={onEditClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default AllEvents;
