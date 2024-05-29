// src/app/page.tsx
"use client";

import { useState } from "react";
import { auth } from "../FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from "../components/Header";


const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/home");
    } catch (error: any) {
      console.error(error.message);
      // Check if the error message indicates that the user doesn't exist
      if (error.code === "auth/user-not-found") {
        const register = confirm("User does not exist. Do you want to register?");
        if (register) {
          router.push("/register");
        }
      }
    }
  };

  return (
    <><Header />
    <form onSubmit={handleLogin}>

    </form></>
 
  );
};

export default LoginPage;