import { AuthProvider } from "@/contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import AdminLayout from "../components/AdminLayout";
import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSideBar from "../components/AdminHeader/AdminSideBar";

function MyApp({ Component, pageProps }) {
  return (
    // <ProSidebarProvider>
    <AdminSideBar>
      <AuthProvider>
        <ChakraProvider>
          <Layout>
            {/* <AdminLayout> */}
            <Component {...pageProps} />
            {/* </AdminLayout> */}
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    </AdminSideBar>
    // </ProSidebarProvider>
  );
}

export default MyApp;
