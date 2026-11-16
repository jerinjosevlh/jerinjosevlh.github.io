import 'server-only';
import { getSiteText, markdownToHtml } from './content';

/**
 * Fills the {{SITE_*}} tokens in page HTML with the home page text edited in /admin
 * (or content/site.json when there's no database).
 */

export const escapeHtml = (text: string) =>
    String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// "|" marks where the line breaks on phones; the break is hidden on desktop
const withMobileBreaks = (text: string) =>
    text
        .split('|')
        .map(part => escapeHtml(part.trim()))
        .filter(Boolean)
        .join('<br class="mobile-break"> ');

export async function fillSiteTokens(html: string): Promise<string> {
    if (!html.includes('{{SITE_')) return html;
    const site = await getSiteText();
    const tokens: Record<string, string> = {
        '{{SITE_HERO_HEADING}}': withMobileBreaks(site.hero.heading),
        '{{SITE_HERO_HIGHLIGHT}}': escapeHtml(site.hero.highlight.trim()),
        '{{SITE_HERO_TAGLINE}}': withMobileBreaks(site.hero.tagline),
        '{{SITE_ABOUT_BODY}}': markdownToHtml(site.about.markdown),
    };
    return Object.entries(tokens).reduce((out, [token, value]) => out.split(token).join(value), html);
}
