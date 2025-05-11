// File: webb/landing/src/components/overlay.jsx
import React, { useEffect, useState } from 'react'; // Added React import
import { useProgress } from "@react-three/drei"; // Restored useProgress
import { usePlay } from "../contexts/Play";
import { useNavigate } from "react-router-dom";

export const Overlay = () => {
  const { progress } = useProgress(); // Restored progress
  const { play, end, setPlay, hasScroll } = usePlay();
  const [showOutroButton, setShowOutroButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (end) {
      const timer = setTimeout(() => setShowOutroButton(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowOutroButton(false);
    }
  }, [end]);

  const handleRedirect = () => {
    navigate("/our-works");
  };

  // console.log("Overlay - Progress:", progress, "Play:", play); // Optional: for continued debugging

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />

      {progress === 100 && ( // Restored condition for rendering intro
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">marinadigi.</h1>
          {/* If you have a spinner element, it would go typically near or inside the logo div */}
          {/* <div className="spinner"><div className="spinner__image"></div></div> */}
          {/* <p className="intro__scroll">Scroll down to begin the journey</p> */}
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Lets Get Started!
          </button>
        </div>
      )}

      {play && !end && (
        <p className="scroll-journey-text">
          Scroll down slowly to begin the journey
        </p>
      )}

      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Marina Digi welcomes you !</p>
        {showOutroButton && (
  <button className="outro__button" onClick={handleRedirect}>
    Our Works
  </button>
)}
      </div>
    </div>
  );
};