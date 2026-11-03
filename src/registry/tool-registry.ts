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
      keywords: ['json formatter', 'json validator', 'beautify json'],
      howItWorks: ['Paste your raw or minified JSON string into the input editor.', 'Choose indentation and copy output.'],
      whyLocal: 'Cloud JSON formatters often log requests on backend servers. LocalForge executes strictly in browser memory.',
      faqs: [{ question: 'Is my JSON data sent to any server?', answer: 'Never. All parsing happens locally via your browser.' }]
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
      description: 'Compress images up to 80% without losing quality. Zero server uploads.',
      keywords: ['image compressor', 'compress png', 'compress jpg'],
      howItWorks: ['Select any PNG, JPG, or WebP image.', 'Background Web Worker compresses the file.', 'Download optimized output.'],
      whyLocal: 'Uploading personal images to third-party servers risks privacy leaks. LocalForge compresses files inside a background Web Worker.',
      faqs: [{ question: 'Does this work offline?', answer: 'Yes. Once loaded, you can disconnect from the internet.' }]
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
      description: 'Combine multiple sensitive PDFs directly in your browser.',
      keywords: ['merge pdf', 'combine pdf', 'private pdf merger'],
      howItWorks: ['Select two or more PDF files.', 'Review queue order.', 'Click Merge PDFs to download.'],
      whyLocal: 'Financial and legal PDFs should never be uploaded to unknown cloud servers.',
      faqs: [{ question: 'Are there file limits?', answer: 'No daily limits apply because your device performs the merge.' }]
    }
  },
  'pdf-to-word': {
    slug: 'pdf-to-word',
    name: 'PDF to Word Converter (.docx)',
    shortDescription: 'Convert PDF documents into editable Microsoft Word (.docx) files securely in your browser.',
    category: 'pdf',
    iconName: 'FileStack',
    isNew: false,
    runsInWorker: false,
    seo: {
      title: 'Free PDF to Word Converter - 100% Client-Side .docx Export',
      description: 'Convert PDF files to editable Word documents instantly without uploading sensitive files to cloud servers.',
      keywords: ['pdf to word', 'convert pdf to docx'],
      howItWorks: ['Upload your PDF document.', 'Browser extracts page streams and structures .docx markup.'],
      whyLocal: 'Contracts and resumes converted on third-party cloud servers expose your confidential data.',
      faqs: [{ question: 'Are files stored anywhere?', answer: 'No storage occurs; conversion happens purely in temporary RAM.' }]
    }
  },
  'word-to-pdf': {
    slug: 'word-to-pdf',
    name: 'Word to PDF Converter',
    shortDescription: 'Compile Microsoft Word (.docx) documents into clean, portable PDF files offline.',
    category: 'pdf',
    iconName: 'FileStack',
    isNew: false,
    runsInWorker: false,
    seo: {
      title: 'Word to PDF Converter - Secure In-Browser Compilation',
      description: 'Transform .docx documents into formatted PDF files instantly without external cloud tools.',
      keywords: ['word to pdf', 'docx to pdf converter'],
      howItWorks: ['Select your .docx file.', 'Browser compiles document into PDF byte streams.'],
      whyLocal: 'Keep your proprietary documents off remote backend conversion clusters.',
      faqs: [{ question: 'Is formatting preserved?', answer: 'Standard text blocks compile cleanly into client-side PDF.' }]
    }
  },
  'qr-generator': {
    slug: 'qr-generator',
    name: 'QR Code Studio',
    shortDescription: 'Generate scannable QR codes for links, text, and WiFi and download them as high-res SVGs.',
    category: 'media',
    iconName: 'QrCode',
    isNew: true,
    runsInWorker: false,
    seo: {
      title: 'Free QR Code Generator - Download SVG & PNG QR Codes Locally',
      description: 'Create custom QR codes instantly in your browser. Zero tracking, zero ads.',
      keywords: ['qr code generator', 'create qr code', 'svg qr code'],
      howItWorks: ['Enter your text or URL.', 'View real-time generated QR code.', 'Download SVG vector file instantly.'],
      whyLocal: 'Online QR generators often track scan analytics and log URLs. LocalForge generates SVGs locally.',
      faqs: [{ question: 'Can I use these QR codes commercially?', answer: 'Yes, all generated QR code vectors are 100% free for commercial use.' }]
    }
  },
  'markdown-previewer': {
    slug: 'markdown-previewer',
    name: 'Markdown Live Previewer',
    shortDescription: 'Write markdown and instantly preview compiled HTML with one-click copy export.',
    category: 'developer',
    iconName: 'FileText',
    isNew: true,
    runsInWorker: false,
    seo: {
      title: 'Online Markdown to HTML Previewer & Compiler',
      description: 'Preview markdown notes and documentation locally in real time.',
      keywords: ['markdown previewer', 'markdown to html', 'offline markdown editor'],
      howItWorks: ['Type markdown syntax in the left pane.', 'View real-time compiled HTML output.'],
      whyLocal: 'Keep your personal documentation and notes entirely private inside your browser tab.',
      faqs: [{ question: 'Can I copy the HTML?', answer: 'Yes, use the One-Click Copy HTML button.' }]
    }
  },
  'jwt-decoder': {
    slug: 'jwt-decoder',
    name: 'Offline JWT Debugger',
    shortDescription: 'Decode and inspect JSON Web Tokens without leaking production tokens.',
    category: 'developer',
    iconName: 'KeyRound',
    isNew: false,
    runsInWorker: false,
    seo: {
      title: 'Offline JWT Decoder & Inspector',
      description: 'Inspect JWT headers and claims 100% client-side.',
      keywords: ['jwt decoder', 'jwt debugger'],
      howItWorks: ['Paste your Bearer JWT token.', 'Inspect decoded payload.'],
      whyLocal: 'Prevents session hijacking from logging production bearer tokens on remote servers.',
      faqs: [{ question: 'Is my token safe?', answer: 'Yes, nothing leaves your browser.' }]
    }
  },
  'base64-codec': {
    slug: 'base64-codec',
    name: 'UTF-8 Base64 Encoder / Decoder',
    shortDescription: 'Convert strings to and from Base64 with full Unicode safety.',
    category: 'developer',
    iconName: 'ArrowRightLeft',
    isNew: false,
    runsInWorker: false,
    seo: {
      title: 'Online Base64 Encoder & Decoder',
      description: 'Encode and decode Base64 strings safely.',
      keywords: ['base64 encode', 'base64 decode'],
      howItWorks: ['Type or paste your string.', 'Copy output.'],
      whyLocal: 'Zero network interception for credentials.',
      faqs: [{ question: 'Does it support emojis?', answer: 'Yes, UTF-8 safe.' }]
    }
  },
  'crypto-generator': {
    slug: 'crypto-generator',
    name: 'WebCrypto Password & UUID Generator',
    shortDescription: 'Generate hardware-seeded cryptographic passwords and UUID v4 identifiers.',
    category: 'developer',
    iconName: 'Shield',
    isNew: false,
    runsInWorker: false,
    seo: {
      title: 'Cryptographic Password & UUID v4 Generator',
      description: 'Generate high-entropy passwords locally.',
      keywords: ['password generator', 'uuid generator'],
      howItWorks: ['Adjust length slider.', 'Copy secure output.'],
      whyLocal: 'True CSPRNG entropy generated locally via window.crypto.',
      faqs: [{ question: 'Is it secure?', answer: 'Uses OS-level hardware entropy.' }]
    }
  }
};

export const getAllTools = (): ToolDefinition[] => Object.values(TOOL_REGISTRY);
export const getToolBySlug = (slug: string): ToolDefinition | undefined => TOOL_REGISTRY[slug];
