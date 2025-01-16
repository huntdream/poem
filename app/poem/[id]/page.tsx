import { getPoemWithAdjacent } from '@/api';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Undo2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getPoemWithAdjacent(id);
  console.log(data);
  const { current: poem, prev, next } = data;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <title>{poem?.title}</title>
      <div className='min-h-screen '>
        <div className='sticky top-0 z-10 bg-white w-full shadow-md '>
          <div className='mx-auto w-full min-w-0 max-w-4xl h-14 flex items-center'>
            <Link href='/' className=''>
              <Button variant='ghost' size='icon'>
                <Undo2 size={36} />
              </Button>
            </Link>
          </div>
        </div>

        <main className='px-14 mt-6 mx-auto w-full min-w-0 max-w-4xl relative transform'>
          <h1 className='text-3xl text-center font-bold mb-6 text-blue-600'>
            {poem?.title}
          </h1>
          <p className='text-xl mb-4 text-green-600 text-center'>
            {poem?.author}
          </p>
          <div className='space-y-4 flex justify-center'>
            <p className='text-xl whitespace-pre-line leading-10'>
              {poem?.paragraphs}
            </p>
          </div>
          <div className='mt-32'>
            <p className='whitespace-pre-line text-gray-600 leading-10'>
              {poem?.notes}
            </p>
          </div>

          {!!next?.id && (
            <Link
              href={`/poem/${next.id}`}
              className='fixed right-1 top-[50vh] transform -translate-y-1/2'
            >
              <Button variant='ghost' size='icon'>
                <ChevronRight />
              </Button>
            </Link>
          )}
          {!!prev?.id && (
            <Link
              href={`/poem/${prev.id}`}
              className='fixed left-1 top-[50vh] transform -translate-y-1/2'
            >
              <Button variant='ghost' size='icon'>
                <ChevronLeft />
              </Button>
            </Link>
          )}
        </main>
      </div>
    </Suspense>
  );
}
