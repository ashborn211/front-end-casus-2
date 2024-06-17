"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../FireBaseConfig";

interface Post {
  id: string;
  imageUrl: string;
  content: string;
  likes: number;
  dislikes: number;
  isPublic: boolean;
}

const PostsComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts")), (snapshot) => {
      const fetchedPosts: Post[] = [];
      snapshot.forEach((doc) => {
        const postData = doc.data();
        const post: Post = {
          id: doc.id,
          imageUrl: postData.imageUrl,
          content: postData.content,
          likes: postData.likes ?? 0,
          dislikes: postData.dislikes ?? 0,
          isPublic: postData.isPublic,
        };
        fetchedPosts.push(post);
      });
      setPosts(fetchedPosts);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLike = async (postId: string) => {
    const postRef = doc(db, "posts", postId);

    try {
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data() as Post;
        const sessionLikes = JSON.parse(sessionStorage.getItem("likes") || "[]");

        if (!sessionLikes.includes(postId)) {
          // User has not liked the post yet
          await updateDoc(postRef, {
            likes: (postData.likes ?? 0) + 1,
          });
          sessionLikes.push(postId);
          sessionStorage.setItem("likes", JSON.stringify(sessionLikes));
        } else {
          alert("You have already liked this post.");
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleDislike = async (postId: string) => {
    const postRef = doc(db, "posts", postId);

    try {
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data() as Post;
        const sessionDislikes = JSON.parse(sessionStorage.getItem("dislikes") || "[]");

        if (!sessionDislikes.includes(postId)) {
          // User has not disliked the post yet
          await updateDoc(postRef, {
            dislikes: (postData.dislikes ?? 0) + 1,
          });
          sessionDislikes.push(postId);
          sessionStorage.setItem("dislikes", JSON.stringify(sessionDislikes));
        } else {
          alert("You have already disliked this post.");
        }
      }
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.imageUrl} alt="Post" />
          <div className="post-content">
            <p>{post.content}</p>
            <div className="post-buttons">
              <div className="comments">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.9666 15.38C14.7361 15.38 15.3599 14.7553 15.3599 13.9846C15.3599 13.214 14.7361 12.5892 13.9666 12.5892C13.1971 12.5892 12.5733 13.214 12.5733 13.9846C12.5733 14.7553 13.1971 15.38 13.9666 15.38Z"
                    fill="#A39A9A"
                  />
                  <path
                    d="M19.5398 15.38C20.3093 15.38 20.9331 14.7553 20.9331 13.9846C20.9331 13.214 20.3093 12.5892 19.5398 12.5892C18.7703 12.5892 18.1465 13.214 18.1465 13.9846C18.1465 14.7553 18.7703 15.38 19.5398 15.38Z"
                    fill="#A39A9A"
                  />
                  <path
                    d="M8.39337 15.38C9.16287 15.38 9.78668 14.7553 9.78668 13.9846C9.78668 13.214 9.16287 12.5892 8.39337 12.5892C7.62387 12.5892 7.00006 13.214 7.00006 13.9846C7.00006 14.7553 7.62387 15.38 8.39337 15.38Z"
                    fill="#A39A9A"
                  />
                  <path
                    d="M23.8173 4.11919C21.5312 1.8147 18.5139 0.381232 15.2855 0.0659138C12.0572 -0.249405 8.8202 0.573189 6.13255 2.39188C3.44491 4.21057 1.47507 6.91138 0.56263 10.0287C-0.349809 13.146 -0.147664 16.4845 1.13421 19.4685C1.26782 19.7459 1.31166 20.0581 1.25961 20.3616L0.0335007 26.2641C-0.0137378 26.4904 -0.00409165 26.7249 0.0615724 26.9465C0.127237 27.1682 0.246861 27.37 0.409694 27.5339C0.543179 27.6666 0.702114 27.7709 0.876918 27.8404C1.05172 27.91 1.23878 27.9433 1.42681 27.9385H1.70547L7.66884 26.7385C7.97192 26.702 8.27927 26.7453 8.56055 26.8641C11.5401 28.1479 14.8736 28.3503 17.9863 27.4365C21.0989 26.5227 23.7957 24.5499 25.6117 21.8583C27.4277 19.1666 28.249 15.9248 27.9342 12.6916C27.6193 9.45847 26.188 6.43664 23.887 4.1471L23.8173 4.11919ZM24.9737 15.7847C24.7013 17.4507 24.0551 19.0332 23.0838 20.4131C22.1124 21.7929 20.8412 22.9341 19.3659 23.7508C17.8905 24.5675 16.2494 25.0384 14.566 25.1281C12.8827 25.2178 11.2009 24.9239 9.64733 24.2687C9.09634 24.0339 8.50445 23.9106 7.9057 23.9059C7.64415 23.9077 7.38318 23.931 7.12544 23.9756L3.19631 24.771L3.9905 20.836C4.14867 19.9838 4.04671 19.1036 3.6979 18.3103C3.04359 16.7544 2.75018 15.0702 2.83975 13.3843C2.92932 11.6984 3.39954 10.0548 4.21502 8.57726C5.0305 7.09968 6.16999 5.82659 7.54775 4.8538C8.92551 3.881 10.5056 3.23384 12.1692 2.96102C13.9154 2.67401 15.7048 2.80749 17.3892 3.35041C19.0737 3.89334 20.6049 4.83012 21.8562 6.08326C23.1074 7.33639 24.0428 8.86988 24.5849 10.5569C25.127 12.2439 25.2603 14.0359 24.9737 15.7847Z"
                    fill="#A39A9A"
                  />
                </svg>
                <p>0</p>
              </div>
              <div className="interaction-buttons">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleLike(post.id)}
                >
                  <path
                    d="M13.5139 3.36676V2.16028L12.6605 3.01307L1.32083 14.3444C1.21901 14.4461 1.10437 14.4854 0.975788 14.4854C0.847208 14.4854 0.732572 14.4461 0.630752 14.3444C0.456416 14.1702 0.456416 13.8301 0.630752 13.6558L13.6537 0.642577C13.6538 0.642399 13.654 0.64222 13.6542 0.642042C13.7462 0.551093 13.8704 0.5 14 0.5C14.1296 0.5 14.2538 0.551093 14.3458 0.642042C14.346 0.64222 14.3462 0.642399 14.3463 0.642577L27.3692 13.6558C27.5436 13.8301 27.5436 14.1702 27.3692 14.3444C27.1947 14.5188 26.8537 14.5188 26.6792 14.3444L15.3395 3.01307L14.4861 2.16028V3.36676V27.0147C14.4861 27.2719 14.2583 27.5 14 27.5C13.7417 27.5 13.5139 27.2719 13.5139 27.0147V3.36676Z"
                    fill="#2F3699"
                    stroke="#2F3699"
                  />
                </svg>

                <p>{post.likes}</p>

                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleDislike(post.id)}
                >
                  <path
                    d="M14.4861 24.6332V25.8397L15.3395 24.9869L26.6792 13.6556C26.781 13.5539 26.8956 13.5146 27.0242 13.5146C27.1528 13.5146 27.2674 13.5539 27.3692 13.6556C27.5436 13.8298 27.5436 14.1699 27.3692 14.3442L14.3463 27.3574C14.3462 27.3576 14.346 27.3578 14.3458 27.358C14.2538 27.4489 14.1296 27.5 14 27.5C13.8704 27.5 13.7462 27.4489 13.6542 27.358C13.654 27.3578 13.6538 27.3576 13.6537 27.3574L0.630753 14.3442C0.456417 14.1699 0.456417 13.8298 0.630753 13.6556C0.805292 13.4812 1.14629 13.4812 1.32083 13.6556L12.6605 24.9869L13.5139 25.8397V24.6332L13.5139 0.985331C13.5139 0.728102 13.7417 0.5 14 0.5C14.2583 0.5 14.4861 0.728102 14.4861 0.985331L14.4861 24.6332Z"
                    fill="#C90B0B"
                    stroke="#C90B0B"
                  />
                </svg>

                <p>{post.dislikes}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsComponent;
