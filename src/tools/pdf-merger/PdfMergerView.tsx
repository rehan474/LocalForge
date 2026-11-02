'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FilePlus2, Download, Trash2 } from 'lucide-react';

export default function PdfMergerView() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [merging, setMerging] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    setMergedUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as BlobPart], { type: 'application/pdf' });
      setMergedUrl(URL.createObjectURL(blob));
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 cursor-pointer bg-slate-900/40">
        <FilePlus2 className="w-9 h-9 text-indigo-400 mb-2" />
        <span className="text-sm font-medium text-white">Select 2 or more PDF files to merge locally</span>
        <input type="file" accept="application/pdf" multiple onChange={handleFiles} className="hidden" />
      </label>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
              <span>{idx + 1}. {file.name} ({(file.size / 1024).toFixed(0)} KB)</span>
              <button onClick={() => setFiles(files.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button
              disabled={files.length < 2 || merging}
              onClick={mergePdfs}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold"
            >
              {merging ? 'Merging Locally...' : `Merge ${files.length} PDFs Now`}
            </button>
            {mergedUrl && (
              <a href={mergedUrl} download="localforge-merged.pdf" className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5">
                <Download className="w-4 h-4" /> Download Merged PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
