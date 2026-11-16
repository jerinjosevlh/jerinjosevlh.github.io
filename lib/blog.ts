import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Blog data module, built from the posts in public/assets/content/blog/<slug>/post.json
 * (build/build-blog.js writes their data and the module template into content/generated/).
 */

const GENERATED = path.join(process.cwd(), 'content/generated');

type ExportedPost = {
    id: string;
    title: string;
    slug: string;
    datePublished: string;
    order: number;
    tags: string[];
    excerpt: string;
    relatedItem: unknown;
    coverPosition: string;
    images: Record<string, unknown>;
};

const TAG_LABEL_OVERRIDES: Record<string, string> = { ai: 'AI', ux: 'UX', ui: 'UI' };

// Same rules as labelForTag() in build/build-blog.js
function labelForTag(tag: string): string {
    if (TAG_LABEL_OVERRIDES[tag]) return TAG_LABEL_OVERRIDES[tag];
    const words = tag.replace(/-/g, ' ');
    return words.charAt(0).toUpperCase() + words.slice(1);
}

function filePosts(): ExportedPost[] {
    return JSON.parse(fs.readFileSync(path.join(GENERATED, 'blog-file-posts.json'), 'utf-8'));
}

/** The browser module the blog scripts import as ./blog-data.js */
export async function blogDataModule(): Promise<string> {
    const posts = filePosts().sort((a, b) => {
        const byDate = new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
        return byDate !== 0 ? byDate : (b.order || 0) - (a.order || 0);
    });
    const tags = [...new Set(posts.flatMap(p => p.tags))].sort();
    const tagLabels = Object.fromEntries(tags.map(t => [t, labelForTag(t)]));

    // JSON inside a JS module: escape "<" so nothing can close a surrounding script context
    const json = (value: unknown) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
    return fs
        .readFileSync(path.join(GENERATED, 'blog-data.template.js'), 'utf-8')
        .replace('/*__BLOG_TAGS__*/[]', () => json(tags))
        .replace('/*__TAG_LABELS__*/{}', () => json(tagLabels))
        .replace('/*__BLOG_POSTS__*/[]', () => json(posts));
}
