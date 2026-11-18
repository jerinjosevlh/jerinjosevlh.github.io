/*
 * Global navigation bar: <GlobalNav> = <MobileNav> + <DesktopNav>.
 * Both are always in the page; CSS visibility classes pick one per screen size.
 */
(function () {
  var e = App.escape;
  var C = App.components;

  var ANGLE_ICONS = `<i class="fa-angle-down fas" aria-hidden="true"></i>
    <i class="fa-angle-up fas" aria-hidden="true"></i>`;

  /* ---------- Mobile: hamburger + accordion ---------- */

  function mobilePanel(panel) {
    if (panel.type === 'product') {
      return `<div class="floating-menu-wrapper">${C.ProductPanel(panel)}</div>`;
    }
    if (panel.type === 'list') {
      return `<div class="floating-menu-wrapper">${C.ListPanel(panel)}</div>`;
    }
    return `<div class="floating-menu-wrapper">
      <div class="panel-content">
        <div class="panel-section">${C.ResourceCards(panel)}
        </div>
      </div>
    </div>`;
  }

  function accordionItem(site, menu) {
    return `<a class="accordion-tab" data-accordion-tab="" href="${e(site.pageUrl)}#${e(menu.id)}">
    <span>${e(menu.label)}</span>
    ${ANGLE_ICONS}
  </a>
  <div class="accordion-section" data-accordion-section="${e(menu.id)}">
    ${App.each(menu.panels, mobilePanel, '\n    ')}
  </div>`;
  }

  C.MobileNav = function (site) {
    return `<div class="contain-to-grid hide-for-large-up">
  <nav class="top-bar" data-topbar="">
    <ul class="title-area top-bar-section">
      <li>
        <a class="toggle-topbar has-dropdown text-center not-click" data-target-menu="world" id="hamburger" href="${e(site.pageUrl)}#">
          <i class="ss-icon ss-rows"></i>
</a>      </li>
      <li class="name">
        ${C.Logo(site)}
      </li>
      ${C.SearchForm(site, 'mobile')}
        <li class="right logged-out">
    ${C.AuthLinks(site)}
  </li>
      <li class="search-expand-container mobile right">
        <a data-toggle-mobile-search=""><i class="fas fa-search" aria-hidden="true"></i></a>
      </li>
    </ul>
  <section class="top-bar-section" data-top-nav-menu="user">
    </section><section class="top-bar-section" data-top-nav-menu="world">
      <ul class="right">
  <div class="mobile">
  ${App.each(site.menus, function (menu) { return accordionItem(site, menu); }, '\n  ')}
</div>
</ul>
    </section></nav>
</div>`;
  };

  /* ---------- Desktop: hover dropdowns ---------- */

  function desktopPanel(panel) {
    if (panel.type === 'product') {
      return `<div class="panel-container bordered">${C.ProductPanel(panel)}</div>`;
    }
    if (panel.type === 'list') {
      return `<div class="panel-container">${C.ListPanel(panel, 'pt-0')}</div>`;
    }
    return C.ResourceCards(panel);
  }

  function dropdownItem(site, menu) {
    var layout = menu.desktopLayout ? ' ' + menu.desktopLayout : '';
    return `<li class="divider"></li>
<li class="has-dropdown not-click">
  <a class="main-link" href="${e(site.pageUrl)}#">
    ${e(menu.label)}
    ${ANGLE_ICONS}
</a>
  <ul class="dropdown float-left main-menu-dropdown" id="${e(menu.id)}-dropdown"><li class="title back js-generated"><h5><a href="${e(site.pageUrl)}#">Back</a></h5></li>
    <li class="floating-menu-wrapper">
      <div class="floating-menu${layout}">
        ${App.each(menu.panels, desktopPanel, '\n        ')}
      </div>
    </li>
  </ul>
</li>`;
  }

  C.DesktopNav = function (site) {
    return `<div class="contain-to-grid hide-for-small hide-for-medium">
  <nav class="top-bar" data-topbar="">
    <ul class="title-area">
      <li class="name">
        ${C.Logo(site)}
      </li>
    </ul>
  <section class="top-bar-section">
      <ul class="left">
  ${App.each(site.menus, function (menu) { return dropdownItem(site, menu); }, '\n')}
</ul>
      <div class="right">
        <ul>
          <li class="search-expand-container desktop main-link">
            <a data-toggle-desktop-search=""><i class="fas fa-search" aria-hidden="true"></i></a>
          </li>
          ${C.SearchForm(site, 'desktop')}
        </ul>
          ${C.AuthLinks(site)}
      </div>
    </section></nav>
</div>`;
  };

  C.GlobalNav = function (site) {
    return `<header id="global-nav">
  ${C.MobileNav(site)}
  ${C.DesktopNav(site)}
</header>`;
  };
})();
