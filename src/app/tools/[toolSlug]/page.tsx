import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getAllTools } from '@/registry/tool-registry';
import AdBanner from '@/components/monetization/AdBanner';
import SeoArticle from '@/components/shared/SeoArticle';
import JsonFormatterView from '@/tools/json-formatter/JsonFormatterView';
import ImageCompressorView from '@/tools/image-compressor/ImageCompressorView';
import PdfMergerView from '@/tools/pdf-merger/PdfMergerView';
import PdfToWordView from '@/tools/pdf-to-word/PdfToWordView';
import WordToPdfView from '@/tools/word-to-pdf/WordToPdfView';
import JwtDecoderView from '@/tools/jwt-decoder/JwtDecoderView';
import Base64CodecView from '@/tools/base64-codec/Base64CodecView';
import CryptoGeneratorView from '@/tools/crypto-generator/CryptoGeneratorView';
import { ChevronRight, Cpu, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ toolSlug: tool.slug }));
}

export default async function ToolPage({ params }: { params: Promise<{ toolSlug: string }> }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();

  const allTools = getAllTools();

  const renderTool = () => {
    switch (tool.slug) {
      case 'json-formatter':
        return <JsonFormatterView />;
      case 'image-compressor':
        return <ImageCompressorView />;
      case 'pdf-merger':
        return <PdfMergerView />;
      case 'pdf-to-word':
        return <PdfToWordView />;
      case 'word-to-pdf':
        return <WordToPdfView />;
      case 'jwt-decoder':
        return <JwtDecoderView />;
      case 'base64-codec':
        return <Base64CodecView />;
      case 'crypto-generator':
        return <CryptoGeneratorView />;
      default:
        return null;
    }
  };

  return (
    <main className="py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800/80">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              LocalForge Hub
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="uppercase tracking-wider text-[11px] text-indigo-400 font-semibold">
              {tool.category}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-medium">{tool.name}</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero Server Round-Trips
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {tool.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {tool.shortDescription}
              </p>
            </header>

            <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/75 border border-slate-800/90 shadow-2xl backdrop-blur-md">
              {renderTool()}
            </section>

            <AdBanner slotId={`below-tool-${tool.slug}`} />

            <SeoArticle tool={tool} />
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Quick Tool Switcher
                </h2>
                <Link href="/" className="text-[11px] text-indigo-400 hover:text-indigo-300">
                  View All ({allTools.length})
                </Link>
              </div>

              <div className="space-y-1.5">
                {allTools.map((item) => {
                  const isCurrent = item.slug === tool.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/tools/${item.slug}`}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            <AdBanner slotId={`sidebar-${tool.slug}`} format="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}
