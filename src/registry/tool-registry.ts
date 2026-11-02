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
      howItWorks: [
        'Paste your raw or minified JSON string into the input editor.',
        'Choose 2-space indentation, 4-space indentation, or compact minification.',
        'Copy the validated JSON output immediately.'
      ],
      whyLocal: 'Cloud JSON formatters often log requests on backend servers, risking exposure of API keys and tokens. LocalForge executes strictly in browser memory.',
      faqs: [
        { question: 'Is my JSON data sent to any server?', answer: 'Never. All parsing happens locally via your browser V8 JavaScript engine.' }
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
      keywords: ['image compressor', 'compress png', 'compress jpg'],
      howItWorks: [
        'Select any PNG, JPG, or WebP image from your device.',
        'A dedicated background Web Worker compresses the image without freezing your UI.',
        'Download the optimized file immediately.'
      ],
      whyLocal: 'Uploading personal or client images to third-party servers risks privacy leaks. LocalForge compresses images inside a background Web Worker thread.',
      faqs: [
        { question: 'Does this work offline?', answer: 'Yes. Once loaded, you can disconnect from the internet and compress unlimited photos.' }
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
        'Review the document order in the merge queue.',
        'Click Merge PDFs to generate and download your combined file.'
      ],
      whyLocal: 'Financial and legal PDFs should never be uploaded to unknown cloud servers. LocalForge merges PDF byte arrays strictly inside your browser.',
      faqs: [
        { question: 'Are there file limits?', answer: 'No daily limits or file count restrictions apply because your own device performs the merge.' }
      ]
    }
  },
  'jwt-decoder': {
    slug: 'jwt-decoder',
    name: 'Offline JWT Debugger',
    shortDescription: 'Decode and inspect JSON Web Tokens (Header, Payload & Expiration) without leaking production tokens.',
    category: 'developer',
    iconName: 'KeyRound',
    isNew: true,
    runsInWorker: false,
    seo: {
      title: 'Offline JWT Decoder & Inspector - Debug JSON Web Tokens Locally',
      description: 'Inspect JWT headers, claims, and expiration timestamps 100% client-side without exposing bearer tokens.',
      keywords: ['jwt decoder', 'jwt debugger', 'decode jwt offline'],
      howItWorks: [
        'Paste your encoded Bearer JWT string into the input box.',
        'Instantly inspect the decoded JSON Header and Payload claims.',
        'Verify token expiration status automatically.'
      ],
      whyLocal: 'Pasting production Bearer tokens into online debuggers can compromise active user sessions if logged. LocalForge decodes tokens strictly in local memory.',
      faqs: [
        { question: 'Is my JWT token safe?', answer: 'Yes. Not a single byte leaves your browser tab.' }
      ]
    }
  },
  'base64-codec': {
    slug: 'base64-codec',
    name: 'UTF-8 Base64 Encoder / Decoder',
    shortDescription: 'Convert strings to and from Base64 with full Unicode safety strictly in browser memory.',
    category: 'developer',
    iconName: 'ArrowRightLeft',
    runsInWorker: false,
    seo: {
      title: 'Online Base64 Encoder & Decoder (UTF-8 Safe, 100% Client-Side)',
      description: 'Encode and decode Base64 strings safely inside your browser without server round-trips.',
      keywords: ['base64 encode', 'base64 decode', 'utf8 base64'],
      howItWorks: [
        'Toggle between Encode (Text to Base64) and Decode (Base64 to Text).',
        'Type or paste your string into the left editor.',
        'Copy the converted output with one click.'
      ],
      whyLocal: 'Developers frequently encode API Basic Auth credentials and secrets. Local processing guarantees zero network interception.',
      faqs: [
        { question: 'Does it support emojis and non-ASCII characters?', answer: 'Yes, it uses UTF-8 safe byte encoding.' }
      ]
    }
  },
  'crypto-generator': {
    slug: 'crypto-generator',
    name: 'WebCrypto Password & UUID Generator',
    shortDescription: 'Generate hardware-seeded cryptographic passwords and UUID v4 identifiers via window.crypto.',
    category: 'developer',
    iconName: 'Shield',
    runsInWorker: false,
    seo: {
      title: 'Cryptographic Password & UUID v4 Generator (WebCrypto API)',
      description: 'Generate true high-entropy passwords and UUIDs locally using your browser WebCrypto CSPRNG.',
      keywords: ['password generator', 'uuid generator', 'webcrypto password'],
      howItWorks: [
        'Select your desired password length (12 to 64 characters).',
        'Click regenerate to pull fresh entropy from window.crypto.getRandomValues().',
        'Copy your password or UUID v4 directly to your clipboard.'
      ],
      whyLocal: 'Passwords generated on remote servers travel over the network. Generating them via local WebCrypto ensures only your machine ever sees the entropy.',
      faqs: [
        { question: 'How is this different from Math.random()?', answer: 'It uses the OS-level Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) via WebCrypto.' }
      ]
    }
  }
};

export const getAllTools = (): ToolDefinition[] => Object.values(TOOL_REGISTRY);
export const getToolBySlug = (slug: string): ToolDefinition | undefined => TOOL_REGISTRY[slug];
