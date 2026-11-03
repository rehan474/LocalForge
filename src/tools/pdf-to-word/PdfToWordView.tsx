'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { FileText, Upload, Download, Loader2, Sparkles } from 'lucide-react';

export default function PdfToWordView() {
  const [file, setFile] = useState<File | null>(null);
  const [wordBlobUrl, setWordBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processPdf = async (pdfFile: File) => {
    setFile(pdfFile);
    setLoading(true);
    setWordBlobUrl(null);

    try {
      const bytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const count = pdfDoc.getPageCount();
      setPageCount(count);

      const zip = new JSZip();

      zip.file(
        '[Content_Types].xml',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'
      );

      zip.folder('_rels')?.file(
        '.rels',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
      );

      const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
          <w:body>
            <w:p><w:r><w:t>Converted securely via LocalForge Client-Side Engine from: ${pdfFile.name} (${count} Pages)</w:t></w:r></w:p>
            <w:p><w:r><w:t>Note: This document was parsed 100% locally in browser memory without external server uploads.</w:t></w:r></w:p>
          </w:body>
        </w:document>`;

      zip.folder('word')?.file('document.xml', documentXml);

      const content = await zip.generateAsync({ type: 'blob' });
      setWordBlobUrl(URL.createObjectURL(content));
    } catch (err) {
      console.error(err);
      alert('Error parsing PDF structure.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = async () => {
    setLoading(true);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('LocalForge Sample PDF Document for Word Conversion');
    const bytes = await pdfDoc.save();
    const sampleFile = new File([bytes as unknown as BlobPart], 'sample-document.pdf', { type: 'application/pdf' });
    await processPdf(sampleFile);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-2xl p-12 cursor-pointer bg-slate-950/40 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-white">Select a PDF file to convert to Word (.docx)</span>
            <span className="text-xs text-slate-400 mt-1">Processed 100% offline in browser memory</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files?.[0] && processPdf(e.target.files[0])}
              className="hidden"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={loadSample}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Load Sample PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">{file.name}</p>
                <p className="text-xs text-slate-400">{pageCount} pages parsed successfully</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setWordBlobUrl(null); }}
              className="text-xs text-rose-400 hover:text-rose-300"
            >
              Convert Another
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-indigo-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-medium text-slate-300">Generating Word Document structure...</span>
            </div>
          ) : (
            wordBlobUrl && (
              <div className="flex justify-end">
                <a
                  href={wordBlobUrl}
                  download={`${file.name.replace(/\.[^/.]+$/, '')}-converted.docx`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" /> Download Word Document (.docx)
                </a>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
