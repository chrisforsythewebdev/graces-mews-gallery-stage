// import { useState, useRef, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { client } from '../lib/client';
// import { getExhibitions } from '../lib/queries';
// import { motion, AnimatePresence } from 'framer-motion';
// import Layout from '../components/Layout';
// import { PortableText } from '@portabletext/react';

// export default function Exhibitions() {
//   const location = useLocation();
//   const [exhibitions, setExhibitions] = useState({ current: [], upcoming: [], past: [] });
//   const [expandedIndex, setExpandedIndex] = useState(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await client.fetch(getExhibitions);
//       const now = new Date();
//       const current = data.filter(ex => new Date(ex.start) <= now && new Date(ex.end) >= now);
//       const upcoming = data.filter(ex => new Date(ex.start) > now);
//       const past = data.filter(ex => new Date(ex.end) < now);
//       setExhibitions({ current, upcoming, past });
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const expandedSlug = params.get('expand');
//     if (!expandedSlug || (!exhibitions.current.length && !exhibitions.upcoming.length)) return;

//     const allExhibitions = [
//       ...exhibitions.current.map((ex, i) => ({ ...ex, section: 'current', index: i })),
//       ...exhibitions.upcoming.map((ex, i) => ({ ...ex, section: 'upcoming', index: i })),
//     ];

//     const match = allExhibitions.find((ex) => ex.slug === expandedSlug);
//     if (match) {
//       const key = `${match.section}-${match.index}`;
//       setExpandedIndex(key);

//       setTimeout(() => {
//         // const el = document.getElementById(`exhibition-${key}`);
//         // if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

//         const url = new URL(window.location.href);
//         url.searchParams.delete('expand');
//         window.history.replaceState({}, '', url.pathname);
//       }, 400);
//     }
//   }, [location.search, exhibitions]);

//   const formatDateRange = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const sameYear = startDate.getFullYear() === endDate.getFullYear();

//     const startFormatted = startDate.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'short',
//     });

//     const endFormatted = endDate.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });

//     return sameYear
//       ? `${startFormatted} – ${endFormatted}`
//       : `${startDate.toLocaleDateString('en-GB', {
//           day: 'numeric',
//           month: 'short',
//           year: 'numeric',
//         })} – ${endFormatted}`;
//   };
  
//   function ExhibitionRow({ item, expandOnLoad = false, variant = 'default' }) {
//     // Past rows start collapsed regardless of expandOnLoad
//     const initialExpanded = variant === 'past' ? false : !!expandOnLoad;
//     const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
//     const imageCount = item.images?.length || 0;
//     const hasImages = imageCount > 0;
//     const hasMultipleImages = imageCount > 1;

//     const carouselRef = useRef(null);
//     const headerRef = useRef(null);
  
//     const start = new Date(item.start).toLocaleDateString('en-GB', {
//       day: 'numeric', month: 'short', year: 'numeric',
//     });
//     const end = new Date(item.end).toLocaleDateString('en-GB', {
//       day: 'numeric', month: 'short', year: 'numeric',
//     });
  
//     // Wrapper: only show bottom border for past when expanded
//     const rowWrapperClass =
//       variant === 'past'
//         ? `py-4 ${isExpanded ? 'border-b border-black' : ''}`
//         : 'py-4 border-b border-black';
  
//     // Desktop header styles
//     const desktopHeaderBase =
//       'relative hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start cursor-pointer';
  
//     // IMPORTANT: use hover on THIS element (not group-hover), and avoid child text colors
//     const desktopHeaderPast =
//       ' text-gray-400 opacity-70 transition-colors hover:text-black hover:opacity-100';
  
//     const desktopHeaderClass =
//       variant === 'past'
//         ? `${desktopHeaderBase} ${desktopHeaderPast}`
//         : desktopHeaderBase;
  
//     // Mobile header styles (no hover on mobile)
//     const mobileHeaderBase = 'md:hidden flex flex-col space-y-1';
//     const mobileHeaderPastCollapsed = ' text-gray-500 opacity-70';
//     const mobileHeaderPastExpanded = ' text-black opacity-100';
//     const mobileHeaderClass =
//       variant === 'past'
//         ? `${mobileHeaderBase} ${isExpanded ? mobileHeaderPastExpanded : mobileHeaderPastCollapsed}`
//         : mobileHeaderBase;
  
//     const handleToggle = () => setIsExpanded(prev => !prev);
  
//     return (
//       <div id={`exhibition-${item.slug}`} className={rowWrapperClass}>
//         {/* DESKTOP HEADER */}
//         <div ref={headerRef} className={desktopHeaderClass} onClick={handleToggle}>
//           <div className="flex flex-col justify-between h-full">
//             <p className="font-gracesmews">{formatDateRange(item.start, item.end)}</p>
//           </div>
  
//           <p>
//             <Link
//               to={`/artist/${item.artist?.slug}`}
//               onClick={(e) => e.stopPropagation()}
//               className={`${isExpanded ? 'underline' : ''} font-gracesmews`}
//             >
//               {item.artist?.name}
//             </Link>
//           </p>
  
//           <p className="font-gracesmews uppercase">{item.title}</p>
//           <p className="mb-4 font-gracesmews">{item.location}</p>
  
//           {/* Thumbnail (desktop) — OMIT for past */}
//           <div className="w-36 h-24 relative">
//             <AnimatePresence mode="wait">
//               {variant !== 'past' && !isExpanded && item.images?.[0]?.asset?.url && (
//                 <motion.img
//                   key="thumbnail"
//                   src={item.images[0].asset.url}
//                   alt={item.title}
//                   className="absolute inset-0 w-full h-full object-cover"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               )}
//             </AnimatePresence>
//           </div>
  
//           {/* Arrow */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleToggle();
//             }}
//             className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl transition-all duration-700 hover:scale-150
//               ${
//                 variant === 'past'
//                   ? // Past: hidden by default, only show on hover or when expanded
//                     isExpanded
//                       ? 'opacity-100'
//                       : 'opacity-0 hover:opacity-100'
//                   : // Default: keep your current behavior
//                     isExpanded
//                       ? 'opacity-100'
//                       : 'opacity-50 hover:opacity-100'
//               }`}
//             aria-label={isExpanded ? 'Collapse' : 'Expand'}
//           >
//             {isExpanded ? '↑' : '↓'}
//           </button>
//         </div>
  
//         {/* MOBILE HEADER (tap to expand/collapse) — no images in collapsed header */}
//         <div className={mobileHeaderClass} onClick={handleToggle}>
//           <p className="text-lg font-semibold leading-tight font-gracesmews">
//             {start} – {end}
//           </p>

//           <div className="flex justify-between text-lg font-bold uppercase leading-tight tracking-tight font-gracesmews">
//             <p>{item.title}</p>
//             <p>{item.location}</p>
//           </div>
//           <p className="text-lg font-semibold leading-tight tracking-tight font-gracesmews">
//             <Link
//               to={`/artist/${item.artist?.slug}`}
//               onClick={(e) => e.stopPropagation()}
//               className="font-gracesmews"
//             >
//               {item.artist?.name}
//             </Link>
//           </p>
//         </div>
  
//         {/* EXPANDABLE CONTENT */}
//         <AnimatePresence initial={false}>
//           {isExpanded && (
//             <motion.div
//               key="expanded"
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.4, ease: 'easeInOut' }}
//               className="overflow-hidden mt-4"
//             >
//               <div className="space-y-4">
//                 {/* Mobile: swipeable images only when expanded (full-color, no arrows) */}
//                 {hasImages && (
//                   <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full my-2">
//                     {item.images.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img.asset?.url}
//                         alt={item.title || ''}
//                         loading="lazy"
//                         className="min-w-[85%] h-[220px] snap-center object-cover"
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* Desktop carousel (shown when expanded; arrows only if 2+ images) */}
//                 {hasImages && (
//                   <div className="hidden md:flex flex-col items-center w-full space-y-2">
//                     <div
//                       ref={carouselRef}
//                       className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full scrollbar-hidden"
//                     >
//                       {item.images.map((img, i) => (
//                         <img
//                           key={i}
//                           src={img.asset?.url}
//                           alt=""
//                           className="min-w-2/3 h-[300px] snap-center object-cover"
//                         />
//                       ))}
//                     </div>

//                     {/* Show arrow buttons only when there are 2+ images */}
//                     {hasMultipleImages && (
//                       <div className="w-full mt-2 flex justify-start space-x-2">
//                         <button
//                           onClick={() => carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
//                           className="text-xl hover:scale-125"
//                         >
//                           ←
//                         </button>
//                         <button
//                           onClick={() => carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
//                           className="text-xl hover:scale-125"
//                         >
//                           →
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Description */}
//                 {item.description && (
//                   <div className="max-w-3xl text-sm text-black space-y-2 leading-relaxed">
//                     <PortableText value={item.description} />
//                   </div>
//                 )}
  
//                 {/* Press Release */}
//                 {item.pressRelease?.asset?.url && (
//                   <a
//                     target="_blank"
//                     href={item.pressRelease.asset.url}
//                     download
//                     className="inline-block mt-2 underline text-sm"
//                   >
//                     Download Press Release
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   }
    
//   return (
//     <Layout>
//       <div className="min-h-screen w-full p-4 md:p-8 flex flex-col items-center">
//         {['current', 'upcoming', 'past'].map((section) => (
//           exhibitions[section].length > 0 && (
//             <section
//               key={section}
//               className={`w-full max-w-6xl mb-12 ${section === 'past' ? 'mb-24' : ''}`}
//             >
//               <h2 className="text-[32px] font-gracesmews font-bold leading-none mb-4">
//                 {section.toUpperCase()}
//               </h2>
//               <div className={`border-b border-black ${section === 'past' ? 'opacity-50 mb-2' : ''}`} />
  
//               {exhibitions[section].map((item) => {
//                 const expandOnLoad =
//                   section !== 'past' && location.search.includes(item.slug);
//                 // keep for current/upcoming; harmless for past
//                 return (
//                   <ExhibitionRow
//                     key={item._id}
//                     item={item}
//                     expandOnLoad={expandOnLoad}
//                     variant={section === 'past' ? 'past' : 'default'}
//                   />
//                 );
//               })}

//             </section>
//           )
//         ))}
//       </div>
//     </Layout>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client } from '../lib/client';
import { getExhibitions } from '../lib/queries';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { PortableText } from '@portabletext/react';
import SEO from '../components/SEO';

export default function Exhibitions() {
  const location = useLocation();
  const [exhibitions, setExhibitions] = useState({ current: [], upcoming: [], past: [] });
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Canonical base + fallback OG image
  const BASE_URL = 'https://www.gracesmews.com';
  // const defaultOg = `${BASE_URL}/og-default.jpg`;

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
        const url = new URL(window.location.href);
        url.searchParams.delete('expand');
        window.history.replaceState({}, '', url.pathname);
      }, 400);
    }
  }, [location.search, exhibitions]);

  // -------- SEO (dynamic) --------
  const params = new URLSearchParams(location.search);
  const expandedSlug = params.get('expand');

  const all = [
    ...exhibitions.current,
    ...exhibitions.upcoming,
    ...exhibitions.past,
  ];

  const activeEx =
    (expandedSlug && all.find(ex => ex.slug === expandedSlug)) ||
    exhibitions.current[0] ||
    exhibitions.upcoming[0] ||
    exhibitions.past[0];

  const seoUrl = activeEx
    ? `${BASE_URL}/exhibitions?expand=${activeEx.slug}`
    : `${BASE_URL}/exhibitions`;

  const dateStr = activeEx
    ? `${new Date(activeEx.start).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })} – ${new Date(activeEx.end).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}`
    : '';

  const seoTitle = activeEx
    ? `${activeEx.title} — ${activeEx.artist?.name || 'Exhibition'} | Graces Mews`
    : 'Exhibitions | Graces Mews';

  const seoDesc = activeEx
    ? `${activeEx.title}${activeEx.artist?.name ? ` by ${activeEx.artist.name}` : ''} at Graces Mews (${dateStr}).`
    : 'Current, upcoming, and past exhibitions at Graces Mews.';

  const seoImage = activeEx?.images?.[0]?.asset?.url;

  const jsonLd = activeEx && {
    '@context': 'https://schema.org',
    '@type': 'ExhibitionEvent',
    name: activeEx.title,
    startDate: activeEx.start,
    endDate: activeEx.end,
    image: seoImage,
    url: seoUrl,
    location: {
      '@type': 'ArtGallery',
      name: 'Graces Mews',
      url: BASE_URL
    },
    performer: activeEx.artist?.name ? {
      '@type': 'Person',
      name: activeEx.artist.name
    } : undefined
  };
  // --------------------------------------

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

  function ExhibitionRow({ item, expandOnLoad = false, variant = 'default' }) {
    const initialExpanded = variant === 'past' ? false : !!expandOnLoad;
    const [isExpanded, setIsExpanded] = useState(initialExpanded);

    const imageCount = item.images?.length || 0;
    const hasImages = imageCount > 0;
    const hasMultipleImages = imageCount > 1;

    const carouselRef = useRef(null);
    const headerRef = useRef(null);

    const start = new Date(item.start).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
    const end = new Date(item.end).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });

    const rowWrapperClass =
      variant === 'past'
        ? `py-4 ${isExpanded ? 'border-b border-black' : ''}`
        : 'py-4 border-b border-black';

    const desktopHeaderBase =
      'relative hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start cursor-pointer';

    const desktopHeaderPast =
      ' text-gray-400 opacity-70 transition-colors hover:text-black hover:opacity-100';

    const desktopHeaderClass =
      variant === 'past'
        ? `${desktopHeaderBase} ${desktopHeaderPast}`
        : desktopHeaderBase;

    const mobileHeaderBase = 'md:hidden flex flex-col space-y-1';
    const mobileHeaderPastCollapsed = ' text-gray-500 opacity-70';
    const mobileHeaderPastExpanded = ' text-black opacity-100';
    const mobileHeaderClass =
      variant === 'past'
        ? `${mobileHeaderBase} ${isExpanded ? mobileHeaderPastExpanded : mobileHeaderPastCollapsed}`
        : mobileHeaderBase;

    const handleToggle = () => setIsExpanded(prev => !prev);

    return (
      <div id={`exhibition-${item.slug}`} className={rowWrapperClass}>
        {/* DESKTOP HEADER */}
        <div ref={headerRef} className={desktopHeaderClass} onClick={handleToggle}>
          <div className="flex flex-col justify-between h-full">
            <p className="font-gracesmews">{formatDateRange(item.start, item.end)}</p>
          </div>

          <p>
            <Link
              to={`/artist/${item.artist?.slug}`}
              onClick={(e) => e.stopPropagation()}
              className={`${isExpanded ? 'underline' : ''} font-gracesmews`}
            >
              {item.artist?.name}
            </Link>
          </p>

          <p className="font-gracesmews uppercase">{item.title}</p>
          <p className="mb-4 font-gracesmews">{item.location}</p>

          {/* Thumbnail (desktop) — OMIT for past */}
          <div className="w-36 h-24 relative">
            <AnimatePresence mode="wait">
              {variant !== 'past' && !isExpanded && item.images?.[0]?.asset?.url && (
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

          {/* Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl transition-all duration-700 hover:scale-150
              ${
                variant === 'past'
                  ? (isExpanded ? 'opacity-100' : 'opacity-0 hover:opacity-100')
                  : (isExpanded ? 'opacity-100' : 'opacity-50 hover:opacity-100')
              }`}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '↑' : '↓'}
          </button>
        </div>

        {/* MOBILE HEADER */}
        <div className={mobileHeaderClass} onClick={handleToggle}>
          <p className="text-lg font-semibold leading-tight font-gracesmews">
            {start} – {end}
          </p>

          <div className="flex justify-between text-lg font-bold uppercase leading-tight tracking-tight font-gracesmews">
            <p>{item.title}</p>
            <p>{item.location}</p>
          </div>
          <p className="text-lg font-semibold leading-tight tracking-tight font-gracesmews">
            <Link
              to={`/artist/${item.artist?.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="font-gracesmews"
            >
              {item.artist?.name}
            </Link>
          </p>
        </div>

        {/* EXPANDABLE CONTENT */}
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
                {/* Mobile: swipeable images */}
                {hasImages && (
                  <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full my-2">
                    {item.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.asset?.url}
                        alt={item.title || ''}
                        loading="lazy"
                        className="min-w-[85%] h-[220px] snap-center object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Desktop carousel */}
                {hasImages && (
                  <div className="hidden md:flex flex-col items-center w-full space-y-2">
                    <div
                      ref={carouselRef}
                      className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full scrollbar-hidden"
                    >
                      {item.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.asset?.url}
                          alt=""
                          className="min-w-2/3 h-[300px] snap-center object-cover"
                        />
                      ))}
                    </div>

                    {hasMultipleImages && (
                      <div className="w-full mt-2 flex justify-start space-x-2">
                        <button
                          onClick={() => carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
                          className="text-xl hover:scale-125"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
                          className="text-xl hover:scale-125"
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className="max-w-3xl text-sm text-black space-y-2 leading-relaxed">
                    <PortableText value={item.description} />
                  </div>
                )}

                {/* Press Release */}
                {item.pressRelease?.asset?.url && (
                  <a
                    target="_blank"
                    href={item.pressRelease.asset.url}
                    download
                    className="inline-block mt-2 underline text-sm"
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
    <>
      {/* Minimal SEO block */}
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={seoUrl}
        image={seoImage || undefined}
        jsonLd={jsonLd}
      />

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

                {exhibitions[section].map((item) => {
                  const expandOnLoad =
                    section !== 'past' && location.search.includes(item.slug);
                  return (
                    <ExhibitionRow
                      key={item._id}
                      item={item}
                      expandOnLoad={expandOnLoad}
                      variant={section === 'past' ? 'past' : 'default'}
                    />
                  );
                })}
              </section>
            )
          ))}
        </div>
      </Layout>
    </>
  );
}
