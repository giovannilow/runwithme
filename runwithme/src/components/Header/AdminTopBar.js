import { useContext } from "react";
import {
  Box,
  Input,
  IconButton,
  Icon,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";
import { HomeOutlined } from "@mui/icons-material";
import {
  SettingsIcon,
  BellIcon,
  SearchIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";

const AdminTopBar = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" borderRadius="3px">
        <Input sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton aria-label="Search" icon={<SearchIcon />} />
      </Box>
      <Box display="flex">
        <IconButton aria-label="Notifications" icon={<BellIcon />} />
        <IconButton aria-label="Settings" icon={<SettingsIcon />} />
        <IconButton aria-label="Settings" icon={<InfoOutlineIcon />} />
      </Box>
    </Box>
  );
};

export default AdminTopBar;
