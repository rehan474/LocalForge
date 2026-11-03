'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTools } from '@/registry/tool-registry';
import { Search, Command, ArrowRight, X } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const tools = getAllTools();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name or category (e.g. 'json', 'pdf', 'jwt')..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">No tools found matching &ldquo;{query}&rdquo;</div>
          ) : (
            filtered.map((tool) => (
              <button
                key={tool.slug}
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/tools/${tool.slug}`);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-indigo-600/15 hover:text-indigo-300 text-slate-300 text-xs flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="font-semibold text-white group-hover:text-indigo-300">{tool.name}</div>
                  <div className="text-[11px] text-slate-400 truncate max-w-md">{tool.shortDescription}</div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Footer Shortcut hint */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with arrow keys or click</span>
          <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
            <Command className="w-3 h-3" /> K to toggle
          </span>
        </div>
      </div>
    </div>
  );
}
