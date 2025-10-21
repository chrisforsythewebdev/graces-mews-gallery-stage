// src/components/SEO.jsx
import { useEffect } from 'react';

function upsertMeta(attrName, attrValue, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id, data) {
  // Remove any prior script with same id
  const prev = document.getElementById(id);
  if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
  if (!data) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  siteName = "Grace’s Mews Gallery",
  robots = "index,follow",
  jsonLd, // object or array of objects
}) {
  useEffect(() => {
    // Title
    if (title) document.title = `${title} | ${siteName}`;

    // Basic
    if (description) upsertMeta('name', 'description', description);
    if (canonical) upsertLink('canonical', canonical);
    if (robots) upsertMeta('name', 'robots', robots);

    // Open Graph
    upsertMeta('property', 'og:type', 'website');
    if (title) upsertMeta('property', 'og:title', `${title} | ${siteName}`);
    if (description) upsertMeta('property', 'og:description', description);
    if (canonical) upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', siteName);
    if (image) upsertMeta('property', 'og:image', image);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    if (title) upsertMeta('name', 'twitter:title', `${title} | ${siteName}`);
    if (description) upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);

    // JSON-LD
    if (Array.isArray(jsonLd)) {
      setJsonLd('seo-jsonld', jsonLd);
    } else if (jsonLd && typeof jsonLd === 'object') {
      setJsonLd('seo-jsonld', jsonLd);
    } else {
      setJsonLd('seo-jsonld', null);
    }

    // Cleanup on unmount: optional (keep tags if you navigate SPA-style)
    return () => {};
  }, [title, description, canonical, image, siteName, robots, jsonLd]);

  return null;
}
