/**
 * Accent colour switcher (development only).
 * Loaded by app/(site)/layout.tsx only when running `npm run dev`; never part of the
 * built site. Tries other accents by overriding --color-accent-cool / --color-accent-warm,
 * and remembers the choice in this browser. The real accent stays in _variables.css.
 */
(function () {
    const PALETTES = [
        { name: 'Emerald', main: '#047857', soft: '#34d399' },
        { name: 'Forest', main: '#166534', soft: '#4ade80' },
        { name: 'Teal', main: '#0f766e', soft: '#2dd4bf' },
        { name: 'Ocean', main: '#155e75', soft: '#22d3ee' },
        { name: 'Deep blue', main: '#0369a1', soft: '#38bdf8' },
        { name: 'Indigo', main: '#4338ca', soft: '#818cf8' },
        { name: 'Violet', main: '#6d28d9', soft: '#a78bfa' },
        { name: 'Rose', main: '#be123c', soft: '#fb7185' },
        { name: 'Amber', main: '#b45309', soft: '#fbbf24' },
        { name: 'Graphite', main: '#334155', soft: '#94a3b8' },
        // The reference design's original accent (jerimybrown-2025), for comparison
        { name: 'Sky (original)', main: '#15B5FF', soft: '#0284c7' },
    ];
    const KEY = 'dev-accent-palette';

    // WCAG contrast of a colour against the page background (#fafafa)
    function contrast(hex) {
        const lum = h => {
            const [r, g, b] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
                .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const a = lum(hex), bg = lum('#fafafa');
        return (Math.max(a, bg) + 0.05) / (Math.min(a, bg) + 0.05);
    }

    function apply(palette) {
        const root = document.documentElement.style;
        if (!palette || palette.name === 'Emerald') {
            root.removeProperty('--color-accent-cool');
            root.removeProperty('--color-accent-warm');
        } else {
            root.setProperty('--color-accent-cool', palette.main);
            root.setProperty('--color-accent-warm', palette.soft);
        }
    }

    function load() {
        try { return PALETTES.find(p => p.name === localStorage.getItem(KEY)); } catch (e) { return null; }
    }
    function save(name) {
        try { localStorage.setItem(KEY, name); } catch (e) { /* private mode */ }
    }

    apply(load());

    document.addEventListener('DOMContentLoaded', () => {
        const current = () => (load() || PALETTES[0]).name;
        const panel = document.createElement('div');
        panel.className = 'dev-palette';
        panel.innerHTML = `
            <button type="button" class="dev-palette-toggle" aria-expanded="false" aria-label="Try accent colours">
                <span class="dev-palette-dot"></span> Colours
            </button>
            <div class="dev-palette-menu" role="radiogroup" aria-label="Accent colour" hidden>
                <p class="dev-palette-note">Dev only · not on the live site</p>
                ${PALETTES.map(p => `
                    <button type="button" role="radio" class="dev-palette-option" data-name="${p.name}">
                        <span class="dev-palette-swatch" style="background:${p.main}"></span>
                        <span class="dev-palette-name">${p.name}</span>
                        <span class="dev-palette-ratio${contrast(p.main) < 4.5 ? ' is-low' : ''}">${contrast(p.main).toFixed(1)}:1${contrast(p.main) < 4.5 ? ' ⚠' : ''}</span>
                    </button>`).join('')}
            </div>`;
        document.body.appendChild(panel);

        const toggle = panel.querySelector('.dev-palette-toggle');
        const menu = panel.querySelector('.dev-palette-menu');
        const sync = () => panel.querySelectorAll('.dev-palette-option').forEach(btn =>
            btn.setAttribute('aria-checked', String(btn.dataset.name === current())));
        sync();

        toggle.addEventListener('click', () => {
            const open = menu.hidden;
            menu.hidden = !open;
            toggle.setAttribute('aria-expanded', String(open));
        });
        panel.querySelectorAll('.dev-palette-option').forEach(btn => btn.addEventListener('click', () => {
            const palette = PALETTES.find(p => p.name === btn.dataset.name);
            apply(palette);
            save(palette.name);
            sync();
        }));
    });
})();
