import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { client } from '../lib/client';
import { getExhibitions } from '../lib/queries';

export default function Exhibitions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState({ current: [], upcoming: [], past: [] });
  const [expandedIndex, setExpandedIndex] = useState(null);
  const expandedRef = useRef(null);

  // Fetch exhibitions
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

  // Expand from URL and scroll into view
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const expandedSlug = params.get('expand');

    console.log('expandedSlug:', expandedSlug);
    console.log('current exhibitions:', exhibitions.current.length);
    console.log('upcoming exhibitions:', exhibitions.upcoming.length);
  
    if (!expandedSlug || (!exhibitions.current.length && !exhibitions.upcoming.length)) return;
  
    const allExhibitions = [
      ...exhibitions.current.map((ex, i) => ({ ...ex, section: 'current', index: i })),
      ...exhibitions.upcoming.map((ex, i) => ({ ...ex, section: 'upcoming', index: i })),
    ];

    console.log('All slugs:', allExhibitions.map(e => e.slug));

  
    const match = allExhibitions.find((ex) => ex.slug === expandedSlug);
  
    if (match) {
      const key = `${match.section}-${match.index}`;
      console.log('Matched exhibition:', match);

      setExpandedIndex(key);
  
      setTimeout(() => {
        const el = document.getElementById(`exhibition-${key}`);
        console.log('Scroll target element:', el); // <— does it exist?

        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
        const url = new URL(window.location.href);
        url.searchParams.delete('expand');
        window.history.replaceState({}, '', url.pathname);
      }, 800);
    }
  }, [location.search, exhibitions]);
  

  const handleToggle = (key) => {
    setExpandedIndex(prev => (prev === key ? null : key));
  };

  const ExhibitionRow = ({ item, index, section }) => {
    const isExpanded = expandedIndex === `${section}-${index}`;
    const carouselRef = useRef(null);
    const start = item.start && new Date(item.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const end = item.end && new Date(item.end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
      <div
        id={`exhibition-${section}-${index}`}

        key={item._id}
        ref={isExpanded ? expandedRef : null}
        className="border-b border-black cursor-pointer py-4 transition-all"
        onClick={() => handleToggle(`${section}-${index}`)}
      >
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start">
          <div className="flex flex-col justify-between h-full relative">
            <p className="font-semibold">{start} – {end}</p>
            {section === 'current' && (
              <span className="absolute bottom-0 left-0 text-xl">
                {isExpanded ? '' : '↓'}
              </span>
            )}
          </div>
          <p className="font-semibold">
            <Link to={`/artist/${item.artist?.slug}`} className="underline hover:no-underline">
              {item.artist?.name}
            </Link>
          </p>
          <p className="font-semibold uppercase">{item.title}</p>
          <p className='mb-4'>{item.location}</p>
          {!isExpanded && item.images?.[0]?.asset?.url ? (
            <img
              src={item.images[0].asset.url}
              alt={item.title}
              className="w-36 h-24 object-cover"
            />
          ) : <div className="w-36 h-0" />}
        </div>

        {/* Mobile view */}
        <div className="md:hidden flex flex-col space-y-1">
          <p className="text-md font-semibold">{start} – {end}</p>
          {item.images?.[0]?.asset?.url && (
            <img
              src={item.images[0].asset.url}
              alt={item.title}
              className="w-full h-[220px] object-cover my-2"
            />
          )}
          <div className="flex justify-between text-md font-bold uppercase">
            <p>{item.title}</p>
            <p>{item.location}</p>
          </div>
          <p className="text-md font-semibold">
            <Link to={`/artist/${item.artist?.slug}`} className="hover:underline">
              {item.artist?.name}
            </Link>
          </p>
        </div>

        {/* Expandable content */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 space-y-2 w-full">
            <div className="hidden md:flex flex-col items-center w-full space-y-2">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
                  }}
                  className="text-xl hover:underline"
                >←</button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
                  }}
                  className="text-xl hover:underline"
                >→</button>
              </div>
            </div>
            {item.description && (
              <p className="text-sm md:text-base leading-tight max-w-3xl mt-4">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen w-full p-4 md:p-8 flex flex-col items-center">
        {['current', 'upcoming', 'past'].map((section) => (
          exhibitions[section].length > 0 && (
            <section key={section} className={`w-full max-w-6xl mb-12 ${section === 'past' ? 'mb-24' : ''}`}>
              <h2 className="text-[32px] font-bold leading-none mb-4">{section.toUpperCase()}</h2>
              <div className={`border-b border-black ${section === 'past' ? 'opacity-50 mb-2' : ''}`} />
              {section === 'past'
                ? exhibitions.past.map((item) => (
                    <div
                      key={item._id}
                      className="opacity-30 py-2 text-lg md:text-lg flex flex-col md:flex-row md:justify-between md:items-start"
                    >
                      <p className="font-semibold mb-0 md:w-1/4">
                        {item.start && new Date(item.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} –
                        {item.end && new Date(item.end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="font-semibold mb-0 md:w-1/4">{item.artist?.name}</p>
                      <p className="uppercase md:w-1/2">{item.title}</p>
                    </div>
                  ))
                : exhibitions[section].map((item, i) => (
                    <ExhibitionRow key={item._id} item={item} index={i} section={section} />
                  ))}
            </section>
          )
        ))}
      </div>
    </Layout>
  );
}
