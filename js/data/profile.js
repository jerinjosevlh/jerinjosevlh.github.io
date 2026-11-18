/*
 * Portfolio content: the profile owner, their stats, tags and projects.
 * This is the file to edit to change what the portfolio shows.
 */

/** People who appear as team members on project cards, keyed by username. */
App.data.people = {
  jerinjosevlh: { name: 'Jerin Jose', avatar: 'images/avatars/jerinjosevlh.jpg', photoClass: 'photo_image' },
  lunarcoffee: { name: 'Fred Gao', avatar: 'images/avatars/lunarcoffee.png', photoClass: 'photo_image' },
  '1whatleytay': { name: 'Taylor Whatley', avatar: 'images/avatars/1whatleytay.png', photoClass: 'facebook_avatar_image' },
  AadityaChaudhary: { name: 'Aaditya Chaudhary', avatar: 'images/avatars/aadityachaudhary.jpg', photoClass: 'facebook_avatar_image' },
  'YT-Main': { name: 'Yash Trivedi', avatar: 'images/avatars/yt-main.jpg', photoClass: 'photo_image' },
};

App.data.profile = {
  id: 1086034,
  username: 'jerinjosevlh',
  name: 'Jerin Jose',
  url: 'https://devpost.com/jerinjosevlh',
  photo: 'images/avatars/jerinjosevlh-profile.jpg',
  bio: 'software eng @ Waterloo',
  location: 'Oakville, Ontario, Canada',

  links: [
    { label: 'Website', icon: 'ss-icon ss-link', href: 'https://github.com/yashmulki' },
    { label: 'GitHub', icon: 'ss-icon ss-social ss-octocat', href: 'https://github.com/jerinjosevlh' },
  ],

  // `href` is optional: tags with a link are rendered as "recognized" tags.
  skills: [
    { name: 'swift', href: 'https://devpost.com/software/built-with/swift' },
    { name: 'objective-c', href: 'https://devpost.com/software/built-with/objective-c' },
    { name: 'dart' },
    { name: 'flutter', href: 'https://devpost.com/software/built-with/flutter' },
    { name: 'c#', href: 'https://devpost.com/software/built-with/c--2' },
    { name: 'java', href: 'https://devpost.com/software/built-with/java' },
    { name: 'visual-basic', href: 'https://devpost.com/software/built-with/visual-basic' },
    { name: 'c++', href: 'https://devpost.com/software/built-with/c--3' },
    { name: 'vb.net' },
    { name: 'augmented-reality', href: 'https://devpost.com/software/built-with/augmented-reality' },
    { name: 'photoshop', href: 'https://devpost.com/software/built-with/photoshop' },
    { name: 'blockchain', href: 'https://devpost.com/software/built-with/blockchain' },
    { name: 'machine-learning', href: 'https://devpost.com/software/built-with/machine-learning' },
    { name: 'ai' },
    { name: 'quantum' },
  ],

  interests: [
    { name: 'AR/VR' },
    { name: 'Fintech' },
    { name: 'IoT' },
    { name: 'Machine Learning/AI', href: 'https://devpost.com/c/artificial-intelligence' },
    { name: 'Social Good' },
  ],

  // Tabs under the header. `active` marks the current tab.
  stats: [
    { label: 'Projects', count: 5, href: 'https://devpost.com/jerinjosevlh', active: true },
    { label: 'Hackathons', count: 5, href: 'https://devpost.com/jerinjosevlh/challenges' },
    { label: 'Achievements', count: 8, href: 'https://devpost.com/jerinjosevlh/achievements' },
    { label: 'Follower', count: 1, href: 'https://devpost.com/jerinjosevlh/followers', attrs: { 'data-followers-tab': 'true' } },
    { label: 'Following', count: 3, href: 'https://devpost.com/jerinjosevlh/following' },
    { label: 'Likes', count: 6, href: 'https://devpost.com/jerinjosevlh/likes' },
  ],

  // `members` are usernames from App.data.people, in display order.
  projects: [
    {
      id: 383042,
      title: 'YSDS',
      tagline: 'Making socializing easier with a social discovery system ',
      href: 'https://devpost.com/software/ysds',
      thumbnail: 'images/projects/ysds.jpg',
      likes: 1,
      comments: 0,
      members: ['lunarcoffee', '1whatleytay', 'AadityaChaudhary', 'jerinjosevlh'],
    },
    {
      id: 374911,
      title: 'Backlinks',
      tagline: 'Capturing conversational knowledge',
      href: 'https://devpost.com/software/slack-backlinks',
      thumbnail: 'images/projects/backlinks.png',
      likes: 6,
      comments: 4,
      members: ['jerinjosevlh', '1whatleytay', 'AadityaChaudhary', 'lunarcoffee'],
    },
    {
      id: 317531,
      title: 'Jump!',
      tagline: 'A competitive multiplayer exercise game that makes it fun and easy to stay fit with friends through the internet.',
      href: 'https://devpost.com/software/jump-ar5890',
      thumbnail: 'images/projects/jump.png',
      winner: true,
      likes: 11,
      comments: 3,
      members: ['AadityaChaudhary', 'lunarcoffee', '1whatleytay', 'jerinjosevlh'],
    },
    {
      id: 272995,
      title: 'Quinoa - Your Virtual Secretary',
      tagline: 'Quinoa is a personal assistant that learns to minimize the boring parts of life and maximize your free time to do the things that matter.',
      href: 'https://devpost.com/software/quinoa-your-virtual-secretary',
      thumbnail: 'images/projects/quinoa.png',
      winner: true,
      likes: 5,
      comments: 1,
      members: ['1whatleytay', 'lunarcoffee', 'jerinjosevlh', 'AadityaChaudhary'],
    },
    {
      id: 224907,
      title: 'Smyle',
      tagline: 'A hands free way to pay; reduce friction at touchpoints and empower people with disabilities.',
      href: 'https://devpost.com/software/smyle-dxeg09',
      thumbnail: 'images/projects/smyle.png',
      likes: 4,
      comments: 0,
      members: ['1whatleytay', 'jerinjosevlh', 'YT-Main', 'lunarcoffee'],
    },
  ],
};
