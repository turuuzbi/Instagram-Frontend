import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type UserCompProps = {
  username: string | null | undefined;
  bio: string | null | undefined;
  profilePicture: string | null | undefined;
};

export const UserComp = ({ username, bio, profilePicture }: UserCompProps) => {
  const { push } = useRouter();

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-center border-b bg-white font-bold p-2">
        {username}
      </div>

      <div className="mt-20 px-4">
        <div className="flex">
          <div className="mb-4">
            <img
              src={profilePicture || undefined}
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div>
            <div className="mb-4 font-bold">{username}</div>
            <div className="flex gap-5">
              <div onClick={() => push("/editprofile")}>
                <Button
                  variant="ghost"
                  className="border bg-gray-200 font-bold mb-8"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <div>{bio}</div>
        </div>
      </div>
    </div>
  );
};
