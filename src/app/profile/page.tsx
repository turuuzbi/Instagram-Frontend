"use client";

import { UserComp } from "../_components/UserProfile";
import { Footer } from "../_components/Footer";
import { UserPost } from "../_components/UserPost";
import { useUser } from "@/providers/AuthProvider";

const Page = () => {
  const { user } = useUser();
  const username = user?.username;
  const bio = user?.bio;
  const profilePicture = user?.profilePicture;

  return (
    <div>
      <UserComp username={username} bio={bio} profilePicture={profilePicture} />
      <UserPost></UserPost>
      <Footer></Footer>
    </div>
  );
};

export default Page;
