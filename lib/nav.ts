const SITE_NAME = 'Jerin Jose';

// One list for the desktop menu and the phone bottom bar, in the order a visitor reads the
// site: who you are, what you built, your experience, how you think, then get in touch.
// The home page is the résumé; the menu keeps just About, Work and Blog (Experience,
// Skills and Contact are reached by scrolling). The logo also links home.
const LINKS = [
    { label: 'About', section: 'about' },
    { label: 'Work', section: 'projects' },
    { label: 'Blog', route: '/blog/' },
    // Hidden for now (the page still exists at /lab/); uncomment to show it again
    // { label: 'Lab', route: '/lab/' },
];

/**
 * The shared nav as plain markup: the DOM scripts in public/assets/js attach to it and
 * mutate it, so React must not own these nodes.
 */
export function renderNav({ home, active }: { home: boolean; active: string | null }) {
    const hrefFor = (link: (typeof LINKS)[number]) => {
        if (link.route) return link.route;
        if (!link.section) return home ? '#' : '/';
        return home ? `#${link.section}` : `/#${link.section}`;
    };
    const isTopLink = (link: (typeof LINKS)[number]) => home && !link.route && !link.section;
    const activeClass = (link: (typeof LINKS)[number]) => (link.label === active ? ' class="active"' : '');

    const desktopLinks = LINKS.map(link => {
        const onclick = isTopLink(link) ? ' onclick="scrollToTop(); return false;"' : '';
        return `<li><a href="${hrefFor(link)}"${activeClass(link)}${onclick}><span class="link-text">${link.label}</span></a></li>`;
    }).join('\n                    ');

    const mobileLinks = LINKS.map(link => {
        const onclick = isTopLink(link) ? 'scrollToTop(); toggleMobileMenu(event); return false;' : 'toggleMobileMenu(event)';
        return `<a href="${hrefFor(link)}" onclick="${onclick}"${activeClass(link)}><span class="mobile-link-text">${link.label}</span></a>`;
    }).join('\n                ');

    const bottomLinks = LINKS.map(link => {
        const onclick = isTopLink(link) ? ' onclick="scrollToTop(); return false;"' : '';
        const current = link.label === active ? ' class="active" aria-current="page"' : '';
        return `<a href="${hrefFor(link)}"${current}${onclick}>${link.label}</a>`;
    }).join('\n        ');

    const logoAttrs = home ? 'href="#" class="logo" onclick="scrollToTop(); return false;"' : 'href="/" class="logo"';

    return `<a class="skip-link" href="#main-content">Skip to content</a>

    <nav class="nav" aria-label="Main">
        <div class="nav-container">
            <a ${logoAttrs}>
                <div class="logo-container">
                    <span class="logo-wordmark">${SITE_NAME}</span>
                </div>
            </a>
            <div class="nav-right">
                <ul class="nav-links">
                    ${desktopLinks}
                </ul>
            </div>
        </div>
    </nav>

    <button class="nav-mobile-toggle" onclick="toggleMobileMenu()" aria-label="Toggle mobile menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
    </button>

    <div class="mobile-menu-overlay" id="mobileMenuOverlay">
        <div class="mobile-menu-content">
            <nav class="mobile-nav" aria-label="Mobile">
                ${mobileLinks}
            </nav>
        </div>
    </div>

    <div class="fab-nav" id="fabNav">
        <nav class="fab-nav-menu" id="fabNavMenu" aria-label="Quick navigation">
            ${bottomLinks}
        </nav>
        <button class="fab-nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="fabNavMenu">
            <span class="fab-nav-bar"></span>
            <span class="fab-nav-bar"></span>
            <span class="fab-nav-bar"></span>
        </button>
    </div>`;
}
