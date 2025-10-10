import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { client } from '../lib/client';
import { getNewsItemBySlug } from '../lib/queries';
import { PortableText } from '@portabletext/react';

export default function NewsDetail() {
  const { id } = useParams();
  const carouselRef = useRef(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = getNewsItemBySlug(id);
      const result = await client.fetch(query);
      setItem(result);
    };
    fetchData();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-8 pb-[90px]">
        {/* Main Image */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-auto max-h-[500px] object-cover mb-2 md:mb-6"
        />

        {/* Mobile Title and Top Description */}
        <div className="md:hidden mb-4 w-full">
          <div className="w-3/4">
            <h2 className="font-bold font-gracesmews text-lg uppercase">{item.title}</h2>
            <p className="text-sm font-gracesmews text-gray-500">
              {item.fullDate ? new Date(item.fullDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }) : ''}
            </p>
          </div>
          {item.descriptionTop && (
            <div className="pt-2 text-md">
              <PortableText value={item.descriptionTop} />
            </div>
          )}
        </div>

        {/* Desktop Title and Top Description */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-4">
            <h2 className="font-bold text-lg uppercase mb-2">{item.title}</h2>
            <p className="text-sm font-gracesmews text-gray-500">
              {item.fullDate ? new Date(item.fullDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }) : ''}
            </p>
          </div>
          <div className="col-span-1" />
          <div className="col-span-7 text-sm md:text-base w-full pr-14">
            {item.descriptionTop && <PortableText value={item.descriptionTop} />}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative pb-8">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4"
          >
            {item.gallery?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className="w-full md:min-w-[41.5%] md:max-w-[40%] h-[200px] md:h-[260px] object-cover snap-center"
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="absolute bottom-0 left-0 flex gap-2">
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
              className="text-2xl hover:text-[#AAAAAA] hover:scale-110"
            >
              ←
            </button>
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
              className="text-2xl hover:text-[#AAAAAA] hover:scale-110"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop Bottom Description, Video, Credit, Buy */}
        {(item.descriptionBottom || item.video || item.videoDescription || item.buyText) && (
          <div className="hidden md:grid grid-cols-12 gap-8 mt-4">
            <div className="col-span-4" />
            <div className="col-span-1" />
            <div className="col-span-7 text-sm md:text-base w-full pr-14">
              {item.descriptionBottom && <PortableText value={item.descriptionBottom} />}
              {item.video && (
                <div className="aspect-video my-4">
                  <iframe
                    src={item.video}
                    title="Video"
                    allowFullScreen
                    className="w-full h-[350px] mt-10"
                  />
                </div>
              )}
              {item.videoDescription && <p className="text-sm opacity-60 font-gracesmews">{item.videoDescription}</p>}
              {item.buyText && (
                <p className="text-lg mt-6 font-gracesmews">
                  {item.buyLink ? (
                    <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                      {item.buyText}
                    </a>
                  ) : (
                    item.buyText
                  )}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Mobile Bottom Description, Video, Credit, Buy */}
        <div className="md:hidden space-y-4 mt-6">
          {item.descriptionBottom && <PortableText value={item.descriptionBottom} />}
          {item.video && (
            <div className="aspect-video">
              <iframe
                src={item.video}
                title="Video"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          {item.videoDescription && <p className="text-md opacity-60">{item.videoDescription}</p>}
          {item.buyText && (
            <p className="text-lg mt-4">
              {item.buyLink ? (
                <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  {item.buyText}
                </a>
              ) : (
                item.buyText
              )}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
