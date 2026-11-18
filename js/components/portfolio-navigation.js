/*
 * Tabs under the header: Projects / Hackathons / Achievements / ...
 */
(function () {
  var e = App.escape;

  function attrs(map) {
    return App.each(Object.keys(map || {}), function (key) {
      return ` ${key}="${e(map[key])}"`;
    });
  }

  App.components.PortfolioNavigation = function (stats) {
    var tabs = App.each(stats, function (stat) {
      return `<li class="${stat.active ? 'active' : ''}"${attrs(stat.attrs)}><a href="${e(stat.href)}"><div class="totals"><span>${e(stat.count)}</span></div> ${e(stat.label)}</a></li>`;
    }, '\n          ');

    return `<div class="row">
  <div class="small-12 columns">
    <div class="clearfix">
      <div id="portfolio-navigation" role="navigation" aria-label="Portfolio">
        <ul>
          ${tabs}
        </ul>
      </div>
    </div>
  </div>
</div>`;
  };
})();
