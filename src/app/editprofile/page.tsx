"use client";

import { useUser } from "@/providers/AuthProvider";
import XButton from "../icons/xbutton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Page = () => {
  const { push } = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full flex justify-center border-b border-gray-300 py-3 bg-white items-center">
        <div className="absolute left-3" onClick={() => push("/profile")}>
          <XButton />
        </div>
        <div className="text-lg font-semibold">Edit profile</div>
      </div>

      <div className="pt-20 px-4">
        <div className="text-lg font-semibold mb-3">Edit profile</div>

        <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-3 mb-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user?.username}</div>
            <Button
              variant="link"
              className="text-blue-500 p-0 h-auto font-medium"
            >
              Change photo
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Username</label>
            <Input
              placeholder="test"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Bio</label>
            <textarea
              className="w-full border rounded-lg p-2 text-sm text-gray-600"
              placeholder="It is bio, write whatever you want..."
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="w-1/2 bg-blue-100 text-gray-500" disabled>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
