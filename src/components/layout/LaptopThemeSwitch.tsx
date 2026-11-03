'use client';

import React, { useState, useEffect } from 'react';
import { Laptop, Sun, Moon } from 'lucide-react';

export default function LaptopThemeSwitch() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('localforge_theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleLaptopTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('localforge_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('localforge_theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleLaptopTheme}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-900 bg-slate-200 border border-slate-700 dark:border-slate-800 text-slate-200 dark:text-slate-200 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
      title="Click laptop deck to toggle theme"
    >
      {/* Laptop Icon representing hardware deck */}
      <div className="relative">
        <Laptop className="w-4 h-4 text-indigo-400 group-hover:rotate-6 transition-transform" />
        <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isDark ? 'bg-indigo-500' : 'bg-amber-400'} animate-pulse`} />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 leading-none">Laptop Theme</span>
        <span className="text-xs font-semibold text-slate-100 dark:text-slate-100 text-slate-800 leading-tight flex items-center gap-1 mt-0.5">
          {isDark ? <Moon className="w-3 h-3 text-indigo-400" /> : <Sun className="w-3 h-3 text-amber-500" />}
          {isDark ? 'Dark Deck' : 'Light Deck'}
        </span>
      </div>
    </button>
  );
}
