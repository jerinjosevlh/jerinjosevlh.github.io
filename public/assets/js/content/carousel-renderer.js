/**
 * About Carousel Content Rendering
 *
 * Generates about carousel cards and indicators
 *
 * Dependencies: core/data-loader.js
 * Exports: About carousel rendering functions
 */

// Escape card text and turn runs of two spaces into non-breaking spaces
function escapeCardText(text = '') {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/ {2}/g, '&nbsp;&nbsp;');
}

// Generate about carousel cards
function initAboutCarousel() {
    // Only run on index page
    const carouselTrack = document.getElementById('aboutCarouselTrack');
    if (!carouselTrack) return;

    // Clear existing cards
    carouselTrack.innerHTML = '';

    // Get carousel cards from dataLoader
    const cards = dataLoader.getAboutCarousel();
    if (cards.length === 0) return;

    // Generate carousel cards
    cards.forEach((card, index) => {
        const article = document.createElement('article');
        // Cards without a photo get the accent-coloured filler background
        const filler = card.image ? '' : ' about-card--filler';
        article.className = `about-card project-card project-card-featured${filler}${index === 0 ? ' active' : ''}`;
        article.setAttribute('data-card', card.dataCard || `about-${index + 1}`);

        article.innerHTML = `
            <div class="project-bg-image"></div>
            <div class="project-content-overlay">
                <h3 class="project-title"></h3>
                <p class="project-description"></p>
            </div>
        `;
        // Text comes from the admin panel: set it as text, keeping a double space before an emoji
        article.querySelector('.project-title').innerHTML = escapeCardText(card.title);
        article.querySelector('.project-description').innerHTML = escapeCardText(card.description);
        if (card.image) {
            article.querySelector('.project-bg-image').style.backgroundImage = `url("${encodeURI(card.image)}")`;
        }

        carouselTrack.appendChild(article);
    });

    // Size the track to the number of cards (CSS defaults assume 4)
    carouselTrack.style.width = `${cards.length * 100}%`;
    carouselTrack.querySelectorAll('.about-card').forEach(card => {
        card.style.width = `${100 / cards.length}%`;
    });

    // One photo: no dots, no swiping, no rotation. Add photos to
    // content/about-carousel.json and the carousel comes back automatically.
    const carousel = carouselTrack.closest('.about-carousel');
    if (carousel) carousel.classList.toggle('is-single', cards.length <= 1);

    // Update totalSlides to match loaded data
    totalSlides = cards.length;
}

// Generate about carousel indicators
function initAboutCarouselIndicators() {
    // Only run on index page
    const indicatorsContainer = document.querySelector('.about-carousel .carousel-indicators');
    if (!indicatorsContainer) return;

    // Clear existing indicators
    indicatorsContainer.innerHTML = '';

    // Get carousel cards from dataLoader (no dots for a single photo)
    const cards = dataLoader.getAboutCarousel();
    if (cards.length <= 1) return;

    // Generate indicators
    cards.forEach((card, index) => {
        const button = document.createElement('button');
        button.className = `indicator${index === 0 ? ' active' : ''}`;
        button.setAttribute('data-slide', index);
        button.setAttribute('aria-label', `Show photo ${index + 1}`);
        button.onclick = function() { goToSlide(index, true); };
        indicatorsContainer.appendChild(button);
    });
}

