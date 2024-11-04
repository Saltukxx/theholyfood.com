'use client';

import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';

export default function SearchBar({ posts, onSearch }) {
  const [query, setQuery] = useState('');
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    // Initialize Fuse.js with your posts
    const fuseInstance = new Fuse(posts, {
      keys: ['title', 'excerpt', 'tags', 'category'],
      threshold: 0.3,
    });
    setFuse(fuseInstance);
  }, [posts]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      onSearch(posts); // Show all posts when search is empty
      return;
    }

    if (fuse) {
      const results = fuse.search(value).map(result => result.item);
      onSearch(results);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Blog yazılarında ara..."
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}