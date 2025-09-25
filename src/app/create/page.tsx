"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "../_components/Footer";
import { Photopost } from "../_components/PhotoHeader";
import CreatePostIcon from "../icons/create";

const Page = () => {
  return (
    <div>
      <Photopost></Photopost>
      <div className="flex flex-col mt-25 items-center  gap-2">
        <CreatePostIcon></CreatePostIcon>
        <Button style={{ backgroundColor: "blue" }}>Photo Libary</Button>
        <Button variant="ghost" className="font-bold text-blue-500">
          Generate with AI
        </Button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Page;
