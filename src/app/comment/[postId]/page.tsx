"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Footer } from "../../_components/Footer";
import XButton from "../../icons/xbutton";
import { User, useUser } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CommentType = {
  _id: string;
  comment: string;
  user: User;
  post: {
    _id: string;
    caption: string;
    like: string[];
    images: string[];
    user: User;
  };
};

const Page = () => {
  const { push } = useRouter();
  const { token } = useUser();
  const [commentInfo, setCommentInfo] = useState<CommentType[]>([]);
  const { postId } = useParams();
  const [inputValue, setInputValue] = useState({
    comment: "",
  });

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue((prev) => {
      return { ...prev, comment: value };
    });
  };

  const createComment = async () => {
    const response = await fetch(`http://localhost:5555/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: inputValue.comment,
        postId: postId,
      }),
    });
    if (response.ok) {
      toast.success("successfully made comment!");
    } else {
      toast.error("failed to make comment :(");
    }
  };

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
      setCommentInfo(gotUser);
    }
  };
  console.log(commentInfo);
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
      <div className="mt-18">
        <div>{commentInfo[0]?.post.user.profilePicture}</div>
        <div className="font-bold">{commentInfo[0]?.post.user.username}</div>
        <div>{commentInfo[0]?.post.caption}</div>
        <div className="h-[0.5px] w-full bg-black"></div>

        <div>
          {commentInfo.map((c, index) => {
            return (
              <div key={index}>
                <div onClick={() => push(`/user/${c.user._id}`)}>
                  <Avatar>
                    <AvatarImage src={c.user.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="font-bold">{c.user.username}</div>
                <div>{c.comment}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 mb-17 flex border w-full">
        <Button variant="ghost">
          <Smile></Smile>
        </Button>
        <Input
          onChange={(event) => {
            inputValueHandler(event);
          }}
          placeholder="Add a comment..."
        />
        <Button onClick={createComment} variant="ghost">
          Comment
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
