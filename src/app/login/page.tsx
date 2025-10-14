"use client";

import { useUser } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import instagramLogo from "@/images/instagramLogo.png";
import { toast } from "sonner";

const Page = () => {
  const { setUser, user } = useUser();
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const response = await fetch(`http://localhost:5555/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    });
    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res);
      setUser(res);
      push("/");
      toast.success("Login successful!");
    } else {
      toast.error("Login FAILED!");
    }
  };

  useEffect(() => {
    if (user) push("/");
  }, [user]);

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setInputValue((prev) => {
        return { ...prev, password: value };
      });
    } else if (name === "email") {
      setInputValue((prev) => {
        return { ...prev, email: value };
      });
    }
  };

  const routeToSignup = () => push("/signup");

  return (
    <div className="flex flex-col  justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <img src={instagramLogo.src} className="w-7" />
      </div>
      <div>
        <div className="flex flex-col p-5 gap-3">
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
          <Button onClick={login}>Login</Button>
        </div>
        <div className="flex flex-col items-center">
          Do not have an account?
          <Button
            onClick={routeToSignup}
            variant="ghost"
            className="text-blue-500 font-bold"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
