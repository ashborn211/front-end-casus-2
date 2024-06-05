"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const standardProfilePicture =
  "https://hongkongfp.com/wp-content/uploads/2023/06/20230610_164958-Copy.jpg";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create a user document in Firestore
      await setDoc(doc(db, "users", authUser.user.uid), {
        email: email,
        profilePicture: standardProfilePicture,
      });

      alert("Registration successful!");
      router.push("/home");
    } catch (error: any) {
      console.error(error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          {/* Registration form */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Display standard profile picture */}
          <img
            src={standardProfilePicture}
            alt="Standard Profile Picture"
            className="w-20 h-20 rounded-full mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
