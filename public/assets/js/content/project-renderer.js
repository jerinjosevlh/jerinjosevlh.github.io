/**
 * Project Content Rendering
 *
 * Generates project cards, page content, and navigation
 *
 * Dependencies: core/data-loader.js, core/config.js
 * Exports: Project rendering functions
 */

// Generate project cards on index page
function initProjectCards() {
    // Only run on index page - check for projects section
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const projectsGrid = projectsSection.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing cards
    projectsGrid.innerHTML = '';

    // Generate cards from dataLoader (single source of truth)
    const projects = dataLoader.getProjects();
    // Card text can come from the admin panel, so escape it
    const esc = (text = '') => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    projects.forEach(project => {
        const cardHTML = `
            <a href="${esc(project.url)}" class="project-card-link" aria-label="${esc(project.ariaLabel)}">
                <article class="project-card project-card-featured" data-card="${esc(project.id)}">
                    <div class="project-bg-image"></div>
                    <div class="project-content-overlay">
                        <h3 class="project-title">${esc(project.title)}</h3>
                        <p class="project-description">${esc(project.description)}</p>
                        <span class="project-link-text">View Case Study →</span>
                    </div>
                </article>
            </a>
        `;
        projectsGrid.insertAdjacentHTML('beforeend', cardHTML);

        // Projects from the admin panel carry their own image; hand-built ones are styled in _sections.css
        if (project.image) {
            const bg = projectsGrid.lastElementChild.querySelector('.project-bg-image');
            bg.style.backgroundImage = `url("${encodeURI(project.image)}")`;
        }
    });
}

// Update project page title and subtitle
function initProjectPageContent() {
    const projectTitle = document.querySelector('.project-hero .project-title');
    const projectSubtitle = document.querySelector('.project-hero .project-subtitle');

    if (!projectTitle || !projectSubtitle) return;

    // Get current page filename
    const currentPage = window.location.pathname.split('/').filter(Boolean).pop();
    const project = getProject(currentPage);

    if (project) {
        projectTitle.textContent = project.title;
        projectSubtitle.textContent = project.subtitle;

        // Also update browser title if needed
        const titleTag = document.querySelector('title');
        if (titleTag && titleTag.textContent.includes('-')) {
            titleTag.textContent = `${project.title} - Jerin Jose`;
        }
    }
}

// Render project navigation (prev/next links) from project data.
// Case study pages provide an empty container:
//   <div class="projects-grid" data-project-navigation></div>
// Both links are generated here so the markup stays identical across pages
// and the four case studies cycle in the order defined in data/projects.json.
function initProjectNavigation() {
    const container = document.querySelector('.project-navigation [data-project-navigation]');
    if (!container) return;

    // Get current page filename
    const currentPage = window.location.pathname.split('/').filter(Boolean).pop();
    const { prev, next } = getAdjacentProjects(currentPage);

    if (!prev || !next) {
        console.warn('Project navigation: no adjacent projects found for', currentPage);
        return;
    }

    container.innerHTML =
        renderProjectNavLink(prev, 'prev') +
        renderProjectNavLink(next, 'next');
}

function renderProjectNavLink(project, direction) {
    const isPrev = direction === 'prev';
    const alignClass = isPrev ? 'align-left' : 'align-right';
    const label = isPrev ? '← PREV' : 'NEXT →';
    const ariaLabel = `${isPrev ? 'Previous' : 'Next'} case study: ${project.title}`;

    return `
        <a href="${project.url}" class="nav-prev-next ${alignClass}" aria-label="${ariaLabel}">
            <span class="nav-prev-next-title">${project.title}</span>
            <span class="nav-prev-next-direction">${label}</span>
        </a>`;
}

