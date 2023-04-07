import AdminTopBar from "./Header/AdminTopBar";
import AdminSideBar from "./Header/AdminSideBar";
import EventGrid from "../pages/EventGrid";
import ProfileGrid from "@/pages/ProfileGrid";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">
        <AdminTopBar />
        <Box w="100%" display="flex" flex="1">
          <AdminSideBar marginLeft="20px" />
          <Box w="100%">
            {/* <ProfileGrid /> */}
            <EventGrid />
          </Box>
        </Box>
      </Box>
      <main>{children}</main>
      insert footer
    </>
  );
}
