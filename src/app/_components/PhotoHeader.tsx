import XButton from "../icons/xbutton";

export const Photopost = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center border-b border-gray-300 p-2 bg-white items-center">
      <div className="absolute left-2">
        <XButton></XButton>
      </div>
      <div className="font-bold text-l">New photo post</div>
    </div>
  );
};
