"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  following: string[];
  followers: string[];
};

type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<null | string>>;
};

type decodedTokenType = {
  data: User;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      const decodedToken: decodedTokenType = jwtDecode(localToken);
      setUser(decodedToken.data);
    } else {
      push("/login");
    }
  }, []);

  const values = {
    user: user,
    setUser: setUser,
    setToken: setToken,
    token: token,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "To use Auth Context, you need to put it in your provider!"
    );
  }
  return authContext;
};
