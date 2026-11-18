/*
 * "Connect" button menu under the profile photo.
 * Click toggles it; clicking outside, pressing Esc or choosing an item closes it.
 * Arrow keys move between items while it's open.
 */
App.behaviors.connectMenu = function (root) {
  root.querySelectorAll('[data-connect]').forEach(function (wrapper) {
    var toggle = wrapper.querySelector('[data-connect-toggle]');
    var menu = wrapper.querySelector('[data-connect-menu]');
    var items = Array.prototype.slice.call(menu.querySelectorAll('a'));

    function open(focusFirst) {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      wrapper.classList.add('is-open');
      if (focusFirst && items[0]) items[0].focus();
    }

    function close(returnFocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      wrapper.classList.remove('is-open');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      // event.detail === 0 means keyboard activation: move focus into the menu.
      if (menu.hidden) open(event.detail === 0);
      else close(false);
    });

    menu.addEventListener('keydown', function (event) {
      var index = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        items[(index + 1) % items.length].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length].focus();
      }
    });

    items.forEach(function (item) {
      item.addEventListener('click', function () { close(false); });
    });

    document.addEventListener('click', function (event) {
      if (!wrapper.contains(event.target)) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close(true);
    });
  });
};
