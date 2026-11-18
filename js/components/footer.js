/*
 * Site footer: link columns, social links and the legal bar.
 */
(function () {
  var e = App.escape;

  function linkColumn(column, index) {
    // The first row of columns gets bottom margin on small screens.
    var classes = 'small-6 large-3 columns' + (index < 2 ? ' with-bottom-margin' : '');
    var links = App.each(column.links, function (link) {
      return `<li><a href="${e(link.href)}">${e(link.label)}</a></li>`;
    }, '\n          ');
    return `<div class="${classes}">
      <nav>
        <h4>${e(column.heading)}</h4>
        <ul>
          ${links}
        </ul>
      </nav>
    </div>`;
  }

  function socialColumn(social) {
    var links = App.each(social.links, function (link) {
      return `<li>
            <a href="${e(link.href)}"${link.newTab ? ' target="_blank"' : ''}>
              <div class="icon">
                <i class="${e(link.icon)}" aria-hidden="true"></i>
              </div>
              <span>
                ${e(link.label)}
              </span>
            </a>
          </li>`;
    }, '\n          ');
    return `<div class="small-6 large-3 columns">
      <nav>
        <h4>${e(social.heading)}</h4>
        <ul class="social-links">
          ${links}
        </ul>
      </nav>
    </div>`;
  }

  App.components.Footer = function (footer) {
    var legal = App.each(footer.legal, function (link) {
      return `<li><a href="${e(link.href)}">${e(link.label)}</a></li>`;
    }, '\n            ');

    return `<footer id="devpost-footer">
  <div class="row body">
    ${App.each(footer.columns, linkColumn, '\n    ')}
    ${socialColumn(footer.social)}
  </div>
  <div class="legal-bar-container">
    <nav class="row">
      <div class="columns">
        <div class="legal-bar">
          <div class="copyright-notice">${e(footer.copyright)}</div>
          <ul>
            ${legal}
          </ul>
        </div>
      </div>
    </nav>
  </div>
</footer>`;
  };
})();
