/*
 * Phone-only List / Grid switch for the project cards.
 * Swaps the projects-layout-* class on #software-entries and remembers the
 * choice in this browser (localStorage; falls back to "list" if unavailable).
 */
App.behaviors.projectLayout = function (root) {
  var KEY = 'portfolio.projectLayout';
  var LAYOUTS = ['list', 'grid'];
  var target = root.querySelector('[data-project-layout-target]');
  var buttons = root.querySelectorAll('[data-project-layout]');
  if (!target || !buttons.length) return;

  function apply(layout) {
    LAYOUTS.forEach(function (name) {
      target.classList.toggle('projects-layout-' + name, name === layout);
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.projectLayout === layout));
    });
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (err) { /* storage blocked */ }
  apply(LAYOUTS.indexOf(saved) >= 0 ? saved : 'list');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var layout = button.dataset.projectLayout;
      apply(layout);
      try { localStorage.setItem(KEY, layout); } catch (err) { /* storage blocked */ }
    });
  });
};
