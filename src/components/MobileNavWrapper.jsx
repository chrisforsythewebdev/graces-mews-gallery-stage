import { useEffect, useState } from 'react';
import Nav from './Navbar';

export default function MobileNavWrapper() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowNav(true);
      } else {
        // Scrolling down
        setShowNav(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`font-gracesmews md:hidden transition-all duration-300 ease-in-out ${
        showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <Nav />
    </div>
  );
}
