"use client"

import React from 'react';

// Logo.dev publishable key
const LOGO_DEV_KEY = 'pk_FajouHbYTb2g0kE67Vlytw';

interface Company {
  name: string;
  domain: string;
}

// Pre-defined company lists for different contexts
export const AI_COMPANIES: Company[] = [
  { name: "OpenAI", domain: "openai.com" },
  { name: "Anthropic", domain: "anthropic.com" },
  { name: "Google", domain: "google.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Perplexity", domain: "perplexity.ai" },
];

export const SEO_TOOLS: Company[] = [
  { name: "Ahrefs", domain: "ahrefs.com" },
  { name: "SEMrush", domain: "semrush.com" },
  { name: "Moz", domain: "moz.com" },
  { name: "Screaming Frog", domain: "screamingfrog.co.uk" },
];

export const TECH_COMPANIES: Company[] = [
  { name: "Vercel", domain: "vercel.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "AWS", domain: "aws.amazon.com" },
  { name: "Cloudflare", domain: "cloudflare.com" },
];

export const CONTENT_PLATFORMS: Company[] = [
  { name: "Medium", domain: "medium.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "WordPress", domain: "wordpress.com" },
];

export const SOCIAL_PLATFORMS: Company[] = [
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "X", domain: "x.com" },
  { name: "Medium", domain: "medium.com" },
];

export const CMS_PLATFORMS: Company[] = [
  { name: "WordPress", domain: "wordpress.com" },
  { name: "Webflow", domain: "webflow.com" },
  { name: "Shopify", domain: "shopify.com" },
  { name: "Notion", domain: "notion.so" },
];

export const ANALYTICS_TOOLS: Company[] = [
  { name: "Google Analytics", domain: "analytics.google.com" },
  { name: "Mixpanel", domain: "mixpanel.com" },
  { name: "Amplitude", domain: "amplitude.com" },
];

export const PUBLISHING_PLATFORMS: Company[] = [
  { name: "TechCrunch", domain: "techcrunch.com" },
  { name: "Forbes", domain: "forbes.com" },
  { name: "Entrepreneur", domain: "entrepreneur.com" },
  { name: "Inc", domain: "inc.com" },
];

export const SAAS_LEADERS: Company[] = [
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Zapier", domain: "zapier.com" },
  { name: "Slack", domain: "slack.com" },
];

export const PSEO_SUCCESS: Company[] = [
  { name: "Zapier", domain: "zapier.com" },
  { name: "Canva", domain: "canva.com" },
  { name: "Tripadvisor", domain: "tripadvisor.com" },
  { name: "Yelp", domain: "yelp.com" },
];

export const ECOMMERCE: Company[] = [
  { name: "Shopify", domain: "shopify.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Stripe", domain: "stripe.com" },
];

export const getLogoUrl = (domain: string) => {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}&size=128&format=png`;
};

interface LogoStripProps {
  companies: Company[];
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showNames?: boolean;
  className?: string;
}

export const LogoStrip: React.FC<LogoStripProps> = ({ 
  companies, 
  label, 
  size = 'md',
  showNames = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14'
  };

  const imgSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  };

  return (
    <div className={`${className}`}>
      {label && (
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 text-center">{label}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-5">
        {companies.map((company, index) => (
          <div 
            key={index}
            className="group flex flex-col items-center gap-1.5"
            title={company.name}
          >
            <div className={`${sizeClasses[size]} flex items-center justify-center bg-white rounded-lg p-1.5`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getLogoUrl(company.domain)}
                alt={`${company.name} logo`}
                className={`${imgSizeClasses[size]} object-contain`}
              />
            </div>
            {showNames && (
              <span className="text-[10px] text-gray-500">{company.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface InlineLogosProps {
  companies: Company[];
  className?: string;
}

export const InlineLogos: React.FC<InlineLogosProps> = ({ companies, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {companies.slice(0, 4).map((company, index) => (
        <div 
          key={index}
          className="h-6 w-6 flex items-center justify-center bg-white/10 rounded p-1"
          title={company.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getLogoUrl(company.domain)}
            alt={`${company.name}`}
            className="w-4 h-4 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoStrip;
