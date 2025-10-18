"use client";

import { Footer } from "@/app/_components/Footer";
import { UserComp } from "@/app/_components/UserProfile";
import { Button } from "@/components/ui/button";
import { User, useUser } from "@/providers/AuthProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserPage() {
  const { token } = useUser();
  const { followedUserId, userId } = useParams();
  const [userInfo, setUserInfo] = useState<User | null | undefined>();

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
    } else {
      toast.error("failed to get user :(");
    }
  };

  const toggleFollow = async () => {
    const response = await fetch(
      `http://localhost:5555/toggleFollow/${followedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      console.log("successful!");
    }
  };

  useEffect(() => {
    if (token) getUser();
  }, [token]);
  console.log(followedUserId);
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
          variant="ghost"
          className="border bg-gray-200 font-bold mb-8"
          onClick={toggleFollow}
        >
          Follow
        </Button>
      </div>
      <Footer />
    </div>
  );
}
