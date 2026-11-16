/**
 * Splits a full HTML document into what the Next.js routes need:
 *   - meta: head metadata as JSON (consumed by lib/page.tsx)
 *   - body: body markup with the shared nav replaced by {{NAV}} and
 *     relative URLs rewritten to root-relative, trailing-slash routes
 */

// Site URLs become root-relative; Next resolves them against metadataBase (the Vercel domain)
const ORIGIN = '';

// Already provided by app/layout.tsx
const CRITICAL_NAV_CSS = /(\/\*(?:(?!\*\/)[\s\S])*?flash(?:(?!\*\/)[\s\S])*?\*\/\s*)?\.nav \{[^}]*\}\s*body\[data-theme="dark"\] \.nav \{[^}]*\}\s*/;

function routeFor(pathname) {
    if (pathname.startsWith('/assets/') || pathname.startsWith('/demos/')) return pathname;
    if (pathname === '/index.html') return '/';
    return pathname.endsWith('.html') ? `${pathname.slice(0, -'.html'.length)}/` : pathname;
}

function rewriteUrl(raw, sourcePath) {
    if (/^([a-z]+:|#|\/\/)/i.test(raw)) return raw;
    const url = new URL(raw, `http://site/${sourcePath}`);
    url.searchParams.delete('v');
    return routeFor(url.pathname) + url.search + url.hash;
}

function cleanSiteUrls(text) {
    return text.replace(/https:\/\/jerimybrown\.com\/[\w./-]+\.html/g, match => {
        const { pathname } = new URL(match);
        return ORIGIN + routeFor(pathname);
    });
}

function parseAttrs(tag) {
    const attrs = {};
    for (const [, name, value] of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) attrs[name] = value;
    return attrs;
}

function decode(text) {
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function extractMeta(head) {
    const meta = {
        title: decode((head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ''),
        tags: {},
        jsonLd: [],
    };
    for (const [tag] of head.matchAll(/<meta\s[^>]*>/g)) {
        const { name, property, content } = parseAttrs(tag);
        const key = name || property;
        if (key && key !== 'viewport' && content !== undefined) {
            meta.tags[key] = cleanSiteUrls(decode(content));
        }
    }
    const canonical = head.match(/<link rel="canonical" href="([^"]+)"/);
    if (canonical) meta.canonical = cleanSiteUrls(canonical[1]);
    for (const [, json] of head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        meta.jsonLd.push(cleanSiteUrls(json.trim()));
    }
    return meta;
}

function htmlToPage(html, sourcePath) {
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    let body = html.match(/<body>([\s\S]*)<\/body>/)[1];

    const navPattern = /<!-- Navigation -->\s*<nav class="nav">[\s\S]*?id="mobileMenuOverlay">[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/;
    const navMatch = body.match(navPattern);
    if (!navMatch) throw new Error(`${sourcePath}: shared navigation not found`);

    const activeMatch = navMatch[0].match(/<a href="[^"]*" class="active"><span class="link-text">(\w+)</);
    const meta = extractMeta(head);
    const pageStyles = [...head.replace(/<noscript>[\s\S]*?<\/noscript>/g, '').matchAll(/<style>[\s\S]*?<\/style>/g)]
        .map(match => match[0].replace(CRITICAL_NAV_CSS, ''))
        .filter(style => !/^<style>\s*<\/style>$/.test(style));
    meta.nav = {
        home: navMatch[0].includes('scrollToTop'),
        active: activeMatch ? activeMatch[1] : null,
    };

    body = body
        .replace(navPattern, '{{NAV}}')
        .replace(/\b(href|src)="([^"]+)"/g, (_, attr, url) => `${attr}="${rewriteUrl(url, sourcePath)}"`);

    // Page-specific styles keep their place after the main stylesheet
    return { meta, body: `${[...pageStyles, cleanSiteUrls(body).trim()].join('\n')}\n` };
}

module.exports = { htmlToPage };
