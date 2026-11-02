'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ToolDefinition, ToolCategory } from '@/registry/types';
import {
  Search,
  Braces,
  ImageDown,
  FileStack,
  KeyRound,
  ArrowRightLeft,
  Shield,
  Cpu,
  Zap,
  ArrowUpRight,
  Sparkles,
  Filter,
  X
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Braces,
  ImageDown,
  FileStack,
  KeyRound,
  ArrowRightLeft,
  Shield,
};

export default function ToolDirectory({ tools }: { tools: ToolDefinition[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | ToolCategory>('all');

  const categories: { id: 'all' | ToolCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Utilities', count: tools.length },
    { id: 'developer', label: 'Developer & Security', count: tools.filter((t) => t.category === 'developer').length },
    { id: 'media', label: 'Media & Images', count: tools.filter((t) => t.category === 'media').length },
    { id: 'pdf', label: 'PDF & Documents', count: tools.filter((t) => t.category === 'pdf').length },
  ];

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.shortDescription.toLowerCase().includes(query) ||
        tool.seo.keywords.some((k) => k.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [tools, search, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Category Control Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools by name or keyword (e.g. 'json', 'pdf', 'jwt', 'compress')..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:block shrink-0" />
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/70'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
          <p className="text-base font-medium text-slate-300">No utilities match &ldquo;{search}&rdquo;</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search filter or switching categories.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || Braces;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-indigo-500/60 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.isNew && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Popular
                        </span>
                      )}
                      {tool.runsInWorker && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                          <Cpu className="w-2.5 h-2.5" /> Worker
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h2 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                      <span>{tool.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-indigo-400" />
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{tool.shortDescription}</p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-3.5 border-t border-slate-800/70 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Zero Cloud Upload
                  </span>
                  <span className="font-semibold text-indigo-400 group-hover:text-indigo-300">
                    Open Studio →
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}
