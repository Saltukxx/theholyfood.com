'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Bold, 
  Italic, 
  List, 
  Heading, 
  Link as LinkIcon, 
  LogOut, 
  FileText,
  X 
} from 'lucide-react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const router = useRouter();

  const categories = [
    'Beslenme',
    'Sağlıklı Yaşam',
    'Tarifler',
    'Spor',
    'Diyet',
    'Yaşam Tarzı'
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const insertFormat = (format) => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `\n# ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
    }

    const newContent = 
      content.substring(0, start) + 
      formattedText + 
      content.substring(end);
    
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + formattedText.length;
    }, 0);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('excerpt', excerpt);
    formData.append('category', category);
    formData.append('tags', JSON.stringify(tags));
    formData.append('isDraft', isDraft.toString());
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { isDraft } = await response.json();
        alert(isDraft ? 'Taslak kaydedildi!' : 'Blog yazısı başarıyla yayınlandı!');
        
        // Redirect to appropriate page
        if (isDraft) {
          router.push('/admin/drafts');
        } else {
          router.push('/blog');
        }
      } else {
        alert('Bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Yeni Blog Yazısı</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/drafts"
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <FileText size={20} />
              Taslaklar
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut size={20} />
              Çıkış Yap
            </button>
          </div>
        </div>

        {!isPreview ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Özet
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiketler
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter(t => t !== tag))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border"
                  placeholder="Yeni etiket"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                  Ekle
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görsel
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full"
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 max-h-48 rounded-lg"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İçerik
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => insertFormat('bold')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Kalın"
                >
                  <Bold size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('italic')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="İtalik"
                >
                  <Italic size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('heading')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Başlık"
                >
                  <Heading size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('link')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Link"
                >
                  <LinkIcon size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('list')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Liste"
                >
                  <List size={20} />
                </button>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-4 py-2 rounded-lg border font-mono"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Markdown formatını kullanabilirsiniz. Örnek: **kalın**, *italik*, # başlık
              </p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isDraft}
                  onChange={(e) => setIsDraft(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Taslak olarak kaydet</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white rounded-lg hover:shadow-lg hover:shadow-[#00CED1]/20 transition-all duration-300"
            >
              {isDraft ? 'Taslak Kaydet' : 'Yayınla'}
            </button>
          </form>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow">
            {imagePreview && (
              <img
                src={imagePreview}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex gap-2 mb-4">
              {category && (
                <span className="px-3 py-1 bg-[#00CED1]/10 text-[#00CED1] rounded-full">
                  {category}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose max-w-none whitespace-pre-wrap">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}