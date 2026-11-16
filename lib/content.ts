import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { markdownToHtml } from './markdown';

/**
 * Site content from the files in content/. Edit those files and push; GitHub Pages
 * rebuilds the site. (There is no admin panel: GitHub Pages only serves static files.)
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type SiteText = {
    hero: { heading: string; highlight: string; tagline: string };
    about: { markdown: string };
};

export type AboutCard = {
    title: string;
    description: string;
    image?: string | null;
    dataCard?: string;
};

function readJsonFile<T>(name: string): T {
    return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, name), 'utf-8')) as T;
}

export { markdownToHtml };

/** Hero and About text: content/site.json */
export async function getSiteText(): Promise<SiteText> {
    return readJsonFile<SiteText>('site.json');
}

/** About photo cards: content/about-carousel.json */
export async function getAboutCards(): Promise<AboutCard[]> {
    return readJsonFile<{ carouselCards: AboutCard[] }>('about-carousel.json').carouselCards;
}

/** Project cards for the hand-built case studies: content/legacy-projects.json */
export function getProjects(): Record<string, unknown>[] {
    return readJsonFile<{ projects: Record<string, unknown>[] }>('legacy-projects.json').projects;
}
