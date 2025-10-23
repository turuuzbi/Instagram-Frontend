"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Photopost } from "../_components/PhotoHeader";
import { Footer } from "../_components/Footer";
import { upload } from "@vercel/blob/client";
import { useUser } from "@/providers/AuthProvider";
import { toast } from "sonner";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");
  const { token } = useUser();

  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setImageURL("");

    try {
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
    } catch (err) {
      toast.error("Failed to generate image. Try again!");
    }
  };

  const createPost = async () => {
    if (!imageURL) return toast.error("Please generate an image first!");

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
      toast.success("Post created successfully!");
      setPrompt("");
      setCaption("");
      setImageURL("");
    } else {
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-5">
      <Photopost />

      <div className="flex-1 px-5 py-8 max-w-xl mx-auto w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            AI Image Generator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Describe what you want to see. Be specific for better results.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Type your idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-white border-gray-300 shadow-sm"
          />
          <Button onClick={generateImage} className="font-medium">
            Generate
          </Button>
        </div>

        {imageURL && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={imageURL}
              alt="Generated"
              className="rounded-xl shadow-md max-h-[400px] object-contain border border-gray-200"
            />
          </div>
        )}

        <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-3 text-gray-700">Add a caption</h2>
          <Input
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mb-3 bg-gray-50 border-gray-200"
          />
          <Button
            onClick={createPost}
            variant="ghost"
            className="border font-medium w-full bg-gray-100 hover:bg-gray-200"
          >
            Create Post
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
