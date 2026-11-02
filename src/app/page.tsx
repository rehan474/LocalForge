import React from 'react';
import Link from 'next/link';
import { getAllTools } from '@/registry/tool-registry';
import AdBanner from '@/components/monetization/AdBanner';
import { Shield, Cpu, Zap, ArrowUpRight, Github } from 'lucide-react';

export default function HomePage() {
  const tools = getAllTools();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" /> Zero-Server Privacy Suite • Powered by Web Workers & Wasm
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            LocalForge Utility Hub
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Convert, compress, and format sensitive files 100% inside your browser. Zero cloud uploads, zero file size limits, and instant offline execution.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href="https://github.com/rehan474/LocalForge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
            >
              <Github className="w-4 h-4" /> View Source on GitHub (rehan474/LocalForge)
            </a>
          </div>
        </header>

        <AdBanner slotId="home-hero" />

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-indigo-400">
                    {tool.category}
                  </span>
                  {tool.runsInWorker && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> Web Worker
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                  {tool.name}
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">{tool.shortDescription}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-400">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Local Run
                </span>
                <span className="text-indigo-400 font-medium">Launch Tool →</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
