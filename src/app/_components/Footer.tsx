import UserButton from "../icons/user";
import HomeButton from "../icons/home";
import SearchButton from "../icons/search";
import AddButton from "../icons/add";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const { push } = useRouter();

  const homePush = () => push("/");
  const searchPush = () => push("/search");
  const addPush = () => push("/create");
  const userPush = () => push("/profile");

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center border-t border-gray-300 p-2 bg-white">
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <div onClick={homePush}>
          <HomeButton />
        </div>
        <div onClick={searchPush}>
          <SearchButton />
        </div>
        <div onClick={addPush}>
          <AddButton />
        </div>
        <div onClick={userPush}>
          <UserButton />
        </div>
      </div>
    </div>
  );
};
