"use client";

import { useUser } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Footer } from "./_components/Footer";

export default function Home() {
  const { user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push("/login");
  }, []);

  return (
    <div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
      <div>{user?.password}</div>
      <Footer></Footer>
    </div>
  );
}
