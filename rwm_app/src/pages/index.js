import HomeBefLogin from "./HomeBefLogin";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";


const Home = () => {
  const {
    currentUser,
    isLoading,
    setIsLoading,
    hasLoaded,
    setHasLoaded,
    cometChat,
    wallPosts,
    setWallPosts,
    selectedContact,
    setSelectedContact,
    isChatLayoutShown,
    setIsChatLayoutShown,
  } = useAuth();

  useEffect(() => {
    // init cometchat pro.
    initCometChat();
    // get authenticated user from localStorage (if any).
  }, []);

  useEffect(() => {
    setHasLoaded(true);
  }, [currentUser]);

  /**
   * init comet chat.
   */
  const initCometChat = async () => {
    const { CometChat } = await import("@cometchat-pro/chat");
    const appID = `${process.env.NEXT_PUBLIC_COMETCHAT_APP_ID}`;
    const region = `${process.env.NEXT_PUBLIC_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      (error) => {}
    );
  };

  // if user has logged in and isChatLayout = true, chat layout will be shown.
  // if (currentUser && isChatLayoutShown) {
  //   return (
  //     <div className="index">
  //       <Head>
  //         <title>RunWithMe</title>
  //       </Head>
  //       <Header />
  //       <main className="chat__layout-main bg-white">
  //         <div className="chat__layout-contact">
  //           <Contact />
  //         </div>
  //         <div className="chat__layout">
  //           <ChatLayout />
  //         </div>
  //         <div className="chat__layout-rightsidebar">
  //           <RightSidebar />
  //         </div>
  //         {isLoading && <Loading />}
  //       </main>
  //     </div>
  //   );
  // }

  //default page before log in
  return (
    <>
      <HomeBefLogin />
    </>
  );
};

export default Home;
