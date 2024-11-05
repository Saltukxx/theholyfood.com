'use client';

import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        console.log('Yazılar yükleniyor...');
        if (response.ok) {
          const data = await response.json();
          console.log('Yüklenen yazılar:', data);
          setPosts(data);
        } else {
          console.error('Blog yazılarını yükleyemedi:', response.statusText);
        }
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="text-lg font-medium text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-teal-600 mb-4">
          Blog Yazıları
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Sağlıklı yaşam, beslenme ipuçları ve size özel rehberlerle dolu
          en güncel blog yazılarımıza göz atın.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-xl text-gray-500">
          Blog yazısı bulunamadı.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-teal-700 hover:text-teal-500 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-6 line-clamp-3">
                {post.excerpt.length > 120
                  ? `${post.excerpt.slice(0, 120)}...`
                  : post.excerpt}
              </p>
              <div className="mb-4 text-sm text-gray-500">
                <span className="block mb-2">
                  <span className="font-semibold">Kategori:</span> {post.category}
                </span>
                <span className="block mb-2">
                  <span className="font-semibold">Tarih:</span> {new Date(post.date).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-teal-100 text-teal-600 text-xs font-semibold mr-2 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                className="inline-block w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors duration-200 text-center"
                onClick={() => {
                  window.location.href = `/blog/${post.slug}`;
                }}
              >
                Devamını Oku
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
