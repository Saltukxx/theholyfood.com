'use client';

import { useState, useEffect } from 'react';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("DraftsPage component rendered");
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await fetch('/api/admin/drafts');
      if (response.ok) {
        const data = await response.json();
        setDrafts(data);
        console.log("Fetched drafts:", data);
      }
    } catch (error) {
      console.error("Error fetching drafts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Drafts Page Loaded</h1>
      <ul>
        {drafts.map((draft) => (
          <li key={draft.slug}>{draft.title}</li>
        ))}
      </ul>
    </div>
  );
}
