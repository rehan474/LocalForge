'use client';

import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Download, Loader2 } from 'lucide-react';

export default function ImageCompressorView() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setLoading(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      setCompressedSize(compressed.size);
      setCompressedUrl(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-10 cursor-pointer bg-slate-900/40 transition-colors">
        <Upload className="w-10 h-10 text-indigo-400 mb-3" />
        <span className="text-sm font-medium text-white">Click to select an image (PNG, JPG, WebP)</span>
        <span className="text-xs text-slate-400 mt-1">Processed 100% locally via Multi-Threaded Web Worker</span>
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-indigo-400 text-sm py-4">
          <Loader2 className="w-5 h-5 animate-spin" /> Compressing in background Web Worker...
        </div>
      )}

      {originalFile && compressedUrl && compressedSize && !loading && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">{originalFile.name}</p>
            <p className="text-xs text-slate-400">
              Original: {(originalFile.size / 1024).toFixed(1)} KB → Compressed:{' '}
              <span className="text-emerald-400 font-semibold">{(compressedSize / 1024).toFixed(1)} KB</span> (Saved{' '}
              {Math.max(0, Math.round((1 - compressedSize / originalFile.size) * 100))}%)
            </p>
          </div>
          <a
            href={compressedUrl}
            download={`compressed-${originalFile.name}`}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Compressed Image
          </a>
        </div>
      )}
    </div>
  );
}
