"use client";

import { Footer } from "@/app/_components/Footer";
import { UserPost } from "@/app/_components/UserPost";
import { UserComp } from "@/app/_components/UserProfile";
import { Button } from "@/components/ui/button";
import { User, useUser } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserPage() {
  const { push } = useRouter();
  const { token, user } = useUser();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<User>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([]);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5555/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const gotUser = await response.json();
      setUserInfo(gotUser);
      if (userInfo?.followers.includes(user?._id ?? '')) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } else {
      toast.error("failed to get user :(");
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:5555/post/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const gotposts = await response.json();
    setPosts(gotposts);
  };

  const toggleFollow = async () => {
    const response = await fetch(
      `http://localhost:5555/toggleFollow/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      setIsFollowing((prev) => !prev);
    } else {
      toast.error("failed to follow this user :(");
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
      getUserPosts();
    }
    if (user?._id === userId) push("/profile");
  }, [token]);

  return (
    <div>
      <div>
        <UserComp
          username={userInfo?.username}
          profilePicture={userInfo?.profilePicture}
          bio={userInfo?.bio}
        />
      </div>
      <div>
        <Button
          className={`border bg-gray-200 font-bold mb-8 ${
            isFollowing ? "bg-red-400" : "bg-blue-300"
          }`}
          onClick={toggleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <UserPost posts={posts} />
      </div>

      <Footer />
    </div>
  );
}
