// File: webb/landing/src/pages/BookViewerPage.jsx
import React, { Suspense, useEffect } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience as BookExperience } from "../bookFeature/components/Experience";
import { UI as BookUI } from "../bookFeature/components/UI";

function BookViewerPage() {
  useEffect(() => {
    const originalBodyBackground = document.body.style.background;
    const originalHtmlBackground = document.documentElement.style.background;
    document.documentElement.style.background = 'radial-gradient(#3b82f6, #1e3a8a 80%)';
    document.body.style.background = 'transparent';
    return () => {
      document.documentElement.style.background = originalHtmlBackground;
      document.body.style.background = originalBodyBackground;
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <BookUI />
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <BookExperience />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}
export default BookViewerPage;