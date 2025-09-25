"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Photopost } from "../_components/PhotoHeader";
import { Footer } from "../_components/Footer";
import { upload } from "@vercel/blob/client";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const accessToken = process.env.accessToken;

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
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, bad quality, distorted",
            num_interface_steps: 25,
            guidance_scale: 8,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setImageURL(imageUrl);

    const file = new File([blob], "generated.png", { type: "image/png" });
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    console.log(uploaded);
  };

  const promptHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    setPrompt(value);
  };

  return (
    <div>
      <Photopost></Photopost>
      <div className="p-5">
        <div className="flex mt-10 flex-col">
          <div className="font-bold">Generate AI images</div>
          <div className="text-xs text-gray-500 mb-5">
            Describe what's on your mind. To get the best results, be specific
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
      <Footer></Footer>
    </div>
  );
};

export default Page;
