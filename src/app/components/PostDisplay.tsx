"use client";


import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../FireBaseConfig';

interface Post {
  imageUrl: string;
  content: string;
}

const PostsComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, 'posts');
        const q = query(postsCollectionRef);
        const querySnapshot = await getDocs(q);

        const fetchedPosts: Post[] = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          const post: Post = {
            imageUrl: postData.imageUrl,
            content: postData.content,
          };
          fetchedPosts.push(post);
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <img src={post.imageUrl} alt="Post" />
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsComponent;
