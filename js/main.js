/*
 * Entry point: render the page into #app, then attach behaviors.
 */
(function () {
  App.behaviors.imageFallback();

  // Replace the #app placeholder itself so the rendered markup sits directly
  // inside <body>, with no extra wrapper element.
  var mount = document.getElementById('app');
  mount.outerHTML = App.components.Page(App.data);

  var root = document.body;
  App.behaviors.globalNav(root);
  App.behaviors.expandable(root);
  App.behaviors.nestedLinks(root);
  App.behaviors.connectMenu(root);
})();
