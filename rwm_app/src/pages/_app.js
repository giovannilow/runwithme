import { AuthProvider } from "@/contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
//import AdminSideBar from "../components/AdminHeader/AdminTopBar";
import Header from "@/components/Header/Header";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          {/* <AdminLayout> */}
          <Component {...pageProps} />
          {/* </AdminLayout> */}
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
