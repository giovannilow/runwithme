import AdminHeader from "@/components/AdminHeader/AdminHeader";
import AdminSideBar from "@/components/AdminHeader/AdminTopBar";
import Head from "next/head";
import Image from "next/image";
import TopData from "@/components/AdminHeader/TopData";
import BarChart from "@/components/AdminHeader/BarChart";
import RecentRuns from "@/components/AdminHeader/RecentRuns";

const Admin = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-blue-100 min-h-screen">
        <AdminHeader />
        <TopData />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentRuns />
        </div>
      </main>
    </>
  );
};

export default Admin;
