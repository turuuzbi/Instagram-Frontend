"use client";

import { useUser } from "@/providers/AuthProvider";
import XButton from "../icons/xbutton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const { user } = useUser();
  return (
    <div>
      <div className="fixed top-0 left-0 w-full flex justify-center border-b border-gray-300 p-2 bg-white items-center">
        <div className="absolute left-2" onClick={() => push("/profile")}>
          <XButton></XButton>
        </div>
        <div>Edit Profile</div>
      </div>
      <div className="mt-15">
        <div>{user?.profilePicture}</div>
        <div className="flex flex-col">
          <div>{user?.username}</div>
          <div className="text-blue-500">
            <Button variant="ghost">Change Photo</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
