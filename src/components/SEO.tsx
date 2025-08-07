import React, { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
};

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      ensureMeta('meta[name="description"]', "name", "description");
      ensureMeta('meta[name="description"]', "content", description);
      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
      if (ogDesc) ogDesc.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.setAttribute("content", title);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical]);

  return null;
};

export default SEO;
