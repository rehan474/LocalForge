import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getAllTools } from '@/registry/tool-registry';
import AdBanner from '@/components/monetization/AdBanner';
import SeoArticle from '@/components/shared/SeoArticle';
import JsonFormatterView from '@/tools/json-formatter/JsonFormatterView';
import ImageCompressorView from '@/tools/image-compressor/ImageCompressorView';
import PdfMergerView from '@/tools/pdf-merger/PdfMergerView';
import { ArrowLeft, Cpu } from 'lucide-react';

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ toolSlug: tool.slug }));
}

export default async function ToolPage({ params }: { params: Promise<{ toolSlug: string }> }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();

  const renderTool = () => {
    switch (tool.slug) {
      case 'json-formatter':
        return <JsonFormatterView />;
      case 'image-compressor':
        return <ImageCompressorView />;
      case 'pdf-merger':
        return <PdfMergerView />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Back to All LocalForge Tools
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> 100% Client-Side Execution
          </span>
        </div>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{tool.name}</h1>
          <p className="text-sm text-slate-400">{tool.shortDescription}</p>
        </header>

        <AdBanner slotId={`top-${tool.slug}`} />

        <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
          {renderTool()}
        </section>

        <AdBanner slotId={`bottom-${tool.slug}`} />

        <SeoArticle tool={tool} />
      </div>
    </main>
  );
}
