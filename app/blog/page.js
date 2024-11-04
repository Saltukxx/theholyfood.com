// app/blog/page.js

'use client';

import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.slug} className="p-6 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <p className="text-sm text-gray-500">
                Category: {post.category} | Date: {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Tags: {post.tags.join(', ')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
