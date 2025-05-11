import { atom, useAtom } from "jotai";
import { useEffect } from "react";

// Array of picture base names (used to construct texture paths)
// Assumes these correspond to .jpg files in /public/textures/
// Current setup: 14 pictures -> 8 pages (Cover + 6 inner + Back Cover)
const pictures = [
  "DSC00680", // Used for back of cover (Page 0 back)
  "DSC00933", // Page 1 Front (Index 1)
  "DSC00966", // Page 1 Back
  "DSC00983", // Page 2 Front (Index 2)
  "DSC01011", // Page 2 Back
  "DSC01040", // Page 3 Front (Index 3)
  "DSC01064", // Page 3 Back
  "DSC01071", // Page 4 Front (Index 4)
  "DSC01103", // Page 4 Back
  "DSC01145", // Page 5 Front (Index 5)
  "DSC01420", // Page 5 Back
  "DSC01461", // Page 6 Front (Index 6)
  "DSC01489", // Page 6 Back
  "DSC02069_1", // New page front (Page 7 front)
  "DSC02069_2", // New page back (Page 7 back)
  "DSC02069", // Used for front of back cover (Page 8 front)
];

// Jotai atom to manage the currently selected page index globally
export const pageAtom = atom(0);

// Array defining the structure of the book pages
// Each object represents a physical page with a front and back texture
export const pages = [
  // First page (Cover / DIGITAL MARKETING COMBO) - Represents page index 0
  {
    front: "book-cover", // Texture for the front cover
    back: pictures[0],   // Picture for the back of the cover page
  },
];

// Loop to create the inner pages, pairing consecutive pictures
// Each loop iteration creates one physical page with two pictures
for (let i = 1; i < pictures.length - 2; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}
// Resulting pages array will have length 1 (cover) + 7 (inner) = 8 items (indices 0-7)

// Last page (Back Cover) - Represents page index 8 (pages.length)
pages.push({
  front: pictures[pictures.length - 1], // Last picture for the front of the back cover
  back: "book-back",                   // Special texture for the back cover
});
// Final pages array has length 9 (indices 0-8)

// Custom labels for the buttons
const buttonLabels = [
  "MARINA DIGITALS",          // Index 0 (Cover Page)
  "DIGITAL MARKETING COMBO",  // Index 1 (Page 1)
  "Search Engine Optimization", // Index 2 (Page 2)
  "Social Media",             // Index 3 (Page 3)
  "WEB DEVELOPMENT",          // Index 4 (Page 4)
  "PPC ONLINE ADS",           // Index 5 (Page 5)
  "MARKET RESEARCH SERVICES", // Index 6 (Page 6)
  "LOGO AND BRANDING DESIGN", // Index 7 (Page 7)
  "BUSINESS DEVELOPMENT",     // Index 8 (Page 8)
  "DISCOVER MORE"               // Index 9 (Page 9)
];


// The main UI component
export const UI = () => {
  // Get the current page index and the function to update it from the Jotai atom
  const [page, setPage] = useAtom(pageAtom);

  // Effect hook to play a sound when the page changes
  useEffect(() => {
    const audio = new Audio("/book_assets/audios/page-flip-01a.mp3"); // Path to the audio file
    // Play sound for actual page turns (indices 1 through 7)
    if (page > 0 && page < pages.length) {
      audio.play().catch(e => console.error("Error playing audio:", e)); // Play audio and catch potential errors
    }
  }, [page]); // Dependency array: run this effect only when 'page' changes

  return (
    <>
      {/* --- Header Section --- */}
      {/* MODIFIED: Changed items-center to items-start to prevent nav from shifting down */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between pt-1 md:pt-2 px-2 md:px-4 pointer-events-none">
        {/* Logo Link */}
        <a
          className="pointer-events-auto" // Enable pointer events for the link
          href="#" // Link destination - Update as needed
        >
          {/* Logo image - Size remains increased */}
          <img className="h-32 md:h-24 w-auto" src="/book_assets/images/wawasensei-white.png" alt="Logo" />
        </a>

        {/* Navigation Links */}
        {/* MODIFIED: Added padding-top (pt-1 md:pt-2) to visually adjust vertical position slightly */}
        <nav className="pointer-events-auto pt-1 md:pt-2"> {/* Enable pointer events for nav */}
          <ul className="flex items-center gap-3 md:gap-12 text-white text-sm md:text-base">
            {/* Added glowing hover effect */}
            <li>
              <a href="#" className="hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300">Home</a>
            </li>
            <li>
              <a href="#" className="hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300">Our Projects</a>
            </li>
            <li>
              <a href="#" className="hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300">Connect Us</a>
            </li>
          </ul>
        </nav>
      </header>
      {/* --- End of Header Section --- */}


      {/* --- Bottom Button Container --- */}
      <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none flex justify-center">
          {/* Inner container for buttons */}
          <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 max-w-full p-2 md:p-4 pb-4 md:pb-8 pointer-events-auto">
              {/* Map through buttonLabels to create buttons for cover and inner pages */}
              {buttonLabels.map((label, index) => (
                  <button
                      key={index}
                      className={`border-transparent hover:border-white transition-all duration-300 px-3 py-2 md:px-4 md:py-3 rounded-full text-xs md:text-sm font-medium uppercase border whitespace-nowrap ${
                          index === page // Check if this button corresponds to the current page state (0-7)
                              ? "bg-white/90 text-black" // Active button style
                              : "bg-black/30 text-white" // Inactive button style
                      }`}
                      // Set the current page to this button's index when clicked
                      onClick={() => setPage(index)}
                  >
                      {label}
                  </button>
              ))}
              {/* Separate button for the "Back Cover" view state */}
          </div>
      </div>
      {/* --- End of Bottom Button Container --- */}


      {/* Background Text Scroller Container */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none overflow-hidden pointer-events-none z-0">
        <div className="relative w-full">
          {/* First scrolling instance */}
          <div className="bg-transparent animate-horizontal-scroll flex items-center gap-8 w-max px-8 whitespace-nowrap">
              <h1 className="shrink-0 text-white text-9xl font-black italic">
                We dont create trends, We make trends !
              </h1>
              <h1 className="shrink-0 text-white text-9xl font-black italic">
                We dont create trends, We make trends !
              </h1>
          </div>
          {/* Second scrolling instance (offset for continuous effect) */}
          <div className="absolute top-0 left-0 bg-transparent animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max whitespace-nowrap">
              <h1 className="shrink-0 text-white text-9xl font-black italic">
                We dont create trends, We make trends !
              </h1>
              <h1 className="shrink-0 text-white text-9xl font-black italic">
                We dont create trends, We make trends !
              </h1>
          </div>
        </div>
      </div>
    </>
  );
};

// Make sure App component is defined if this is the main file
// If UI is imported elsewhere, this isn't strictly needed here.
// For standalone preview, you might need:
const App = () => <UI />;
export default App;
