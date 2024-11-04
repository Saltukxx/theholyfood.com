'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      const response = await fetch('/api/blog', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store' // Disable caching for development
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Raw response:', text);

      const data = text ? JSON.parse(text) : [];
      console.log('Parsed data:', data);

      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#00CED1]"
            >
              <ArrowLeft size={20} />
              Ana Sayfaya Dön
            </Link>
          </div>
          <div className="animate-pulse grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Bir hata oluştu
            </h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchPosts();
                }}
                className="px-4 py-2 bg-[#00CED1] text-white rounded-lg hover:bg-[#00B4B7]"
              >
                Tekrar Dene
              </button>
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-[#00CED1]"
          >
            <ArrowLeft size={20} />
            Ana Sayfaya Dön
          </Link>
        </div>

        {/* Blog posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Henüz blog yazısı bulunmuyor.</p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-sm text-gray-400 mt-2">
                App/blog/posts dizinine örnek bir blog yazısı ekleyin.
              </p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300"
              >
                {post.image && (
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-[#00CED1]">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-[#00CED1]/10 text-[#00CED1] rounded-full text-sm">
                        {post.category}
                      </span>
                    )}
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}