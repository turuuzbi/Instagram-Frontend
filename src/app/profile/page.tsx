"use client";

import { UserComp } from "../_components/UserProfile";
import { Footer } from "../_components/Footer";
import { UserPost } from "../_components/UserPost";
import { useUser } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { push } = useRouter();
  const { user, token } = useUser();
  const [posts, setPosts] = useState([]);

  const username = user?.username;
  const bio = user?.bio;
  const profilePicture = user?.profilePicture;

  const showPosts = async () => {
    const response = await fetch(
      `http://localhost:5555/post/user/${user?._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const gotposts = await response.json();
    setPosts(gotposts);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    showPosts();
  };

  useEffect(() => {
    if (token) {
      showPosts();
    }
  }, [token]);

  return (
    <div>
      <UserComp username={username} bio={bio} profilePicture={profilePicture} />
      <div onClick={() => push("/editprofile")}>
        <Button variant="ghost" className="border bg-gray-200 font-bold mb-8">
          Edit Profile
        </Button>
      </div>
      <UserPost posts={posts}></UserPost>
      <Button
        onClick={logOutHandler}
        variant="ghost"
        className="bg-red-500 text-white"
      >
        Log out!
      </Button>
      <Footer></Footer>
    </div>
  );
};

export default Page;
