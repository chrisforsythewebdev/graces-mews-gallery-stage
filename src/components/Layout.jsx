import Header from './Header';
import Nav from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white pt-6 flex flex-col items-center">
        <Header />

        {/* Mobile Nav just below header */}
        <div className="md:hidden mt-4">
          <Nav />
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[150px] md:pt-[100px] pb-[100px] px-4 md:px-8">
        {children}
      </div>

      {/* Fixed Bottom Nav (Desktop only) */}
      <footer className="hidden md:flex fixed bottom-0 left-0 w-full justify-center bg-white py-4 z-50">
        <Nav />
      </footer>
    </div>
  );
}



// const ExhibitionRow = ({ item, index, section }) => {
//   const key = `${section}-${index}`;
//   const isExpanded = expandedIndex === key;
//   const carouselRef = useRef(null);
//   const rowRef = useRef(null);
//   const start = new Date(item.start).toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });
//   const end = new Date(item.end).toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });

//   return (
//     <div id={`exhibition-${key}`} ref={rowRef} className="border-b border-black py-4">
//       {/* Header row */}
//       <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start group">
//         <div className="flex flex-col justify-between h-full relative">
//           <p className="font-semibold">{start} – {end}</p>
//           {section === 'current' && (
//             <button
//               onClick={() => setExpandedIndex(isExpanded ? null : key)}
//               className="absolute bottom-0 left-0 text-xl transition-all transform hover:text-[#AAAAAA] hover:scale-110"
//             >
//               {isExpanded ? '' : '↓'}
//             </button>
//           )}
//         </div>
//         <p className="font-semibold">
//           <Link
//             to={`/artist/${item.artist?.slug}`}
//             className="underline text-[#000] hover:text-[#AAAAAA]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {item.artist?.name}
//           </Link>
//         </p>
//         <p className="font-semibold uppercase">{item.title}</p>
//         <p className="mb-4">{item.location}</p>
//         {!isExpanded && item.images?.[0]?.asset?.url ? (
//           <img src={item.images[0].asset.url} alt={item.title} className="w-36 h-24 object-cover" />
//         ) : <div className="w-36 h-0" />}
//       </div>

//       {/* Mobile layout */}
//       <div className="md:hidden flex flex-col space-y-1" onClick={() => setExpandedIndex(key)}>
//         <p className="text-md font-semibold">{start} – {end}</p>
//         {item.images?.[0]?.asset?.url && (
//           <img src={item.images[0].asset.url} alt={item.title} className="w-full h-[220px] object-cover my-2" />
//         )}
//         <div className="flex justify-between text-md font-bold uppercase">
//           <p>{item.title}</p>
//           <p>{item.location}</p>
//         </div>
//         <p className="text-md font-semibold">
//           <Link to={`/artist/${item.artist?.slug}`} className="hover:text-[#AAAAAA]" onClick={(e) => e.stopPropagation()}>
//             {item.artist?.name}
//           </Link>
//         </p>
//       </div>

//       {/* Animated expanded section */}
//       <AnimatePresence initial={false}>
//         {isExpanded && (
//           <motion.div
//             key="expanded"
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.4, ease: 'easeInOut' }}
//             className="overflow-hidden mt-4"
//           >
//             {/* This div gets measured for height! Keep content directly inside */}
//             <div className="space-y-4">
//               {/* Carousel */}
//               <div className="hidden md:flex flex-col items-center w-full space-y-2">
//                 <div
//                   ref={carouselRef}
//                   className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full"
//                 >
//                   {item.images?.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img.asset?.url}
//                       alt=""
//                       className="min-w-2/3 h-[300px] snap-center object-cover"
//                     />
//                   ))}
//                 </div>
//                 <div className="w-full mt-2 flex justify-start space-x-2">
//                   <button onClick={() => carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' })} className="text-xl hover:text-[#AAAAAA] hover:scale-110">←</button>
//                   <button onClick={() => carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' })} className="text-xl hover:text-[#AAAAAA] hover:scale-110">→</button>
//                 </div>
//               </div>

//               {/* Description */}
//               {item.description && (
//                 <p className="text-sm md:text-base leading-tight max-w-3xl">
//                   {item.description}
//                 </p>
//               )}

//               {/* Collapse Arrow */}
//               <div className="pt-4">
//                 <button
//                   onClick={() => setExpandedIndex(null)}
//                   className="text-xl hover:text-[#AAAAAA] hover:scale-110"
//                 >
//                   ↑
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
