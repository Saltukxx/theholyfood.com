'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const { slug } = useParams(); // Use useParams from next/navigation to access slug
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError('Yazı bulunamadı');
        }
      } catch (error) {
        setError('Bir hata oluştu. Yazı yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-teal-600 mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{post.excerpt}</p>
      </div>

      <div className="mb-8 text-sm text-gray-500">
        <span className="block mb-2">
          <span className="font-semibold">Kategori:</span> {post.category}
        </span>
        <span className="block mb-2">
          <span className="font-semibold">Tarih:</span> {new Date(post.date).toLocaleDateString('tr-TR')}
        </span>
      </div>

      <div className="content max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
        {post.content}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Etiketler</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-teal-100 text-teal-600 text-xs font-semibold px-4 py-2 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
