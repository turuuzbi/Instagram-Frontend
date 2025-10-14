"use client";

import { UserComp } from "../_components/UserProfile";
import { Footer } from "../_components/Footer";
import { UserPost } from "../_components/UserPost";

const Page = () => {
  return (
    <div>
      <UserComp></UserComp>
      <UserPost></UserPost>
      <Footer></Footer>
    </div>
  );
};

export default Page;
