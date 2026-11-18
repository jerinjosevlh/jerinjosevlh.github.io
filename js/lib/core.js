/*
 * Core namespace + tiny helpers shared by every component.
 *
 * Everything hangs off a single global `App` object so the site works with
 * plain <script> tags (no bundler, no ES modules) and can be opened straight
 * from the file system.
 *
 *   App.data        – content (edit these files to change what the page says)
 *   App.components  – functions that take data and return an HTML string
 *   App.behaviors   – functions that attach interactivity after render
 */
window.App = {
  data: {},
  components: {},
  behaviors: {},
};

/** Escape text for safe use inside HTML text or attribute values. */
App.escape = function (value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

/** Render a list of items with a component and join the results. */
App.each = function (items, render, separator) {
  return (items || []).map(render).join(separator || '');
};

/** Return `html` only when `condition` is truthy (handy inside templates). */
App.when = function (condition, html) {
  return condition ? html : '';
};
