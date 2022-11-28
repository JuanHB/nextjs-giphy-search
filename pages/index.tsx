import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import GiphyApiFetcher, { GiphyItem } from '../utils/giphyApiFetcher';

export default function Home() {
  const [gifsData, setGifsData] = useState<GiphyItem[]>([])
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTrending = async () => {
      const trending = await GiphyApiFetcher.trending();
      setGifsData(trending)
    }
    fetchTrending();
  }, [])

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await GiphyApiFetcher.search(query)
    setGifsData(result)
  }

  const handleQueryChange = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  return (
    <div>
      <form className="flex gap-4 justify-center" onSubmit={handleFormSubmit}>
        <input
          value={query}
          onChange={handleQueryChange}
          placeholder="Search for a gif!"
          type="text"
          className="border p-3 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"></input>
        <button
          disabled={!query}
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Search!
        </button>
      </form>
      <div className='h-full w-full'>
        {
          gifsData.length ? (
            <div className="flex flex-col justify-center">
              <h1 className="mt-4 p-4 leading-6 text-center">Here are your gifs!</h1>
              <div className="mt-4">
                <ul className="grid grid-cols-3 gap-4">
                  {gifsData.map(({ id, title, images }) => (
                    <li key={id} className="border p-1 shadow-sm rounded-sm flex justify-center items-center">
                      <Image src={images.original.url} alt={title} width="200" height="200" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center p-4 mt-4'>
              <span>No GIFs to show!</span>
            </div>
          )
        }
      </div>
    </div>
  );
}
