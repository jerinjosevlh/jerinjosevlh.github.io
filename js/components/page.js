/*
 * Page layout: composes every section of the portfolio page.
 */
App.components.Page = function (data) {
  var C = App.components;
  var site = data.site;
  var profile = data.profile;

  return `${C.GlobalNav(site)}
    <section id="container" class=" "><div class="edit-stylesheet-form-target"></div>
  ${C.PortfolioHeader(profile, site)}
<section class="section-dark">
  ${C.PortfolioNavigation(profile.stats)}
  ${C.ProjectGrid(profile.projects, data.people, site)}
</section>
    </section>
  ${C.Footer(site.footer)}`;
};
