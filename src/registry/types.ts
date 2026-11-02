export type ToolCategory = 'media' | 'pdf' | 'developer';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSeoContent {
  title: string;
  description: string;
  keywords: string[];
  howItWorks: string[];
  whyLocal: string;
  faqs: ToolFaq[];
}

export interface ToolDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  iconName: string;
  isNew?: boolean;
  runsInWorker: boolean;
  seo: ToolSeoContent;
}
