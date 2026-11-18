/*
 * Site-wide content: global navigation, search, auth links and footer.
 */
(function () {
  var LOGOS = {
    desktop: 'images/logos/devpost-logo.svg',
    mobile: 'images/logos/devpost-logo-mobile.svg',
    teams: 'images/logos/dft-logo-mobile.svg',
  };

  App.data.site = {
    // Placeholder href used by links that only open menus (the original page
    // was saved from this URL, so "#" links were rewritten to it).
    pageUrl: 'https://devpost.com/jerinjosevlh',
    homeUrl: 'https://devpost.com/',
    logos: LOGOS,

    fallbackImages: {
      avatar: 'https://assets.devpost.com/assets/defaults/no-avatar-100-b164b29ca37cbce6b6dbcf4d61d40ba7a3081dfd121a32e2a773eb8f018f0a1f.png',
      thumbnail: 'https://assets.devpost.com/assets/defaults/thumbnail-placeholder-8c916ef4da99a222ce6ece077c71c7e282f071f830747b2abb5718018cbfa699.gif',
    },

    search: {
      action: 'https://devpost.com/hackathons',
      placeholder: 'Search hackathons...',
    },

    auth: {
      loginUrl: 'https://secure.devpost.com/users/login?ref=top-nav-login',
      signupUrl: 'https://secure.devpost.com/users/register?ref_content=signup_global_nav&ref_feature=signup&ref_medium=button',
    },

    /*
     * Global nav menus. Each menu is rendered twice: as a hover dropdown on
     * desktop and as an accordion on mobile.
     *
     * Panel types:
     *   product   – logo + title + subtitle, followed by arrow links
     *   list      – a titled list of arrow links
     *   resources – bordered cards with a title and subtitle
     */
    menus: [
      {
        id: 'join-a-hackathon',
        label: 'Join a hackathon',
        desktopLayout: 'display-flex align-stretch',
        panels: [
          {
            type: 'product',
            href: 'https://devpost.com/hackathons',
            logo: LOGOS.mobile,
            logoAlt: 'Devpost logo',
            title: 'Devpost',
            subtitle: 'Participate in our public hackathons',
            links: [
              { label: 'Hackathons', href: 'https://devpost.com/hackathons' },
              { label: 'Projects', href: 'https://devpost.com/software' },
            ],
          },
          {
            type: 'product',
            href: 'https://devpost.team/',
            logo: LOGOS.teams,
            logoAlt: 'Devpost for Teams',
            title: 'Devpost for Teams',
            subtitle: "Access your company's private hackathons",
            links: [{ label: 'Login', href: 'https://devpost.team/' }],
          },
        ],
      },
      {
        id: 'host-a-hackathon',
        label: 'Host a hackathon',
        desktopLayout: 'flex-row align-start',
        panels: [
          {
            type: 'product',
            href: 'https://info.devpost.com/product/public-hackathons',
            logo: LOGOS.mobile,
            logoAlt: 'Devpost',
            title: 'Devpost',
            subtitle: 'Grow your developer ecosystem and promote your platform',
            links: [{ label: 'Host a public hackathon', href: 'https://info.devpost.com/product/public-hackathons' }],
          },
          {
            type: 'product',
            href: 'https://info.devpost.com/product/devpost-for-teams',
            logo: LOGOS.teams,
            logoAlt: 'Devpost for Teams logo',
            title: 'Devpost for Teams',
            subtitle: 'Drive innovation, collaboration, and retention within your organization',
            links: [{ label: 'Host an internal hackathon', href: 'https://info.devpost.com/product/devpost-for-teams' }],
          },
          {
            type: 'list',
            title: 'By use case',
            links: [
              { label: 'AI hackathons', href: 'https://info.devpost.com/product/ai-hackathons' },
              { label: 'Customer hackathons', href: 'https://info.devpost.com/product/customer-hackathons' },
              { label: 'Employee hackathons', href: 'https://info.devpost.com/product/devpost-for-teams' },
              { label: 'Public hackathons', href: 'https://info.devpost.com/product/public-hackathons' },
            ],
          },
        ],
      },
      {
        id: 'resources',
        label: 'Resources',
        panels: [
          {
            type: 'resources',
            items: [
              { title: 'Blog', subtitle: 'Insights into hackathon planning and participation', href: 'https://info.devpost.com/blog' },
              { title: 'Customer stories', subtitle: 'Inspiration from peers and other industry leaders', href: 'https://info.devpost.com/customer-stories' },
              { title: 'Planning guides', subtitle: 'Best practices for planning online and in-person hackathons', href: 'https://info.devpost.com/guides' },
              { title: 'Webinars & events', subtitle: 'Upcoming events and on-demand recordings', href: 'https://info.devpost.com/webinar-events' },
              { title: 'Help desk', subtitle: 'Common questions and support documentation', href: 'https://help.devpost.com/' },
            ],
          },
        ],
      },
    ],

    footer: {
      columns: [
        {
          heading: 'Devpost',
          links: [
            { label: 'About', href: 'https://info.devpost.com/about' },
            { label: 'Careers', href: 'https://info.devpost.com/careers' },
            { label: 'Contact', href: 'https://info.devpost.com/contact' },
            { label: 'Help', href: 'https://help.devpost.com/' },
          ],
        },
        {
          heading: 'Hackathons',
          links: [
            { label: 'Browse hackathons', href: 'https://devpost.com/hackathons' },
            { label: 'Explore projects', href: 'https://devpost.com/software' },
            { label: 'Host a hackathon', href: 'https://info.devpost.com/' },
            { label: 'Hackathon guides', href: 'https://info.devpost.com/guides' },
          ],
        },
        {
          heading: 'Portfolio',
          links: [
            { label: 'Your projects', href: 'https://devpost.com/portfolio/redirect?page=projects' },
            { label: 'Your hackathons', href: 'https://devpost.com/portfolio/redirect?page=hackathons' },
            { label: 'Settings', href: 'https://devpost.com/settings' },
          ],
        },
      ],
      social: {
        heading: 'Connect',
        links: [
          { label: 'Twitter', icon: 'fab fa-twitter', href: 'https://twitter.com/devpost' },
          { label: 'Discord', icon: 'fab fa-discord', href: 'https://discord.com/invite/HP4BhW3hnp' },
          { label: 'Facebook', icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/devposthacks', newTab: true },
          { label: 'LinkedIn', icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/devpost/', newTab: true },
        ],
      },
      copyright: '© 2026 Devpost, Inc. All rights reserved.',
      legal: [
        { label: 'Community guidelines', href: 'https://info.devpost.com/legal/community-guidelines' },
        { label: 'Security', href: 'https://info.devpost.com/legal/security' },
        { label: 'CA notice', href: 'https://info.devpost.com/legal/california-consumer-privacy-act' },
        { label: 'Privacy policy', href: 'https://info.devpost.com/legal/privacy-policy' },
        { label: 'Terms of service', href: 'https://info.devpost.com/legal/terms-of-service' },
      ],
    },
  };
})();
