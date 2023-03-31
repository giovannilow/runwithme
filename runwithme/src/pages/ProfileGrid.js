import { Box } from "@mui/material";
import { Heading, Text, IconButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { mockDataProfiles } from "../data/mockdata";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileGrid = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Table variant="simple" w="100%" mx="auto" fontSize="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name/Company</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockDataProfiles.map((profile) => (
            <Tr key={profile.id}>
              <Td>{profile.id}</Td>
              <Td>{profile.name}</Td>
              <Td>{profile.email}</Td>
              <Td style={{ whiteSpace: "nowrap" }}>{profile.phone}</Td>
              <Td>{profile.address}</Td>
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
                    console.log(`Editing profile with id ${event.id}`)
                  }
                />
                <IconButton
                  aria-label="moreInfo"
                  icon={<MoreHorizIcon />}
                  onClick={() =>
                    console.log(`View profile details with id ${event.id}`)
                  }
                />
                <IconButton
                  aria-label="delete"
                  icon={<DeleteIcon />}
                  onClick={() =>
                    console.log(`Delete profile with id ${event.id}`)
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

export default ProfileGrid;
