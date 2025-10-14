"use client";

import { Footer } from "@/app/_components/Footer";
import { UserComp } from "@/app/_components/UserProfile";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/AuthProvider";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function UserPage() {
  const { token } = useUser();
  const { follewedUserId } = useParams();

  const toggleFollow = async () => {
    const response = await fetch(
      `http://localhost:5555/toggleFollow/${follewedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      toast.success("nice :D");
    } else {
      toast.error("fail :(");
    }
  };
  return (
    <div>
      <div>
        <UserComp></UserComp>
      </div>
      <div>
        <Button onClick={toggleFollow}></Button>
      </div>
      <Footer />
    </div>
  );
}
