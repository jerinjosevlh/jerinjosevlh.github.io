/*
 * Images with data-fallback-src swap to that image if their own src fails
 * to load (missing avatar/thumbnail).
 *
 * Registered before rendering, as a capturing listener on document, so it
 * also catches errors from images that fail immediately.
 */
App.behaviors.imageFallback = function () {
  document.addEventListener('error', function (event) {
    var img = event.target;
    if (img.tagName !== 'IMG' || !img.dataset.fallbackSrc || img.dataset.fallbackUsed) return;
    img.dataset.fallbackUsed = 'true';
    img.src = img.dataset.fallbackSrc;
  }, true);
};
