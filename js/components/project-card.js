/*
 * Project gallery: <ProjectGrid> renders a <ProjectCard> per project.
 */
(function () {
  var e = App.escape;
  var C = App.components;

  /** Team member avatar. Clicking it opens the member's profile (see behaviors/nested-links.js). */
  C.MemberAvatar = function (username, people, site) {
    var person = people[username];
    return `<span nested_link="true" class="user-profile-link" data-nested-link="true" data-url="https://devpost.com/${e(username)}"><img alt="${e(person.name)}" class="user-photo ${e(person.photoClass)} image-replacement" title="${e(username)}" data-fallback-src="${e(site.fallbackImages.avatar)}" src="${e(person.avatar)}"></span>`;
  };

  /** Like + comment counters. */
  C.EntryCounts = function (project) {
    return `<div class="counts">
  <span class="count like-count" data-count="like">
    <i class="ss-icon ss-heart"></i>
    ${e(project.likes)}
  </span>
  <span class="count comment-count" data-count="comment">
    <i class="ss-icon ss-chat"></i>
    ${e(project.comments)}
  </span>
</div>`;
  };

  C.WinnerBadge = function () {
    return `
            <aside class="entry-badge">
              <img alt="Winner" class="winner" src="images/badges/winner-ribbon.png"> Winner
            </aside>`;
  };

  C.ProjectCard = function (project, people, site) {
    var members = App.each(project.members, function (username) {
      return C.MemberAvatar(username, people, site);
    }, '\n      ');

    return `<div class="large-3 small-6 columns gallery-item" data-software-id="${e(project.id)}">
    <a class="block-wrapper-link fade link-to-software" href="${e(project.href)}">
      <div class="software-entry gallery-entry fade visible" id="software_${e(project.id)}">
          <figure>
            <img alt="${e(project.title)}" class="software_thumbnail_image image-replacement" data-fallback-src="${e(site.fallbackImages.thumbnail)}" src="${e(project.thumbnail)}">
            <figcaption>
              <div class="software-entry-name entry-body">
                <h5>
                  ${e(project.title)}
                </h5>
                <p class="small tagline">
                  ${e(project.tagline)}
                </p>
              </div>
            </figcaption>
          </figure>${App.when(project.winner, C.WinnerBadge())}
          <footer>
            <div class="small members ">
      ${members}
</div>
            ${C.EntryCounts(project)}
          </footer>
</div></a>  </div>`;
  };

  C.ProjectGrid = function (projects, people, site) {
    var cards = App.each(projects, function (project) {
      return C.ProjectCard(project, people, site);
    }, '\n  ');

    return `<div class="row">
    <div class="small-12 columns">
  <div class="content-section no-bottom">
    <div class="row">
      <div class="small-12 columns">
          <div id="software-entries" class="portfolio-section">
            <div class="row">
  ${cards}
              <div class="columns"></div>
            </div>
          </div>
          <div class="pagination-centered">
          </div>
      </div>
    </div>
  </div>
    </div>
  </div>`;
  };
})();
