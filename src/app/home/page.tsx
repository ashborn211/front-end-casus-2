"use client";

import Header from "../components/Header";
import PostsComponent from "../components/PostDisplay";
import withAuth from "../components/withAuth";
import "./home.css";

const Home = () => {
  return (
    <main>
      <Header></Header>

      <div className="post-container">
        <PostsComponent />
      </div>
    </main>
  );
};

export default withAuth(Home);
