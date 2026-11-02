'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FilePlus2, Download, Trash2, Sparkles, Loader2, FileText, CheckCircle2 } from 'lucide-react';

export default function PdfMergerView() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [merging, setMerging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: File[]) => {
    const pdfs = newFiles.filter((f) => f.type === 'application/pdf');
    if (pdfs.length === 0) {
      alert('Please upload valid PDF files.');
      return;
    }
    setFiles((prev) => [...prev, ...pdfs]);
    setMergedUrl(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Load built-in sample PDFs for instant testing
  const loadSamplePdfs = async () => {
    setMerging(true);
    try {
      // Create two tiny sample PDFs on the fly using pdf-lib for instant demo
      const pdfDoc1 = await PDFDocument.create();
      const page1 = pdfDoc1.addPage();
      page1.drawText('LocalForge Sample Document A');
      const bytes1 = await pdfDoc1.save();
      const file1 = new File([bytes1], 'LocalForge-Part-1.pdf', { type: 'application/pdf' });

      const pdfDoc2 = await PDFDocument.create();
      const page2 = pdfDoc2.addPage();
      page2.drawText('LocalForge Sample Document B');
      const bytes2 = await pdfDoc2.save();
      const file2 = new File([bytes2], 'LocalForge-Part-2.pdf', { type: 'application/pdf' });

      setFiles([file1, file2]);
      setMergedUrl(null);
    } catch (err) {
      console.error(err);
    } finally {
      setMerging(false);
    }
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
    } catch (err) {
      console.error(err);
      alert('Error merging PDFs.');
    } finally {
      setMerging(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedUrl(null);
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 sm:p-12 cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-slate-800 hover:border-indigo-500/60 bg-slate-950/40 hover:bg-slate-900/50'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 shadow-inner">
          <FilePlus2 className="w-6 h-6 animate-pulse" />
        </div>
        <span className="text-sm font-semibold text-white">Click or drop multiple PDF files here</span>
        <span className="text-xs text-slate-400 mt-1">Combine contracts, invoices, and bank statements 100% locally</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
          className="hidden"
        />
      </div>

      {files.length === 0 && (
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-slate-500">Don&apos;t have PDFs on hand?</span>
          <button
            onClick={loadSamplePdfs}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Load Sample Test PDFs
          </button>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Merge Queue ({files.length} documents selected)</span>
            <button onClick={() => setFiles([])} className="text-rose-400 hover:text-rose-300">
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-400 font-mono flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-slate-500 shrink-0">({(file.size / 1024).toFixed(0)} KB)</span>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              disabled={files.length < 2 || merging}
              onClick={mergePdfs}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
            >
              {merging ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Merging Byte Streams...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Merge {files.length} PDFs Now
                </>
              )}
            </button>

            {mergedUrl && (
              <a
                href={mergedUrl}
                download="localforge-merged-document.pdf"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all animate-fade-in"
              >
                <CheckCircle2 className="w-4 h-4" /> Download Merged PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
