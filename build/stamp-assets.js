#!/usr/bin/env node

/**
 * Cache busting for the unhashed scripts in public/assets/js. Runs on out/ after a build:
 * stamps script tags and relative ES module imports with one build-wide version, so a
 * browser can never pair a fresh module with a stale dependency.
 */

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'out');
const stamp = Date.now();

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
    });
}

function rewrite(file, transform) {
    const before = fs.readFileSync(file, 'utf-8');
    const after = transform(before);
    if (after !== before) fs.writeFileSync(file, after, 'utf-8');
}

for (const file of walk(OUT)) {
    if (file.endsWith('.html') && !file.startsWith(path.join(OUT, 'assets'))) {
        rewrite(file, html => html.replace(/src="(\/assets\/js\/[^"?]+\.js)"/g, `src="$1?v=${stamp}"`));
    } else if (file.endsWith('.js') && file.startsWith(path.join(OUT, 'assets', 'js'))) {
        rewrite(file, js => js.replace(/(from\s+['"]\.{1,2}\/[^'"?]+\.js)(\?v=\d+)?(['"])/g, `$1?v=${stamp}$3`));
    }
}

console.log(`Stamped scripts with v=${stamp}`);
