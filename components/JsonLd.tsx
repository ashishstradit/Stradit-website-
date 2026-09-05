import React from 'react';

interface JsonLdProps {
  schema: Record<string, any>;
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Creates the Organization Schema.
 * Useful for the Knowledge Graph/Panel on Google.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://stradit.com/#organization',
    name: 'StradIT',
    legalName: 'StradIT Applied AI & Engineering',
    url: 'https://stradit.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stradit.com/logo.png', // Fallback or placeholder
      width: '180',
      height: '180'
    },
    description: 'StradIT partners with capital-markets and asset-management leaders to embed production-grade AI and high-quality engineering into their operations.',
    email: 'reachout@stradit.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'reachout@stradit.com',
        contactType: 'customer service',
        availableLanguage: 'English'
      },
      {
        '@type': 'ContactPoint',
        email: 'sales@stradit.com',
        contactType: 'sales',
        availableLanguage: 'English'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US' // Can be adjusted as needed
    },
    sameAs: [
      'https://www.linkedin.com/in/stradit-llc',
      'https://www.facebook.com/people/Stradit-Reachout/pfbid032uUHtYjJCcvY4dc4p5K194jTMZ2ohD2pTbqpRq3TcYCmUfAmijVtNYVQe8sM7jPpl/',
      'https://www.instagram.com/stradit23/'
    ]
  };
}

/**
 * Creates the WebSite Schema.
 * Enables Sitelinks Search Box.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://stradit.com/#website',
    url: 'https://stradit.com',
    name: 'StradIT',
    description: 'Applied AI & Engineering for Capital Markets',
    publisher: {
      '@id': 'https://stradit.com/#organization'
    }
  };
}

/**
 * Creates the SiteNavigationElement Schema.
 * Directly guides search engine crawlers in identifying key navigation pages to show as Sitelinks.
 */
export function getSiteNavigationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-home',
        name: 'Home',
        url: 'https://stradit.com'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-about',
        name: 'About StradIT',
        url: 'https://stradit.com/about'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-coe',
        name: 'Center of Excellence',
        url: 'https://stradit.com/coe'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-gcc',
        name: 'Global Capability Center',
        url: 'https://stradit.com/gcc'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-startit',
        name: 'StartIT Program',
        url: 'https://stradit.com/startit'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-careers',
        name: 'Careers',
        url: 'https://stradit.com/careers'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': 'https://stradit.com/#nav-contact',
        name: 'Contact Us',
        url: 'https://stradit.com/contact'
      }
    ]
  };
}

/**
 * Creates the TechArticle / Article Schema.
 * Useful for Case Studies.
 */
export function getCaseStudySchema({
  title,
  description,
  url,
  datePublished = '2026-01-01',
  author = 'StradIT Research'
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://stradit.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'StradIT',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stradit.com/logo.png'
      }
    },
    datePublished: datePublished,
    dateModified: datePublished
  };
}

/**
 * Creates the ProfessionalService / Service Schema.
 * Useful for CoE pages and capabilities.
 */
export function getServiceSchema({
  name,
  description,
  url
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: 'StradIT',
      url: 'https://stradit.com'
    },
    description: description,
    url: url
  };
}
