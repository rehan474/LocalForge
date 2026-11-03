'use client';

import React, { useState } from 'react';
import { FileText, Copy, Check, Sparkles } from 'lucide-react';

const SAMPLE_MD = `# ⚡ LocalForge Markdown Studio

Welcome to the **LocalForge** live markdown compiler. 

### Features
* 100% Client-Side Processing
* Zero Server Uploads
* Instant HTML Export

> "Privacy is not an option, and it shouldn't be the price we accept for using the internet."
`;

export default function MarkdownPreviewerView() {
  const [input, setInput] = useState(SAMPLE_MD);
  const [copied, setCopied] = useState(false);

  // Simple clean markdown parser for headings, bold, blockquotes, and lists
  const renderHtml = (md: string) => {
    return md
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-white mb-3">$1</h1>')
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold text-indigo-400 mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/> "(.*?)"/g, '<blockquote class="border-l-2 border-indigo-500 pl-4 my-3 text-slate-400 italic">"$1"</blockquote>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>')
      .replace(/\n/g, '<br />');
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(renderHtml(input));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Dual-Pane Markdown Compiler</span>
        <button
          onClick={copyHtml}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied HTML' : 'Copy HTML Output'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">Markdown Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">Live Rendered HTML Preview</label>
          <div
            className="w-full h-80 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: renderHtml(input) }}
          />
        </div>
      </div>
    </div>
  );
}
