import { ToolDefinition } from './types';

export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  'json-formatter': {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDescription: 'Format, validate, and minify JSON payloads 100% locally in your browser.',
    category: 'developer',
    iconName: 'Braces',
    runsInWorker: false,
    seo: {
      title: 'Free Online JSON Formatter, Validator & Beautifier (100% Local)',
      description: 'Format, validate, and minify sensitive JSON data safely in your browser without external servers.',
      keywords: ['json formatter', 'json validator', 'beautify json', 'offline json tool'],
      howItWorks: [
        'Paste your raw or minified JSON string into the input editor.',
        'Choose 2-space indentation, 4-space indentation, or compact minification.',
        'Copy or download the formatted JSON immediately.'
      ],
      whyLocal: 'Cloud JSON formatters often log requests on backend servers, risking exposure of API keys and tokens. LocalForge executes strictly in browser memory.',
      faqs: [
        {
          question: 'Is my JSON data sent to any server?',
          answer: 'Never. All parsing happens locally via your browser V8 JavaScript engine.'
        }
      ]
    }
  },
  'image-compressor': {
    slug: 'image-compressor',
    name: 'Local Image Compressor',
    shortDescription: 'Shrink PNG, JPG, and WebP images up to 80% offline using Web Workers.',
    category: 'media',
    iconName: 'ImageDown',
    isNew: true,
    runsInWorker: true,
    seo: {
      title: 'Private Image Compressor - Shrink JPG, PNG & WebP in Browser',
      description: 'Compress images up to 80% without losing quality. Zero server uploads—powered by client-side Web Workers.',
      keywords: ['image compressor', 'compress png', 'compress jpg', 'webp converter'],
      howItWorks: [
        'Select or drop any PNG, JPG, or WebP image into the browser dropzone.',
        'The background Web Worker automatically compresses the image without freezing your tab.',
        'Download the compressed image directly from browser memory.'
      ],
      whyLocal: 'Uploading personal or client images to third-party servers risks privacy leaks. LocalForge compresses images inside a background Web Worker thread.',
      faqs: [
        {
          question: 'Does this work offline?',
          answer: 'Yes. Once the page loads, you can disconnect from the internet and compress unlimited photos.'
        }
      ]
    }
  },
  'pdf-merger': {
    slug: 'pdf-merger',
    name: 'Private PDF Merger',
    shortDescription: 'Combine multiple sensitive PDF files into one document with zero cloud uploads.',
    category: 'pdf',
    iconName: 'FileStack',
    isNew: true,
    runsInWorker: true,
    seo: {
      title: 'Merge PDF Files Locally in Browser - 100% Private & Free',
      description: 'Combine multiple sensitive PDFs (contracts, bank statements, IDs) directly in your browser.',
      keywords: ['merge pdf', 'combine pdf', 'private pdf merger'],
      howItWorks: [
        'Select two or more PDF files from your device.',
        'Review the file order in the queue.',
        'Click Merge PDFs to instantly generate and download your combined document.'
      ],
      whyLocal: 'Financial and legal PDFs should never be uploaded to unknown cloud servers. LocalForge merges PDF byte arrays strictly inside your browser.',
      faqs: [
        {
          question: 'Are there file limits?',
          answer: 'No daily limits or file count restrictions apply because your own device performs the merge.'
        }
      ]
    }
  }
};

export const getAllTools = (): ToolDefinition[] => Object.values(TOOL_REGISTRY);
export const getToolBySlug = (slug: string): ToolDefinition | undefined => TOOL_REGISTRY[slug];
