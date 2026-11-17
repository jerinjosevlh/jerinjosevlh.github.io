import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/public/assets/css/main.css';

// The site's address (GitHub Pages), used for canonical links and share previews
const siteUrl = 'https://jerinjosevlh.github.io';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    icons: { icon: '/favicon.ico' },
    // Under development: keep search engines out until the content is all Jerin's.
    // Delete this line when the site is ready to be found.
    robots: { index: false, follow: false },
};

// viewport-fit=cover lets the phone bottom bar pad itself above the iPhone home indicator
// (env(safe-area-inset-bottom) is 0 without it)
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

// Prevents the navigation flashing on first load; must beat the bundled stylesheet.
const criticalCss = `
.nav { background: rgba(250, 250, 250, 0.1) !important; }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* Light-only site: ask browsers not to auto-darken it */}
                <meta name="color-scheme" content="only light" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
                <noscript>
                    <style>{'body { opacity: 1 !important; } body::after { display: none; }'}</style>
                </noscript>
                {/* Accent colour switcher: only while developing (npm run dev), never in the built site */}
                {process.env.NODE_ENV === 'development' && (
                    <>
                        <link rel="stylesheet" href="/assets/js/dev/palette-switcher.css" />
                        <script src="/assets/js/dev/palette-switcher.js" />
                    </>
                )}
            </head>
            {/* The inline theme script and page scripts set attributes on body before hydration. */}
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
