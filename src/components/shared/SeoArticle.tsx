import React from 'react';
import { ToolDefinition } from '@/registry/types';
import { Shield, CheckCircle2, HelpCircle } from 'lucide-react';

export default function SeoArticle({ tool }: { tool: ToolDefinition }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.seo.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <article className="mt-12 border-t border-slate-800 pt-10 text-slate-300 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            How to Use {tool.name}
          </h2>
          <ol className="space-y-2.5 text-sm text-slate-400 list-decimal list-inside">
            {tool.seo.howItWorks.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-indigo-400" />
            Why Local Processing Matters
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">{tool.seo.whyLocal}</p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4">
          {tool.seo.faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-900/30 border border-slate-800">
              <h3 className="font-medium text-white text-sm mb-1">{faq.question}</h3>
              <p className="text-sm text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
