"use client";

import { useUser } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import instagramLogo from "@/images/instagramLogo.png";
import { toast } from "sonner";

const Page = () => {
  const { user } = useUser();
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const signup = async () => {
    const response = await fetch(`http://localhost:5555/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
        username: inputValue.username,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res.accessToken);
      toast.success("Successful!");
      push("/");
    } else {
      toast.error("Failed!");
    }
  };

  useEffect(() => {
    if (user) push("/");
  }, []);

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setInputValue((prev) => {
        return { ...prev, username: value };
      });
    } else if (name === "password") {
      setInputValue((prev) => {
        return { ...prev, password: value };
      });
    } else if (name === "email") {
      setInputValue((prev) => {
        return { ...prev, email: value };
      });
    }
  };

  const routeToLogin = () => push("/login");

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <img src={instagramLogo.src} className="w-7" />
        <div className="font-bold">
          Sign up to see photos and videos from your friends
        </div>
      </div>
      <div>
        <div className="flex flex-col p-5 gap-3">
          <Input
            placeholder="Username here..."
            name="username"
            onChange={(e) => inputValueHandler(e)}
          ></Input>
          <Input
            placeholder="Email here..."
            name="email"
            onChange={(e) => inputValueHandler(e)}
          ></Input>
          <Input
            placeholder="Password here..."
            name="password"
            onChange={(e) => inputValueHandler(e)}
          ></Input>
          <Button onClick={signup}>Sign up</Button>
        </div>
        <div className="flex flex-col items-center">
          Have an account?
          <Button
            onClick={routeToLogin}
            variant="ghost"
            className="text-blue-500 font-bold"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
