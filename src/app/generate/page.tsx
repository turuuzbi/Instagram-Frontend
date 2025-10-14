"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Photopost } from "../_components/PhotoHeader";
import { Footer } from "../_components/Footer";
import { upload } from "@vercel/blob/client";
import { useUser } from "@/providers/AuthProvider";
import { toast } from "sonner";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();
  const [caption, setCaption] = useState("");

  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  const generateImage = async () => {
    if (!prompt.trim()) return;

    // setIsLoading(true);
    setImageURL("");

    const response = await fetch(
      `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, bad quality, distorted",
            num_interface_steps: 20,
            guidance_scale: 8,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const blob = await response.blob();

    const file = new File([blob], "generated.png", { type: "image/png" });
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    setImageURL(uploaded.url);
  };

  const createPost = async () => {
    const response = await fetch(`http://localhost:5555/post/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        images: [imageURL],
        caption,
      }),
    });
    if (response.ok) {
      toast.success("Successfully made post!");
    } else {
      toast.error("Failed, try again!");
    }
  };

  const promptHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    setPrompt(value);
  };

  const captionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaption(value);
  };

  return (
    <div>
      <Photopost></Photopost>
      <div className="p-5">
        <div className="flex mt-10 flex-col">
          <div className="font-bold">Generate AI images</div>
          <div className="text-xs text-gray-500 mb-5">
            Describe what is on your mind. To get the best results, be specific
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Generate here..."
            onChange={(e) => promptHandler(e)}
          ></Input>
          <Button variant="ghost" className="border" onClick={generateImage}>
            Generate
          </Button>
        </div>
        {imageURL && <img className="mt-15" src={imageURL} />}
      </div>
      <div>
        <Input
          onChange={(e) => captionHandler(e)}
          placeholder="Caption..."
        ></Input>
        <Button onClick={createPost} variant="ghost" className="border">
          Create Post
        </Button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Page;
