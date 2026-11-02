'use client';

import React, { useEffect, useState } from 'react';
import { Github, Sparkles, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  slotId: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export default function AdBanner({ slotId, format = 'horizontal', className = '' }: AdBannerProps) {
  const [adBlocked, setAdBlocked] = useState(false);
  const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || 'https://github.com/rehan474/LocalForge';

  useEffect(() => {
    if (!enableAds) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdBlocked(true);
    }
  }, [enableAds]);

  const heightClass = format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[95px]';

  if (!enableAds || adBlocked || !publisherId) {
    return (
      <div className={`w-full rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${heightClass} ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Sponsor Slot #{slotId} • 100% Client-Side
            </span>
            <p className="text-sm font-medium text-slate-200 mt-1">
              Zero Cloud Uploads. Your files never leave your device.
            </p>
            <p className="text-xs text-slate-400">
              Support open-source privacy tools by starring LocalForge on GitHub!
            </p>
          </div>
        </div>
        <a
          href={githubRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Star on GitHub</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </a>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden rounded-xl bg-slate-900/40 flex items-center justify-center ${heightClass} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
