// src/app/page.tsx (Login Page)
"use client";

import Header from "./components/Header";
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider, db } from "./FireBaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const standardProfilePicture =
  "https://hongkongfp.com/wp-content/uploads/2023/06/20230610_164958-Copy.jpg";


const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/user");
    } catch (error: any) {
      console.error(error.message);
      if (error.code === "auth/user-not-found") {
        const register = confirm(
          "User does not exist. Do you want to register?"
        );
        if (register) {
          router.push("/register");
        }
      }
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await addDoc(collection(db, "users"), {
        userId: user.uid,
        email: user.email,
        profilePicture: user.photoURL || standardProfilePicture,
      });

      alert("Google Sign-In successful!");
      router.push("/home");
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <main>
    <>
      <Header />
      <form onSubmit={handleLogin}>
        <div className="container">
          <h1 className="stroke-text">MyChan</h1>
          <p>Sign into the world's best webpage!</p>
          <div className="parent-container">
            <div className="login-box">
              <h2>Member Login</h2>

              <label htmlFor="email">
                E-Mail:
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <a href="register">Password forgotten?</a>

              <button type="submit" className="login-link">
                LOGIN
              </button>

              <p>
                <a href="register">Or Sign Up Instead </a>
              </p>
            </div>
          </div>
        </div>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Sign in with Google
      </button>
    </>
  </main>
  );
};

export default LoginPage;