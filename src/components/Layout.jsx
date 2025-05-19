import Header from './Header';
import Nav from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white pt-6 flex flex-col items-center">
        <Header />
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[150px] md:pt-[100px] pb-[100px] px-4 md:px-8">
        {children}
      </div>

      {/* Fixed Bottom Nav — now always visible */}
      <footer className="fixed bottom-0 left-0 w-full justify-center bg-white py-4 z-50 flex">
        <Nav />
      </footer>
    </div>
  );
}
