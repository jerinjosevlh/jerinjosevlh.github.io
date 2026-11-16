import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { renderNav } from './nav';
import { fillSiteTokens } from './site';

const PAGES_DIR = path.join(process.cwd(), 'content/pages');

export type PageMeta = {
    title: string;
    canonical?: string;
    tags: Record<string, string>;
    jsonLd: string[];
    nav: { home: boolean; active: string | null };
};

export function readMeta(name: string): PageMeta {
    return JSON.parse(fs.readFileSync(path.join(PAGES_DIR, `${name}.json`), 'utf-8'));
}

export function readBody(name: string): string {
    return fs.readFileSync(path.join(PAGES_DIR, `${name}.html`), 'utf-8');
}

/** URL slugs are lowercase words and hyphens; anything else (dots, slashes, a leading _) is rejected */
export const isValidSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

/** True if content/pages/<name>.html exists (a hand-built or generated file page) */
export function pageExists(name: string): boolean {
    return fs.existsSync(path.join(PAGES_DIR, `${name}.html`));
}

export function listPages(dir: string) {
    const full = path.join(PAGES_DIR, dir);
    if (!fs.existsSync(full)) return [];
    return fs
        .readdirSync(full)
        .filter(file => file.endsWith('.html') && !file.startsWith('_'))
        .map(file => ({ slug: file.slice(0, -'.html'.length) }));
}

export function metadataFromMeta({ title, canonical, tags }: PageMeta): Metadata {
    const image = tags['og:image'];
    const twitterImage = tags['twitter:image'];
    return {
        title,
        description: tags.description,
        authors: tags.author ? [{ name: tags.author }] : undefined,
        alternates: canonical ? { canonical } : undefined,
        openGraph: {
            type: tags['og:type'] === 'article' ? 'article' : 'website',
            url: tags['og:url'],
            title: tags['og:title'],
            description: tags['og:description'],
            images: image ? [image] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: tags['twitter:title'],
            description: tags['twitter:description'],
            images: twitterImage ? [twitterImage] : undefined,
        },
    };
}

export function pageMetadata(name: string): Metadata {
    return metadataFromMeta(readMeta(name));
}

/**
 * Renders page markup. The markup is injected rather than written as JSX because the
 * scripts it loads rewrite these nodes; React leaves injected HTML alone.
 */
export async function PageView({ body, meta }: { body: string; meta: PageMeta }) {
    const html = await fillSiteTokens(body.replace('{{NAV}}', () => renderNav(meta.nav)));

    return (
        <>
            {meta.jsonLd.map(json => (
                <script
                    key={json}
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }}
                />
            ))}
            <div style={{ display: 'contents' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
        </>
    );
}

/** Renders a page from content/pages/<name>.{html,json} */
export function Page({ name }: { name: string }) {
    return <PageView body={readBody(name)} meta={readMeta(name)} />;
}
