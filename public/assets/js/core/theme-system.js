/**
 * Theme System
 *
 * The site is light-only. initTheme() clears any dark theme a visitor saved
 * before dark mode was removed, then marks theme-responsive images as loaded.
 *
 * Dependencies: None
 * Exports: initTheme()
 */

function updateThemeResponsiveImages() {
    document.querySelectorAll('.theme-responsive-image').forEach(img => {
        const lightSrc = img.src.replace('-dark.png', '-light.png');
        if (img.src === lightSrc) {
            img.classList.add('loaded');
            return;
        }
        img.classList.remove('loaded');
        img.onload = img.onerror = () => img.classList.add('loaded');
        img.src = lightSrc;
    });
}

function initTheme() {
    document.body.removeAttribute('data-theme');
    try {
        localStorage.removeItem('theme');
    } catch (e) {
        // Storage unavailable (private mode); nothing to clear
    }
    updateThemeResponsiveImages();
}
