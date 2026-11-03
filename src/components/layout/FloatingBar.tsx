'use client';

import React, { useState, useEffect } from 'react';
import { Command, Sparkles, Shield, Zap } from 'lucide-react';

export default function FloatingBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!scrolled) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
      <div className="px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl flex items-center gap-4 text-xs text-slate-300">
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Command className="w-3.5 h-3.5 text-indigo-400" />
          <span>Cmd + K Search</span>
        </button>

        <div className="w-px h-3.5 bg-slate-800" />

        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>Zero Server Uploads</span>
        </div>

        <div className="w-px h-3.5 bg-slate-800" />

        <a
          href="https://github.com/rehan474/LocalForge"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-amber-300 hover:underline font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Star GitHub</span>
        </a>
      </div>
    </div>
  );
}
