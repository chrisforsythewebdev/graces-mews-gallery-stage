import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../lib/client';
import { getHomepage } from '../lib/queries';
import Header from '../components/Header';
import Nav from '../components/Navbar';

export default function Homepage() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  // Fetch homepage data from Sanity
  useEffect(() => {
    client.fetch(getHomepage).then((data) => {
      setSlides(data?.slides || []);
    });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTitleClick = () => {
    const slug = slides[currentIndex]?.slug;
    if (slug) navigate(`/exhibitions?expand=${slug}`);
  };

  const hoverOffset =
    hovered === 'next' ? -0.05 :
    hovered === 'prev' ? 0.05 : 0;

  if (slides.length === 0) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  const currentSlide = slides[currentIndex];
  const themeColor = currentSlide.themeColor || '#000';

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${hoverOffset * 100}%))`,
          }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="w-screen h-screen flex-shrink-0">
              <img
                src={slide.image.asset.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between z-10">
        <div className="flex flex-col items-center pt-8">
          <Header color={themeColor} />
          <div className="md:hidden mt-4">
            <Nav color={themeColor} />
          </div>
        </div>

        {/* Center CTA and Title */}
        <button
          onClick={handleTitleClick}
          onMouseEnter={() => setHovered('cta')}
          onMouseLeave={() => setHovered(null)}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-300 ease-in-out transform ${
            hovered === 'cta' ? 'scale-[1.08]' : 'scale-100'
          }`}
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
          {currentSlide.ctaLabel}<br />
          {currentSlide.title}
        </button>

        <div className="hidden md:flex justify-center pb-8">
          <Nav color={themeColor} />
        </div>
      </div>

      {/* Navigation Arrows */}
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
    </div>
  );
}
