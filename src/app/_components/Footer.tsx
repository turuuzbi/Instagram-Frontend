import UserButton from "../icons/user";
import HomeButton from "../icons/home";
import SearchButton from "../icons/Search";
import AddButton from "../icons/add";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center border-t border-gray-300 p-2 bg-white">
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <HomeButton />
        <SearchButton />
        <AddButton />
        <UserButton />
      </div>
    </div>
  );
};
