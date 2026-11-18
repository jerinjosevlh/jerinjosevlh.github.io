/*
 * Building blocks shared by the mobile and desktop global nav.
 */
(function () {
  var e = App.escape;
  var C = App.components;

  /** Devpost logo (both mobile and desktop artwork; CSS picks one). */
  C.Logo = function (site) {
    return `<span id="logo">
  <a href="${e(site.homeUrl)}">
    <img alt="Devpost" class="show-for-small" src="${e(site.logos.mobile)}">
    <img alt="Devpost" class="show-for-medium-up" src="${e(site.logos.desktop)}">
</a></span>`;
  };

  /** A link followed by a right-arrow icon. */
  C.ArrowLink = function (link) {
    return `<a href="${e(link.href)}">
      ${e(link.label)} <i class="fa-arrow-right fas" aria-hidden="true" aria-label="Arrow icon"></i>
    </a>`;
  };

  /** Product panel: logo, title and subtitle, then arrow links. */
  C.ProductPanel = function (panel) {
    return `<div class="panel-section">
  <a class="panel-product panel-product-content" href="${e(panel.href)}">
    <img alt="${e(panel.logoAlt)}" src="${e(panel.logo)}">
    <div>
      <p class="title bold">${e(panel.title)}</p>
      <p class="subtitle">${e(panel.subtitle)}</p>
    </div>
  </a>
  <div class="panel-content with-icon-offset">
    ${App.each(panel.links, C.ArrowLink, '\n    ')}
  </div>
</div>`;
  };

  /** Titled list of arrow links. */
  C.ListPanel = function (panel, extraClass) {
    return `<div class="panel-section${extraClass ? ' ' + extraClass : ''}">
  <div class="panel-content">
    <p class="title bold">${e(panel.title)}</p>
      ${App.each(panel.links, C.ArrowLink, '\n      ')}
  </div>
</div>`;
  };

  /** Bordered resource cards (Blog, Customer stories, ...). */
  C.ResourceCards = function (panel) {
    return App.each(panel.items, function (item) {
      return `
  <div class="panel-container mr-0 is-flex-grow-1 mb-4">
    <a class="bordered bordered-hover panel-section padded" href="${e(item.href)}">
      <p class="resource-title">
        ${e(item.title)}
      </p>
      <p class="subtitle">
        ${e(item.subtitle)}
      </p>
    </a>
  </div>`;
    });
  };

  /**
   * Collapsible search box.
   * @param {'mobile'|'desktop'} variant – which toggle buttons control it
   */
  C.SearchForm = function (site, variant) {
    var isMobile = variant === 'mobile';
    var classes = 'search-form-container' + (isMobile ? ' mobile' : '') + ' hide';
    return `<li id="${variant}-search-form-container" class="${classes}">
        <form class="flex-row align-items-center search-form" action="${e(site.search.action)}" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓">
          <div class="search-field-wrapper flex-row align-items-stretch mx-4">
  <span class="align-items-center">
    <i class="fas fa-search search-icon" aria-hidden="true"></i>
  </span>
  <input type="search" name="search" id="search" title="Search" placeholder="${e(site.search.placeholder)}">
  <a href="${e(site.pageUrl)}#" class="align-items-center close-icon" data-toggle-${variant}-search="">
    <i class="fas fa-times" aria-hidden="true"></i>
  </a>
</div>
</form>      </li>`;
  };

  /** Log in / Sign up links. */
  C.AuthLinks = function (site) {
    return `<ul>
  <li>
    <a id="main-link" href="${e(site.auth.loginUrl)}">
      Log in
</a>  </li>
  <li class="show-for-medium-up">
    <a id="signup-link" href="${e(site.auth.signupUrl)}">
      <span class="inner-button">
        Sign up
      </span>
</a>  </li>
</ul>`;
  };
})();
