'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function PullCordToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  useEffect(() => {
    // Check initial document state or local storage
    const root = document.documentElement;
    if (root.classList.contains('light')) {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const handleMouseDown = () => {
    setIsPulling(true);
    setPullDistance(35); // pull down effect
  };

  const handleMouseUp = () => {
    setIsPulling(false);
    setPullDistance(0);
    toggleTheme();
  };

  return (
    <div className="absolute top-0 right-8 sm:right-16 z-50 flex flex-col items-center select-none pointer-events-auto">
      {/* Hanging Cord / Rope Line */}
      <div
        className="w-0.5 bg-gradient-to-b from-indigo-500/80 via-slate-500 to-indigo-400 transition-all duration-300 ease-out"
        style={{ height: `${55 + pullDistance}px` }}
      />

      {/* Pull Knob / Rope Handle */}
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="group relative w-9 h-9 rounded-full bg-slate-900 border-2 border-indigo-500/80 shadow-xl shadow-indigo-500/20 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
        title="Click or pull rope to toggle Light / Dark Mode"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 group-hover:bg-indigo-500/25 animate-pulse" />
        {isDark ? (
          <Moon className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
        ) : (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform" />
        )}
      </div>
      <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-mono">
        {isDark ? 'Night' : 'Day'}
      </span>
    </div>
  );
}
