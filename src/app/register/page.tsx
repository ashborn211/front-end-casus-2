"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import Header from "../components/Header";
import "./RegisterPage.css";


const standardProfilePicture =
  "https://hongkongfp.com/wp-content/uploads/2023/06/20230610_164958-Copy.jpg";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Check if the email already exists in Firestore
      const emailQuery = query(collection(db, "users"), where("email", "==", email));
      const emailQuerySnapshot = await getDocs(emailQuery);

      if (!emailQuerySnapshot.empty) {
        alert("Email already taken. Please use a different email.");
        return;
      }

      const authUser = await createUserWithEmailAndPassword(auth, email, password);

      // Create a user document in Firestore
      await setDoc(doc(db, "users", authUser.user.uid), {
        email: email,
        profilePicture: standardProfilePicture,
      });

      // alert("Registration successful!");
      router.push("/home");
    } catch (error: any) {
      console.error(error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <main>
    <>
      <Header />
      <form onSubmit={handleRegister}>
        <div className="container">
          <h1 className="stroke-text">MyChan</h1>
          <p>Sign into the world's best webpage!</p>
          <div className="parent-container">
            <div className="login-box">
              <h2>Member SignUp</h2>

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
              <div className="button-container">
               
                <button type="submit" className="login-link">
                  SIGNUP!
                </button>
              </div>
              <p className="go-back">
                  <a href="/">Or Sign Up Instead </a>
                </p>
              
            </div>
          </div>
        </div>
      </form>
    </>
  </main>
  );
};

export default RegisterPage;
