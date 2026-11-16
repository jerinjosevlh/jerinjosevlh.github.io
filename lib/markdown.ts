import { Marked } from 'marked';

/**
 * Markdown used by the admin panel. Shared by the server (pages) and the browser (editor
 * preview) so the preview matches the site. Headings move down one level: the page title
 * is already the <h1>, so "# Setup" in a post becomes an <h2>.
 */
const markdown = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
        heading({ tokens, depth }) {
            const level = Math.min(depth + 1, 6);
            return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
        },
    },
});

export function markdownToHtml(source: string): string {
    return markdown.parse(source || '', { async: false }) as string;
}
