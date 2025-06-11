import { useLocation } from 'react-router-dom';
import Header from './Header';
import Nav from './Navbar';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isAboutPage = pathname === '/about';

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white py-2 md:pt-8 flex flex-col items-center">
        <Header />
      </header>

      {/* Scrollable Content */}
      <div
        className={`flex-1 overflow-y-auto px-4 md:px-8 pb-[100px] ${
          isAboutPage ? 'pt-[150px] md:pt-[80px]' : 'pt-[150px] md:pt-[100px]'
        }`}
      >
        {children}
      </div>

      {/* Fixed Bottom Nav */}
      <footer className="fixed bottom-0 left-0 w-full justify-center bg-white py-4 z-50 flex">
        <Nav />
      </footer>
    </div>
  );
}
