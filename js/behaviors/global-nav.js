/*
 * Global nav interactivity:
 *  - mobile hamburger opens/closes the menu
 *  - mobile accordion sections (only one open at a time)
 *  - search boxes toggled by the magnifier / close icons
 *  - desktop dropdowns stay open while a link inside has keyboard focus
 *  - menu-only links ("#") don't navigate
 */
App.behaviors.globalNav = function (root) {
  /* Mobile hamburger */
  root.querySelectorAll('.top-bar .toggle-topbar').forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      var topBar = toggle.closest('.top-bar');
      var target = toggle.dataset.targetMenu;
      topBar.classList.toggle('expanded');
      topBar.querySelectorAll('[data-top-nav-menu]').forEach(function (menu) {
        menu.style.display = menu.dataset.topNavMenu === target ? 'block' : 'none';
      });
    });
  });

  /* Mobile accordion */
  var tabs = root.querySelectorAll('[data-accordion-tab]');
  var sections = root.querySelectorAll('[data-accordion-section]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      var id = tab.getAttribute('href').split('#')[1];
      var section = root.querySelector('[data-accordion-section="' + id + '"]');

      tab.classList.toggle('expanded');
      App.dom.slideToggle(section);
      tabs.forEach(function (other) { if (other !== tab) other.classList.remove('expanded'); });
      sections.forEach(function (other) { if (other !== section) App.dom.slideUp(other); });
    });
  });

  /* Search toggles */
  ['mobile', 'desktop'].forEach(function (variant) {
    var container = root.querySelector('#' + variant + '-search-form-container');
    if (!container) return;
    root.querySelectorAll('[data-toggle-' + variant + '-search]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        container.classList.toggle('hide');
        if (!container.classList.contains('hide')) container.querySelector('#search').focus();
      });
    });
  });

  /* Keyboard-accessible desktop dropdowns */
  root.querySelectorAll('nav.top-bar .has-dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('focusin', function (event) {
      if (event.target.closest('a')) dropdown.classList.add('hover');
    });
    dropdown.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!dropdown.contains(document.activeElement)) dropdown.classList.remove('hover');
      }, 15);
    });
  });

  /* Menu headings and "Back" links only open menus */
  root.querySelectorAll('.has-dropdown > a.main-link, li.back a').forEach(function (link) {
    link.addEventListener('click', function (event) { event.preventDefault(); });
  });
};
