// pages/register.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import './RegisterPage.css';  // Import the CSS file

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
    <div className="form-container">
      <h1 className="form-title">Register</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
      <p className="form-text">
        Already have an account?{" "}
        <Link href="/login" className="login-link">
          Login
        </Link>
      </p>
    </div>
  </div>
  );
};

export default RegisterPage;
