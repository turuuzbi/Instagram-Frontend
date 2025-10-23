"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "../_components/Footer";
import { Photopost } from "../_components/PhotoHeader";
import CreatePostIcon from "../icons/create";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();

  const generatePush = () => push("/generate");

  return (
    <div>
      <Photopost></Photopost>
      <div className="flex flex-col mt-25 items-center  gap-2">
        <CreatePostIcon></CreatePostIcon>
        <div
          className="bg-blue-500 rounded-xl text-white"
          onClick={() => push("/sharepost")}
        >
          <Button variant="ghost">Photo Libary</Button>
        </div>
        <Button
          variant="ghost"
          className="font-bold text-blue-500"
          onClick={generatePush}
        >
          Generate with AI
        </Button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Page;
