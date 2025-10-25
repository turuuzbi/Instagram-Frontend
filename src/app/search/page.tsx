"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "@/providers/AuthProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { token } = useUser();
  const [inputValue, setInputValue] = useState({});

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue((prev) => {
      return { ...prev, value };
    });
  };

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:5555/searchUsers/${inputValue}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) console.log(response);
  };

  useEffect(() => {
    if (inputValue) getUser();
  }, [inputValue]);
  return (
    <div>
      <Input
        placeholder="Search here..."
        onChange={(e) => inputValueHandler(e)}
      />
    </div>
  );
};

export default Page;
