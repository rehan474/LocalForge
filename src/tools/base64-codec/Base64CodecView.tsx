'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';

export default function Base64CodecView() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('LocalForge: 100% Client-Side Privacy Utilities');
  const [copied, setCopied] = useState(false);

  const output = React.useMemo(() => {
    if (!input) return '';
    try {
      return mode === 'encode'
        ? btoa(unescape(encodeURIComponent(input)))
        : decodeURIComponent(escape(atob(input.trim())));
    } catch {
      return 'Error: Invalid Base64 input string.';
    }
  }, [input, mode]);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Mode: {mode === 'encode' ? 'Text → Base64' : 'Base64 → Text'}
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-56 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs"
          placeholder={mode === 'encode' ? 'Enter plain text...' : 'Paste Base64 string...'}
        />
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full h-56 p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs"
          />
          <button
            onClick={copy}
            className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
