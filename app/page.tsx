'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, KeyboardEvent, Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { getPoems } from '@/api';
import { Poem } from '@/types';

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const [query, setQuery] = useState(search || '');
  const [poems, setPoems] = useState<Poem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true);
      const result = await getPoems({ limit: 10, cursor });
      setPoems(result.poems);
      setLoading(false);
    };

    fetchPoems();
  }, [query, cursor]);

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      router.push(`/?search=${query}`);
      setPoems([]);
      setCursor(0);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen p-8 w-full max-w-4xl mx-auto'>
        <main>
          <Input
            type='text'
            placeholder='Search poems...'
            className='mb-6 p-2'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <h1 className='text-3xl font-bold mb-6 text-blue-600'>Poem List</h1>
          <ul className='space-y-4'>
            {poems.map((poem) => (
              <li key={poem.id}>
                <Link
                  href={`/poem/${poem.id}`}
                  className='text-xl text-blue-600 hover:underline'
                >
                  {poem.title} · {poem.author}
                </Link>
              </li>
            ))}
          </ul>
          {loading && <p>Loading...</p>}
        </main>
        <nav className='fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between'>
          <button
            onClick={() => setCursor((prev) => Math.max(prev - 10, 0))}
            disabled={cursor === 0}
            className='px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={() => setCursor((prev) => prev + 10)}
            className='px-4 py-2 bg-blue-600 text-white rounded'
          >
            Next
          </button>
        </nav>
      </div>
    </Suspense>
  );
}
