// src/app/page.tsx
"use client";

import { useState } from "react";
import { auth } from "../FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { Main } from "next/document";
import  "./login.css";
import Link from "next/link";


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
    <main>
    <><Header/>
    <form onSubmit={handleLogin}>
    <div className="container">
        <h1 className="stroke-text">MyChan</h1>
        <p>Sign into the world's best webpage!</p>
        <div className="login-box">
            <h2>Member Login</h2>
            
                <label htmlFor="email">E-Mail:</label>
                <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                <label htmlFor="password">Password:</label>
                <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
                <a href="#">Password forgotten?</a>
                <button><Link href="/login" className="login-link">
          Login
        </Link></button>
            
            <p><a href="#">Or Sign Up Instead </a></p>
        </div>

    </div>
    </form></>
    </main>
  );
};

export default LoginPage;