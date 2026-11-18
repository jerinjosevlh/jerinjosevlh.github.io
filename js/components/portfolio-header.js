/*
 * Portfolio header: cover, avatar + connect button, name, bio, links and tags.
 */
(function () {
  var e = App.escape;
  var C = App.components;

  /**
   * "Connect" button (same look as the original Follow button) that opens a
   * small menu of ways to reach the profile owner. Opening/closing is handled
   * by behaviors/connect-menu.js.
   */
  C.ConnectButton = function (links) {
    if (!links || !links.length) return '';
    var items = App.each(links, function (link) {
      var external = /^https?:/.test(link.href);
      return `<li role="none"><a role="menuitem" href="${e(link.href)}"${external ? ' target="_blank" rel="noopener"' : ''}><i class="${e(link.icon)}" aria-hidden="true"></i><span>${e(link.label)}</span>${external ? '<i class="fas fa-external-link-alt connect-external" aria-hidden="true"></i>' : ''}</a></li>`;
    }, '\n      ');

    return `<div class="connect" data-connect>
    <button type="button" class="button follow-btn radius small" aria-haspopup="true" aria-expanded="false" data-connect-toggle>
      <span class="follow-text">
        <i class="ss-icon ss-plus"></i>
          Connect
      </span>
    </button>
    <ul class="connect-menu" role="menu" hidden data-connect-menu>
      ${items}
    </ul>
  </div>`;
  };

  /** Location + external links row. */
  C.UserLinks = function (profile) {
    var links = App.each(profile.links, function (link) {
      return `
      <li>
        <span class="${e(link.icon)}"></span>
        <a target="_blank" rel="nofollow" href="${e(link.href)}">
          ${e(link.label)}
</a>      </li>`;
    });
    return `<ul class="inline-list" id="portfolio-user-links">
      <li>
          <span class="ss-icon ss-location"></span>
          ${e(profile.location)}
      </li>${links}
        </ul>`;
  };

  /** A single tag; tags with an href are "recognized" and clickable. */
  C.Tag = function (tag) {
    if (tag.href) {
      return `<span class="cp-tag recognized-tag"><a href="${e(tag.href)}">${e(tag.name)}</a></span>`;
    }
    return `<span class="cp-tag">${e(tag.name)}</span>`;
  };

  /**
   * Heading + list of tags.
   * @param {{heading:string, tags:Array, wrapperClass:string, listClass:string}} props
   */
  C.TagList = function (props) {
    var items = App.each(props.tags, function (tag) { return `<li>${C.Tag(tag)}</li>`; });
    return `<div class="${props.wrapperClass}">
    <span class="cp-tag-heading left">
        <strong>${e(props.heading)}</strong>
    </span>
    <ul class="${props.listClass}">${items}</ul>
  </div>`;
  };

  C.PortfolioHeader = function (profile, site) {
    return `<div id="portfolio-header">
    <div id="portfolio-cover" class="user-background-color user-background-image"></div>
    <div class="row">
      <div class="small-12 columns">
        <div id="portfolio-user">
          <div id="portfolio-user-photo">
            <img alt="${e(profile.name)}'s avatar" class="user-photo photo_image image-replacement" data-fallback-src="${e(site.fallbackImages.avatar)}" src="${e(profile.photo)}">
              ${C.ConnectButton(profile.connect)}
          </div>
          <div id="portfolio-user-info">
            <h1 id="portfolio-user-name">
              ${e(profile.name)}
                <small>(${e(profile.username)})</small>
            </h1>
            <p class="large" id="portfolio-user-bio">
              <i>${e(profile.bio)}</i>
            </p>
            <div class="expandable expandable-closed expandable-small-only">
              <div class="expandable-content">
                ${C.UserLinks(profile)}
  ${C.TagList({ heading: 'Skills', tags: profile.skills, wrapperClass: 'clearfix tag-list', listClass: 'portfolio-tags no-bullet inline-list' })}
                  ${C.TagList({ heading: 'Interests', tags: profile.interests, wrapperClass: 'tag-list themes clearfix', listClass: 'no-bullet inline-list' })}
              </div>
              <a href="${e(site.pageUrl)}#" class="expandable-toggle">
                <i class="ss-navigatedown ss-icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  };
})();
