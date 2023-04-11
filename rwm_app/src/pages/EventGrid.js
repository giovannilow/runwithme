// import { DataGrid } from "@mui/x-data-grid";
import { mockDataEvents } from "../data/mockdata";
import { Box } from "@mui/material";
import { Heading, Text } from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";

const EventGrid = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Table variant="simple" w="100%" mx="auto" fontSize="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Company</Th>
            <Th>Details</Th>
            <Th>Location</Th>
            <Th>Distance</Th>
            <Th>Title</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockDataEvents.map((event) => (
            <Tr key={event.id}>
              <Td>{event.id}</Td>
              <Td>{event.title}</Td>
              <Td style={{ whiteSpace: "nowrap" }}>{event.Date}</Td>
              <Td>{event.Time}</Td>
              <Td>{event.Company}</Td>
              <Td>{event.Details}</Td>
              <Td>{event.Location}</Td>
              <Td>{event.Distance}</Td>
              <Td>{event.title}</Td>
              <Td
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "none",
                  marginTop: "13px",
                }}
              >
                <IconButton
                  aria-label="edit"
                  icon={<EditIcon />}
                  onClick={() =>
                    console.log(`Editing event with id ${event.id}`)
                  }
                />
                <IconButton
                  aria-label="moreInfo"
                  icon={<MoreHorizIcon />}
                  onClick={() =>
                    console.log(`View event details with id ${event.id}`)
                  }
                />
                <IconButton
                  aria-label="delete"
                  icon={<DeleteIcon />}
                  onClick={() =>
                    console.log(`Delete event with id ${event.id}`)
                  }
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventGrid;
