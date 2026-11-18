/*
 * Nested links: elements with [data-nested-link] sit inside another link
 * (team avatars inside a project card). Clicking one opens its own data-url
 * instead of the outer link. Middle-click or Cmd/Ctrl-click opens a new tab.
 */
App.behaviors.nestedLinks = function (root) {
  root.querySelectorAll('[data-nested-link]').forEach(function (el) {
    el.addEventListener('mouseup', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var url = el.dataset.url;
      if (event.button === 1 || event.metaKey || event.ctrlKey) {
        window.open(url);
      } else {
        window.location = url;
      }
    });
    el.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    });
  });
};
