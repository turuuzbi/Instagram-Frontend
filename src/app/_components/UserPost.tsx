import { useRouter } from "next/navigation";

type Post = {
  images: string[];
};

type UserPostProps = {
  posts: Post[];
};

export const UserPost = ({ posts }: UserPostProps) => {
  const { push } = useRouter();
  if (!posts) return <div>No posts yet!</div>;

  return (
    <div className="grid grid-cols-3 gap-1 w-full max-w-6xl">
      {posts.map((post) =>
        post.images.map((image, imgIndex) => (
          <div key={imgIndex} onClick={() => push("/selfposts")}>
            <img src={image} />
          </div>
        ))
      )}
    </div>
  );
};
