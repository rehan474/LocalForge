import React from 'react';
import { getAllTools } from '@/registry/tool-registry';
import AdBanner from '@/components/monetization/AdBanner';
import ToolDirectory from '@/components/shared/ToolDirectory';
import { Shield, Cpu, Zap, Lock } from 'lucide-react';

export default function HomePage() {
  const tools = getAllTools();

  return (
    <main className="py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Modern SaaS Hero Section */}
        <section className="text-center space-y-5 max-w-3xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium shadow-sm">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>100% In-Browser Execution • WebAssembly & Web Workers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Your Private Files{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Never Leave Your Browser.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Traditional online converters upload your confidential PDFs, photos, and production API tokens to remote cloud servers.{' '}
            <strong className="text-slate-200 font-semibold">LocalForge</strong> processes everything locally on your hardware—instant, unlimited, and offline-ready.
          </p>

          {/* Trust & Architecture Metrics Pill Bar */}
          <div className="pt-2 grid grid-cols-3 max-w-lg mx-auto gap-2 sm:gap-4 text-left">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">0 Bytes</div>
                <div className="text-[10px] text-slate-400">Uploaded to Cloud</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Multi-Thread</div>
                <div className="text-[10px] text-slate-400">Web Worker Engine</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">No Limits</div>
                <div className="text-[10px] text-slate-400">100% Free Forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Leaderboard Ad / Sponsor Banner */}
        <AdBanner slotId="home-leaderboard" />

        {/* Interactive Search & Tool Cards */}
        <ToolDirectory tools={tools} />
      </div>
    </main>
  );
}
