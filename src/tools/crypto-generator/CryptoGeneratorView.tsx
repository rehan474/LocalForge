'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function CryptoGeneratorView() {
  const [length, setLength] = useState(24);
  const [password, setPassword] = useState('');
  const [uuid, setUuid] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    setPassword(Array.from(array, (x) => chars[x % chars.length]).join(''));
    setUuid(window.crypto.randomUUID());
  };

  useEffect(() => {
    generate();
  }, [length]);

  const copyText = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Cryptographic Password ({length} chars)
          </span>
          <input
            type="range"
            min={12}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-40 accent-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-sm break-all">
            {password}
          </code>
          <button onClick={() => copyText(password)} className="px-3 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={generate} className="px-3 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            UUID v4 (WebCrypto API)
          </span>
          <code className="text-sm font-mono text-indigo-400">{uuid}</code>
        </div>
        <button onClick={() => copyText(uuid)} className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white">
          Copy UUID
        </button>
      </div>
    </div>
  );
}
