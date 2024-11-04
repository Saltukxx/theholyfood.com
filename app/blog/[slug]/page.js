'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog/${slug}`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch post');
          return response.json();
        })
        .then((data) => setPost(data))
        .catch((error) => setError(error.message));
    }
  }, [slug]);

  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">{post.date}</p>
        <div className="text-lg text-gray-800">{post.content}</div>
      </div>
    </div>
  );
}
