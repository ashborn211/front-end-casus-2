"use client";

import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../FireBaseConfig";

interface Post {
  imageUrl: string;
  content: string;
  likes: number;
  dislikes: number;
}

const PostsComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const q = query(postsCollectionRef);
        const querySnapshot = await getDocs(q);

        const fetchedPosts: Post[] = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          const post: Post = {
            imageUrl: postData.imageUrl,
            content: postData.content,
            likes: postData.likes,
            dislikes: postData.dislikes,
          };
          fetchedPosts.push(post);
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <img src={post.imageUrl} alt="Post" />
          <div className="post-content">
            <p>{post.content}</p>
            <p>{post.likes}</p>
            <p>{post.dislikes}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsComponent;
