import { useEffect } from 'react';

function setTag(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

export default function SEO({ title, description, canonical, image, jsonLd }) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Description
    if (description) {
      const metaDesc = setTag('meta[name="description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      });
      metaDesc.setAttribute('content', description);
    }

    // Canonical
    if (canonical) {
      const link = setTag('link[rel="canonical"]', () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      });
      link.setAttribute('href', canonical);
    }

    // Open Graph (basic)
    if (title) {
      const ogt = setTag('meta[property="og:title"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:title');
        return m;
      });
      ogt.setAttribute('content', title);
    }
    if (description) {
      const ogd = setTag('meta[property="og:description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:description');
        return m;
      });
      ogd.setAttribute('content', description);
    }
    if (image) {
      const ogi = setTag('meta[property="og:image"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:image');
        return m;
      });
      ogi.setAttribute('content', image);
    }
    if (canonical) {
      const ogu = setTag('meta[property="og:url"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:url');
        return m;
      });
      ogu.setAttribute('content', canonical);
    }

    // JSON-LD (single block)
    const existing = document.getElementById('seo-jsonld');
    if (existing) existing.remove();
    if (jsonLd && typeof jsonLd === 'object') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-jsonld';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, image, jsonLd]);

  return null;
}
