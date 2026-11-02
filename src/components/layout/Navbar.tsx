'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hammer, Github, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30 group-hover:scale-105 transition-transform">
              <Hammer className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">LocalForge</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Zero-Server Client Utility Suite</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-400">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === '/' ? 'bg-slate-800/90 text-white' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              All Utilities
            </Link>
            <Link
              href="/tools/json-formatter"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname.includes('json-formatter') ? 'bg-slate-800/90 text-white' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              JSON Studio
            </Link>
            <Link
              href="/tools/image-compressor"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname.includes('image-compressor') ? 'bg-slate-800/90 text-white' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Image Compressor
            </Link>
            <Link
              href="/tools/pdf-merger"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname.includes('pdf-merger') ? 'bg-slate-800/90 text-white' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              PDF Merger
            </Link>
          </nav>
        </div>

        {/* Right Status Pill & GitHub CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/25 text-emerald-300 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Offline Sandbox Active</span>
          </div>

          <a
            href="https://github.com/rehan474/LocalForge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-800 transition-all shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Star Repo</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
