"use client";

import { UserComp } from "../_components/UserProfile";
import { Footer } from "../_components/Footer";
import { UserPost } from "../_components/UserPost";
import { useUser } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const { user } = useUser();
  const username = user?.username;
  const bio = user?.bio;
  const profilePicture = user?.profilePicture;

  return (
    <div>
      <UserComp username={username} bio={bio} profilePicture={profilePicture} />
      <div onClick={() => push("/editprofile")}>
        <Button variant="ghost" className="border bg-gray-200 font-bold mb-8">
          Edit Profile
        </Button>
      </div>
      <UserPost></UserPost>
      <Footer></Footer>
    </div>
  );
};

export default Page;
