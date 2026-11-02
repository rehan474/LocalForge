import React from 'react';
import Link from 'next/link';
import { Hammer, Shield, Cpu, Github, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Hammer className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white tracking-tight">LocalForge</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Enterprise-grade browser utilities powered by WebAssembly and Web Workers. Every file and payload is processed strictly on your device—zero cloud uploads, zero telemetry leaks.
            </p>
            <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Lock className="w-3.5 h-3.5" /> 100% Client-Side
              </span>
              <span className="flex items-center gap-1 text-indigo-400">
                <Cpu className="w-3.5 h-3.5" /> Web Worker Multi-Threading
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Popular Utilities</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/tools/json-formatter" className="hover:text-indigo-400 transition-colors">JSON Formatter & Validator</Link></li>
              <li><Link href="/tools/image-compressor" className="hover:text-indigo-400 transition-colors">Bulk Image Compressor</Link></li>
              <li><Link href="/tools/pdf-merger" className="hover:text-indigo-400 transition-colors">Private PDF Merger</Link></li>
              <li><Link href="/tools/jwt-decoder" className="hover:text-indigo-400 transition-colors">Offline JWT Debugger</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Security & Open Source</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/tools/base64-codec" className="hover:text-indigo-400 transition-colors">UTF-8 Base64 Codec</Link></li>
              <li><Link href="/tools/crypto-generator" className="hover:text-indigo-400 transition-colors">WebCrypto Password & UUID</Link></li>
              <li>
                <a href="https://github.com/rehan474/LocalForge" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> GitHub Repository
                </a>
              </li>
              <li><Link href="/sitemap.xml" className="hover:text-indigo-400 transition-colors">XML Sitemap (SEO)</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LocalForge. Open-Source MIT License. Built by Rehan.</p>
          <p className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Privacy Guarantee: No files ever leave your browser memory.
          </p>
        </div>
      </div>
    </footer>
  );
}
