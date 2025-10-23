"use client";

import { Input } from "@/components/ui/input";
import { Footer } from "../_components/Footer";
import { Photopost } from "../_components/PhotoHeader";
import { ChangeEvent, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@/providers/AuthProvider";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const { token } = useUser();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) return;
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    setImageUrl(uploaded.url);
  };

  const createPost = async () => {
    if (!imageUrl) return toast.error("Please generate an image first!");

    const response = await fetch(`http://localhost:5555/post/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        images: [imageUrl],
        caption,
      }),
    });

    if (response.ok) {
      toast.success("Post created successfully! :D ");
      setCaption("");
    } else {
      toast.error("Failed to create post. :( ");
    }
  };
  useEffect(() => {
    uploadImage();
  }, [file]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Photopost />
      <div className="flex flex-col items-center mt-10 px-5">
        <div className="font-semibold text-lg mb-4">Upload an Image</div>
        <Input type="file" accept="image/*" onChange={handleFile} />
        {imageUrl && (
          <div className="mt-5">
            <img src={imageUrl} />
          </div>
        )}
      </div>
      <Input
        placeholder="Write your caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button
        onClick={createPost}
        variant="ghost"
        className="border font-medium w-full bg-gray-100 hover:bg-gray-200"
      >
        Create Post
      </Button>
      <Footer />
    </div>
  );
};

export default Page;
