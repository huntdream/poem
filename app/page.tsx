import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen p-8 flex justify-center'>
      <main className='text-center'>
        <h1 className='text-3xl font-bold mb-6 text-blue-600'>Poem List</h1>
        <ul className='space-y-4'>
          <li>
            <Link href='/poem/1'>
              <a className='text-xl text-blue-600 hover:underline'>Poem 1</a>
            </Link>
          </li>
          <li>
            <Link href='/poem/2'>
              <a className='text-xl text-blue-600 hover:underline'>Poem 2</a>
            </Link>
          </li>
          <li>
            <Link href='/poem/3'>
              <a className='text-xl text-blue-600 hover:underline'>Poem 3</a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
