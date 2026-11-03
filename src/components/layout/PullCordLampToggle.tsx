'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, LightbulbOff } from 'lucide-react';

export default function PullCordLampToggle() {
  const [isLightOn, setIsLightOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('localforge_theme');
    if (saved === 'light') {
      setIsLightOn(true);
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsLightOn(false);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleLamp = () => {
    const nextLightOn = !isLightOn;
    setIsLightOn(nextLightOn);
    const root = document.documentElement;
    if (nextLightOn) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('localforge_theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('localforge_theme', 'dark');
    }
  };

  return (
    <div
      onClick={toggleLamp}
      className="flex flex-col items-center cursor-pointer group select-none"
      title="Pull lamp switch to turn room light on/off"
    >
      {/* Hanging cord */}
      <div className="w-0.5 h-4 sm:h-6 bg-slate-400 dark:bg-slate-600 group-hover:h-8 transition-all" />
      {/* Lamp bulb pull handle */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform text-slate-800 dark:text-slate-200 text-xs font-semibold">
        {isLightOn ? (
          <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce" />
        ) : (
          <LightbulbOff className="w-4 h-4 text-slate-400" />
        )}
        <span className="hidden sm:inline">{isLightOn ? 'Lamp ON' : 'Lamp OFF'}</span>
      </div>
    </div>
  );
}
