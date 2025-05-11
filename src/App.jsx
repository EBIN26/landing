// File: webb/landing/src/App.jsx
import React from "react";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Routes, Route, useLocation } from "react-router-dom";
import { Experience as LandingExperience } from "./components/experience";
import { Overlay as LandingOverlay } from "./components/overlay"; // Assuming 'overlay.jsx' exports 'Overlay'
import BookViewerPage from "./pages/BookViewerPage";
import { usePlay } from "./contexts/Play";

function App() {
  const { play, end } = usePlay();
  const location = useLocation();
  const isBookPageActive = location.pathname === "/our-works";

  // Determine the number of pages for ScrollControls.
  // Scrolling is active only on the landing page, after "play" is true, and before "end".
  const scrollPages = play && !end && !isBookPageActive ? 20 : 1; // Default to 1 page if not actively scrolling

  // console.log("App.jsx - play:", play, "end:", end, "isBookPageActive:", isBookPageActive, "scrollPages:", scrollPages);

  return (
    <>
      {!isBookPageActive && <LandingOverlay />}
      <Routes>
        <Route
          path="/"
          element={
            !isBookPageActive ? (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas>
                  <color attach="background" args={["#ececec"]} />
                  <ScrollControls
                    pages={scrollPages} 
                    damping={0.5}
                    // distance={1} // Default is 1, adjust if needed
                    // enabled={scrollPages > 1} // Enable/disable based on pages
                    style={{
                      position: 'absolute', 
                      top: 0, left: 0, width: '100%', height: '100%',
                      pointerEvents: scrollPages > 1 ? 'auto' : 'none', // Allow scroll only when actually scrollable
                      zIndex: 1, // Above Canvas background, below HTML overlay
                    }}
                  >
                    <LandingExperience />
                  </ScrollControls>
                  <EffectComposer>
                    <Noise opacity={0.002} />
                  </EffectComposer>
                </Canvas>
              </div>
            ) : null
          }
        />
        <Route path="/our-works" element={<BookViewerPage />} />
      </Routes>
    </>
  );
}
export default App;