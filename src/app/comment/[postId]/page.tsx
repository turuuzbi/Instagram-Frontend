"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../_components/Footer";
import XButton from "../../icons/xbutton";
import { useUser } from "@/providers/AuthProvider";
import { useParams } from "next/navigation";

const Page = () => {
  const { token } = useUser();
  const [userInfo, setUserInfo] = useState();
  const { postId } = useParams();

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:5555/comment/get/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const gotUser = await response.json();
    if (response.ok) {
      console.log(gotUser);
      setUserInfo(gotUser);
    }
  };
  console.log(userInfo);
  useEffect(() => {
    getUser();
  }, [token]);
  return (
    <div>
      <div className="fixed top-0 w-full flex items-center border-b border-gray-300 bg-white">
        <div className="absolute left-0 px-3">
          <XButton />
        </div>
        <div className="w-full justify-center flex p-3 font-medium">
          Comments
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
