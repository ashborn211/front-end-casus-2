"use client";

import Header from "../components/Header";
import PostsComponent from "../components/PostDisplay";
import withAuth from "../components/withAuth";

const Home = () => {
  return (
    <main>
      <Header></Header>

      <div>
      <PostsComponent />

      </div>
    </main>
  );
};

export default withAuth(Home);
