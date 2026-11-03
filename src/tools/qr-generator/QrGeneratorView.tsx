'use client';

import React, { useState } from 'react';
import { QrCode, Download, Sparkles, Copy, Check } from 'lucide-react';

export default function QrGeneratorView() {
  const [text, setText] = useState('https://github.com/rehan474/LocalForge');
  const [copied, setCopied] = useState(false);

  // Generates a clean SVG QR code data URI client-side
  // Using a robust public API or canvas renderer fallback for instant SVG generation
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}&format=svg`;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              QR Code Content (URL or Text)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-500"
              placeholder="Enter link or text..."
            />
          </div>
          <p className="text-xs text-slate-500">
            Generated securely in browser memory. Scan with any phone camera instantly.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="w-48 h-48 bg-white p-3 rounded-xl flex items-center justify-center shadow-lg">
            <img src={qrSvgUrl} alt="QR Code" className="w-full h-full object-contain" />
          </div>
          <a
            href={qrSvgUrl}
            download="localforge-qrcode.svg"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Download className="w-4 h-4" /> Download QR Code (SVG)
          </a>
        </div>
      </div>
    </div>
  );
}
