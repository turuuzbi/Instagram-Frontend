"use client";

import { useUser } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { User } from "@/providers/AuthProvider";
import { Ellipsis, Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "../_components/HomeHeader";
import { Footer } from "../_components/Footer";
import { EditPostDialog } from "../_components/EditPost";

export type PostType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  user: User;
};

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const { token, user } = useUser();
  const { push } = useRouter();

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
        <Header />
      </div>
      <div>
        <div className="flex flex-col">
          {posts?.map((post, index) => (
            <div key={index}>
              <div className="m-2 gap-2 flex items-center">
                <div onClick={() => push(`/user/${post.user._id}`)}>
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className="font-bold"
                  onClick={() => push(`/user/${post.user._id}`)}
                >
                  {user?.username}
                </div>
                <div
                  className="absolute right-0 mr-5"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedPost(post);
                  }}
                >
                  <Ellipsis></Ellipsis>
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
                      {post.like.includes(user?._id ?? "") ? (
                        <Heart color="red" fill="red" />
                      ) : (
                        <Heart />
                      )}
                    </div>
                    <div onClick={() => push(`/comment/${post._id}`)}>
                      <MessageCircle />
                    </div>
                  </div>
                  <div className="font-bold">{post.like.length} likes</div>
                  <div className="flex gap-3">
                    <div className="font-extrabold">{user?.username}</div>
                    <div>{post.caption}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <EditPostDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedPost={selectedPost}
        />
      )}
      <Footer />
    </div>
  );
}
