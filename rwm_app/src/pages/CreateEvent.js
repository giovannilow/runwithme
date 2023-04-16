import {
  Heading,
  Flex,
  Input,
  Button,
  Link,
  Box,
  RadioGroup,
  Radio,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from "../contexts/Firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(null);
  const startLocationRef = useRef();
  const distanceRef = useRef();
  const paceRef = useRef();
  const titleRef = useRef();
  const [recurrence, setRecurrence] = useState("one-off");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    const currentUserUid = auth.currentUser.uid;

    const eventData = {
      title: titleRef.current.value,
      date: startDate,
      startLocation: startLocationRef.current.value,
      distance: distanceRef.current.value,
      pace: paceRef.current.value,
      recurrence,
      createdBy: currentUserUid,
      participants: [],
    };

    if (recurrence === "recurrent") {
      eventData.recurrenceFrequency = document.getElementById(
        "recurrenceFrequency"
      ).value;
    }

    try {
      setError("");
      setLoading(true);

      // Save the event data to Firebase Realtime Database
      await addDoc(collection(firestore, "events"), eventData);

      // Navigate to a different page after successful event creation
      router.push("/Events");
    } catch (error) {
      console.log(error);
      setError("Failed to create event");
    }

    setLoading(false);
  }

  return (
    <Box
      style={{
        background: "#F8F8F8",
        height: "650px",
        backgroundSize: "cover",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      <Flex
        alignItems="center"
        justifyContent={"center"}
        direction={"column"}
        paddingTop="100px"
      >
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Create New Event</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                id="startLocation"
                placeholder="Enter Title of Event"
                ref={titleRef}
                variant="filled"
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date & Time</FormLabel>
              <Box mb={3} width="400px">
                <DatePicker
                  id="date"
                  selected={startDate}
                  //var myTimestamp = firestore.Timestamp.fromDate(new Date());
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
              Create Event
            </Button>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
}
