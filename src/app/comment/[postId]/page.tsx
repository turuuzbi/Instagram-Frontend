"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Footer } from "../../_components/Footer";
import XButton from "../../icons/xbutton";
import { User, useUser } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Smile, Trash } from "lucide-react";
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
  const [inputValue, setInputValue] = useState("");

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const createComment = async () => {
    const response = await fetch(`http://localhost:5555/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: inputValue,
        postId,
      }),
    });
    if (response.ok) {
      toast.success("successfully made comment!");
    } else {
      toast.error("failed to make comment :(");
    }
    await getComments();
  };

  const deleteComment = async (commentId: string) => {
    const response = await fetch(`http://localhost:5555/comment/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentId,
      }),
    });
    if (response.ok) {
      toast.success("successfully made comment!");
    } else {
      toast.error("failed to make comment :(");
    }
    await getComments();
  };

  const getComments = async () => {
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

  useEffect(() => {
    getComments();
  }, [token]);

  return (
    <div>
      <div className="fixed top-0 w-full flex items-center border-b border-gray-300 bg-white">
        <div className="absolute left-0 px-3" onClick={() => push("/")}>
          <XButton />
        </div>
        <div className="w-full justify-center flex p-3 font-medium">
          Comments
        </div>
      </div>
      <div className="mt-18">
        <div className="m-5">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={commentInfo[0]?.user.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-bold">
              {commentInfo[0]?.post.user.username}
            </div>
          </div>
          <div>{commentInfo[0]?.post.caption}</div>
        </div>
        <div className="h-[0.5px] w-full bg-black"></div>

        <div className="m-5 gap-5 flex flex-col">
          {commentInfo.map((c, index) => {
            return (
              <div key={index}>
                <div className="flex items-center">
                  <div onClick={() => push(`/user/${c.user._id}`)}>
                    <Avatar>
                      <AvatarImage src={c.user.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="font-bold">{c.user.username}</div>
                </div>
                <div className="flex">
                  <div>{c.comment}</div>
                  <div onClick={() => deleteComment(c._id)}>
                    <Trash></Trash>
                  </div>
                </div>
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
