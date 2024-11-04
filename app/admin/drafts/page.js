'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await fetch('/api/admin/drafts');
      if (response.ok) {
        const data = await response.json();
        setDrafts(data);
      } else {
        console.error("Failed to fetch drafts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching drafts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading drafts...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold mb-8">Drafts Page</h1>
        
        {drafts.length === 0 ? (
          <p className="text-gray-500">No drafts found.</p>
        ) : (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div key={draft.slug} className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">{draft.title}</h2>
                <p className="text-gray-600">{draft.excerpt}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">Category:</span> {draft.category}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Tags:</span> {draft.tags.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link href="/admin" className="mt-8 inline-block text-blue-500 hover:text-blue-700">
          Back to Admin
        </Link>
      </div>
    </div>
  );
}
