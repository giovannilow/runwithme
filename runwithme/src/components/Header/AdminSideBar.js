import { useState } from "react";
import { useRouter } from "next/router";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  ProSidebar,
} from "react-pro-sidebar";
import {
  Box,
  Input,
  IconButton,
  Icon,
  useTheme,
  Link,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  color,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EventIcon from "@mui/icons-material/Event";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Item = ({ title, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "black",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Text>{title}</Text>
    </MenuItem>
  );
};

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();

  return (
    <Box borderWidth="3px" borderRadius="lg" height="120vh">
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Text fontSize="xl" fontWeight="bold" color="black">
                  ADMIN
                </Text>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  icon={<MenuOutlinedIcon />}
                ></IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <WrapItem>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </WrapItem>
              </Box>
              <Box textAlign="center">
                <Text fontSize="l" fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  Ed Roh
                </Text>
                <Text>Admin</Text>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} height="90vh">
            <Item
              title="Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Text
              color="#404040"
              fontWeight="semibold"
              fontSize="medium"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Events
            </Text>
            <Item
              title="Manage Events"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Text
              color="#404040"
              fontWeight="semibold"
              fontSize="medium"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Profile
            </Text>
            <Item
              title="Manage Profiles"
              // to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSideBar;
