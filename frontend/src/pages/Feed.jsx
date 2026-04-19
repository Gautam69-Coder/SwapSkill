import { useState, useEffect } from 'react';
import * as postService from '../services/postService';
import PostCard from '../components/features/post/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts on component mount
    postService.getPosts().then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 mt-10">Loading feed...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Skill Swap Feed</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded shadow-sm">
          <p className="text-gray-500 text-lg">No posts available.</p>
          <p className="text-gray-400 mt-2">Be the first to create one!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}