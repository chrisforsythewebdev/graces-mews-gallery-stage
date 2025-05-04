import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { client } from '../lib/client';
import { getArtistBySlug } from '../lib/queries';
import { PortableText } from '@portabletext/react';

export default function ArtistDetails() {
  const { slug } = useParams();
  const [artist, setArtist] = useState(null);
  const topScrollRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    client.fetch(getArtistBySlug, { slug }).then(setArtist);
  }, [slug]);
  

  if (!artist) return <p>Loading artist...</p>;

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-4 pb-[60px]">
        <h1 className="text-2xl font-bold uppercase mb-4 underline">{artist.name}</h1>

        {/* Top Scrollable Image Section */}
        <div className="relative overflow-hidden mb-6">
          <div
            ref={topScrollRef}
            className="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory"
          >
            {artist.topImages?.map((img, i) => (
              <div
                key={i}
                className="min-w-[250px] max-w-[250px] flex-shrink-0 snap-start flex flex-col items-start"
              >
                <div className="w-full h-[360px] bg-white flex items-end justify-center overflow-hidden">
                  <img
                    src={img.image.asset.url}
                    alt={`Top ${i}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-md font-semibold mt-1">{img.caption}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-start mt-2">
            <button
              onClick={() => topScrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })} className='text-xl hover:text-[#AAAAAA] hover:scale-110'
            >
              ←
            </button>
            <button
              onClick={() => topScrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })} className='text-xl hover:text-[#AAAAAA] hover:scale-110'
            >
              →
            </button>
          </div>
        </div>

        {/* Section Label */}
        <h2 className="text-2xl uppercase font-bold mb-2">Portfolio</h2>
        <div className="border-t border-black mb-4" />

        {/* Scrollable Portfolio */}
        <div className="relative overflow-hidden mb-10">
          <div
            ref={portfolioRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4"
          >
            {artist.portfolioImages?.map((img, i) => (
              <img
                key={i}
                src={img.image.asset.url}
                alt={`Portfolio ${i}`}
                className="flex-shrink-0 snap-start w-full md:h-[400px] md:w-auto object-cover"
              />
            ))}
          </div>
          <div className="flex gap-2 mt-2 justify-start">
            <button
              onClick={() => portfolioRef.current?.scrollBy({ left: -300, behavior: 'smooth' })} className='text-xl hover:text-[#AAAAAA] hover:scale-110'
            >
              ←
            </button>
            <button
              onClick={() => portfolioRef.current?.scrollBy({ left: 300, behavior: 'smooth' })} className='text-xl hover:text-[#AAAAAA] hover:scale-110'
            >
              →
            </button>
          </div>
        </div>

        {/* Bio Section */}
        <h2 className="text-2xl uppercase font-bold mb-2">Bio</h2>
        <div className="border-t border-black mb-2" />
        <p className="text-md uppercase font-bold mb-4">{artist.location}</p>
        {/* <div className="text-md w-2/3 leading-tight">
          <PortableText value={artist.bio} />
        </div> */}
        <p className="text-md whitespace-pre-line w-2/3">
          {artist.bio}
        </p>
      </div>
    </Layout>
  );
}
