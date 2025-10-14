import { useUser } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { User } from "@/providers/AuthProvider";

type Posts = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  user: User;
};

export const Posts = () => {
  const { token } = useUser();
  const [posts, setPosts] = useState<Posts[]>([]);

  const showPosts = async () => {
    const response = await fetch(`http://localhost:5555/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const gotposts = await response.json();
    setPosts(gotposts);
  };

  useEffect(() => {
    if (token) {
      showPosts();
    }
  }, [token, posts]);

  return (
    <div className="grid grid-cols-3 gap-1 w-full max-w-6xl">
      {posts.map((post, index) => (
        <div key={index}>
          {post.images.map((image, imgIndex) => (
            <img key={imgIndex} src={image} />
          ))}
        </div>
      ))}
    </div>
  );
};
