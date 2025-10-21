import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../lib/client';
import { getHomepage } from '../lib/queries';
import Header from '../components/Header';
import Nav from '../components/Navbar';
import SEO from '../components/SEO';

export default function Homepage() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  // Fetch homepage data from Sanity
  useEffect(() => {
    client.fetch(getHomepage).then((data) => {
      const s = data?.slides || [];
      setSlides(s);
      // Safety: if the new slides array is shorter than currentIndex
      if (currentIndex >= s.length) setCurrentIndex(0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clamp (no wrap)
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
  };

  const handleTitleClick = () => {
    const slug = slides[currentIndex]?.slug;
    if (slug) navigate(`/exhibitions?expand=${slug}`);
  };

  if (slides.length === 0) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  const currentSlide = slides[currentIndex];
  const themeColor = currentSlide?.themeColor || '#000';

  // Only apply preview offset if not on first/last
  const maxIndex = slides.length - 1;
  const offset =
    hovered === 'next' && currentIndex < maxIndex ? -5 :
    hovered === 'prev' && currentIndex > 0 ? 5 :
    0;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex transition-transform duration-[1200ms] ease-in-out h-full"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${offset}%))`,
          }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="w-screen h-screen flex-shrink-0">
              <img
                src={slide?.image?.asset?.url}
                alt={slide?.title || `Slide ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
                loading={idx === currentIndex ? 'eager' : 'lazy'}
                fetchpriority={idx === currentIndex ? 'high' : 'auto'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between z-10">
        <div className="flex flex-col items-center pt-8">
          <Header color={themeColor} />
        </div>

        {/* Center CTA and Title */}
        <button
          onClick={handleTitleClick}
          onMouseEnter={() => setHovered('cta')}
          onMouseLeave={() => setHovered(null)}
          className="font-gracesmews absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-300"
          style={{
            color: themeColor,
            width: '385px',
            height: '96px',
            fontSize: '32px',
            lineHeight: '48px',
            letterSpacing: '0.03em',
            fontWeight: 811,
            textTransform: 'capitalize',
          }}
        >
          {currentSlide?.ctaLabel}<br />
          {currentSlide?.title}
        </button>

        <div className="hidden md:flex justify-center pb-4">
          <Nav color={themeColor} />
        </div>
      </div>

      {/* Navigation Arrows (only when movement is possible) */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          onMouseEnter={() => setHovered('prev')}
          onMouseLeave={() => setHovered(null)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl z-20"
          style={{ color: themeColor }}
          aria-label="Previous"
        >
          &larr;
        </button>
      )}

      {currentIndex < slides.length - 1 && (
        <button
          onClick={handleNext}
          onMouseEnter={() => setHovered('next')}
          onMouseLeave={() => setHovered(null)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl z-20"
          style={{ color: themeColor }}
          aria-label="Next"
        >
          &rarr;
        </button>
      )}

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full flex justify-center z-50 pt-4 pb-8">
        <Nav color={themeColor} />
      </div>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { client } from '../lib/client';
// import { getHomepage } from '../lib/queries';
// import Header from '../components/Header';
// import Nav from '../components/Navbar';
// import SEO from '../components/SEO';

// export default function Homepage() {
//   const [slides, setSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [hovered, setHovered] = useState(null);
//   const navigate = useNavigate();

//   // Use env if available; otherwise fall back (update to your real domain)
//   const BASE_URL = 'https://www.gracesmews.com';
//   // const defaultOg = `${BASE_URL}/og-default.jpg`;

//   // Fetch homepage data from Sanity
//   useEffect(() => {
//     client.fetch(getHomepage).then((data) => {
//       const s = data?.slides || [];
//       setSlides(s);
//       // Safety: if the new slides array is shorter than currentIndex
//       if (currentIndex >= s.length) setCurrentIndex(0);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Clamp (no wrap)
//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
//   };

//   const handleTitleClick = () => {
//     const slug = slides[currentIndex]?.slug;
//     if (slug) navigate(`/exhibitions?expand=${slug}`);
//   };

//   // Loading state: still output basic SEO (with fallback OG image)
//   if (slides.length === 0) {
//     return (
//       <>
//         <SEO
//           title="Graces Mews"
//           description="Graces Mews is a gallery in Camberwell, South London. The programme is photography-led and includes selling and non-commercial shows."
//           canonical={`${BASE_URL}/`}
//           // image={defaultOg}
//         />
//         <div className="h-screen flex justify-center items-center">Loading...</div>
//       </>
//     );
//   }

//   const currentSlide = slides[currentIndex];
//   const themeColor = currentSlide?.themeColor || '#000';

//   // First slide image is a good OG candidate for home
//   const homeOg = slides[0]?.image?.asset?.url;

//   // Only apply preview offset if not on first/last
//   const maxIndex = slides.length - 1;
//   const offset =
//     hovered === 'next' && currentIndex < maxIndex ? -5 :
//     hovered === 'prev' && currentIndex > 0 ? 5 :
//     0;

//   return (
//     <>
//       <SEO
//         title="Grace’s Mews Gallery"
//         description="Graces Mews is a gallery in Camberwell, South London. The programme is photography-led and includes selling and non-commercial shows."
//         canonical={`${BASE_URL}/`}
//         image={homeOg}
//       />

//       <div className="relative h-screen w-screen overflow-hidden">
//         {/* Background Image Carousel */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div
//             className="flex transition-transform duration-[1200ms] ease-in-out h-full"
//             style={{
//               transform: `translateX(calc(-${currentIndex * 100}% + ${offset}%))`,
//             }}
//           >
//             {slides.map((slide, idx) => (
//               <div key={idx} className="w-screen h-screen flex-shrink-0">
//                 <img
//                   src={slide?.image?.asset?.url}
//                   alt={slide?.title || `Slide ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                   style={{ objectPosition: 'center' }}
//                   loading={idx === currentIndex ? 'eager' : 'lazy'}
//                   fetchpriority={idx === currentIndex ? 'high' : 'auto'}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Overlay UI */}
//         <div className="absolute inset-0 flex flex-col justify-between z-10">
//           <div className="flex flex-col items-center pt-8">
//             <Header color={themeColor} />
//           </div>

//           {/* Center CTA and Title */}
//           <button
//             onClick={handleTitleClick}
//             onMouseEnter={() => setHovered('cta')}
//             onMouseLeave={() => setHovered(null)}
//             className="font-gracesmews absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-300"
//             style={{
//               color: themeColor,
//               width: '385px',
//               height: '96px',
//               fontSize: '32px',
//               lineHeight: '48px',
//               letterSpacing: '0.03em',
//               fontWeight: 811,
//               textTransform: 'capitalize',
//             }}
//           >
//             {currentSlide?.ctaLabel}<br />
//             {currentSlide?.title}
//           </button>

//           <div className="hidden md:flex justify-center pb-4">
//             <Nav color={themeColor} />
//           </div>
//         </div>

//         {/* Navigation Arrows (only when movement is possible) */}
//         {currentIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             onMouseEnter={() => setHovered('prev')}
//             onMouseLeave={() => setHovered(null)}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl z-20"
//             style={{ color: themeColor }}
//             aria-label="Previous"
//           >
//             &larr;
//           </button>
//         )}

//         {currentIndex < slides.length - 1 && (
//           <button
//             onClick={handleNext}
//             onMouseEnter={() => setHovered('next')}
//             onMouseLeave={() => setHovered(null)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl z-20"
//             style={{ color: themeColor }}
//             aria-label="Next"
//           >
//             &rarr;
//           </button>
//         )}

//         {/* Mobile bottom nav */}
//         <div className="md:hidden fixed bottom-0 left-0 w-full flex justify-center z-50 pt-4 pb-8">
//           <Nav color={themeColor} />
//         </div>
//       </div>
//     </>
//   );
// }
