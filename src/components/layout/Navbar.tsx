'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hammer, Github, ShieldCheck, Sparkles, Command, Menu, X } from 'lucide-react';
import CommandPalette from './CommandPalette';
import PullCordToggle from './PullCordToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 dark:bg-slate-950/80 bg-white/80 border-b border-slate-800/80 dark:border-slate-800/80 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30 group-hover:scale-105 transition-transform">
                <Hammer className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">LocalForge</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
                    v1.0
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Search Trigger */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/50 dark:bg-slate-900/50 bg-slate-100 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-400 transition-all w-72 justify-between"
          >
            <span>Search utilities...</span>
            <kbd className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/25 text-emerald-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Offline Sandbox</span>
            </div>

            <PullCordToggle />

            <a
              href="https://github.com/rehan474/LocalForge"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-900 bg-slate-200 text-slate-200 dark:text-slate-200 text-xs font-semibold border border-slate-800 hover:bg-slate-800 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Star</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800/50 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-950 border-b border-slate-800 p-4 space-y-3 shadow-2xl animate-fade-in">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800"
            >
              <span>Search utilities (Cmd+K)</span>
              <Command className="w-4 h-4 text-indigo-400" />
            </button>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900"
            >
              Browse All Utilities
            </Link>
            <a
              href="https://github.com/rehan474/LocalForge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900"
            >
              <Github className="w-4 h-4" /> Star on GitHub
            </a>
          </div>
        )}
      </header>
      <CommandPalette />
    </>
  );
}
