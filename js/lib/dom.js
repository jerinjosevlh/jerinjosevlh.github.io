/*
 * Small DOM utilities used by the behaviors (replacements for the bits of
 * jQuery the original page relied on).
 */
(function () {
  var DURATIONS = { fast: 200, normal: 400 };

  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  /** Animate an element open/closed by height, like jQuery's slideToggle. */
  function slide(el, show, duration, done) {
    var ms = typeof duration === 'number' ? duration : DURATIONS[duration] || DURATIONS.normal;
    if (el._slideAnimation) el._slideAnimation.cancel();

    el.style.display = 'block';
    var full = el.scrollHeight;
    var from = show ? 0 : full;
    var to = show ? full : 0;

    el.style.overflow = 'hidden';
    var animation = el.animate(
      [{ height: from + 'px' }, { height: to + 'px' }],
      { duration: ms, easing: 'ease' }
    );
    el._slideAnimation = animation;
    animation.onfinish = function () {
      el._slideAnimation = null;
      el.style.overflow = '';
      el.style.display = show ? 'block' : 'none';
      if (done) done();
    };
  }

  App.dom = {
    isVisible: isVisible,
    slideDown: function (el, duration, done) { slide(el, true, duration, done); },
    slideUp: function (el, duration, done) {
      if (!isVisible(el)) { el.style.display = 'none'; if (done) done(); return; }
      slide(el, false, duration, done);
    },
    slideToggle: function (el, duration, done) { slide(el, !isVisible(el), duration, done); },
  };
})();
