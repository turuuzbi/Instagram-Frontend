"use client";

import { useUser } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/HomeHeader";
import { User } from "@/providers/AuthProvider";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Posts = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  user: User;
};

export default function Home() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const { token, user } = useUser();
  const { push } = useRouter();

  const showPosts = async () => {
    const response = await fetch(`http://localhost:5555/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const gotposts = await response.json();
    setPosts(gotposts);
  };

  const toggleLike = async (postId: string) => {
    await fetch(`http://localhost:5555/post/toggleLike/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (token) {
      showPosts();
    }
  }, [token]);

  return (
    <div className="pb-20">
      <div className="mb-20">
        <Header></Header>
      </div>
      <div>
        <div className="flex flex-col">
          {posts?.map((post, index) => (
            <div key={index}>
              <div className="m-2">
                <div>{post.user.profilePicture}</div>
                <div
                  className="font-bold"
                  onClick={() => push(`/user/${post.user._id}`)}
                >
                  {post.user.username}
                </div>
              </div>
              <div>
                {post.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} />
                  </div>
                ))}
                <div className="m-2">
                  <div className="flex gap-2">
                    <div onClick={() => toggleLike(post._id)}>
                      {post.like.includes(user?._id!) ? (
                        <Heart color="red" fill="red" />
                      ) : (
                        <Heart />
                      )}
                    </div>
                    <div>
                      <MessageCircle />
                    </div>
                  </div>
                  <div className="font-bold">{post.like.length} likes</div>
                  <div className="flex gap-3">
                    <div className="font-extrabold">{post.user.username}</div>
                    <div>{post.caption}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
