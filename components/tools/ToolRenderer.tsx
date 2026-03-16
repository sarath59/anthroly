'use client';

import { MetaTagGenerator } from './MetaTagGenerator';
import { SerpPreview } from './SerpPreview';
import { WordCounter } from './WordCounter';
import { KeywordDensity } from './KeywordDensity';
import { ReadingTime } from './ReadingTime';
import { CharacterCounter } from './CharacterCounter';
import { SlugGenerator } from './SlugGenerator';
import { HtmlEncoder } from './HtmlEncoder';
import { RobotsTxtGenerator } from './RobotsTxtGenerator';
import { OpenGraphGenerator } from './OpenGraphGenerator';
import { FAQSchemaGenerator } from './FAQSchemaGenerator';
import { JsonLdGenerator } from './JsonLdGenerator';
import { HeadingChecker } from './HeadingChecker';
import { CanonicalChecker } from './CanonicalChecker';
import { RedirectChecker } from './RedirectChecker';
import { BlogTitleGenerator } from './BlogTitleGenerator';
import { CTACopyGenerator } from './CTACopyGenerator';
import { LSIKeywords } from './LSIKeywords';
import { ContentBriefGenerator } from './ContentBriefGenerator';
import { BacklinkCalculator } from './BacklinkCalculator';
import { MetaDescriptionGenerator } from './MetaDescriptionGenerator';
import { TitleTagOptimizer } from './TitleTagOptimizer';

const TOOL_MAP: Record<string, React.ComponentType<object>> = {
  'meta-tag-generator': MetaTagGenerator,
  'serp-preview': SerpPreview,
  'meta-description-generator': MetaDescriptionGenerator,
  'title-tag-optimizer': TitleTagOptimizer,
  'word-counter': WordCounter,
  'keyword-density': KeywordDensity,
  'reading-time': ReadingTime,
  'character-counter': CharacterCounter,
  'heading-checker': HeadingChecker,
  'canonical-checker': CanonicalChecker,
  'slug-generator': SlugGenerator,
  'robots-txt-generator': RobotsTxtGenerator,
  'html-encoder': HtmlEncoder,
  'redirect-checker': RedirectChecker,
  'open-graph-generator': OpenGraphGenerator,
  'faq-schema-generator': FAQSchemaGenerator,
  'json-ld-generator': JsonLdGenerator,
  'blog-title-generator': BlogTitleGenerator,
  'cta-copy-generator': CTACopyGenerator,
  'lsi-keywords': LSIKeywords,
  'content-brief-generator': ContentBriefGenerator,
  'backlink-calculator': BacklinkCalculator,
};

interface ToolRendererProps {
  slug: string;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  const Tool = TOOL_MAP[slug];
  if (!Tool) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center text-gray-400">
        This tool is not available yet.
      </div>
    );
  }
  return <Tool />;
}
