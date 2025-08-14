
/**
 * Cloudflare Worker script for handling URL redirects.
 * - Loads redirect rules from a remote JSON file.
 * - Supports exact, regex, and lowercase fallback redirects.
 * - Prevents infinite redirect loops.
 * - Minimal error logging for production.
 */
let redirectsCache = null;
let lastFetchTime = 0;
const CACHE_TTL = 300; // seconds

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Load mapping every CACHE_TTL seconds
    if (!redirectsCache || (Date.now() - lastFetchTime) > CACHE_TTL * 1000) {
      try {
        const res = await fetch("https://www.improwised.com/redirects.json", { cf: { cacheTtl: 60 } });
        if (!res.ok) {
          throw new Error("Failed to fetch redirects.json");
        }
        redirectsCache = await res.json();
        lastFetchTime = Date.now();
      } catch (err) {
        // Minimal error logging for production
        console.log("Error loading redirects.json:", err);
        redirectsCache = { exact: {}, regex: [] };
      }
    }

    // 1. Exact match
    if (redirectsCache.exact && redirectsCache.exact[path]) {
      const target = redirectsCache.exact[path];
      if (target !== path) {
        url.pathname = target;
        return Response.redirect(url.toString(), 301);
      }
    }

    // 2. Regex rules
    if (redirectsCache.regex && redirectsCache.regex.length > 0) {
      for (const rule of redirectsCache.regex) {
        const regex = new RegExp(rule.pattern);
        if (regex.test(path)) {
          const replaced = path.replace(regex, rule.replace).toLowerCase();
          if (replaced !== path) {
            url.pathname = replaced;
            return Response.redirect(url.toString(), 301);
          }
        }
      }
    }

    // 3. No redirect or infinite loop prevention → return actual content
    return fetch(request);
  }
};
