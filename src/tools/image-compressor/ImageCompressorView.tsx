'use client';

import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Download, Loader2, Sparkles, Image as ImageIcon, CheckCircle, RotateCcw } from 'lucide-react';

export default function ImageCompressorView() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }
    setOriginalFile(file);
    setOriginalUrl(URL.createObjectURL(file));
    setLoading(true);
    setCompressedUrl(null);
    setCompressedSize(null);

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      setCompressedSize(compressed.size);
      setCompressedUrl(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
      alert('Error compressing image in worker.');
    } finally {
      setLoading(false);
    }
  };

  // Load a built-in sample test image so users don't need a local file
  const loadSampleImage = async () => {
    setLoading(true);
    try {
      // Fetch a reliable placeholder image blob
      const res = await fetch('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop');
      const blob = await res.blob();
      const file = new File([blob], 'localforge-sample-artwork.jpg', { type: 'image/jpeg' });
      await processFile(file);
    } catch {
      setLoading(false);
      alert('Could not fetch sample image.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const resetAll = () => {
    setOriginalFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setCompressedSize(null);
  };

  const savedPercent =
    originalFile && compressedSize
      ? Math.max(0, Math.round((1 - compressedSize / originalFile.size) * 100))
      : 0;

  return (
    <div className="space-y-6">
      {!originalFile ? (
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 sm:p-14 cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                : 'border-slate-800 hover:border-indigo-500/60 bg-slate-950/40 hover:bg-slate-900/50'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
              <Upload className="w-6 h-6 animate-bounce" />
            </div>
            <span className="text-sm font-semibold text-white">Drag & drop your image here, or browse</span>
            <span className="text-xs text-slate-400 mt-1.5">Supports PNG, JPG, WebP up to 50MB (Processed 100% locally)</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="text-xs text-slate-500">Want to test right now?</span>
            <button
              onClick={loadSampleImage}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Load Sample Test Image
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">{originalFile.name}</p>
                <p className="text-xs text-slate-400">Processed via multi-threaded Web Worker</p>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Compress Another
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              <p className="text-xs font-medium text-slate-300">Running multi-threaded compression worker...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Before / After Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider">Original File</span>
                    <span className="text-rose-400 font-mono font-semibold">{(originalFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                  {originalUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <img src={originalUrl} alt="Original" className="max-h-44 object-contain" />
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-bold px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
                    Saved {savedPercent}%
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Compressed Output
                    </span>
                    <span className="text-emerald-400 font-mono font-semibold">
                      {compressedSize ? (compressedSize / 1024).toFixed(1) : 0} KB
                    </span>
                  </div>
                  {compressedUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <img src={compressedUrl} alt="Compressed" className="max-h-44 object-contain" />
                    </div>
                  )}
                </div>
              </div>

              {/* Download Action */}
              {compressedUrl && (
                <div className="flex justify-end pt-2">
                  <a
                    href={compressedUrl}
                    download={`optimized-${originalFile.name}`}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Optimized Image
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
