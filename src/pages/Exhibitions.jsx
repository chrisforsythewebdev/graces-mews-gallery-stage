import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client } from '../lib/client';
import { getExhibitions } from '../lib/queries';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { PortableText } from '@portabletext/react';

export default function Exhibitions() {
  const location = useLocation();
  const [exhibitions, setExhibitions] = useState({ current: [], upcoming: [], past: [] });
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(getExhibitions);
      const now = new Date();
      const current = data.filter(ex => new Date(ex.start) <= now && new Date(ex.end) >= now);
      const upcoming = data.filter(ex => new Date(ex.start) > now);
      const past = data.filter(ex => new Date(ex.end) < now);
      setExhibitions({ current, upcoming, past });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const expandedSlug = params.get('expand');
    if (!expandedSlug || (!exhibitions.current.length && !exhibitions.upcoming.length)) return;

    const allExhibitions = [
      ...exhibitions.current.map((ex, i) => ({ ...ex, section: 'current', index: i })),
      ...exhibitions.upcoming.map((ex, i) => ({ ...ex, section: 'upcoming', index: i })),
    ];

    const match = allExhibitions.find((ex) => ex.slug === expandedSlug);
    if (match) {
      const key = `${match.section}-${match.index}`;
      setExpandedIndex(key);

      setTimeout(() => {
        // const el = document.getElementById(`exhibition-${key}`);
        // if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const url = new URL(window.location.href);
        url.searchParams.delete('expand');
        window.history.replaceState({}, '', url.pathname);
      }, 400);
    }
  }, [location.search, exhibitions]);

  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    const sameYear = startDate.getFullYear() === endDate.getFullYear();
  
    const startFormatted = startDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  
    const endFormatted = endDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  
    return sameYear
      ? `${startFormatted} – ${endFormatted}`
      : `${startDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })} – ${endFormatted}`;
  };
  
  
  function ExhibitionRow({ item, expandOnLoad = false }) {
    const [isExpanded, setIsExpanded] = useState(expandOnLoad);
    const carouselRef = useRef(null);
    const headerRef = useRef(null);
  
    const start = new Date(item.start).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const end = new Date(item.end).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  
    useEffect(() => {
      if (expandOnLoad && headerRef.current) {
        // headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [expandOnLoad]);
  
    return (
      <div id={`exhibition-${item.slug}`} className="border-b border-black py-4">
        {/* Desktop Header */}
        <div
          ref={headerRef}
          className="relative hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start group cursor-pointer"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          <div className="flex flex-col justify-between h-full">
            <p className="font-gracesmews font-semibold">{formatDateRange(item.start, item.end)}</p>
          </div>

          <p className="font-semibold">
            <Link
              to={`/artist/${item.artist?.slug}`}
              onClick={(e) => e.stopPropagation()}
              className={`${isExpanded ? 'underline' : ''} text-[#000] hover:text-[#AAAAAA] font-gracesmews`}
            >
              {item.artist?.name}
            </Link>
          </p>

          <p className="font-semibold font-gracesmews uppercase">{item.title}</p>
          <p className="mb-4 font-gracesmews">{item.location}</p>

          <div className="w-36 h-24 relative">
            <AnimatePresence mode="wait">
              {!isExpanded && item.images?.[0]?.asset?.url && (
                <motion.img
                  key="thumbnail"
                  src={item.images[0].asset.url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Arrow Button Floating at Bottom Center */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(prev => !prev);
            }}
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl transition-all duration-700 hover:text-[#AAAAAA] hover:scale-150
                ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}
          >
            {isExpanded ? '↑' : '↓'}
          </button>
        </div>
  
        {/* Mobile Header */}
        <div className="md:hidden flex flex-col space-y-1" onClick={() => setIsExpanded(prev => !prev)}>
          <p className="text-lg font-semibold leading-tight font-gracesmews">{start} – {end}</p>
          {/* {item.images?.[0]?.asset?.url && (
            <img src={item.images[0].asset.url} alt={item.title} className="w-full h-[220px] object-cover my-2" />
          )} */}
          {item.images?.length > 0 && (
            <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full my-2 scrollbar-hidden">
              {item.images.map((img, i) => (
                <img
                  key={i}
                  src={img.asset?.url}
                  alt=""
                  className="min-w-[100%] h-[220px] snap-center object-cover"
                />
              ))}
            </div>
          )}

          <div className="flex justify-between text-lg font-bold uppercase leading-tight tracking-tight font-gracesmews">
            <p>{item.title}</p>
            <p>{item.location}</p>
          </div>
          <p className="text-lg font-semibold leading-tight tracking-tight font-gracesmews">
            <Link
              to={`/artist/${item.artist?.slug}`}
              className="hover:text-[#AAAAAA]"
              onClick={(e) => e.stopPropagation()}
            >
              {item.artist?.name}
            </Link>
          </p>
        </div>
  
        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden mt-4"
            >
              <div className="space-y-4">
                {/* Carousel (desktop only) */}
                <div className="hidden md:flex flex-col items-center w-full space-y-2">
                  <div
                    ref={carouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full scrollbar-hidden"
                  >
                    {item.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img.asset?.url}
                        alt=""
                        className="min-w-2/3 h-[300px] snap-center object-cover"
                      />
                    ))}
                  </div>
                  <div className="w-full mt-2 flex justify-start space-x-2">
                    <button
                      onClick={() => carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
                      className="text-xl hover:text-[#AAAAAA] hover:scale-125"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
                      className="text-xl hover:text-[#AAAAAA] hover:scale-125"
                    >
                      →
                    </button>
                  </div>
                </div>
  
                {/* Description */}
                {item.description && (
                  <div className="max-w-3xl text-black space-y-2 leading-relaxed">
                    <PortableText value={item.description} />
                  </div>
                )}


                {/* Press Release Download Link */}
                {item.pressRelease?.asset?.url && (
                  <a
                    target='_blank'
                    href={item.pressRelease.asset.url}
                    download
                    className="inline-block mt-2 underline hover:text-[#AAAAAA] text-md"
                  >
                    Download Press Release 
                  </a>
                )}
  
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  return (
    <Layout>
      <div className="min-h-screen w-full p-4 md:p-8 flex flex-col items-center">
        {['current', 'upcoming', 'past'].map((section) => (
          exhibitions[section].length > 0 && (
            <section
              key={section}
              className={`w-full max-w-6xl mb-12 ${section === 'past' ? 'mb-24' : ''}`}
            >
              <h2 className="text-[32px] font-gracesmews font-bold leading-none mb-4">
                {section.toUpperCase()}
              </h2>
              <div className={`border-b border-black ${section === 'past' ? 'opacity-50 mb-2' : ''}`} />
  
              {section === 'past' ? (
                exhibitions.past.map((item, i) => (
                  <div key={item._id} id={`exhibition-past-${i}`} className="py-1">
  
                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start opacity-30">
                      <p className="font-gracesmews text-lg font-semibold">{formatDateRange(item.start, item.end)}</p>
                      <p className="font-semibold text-lg font-gracesmews">{item.artist?.name}</p>
                      <p className="font-semibold text-lg font-gracesmews uppercase">{item.title}</p>
                    </div>
  
                    {/* Mobile Layout */}
                    <div className="md:hidden flex flex-col space-y-1 opacity-30">
                      <p className="text-lg font-gracesmews font-semibold leading-tight">{formatDateRange(item.start, item.end)}</p>
                      <p className="text-lg font-gracesmews font-semibold leading-tight">{item.artist?.name}</p>
                      <div className="flex font-gracesmews justify-between text-lg font-bold uppercase leading-tight">
                        <p>{item.title}</p>
                      </div>
                    </div>
  
                  </div>
                ))
              ) : (
                exhibitions[section].map((item, i) => {
                  const expandOnLoad = location.search.includes(item.slug); // basic slug check
                  return (
                    <ExhibitionRow
                      key={item._id}
                      item={item}
                      expandOnLoad={expandOnLoad}
                    />
                  );
                })
              )}
            </section>
          )
        ))}
      </div>
    </Layout>
  );
}
