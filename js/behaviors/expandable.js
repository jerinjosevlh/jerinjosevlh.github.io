/*
 * "Expandable" blocks: on small screens the profile links/tags are collapsed
 * behind a chevron toggle.
 */
App.behaviors.expandable = function (root) {
  root.querySelectorAll('.expandable').forEach(function (block) {
    var toggle = block.querySelector('.expandable-toggle');
    var content = block.querySelector('.expandable-content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      App.dom.slideToggle(content, 'fast', function () {
        toggle.classList.toggle('expandable-close', App.dom.isVisible(content));
      });
    });
  });
};
