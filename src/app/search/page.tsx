"use client";

import { Input } from "@/components/ui/input";
import { User, useUser } from "@/providers/AuthProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { Footer } from "../_components/Footer";

const Page = () => {
  const { token } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<User[] | null>([]);

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue.trim()) {
      getUser();
    }
    if (inputValue === "") {
      setUsers([]);
    }
  }, [inputValue]);

  if (!users) return;

  const getUser = async () => {
    if (!inputValue) return;
    const response = await fetch(
      `http://localhost:5555/searchUsers/${inputValue}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  return (
    <div>
      <Input
        placeholder="Search here..."
        onChange={(e) => inputValueHandler(e)}
      />
      <div>
        {users.map((user, index) => {
          return <div key={index}>{user.username}</div>;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
