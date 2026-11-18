/*
 * Portfolio header: cover, avatar + follow button, name, bio, links and tags.
 */
(function () {
  var e = App.escape;
  var C = App.components;

  C.FollowButton = function (profile) {
    return `<span class="follow-button-wrapper rendered" data-context="profile-header" data-size="small" data-follow-through-id="${e(profile.id)}"><div class="follow-actions follow-actions-regular ">
  <form accept-charset="UTF-8" action="https://secure.devpost.com/users/register" method="get">
    <div style="display:none"><input name="utf8" type="hidden" value="✓"></div>
    <input id="flow_name" name="flow[name]" type="hidden" value="follow_user">
    <input id="flow_data_lookup_id" name="flow[data][follow_through_id]" type="hidden" value="${e(profile.id)}">
    <input id="flow_data_follow_through" name="flow[data][follow_through]" type="hidden" value="">
    <input id="flow_data_context" name="flow[data][context]" type="hidden" value="profile-header">
    <button class="button follow-btn radius small">
      <span class="follow-text">
        <i class="ss-icon ss-plus"></i>
          Follow
      </span>
    </button>
  </form>
</div>
</span>`;
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
              ${C.FollowButton(profile)}
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
