# Jerimy Brown - UX Portfolio

A modern UX portfolio showcasing design work with sophisticated glassmorphism effects, interactive particle systems, and intelligent temperature-based theming.

## 🚀 Live Demo
[View Portfolio](https://www.jerimybrown.com)

## ✨ Features

- **Interactive Particle System** - Dynamic WebGL particle effects with customizable controls
- **Modern Glassmorphism** - Sophisticated glass effects with backdrop blur and transparency
- **Temperature-based Theming** - Cool blues for light mode, warm oranges for dark mode
- **Responsive Typography** - IBM Plex Sans with fluid scaling across breakpoints
- **Modular CSS Architecture** - Organized, maintainable stylesheet system
- **Case Study Pages** - Detailed project showcases with hero imagery and content sections
- **Interactive Lab** - Experimental features and visual demonstrations
- **Data-Driven Projects** - JSON-based project management system

## 🎨 Design System

### Typography
- **Font:** IBM Plex Sans (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700
- **Responsive scaling** from mobile (12px body) to desktop (16px body)

### Color Palette
- **Primary:** `#0f0f0f` (Ultra-dark primary)
- **Accent Cool:** `#15B5FF` (Light mode)
- **Accent Warm:** `#ea580c` (Dark mode)
- **Neutrals:** 10-step scale from `#ffffff` to `#171717`

### Glass Effects
- Backdrop blur filters
- Semi-transparent backgrounds
- Smooth cubic-bezier transitions


## 📁 Project Structure

```
├── app/                # Next.js routes and root layout
├── lib/                # Page rendering and shared nav
├── content/pages/      # Page bodies (.html) and metadata (.json)
├── build/              # Blog generation and build helpers
├── public/
│   ├── assets/         # CSS, JS, images, blog content
│   └── data/           # JSON content loaded at runtime
└── CLAUDE.md           # Design system and architecture docs
```

## 🛠️ Technologies Used

- **Next.js** - Routing, metadata and static export
- **HTML5** - Semantic markup structure
- **CSS3** - Modular CSS with Grid, Flexbox, glassmorphism effects
- **Vanilla JavaScript** - Particle system, theme switching, dynamic content loading
- **WebGL** - Hardware-accelerated particle effects
- **Google Fonts** - IBM Plex Sans typography
- **JSON** - Data-driven project management

## 🚀 Development

### Local Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm start       # serve out/ locally
```

### Deployment
Pushing to `main` builds the site and uploads `out/` over FTP. Set the repository secrets `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD` and `FTP_SERVER_DIR`. `out/` also works on any static host.

### Branch Strategy
- **`main`** - Production branch (deployed to GitHub Pages)
- **`development`** - Active development branch

## ⚡ Key Components

### Particle System
- Interactive WebGL particle effects
- Customizable controls (mouse interaction, color, speed, connections)
- Multiple modes: Black Hole, Deep Space
- Persistent settings via localStorage

### Buttons
- Pill-shaped design (`border-radius: 50px`)
- Glass effect with backdrop blur
- Responsive hover states
- Primary and secondary variants

### Cards
- Multiple card types (`.card`, `.glass-card`, `.interactive-card`)
- Subtle transparency and blur effects
- Hover animations with lift and scale effects
- Project cards with dynamic loading from JSON

### Theme Toggle
- Circular sun/moon icon button
- Fixed positioning with glass backdrop
- Smooth theme transitions
- Temperature-based color switching

### Navigation
- Fixed glass navigation bar
- Smooth scroll to sections
- Active state indicators
- Mobile-responsive menu

## 📐 Technical Notes

### Container Strategy
Content uses max-width containers to maintain readability on large displays:
- **Max-width:** 1200px (configurable via `--container-max-width` CSS variable)
- **Behavior:** Content is fluid up to 1200px, then centers with whitespace
- **Applied to:** Hero, navigation, sections

### Large Display Considerations
The portfolio uses a max-width container approach rather than viewport scaling. CSS cannot replicate browser zoom behavior with `vh` units, so:
- ✅ Max-width containers prevent excessive content spread
- ✅ Users can apply browser zoom if needed
- ❌ Avoid `transform: scale()` or CSS `zoom` with `vh` layouts (causes misalignment)

See `CLAUDE.md` for detailed technical architecture and best practices.

## 🎯 Portfolio Highlights

### Case Studies
- **Design System** - Building comprehensive design systems across product suites
- **Hybrid Product Suite** - End-to-end product ecosystem design
- **AI Design Strategy** - Integrating AI capabilities into user workflows
- **Research Strategy** - User research and interaction pattern validation

### Interactive Features
- **Lab Page** - Experimental UI patterns and visual demonstrations
- **Particle System** - Engaging visual effects with user controls
- **Dynamic Content** - JSON-driven project management
- **Responsive Design** - Optimized for all screen sizes

## 🔧 Customization

### Changing Colors
Update CSS custom properties in `public/assets/css/_variables.css`:
```css
:root {
  --accent-cool: #15B5FF;
  --accent-warm: #ea580c;
  --primary: #0f0f0f;
  --container-max-width: 1200px;
}
```

### Adding Projects
Edit `public/data/projects.json` to add or modify project cards:
```json
{
  "title": "Your Project",
  "category": "UX Design",
  "description": "Project description",
  "url": "/work/your-project/",
  "featured": true
}
```

### Typography
Change font in `public/assets/css/_variables.css`:
```css
--font-family-primary: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Container Width
Adjust max-width for large displays:
```css
--container-max-width: 1400px; /* Default: 1200px */
```

## 🌐 Browser Support

- **Chrome** 76+ (Full support)
- **Firefox** 103+ (Full support)  
- **Safari** 14+ (Full support)
- **Edge** 79+ (Full support)

*Note: Backdrop filters require modern browser support*

## 📱 Responsive Design

- **Mobile First** - Optimized for small screens
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Flexible layouts** that adapt to any screen size

## 🎨 Design Philosophy

This style guide embodies:
- **Minimalism** - Clean, uncluttered interfaces
- **Sophistication** - Modern glass effects and typography
- **Accessibility** - High contrast ratios and readable fonts
- **Performance** - Optimized CSS and smooth animations
- **Adaptability** - Themes that respond to user preferences

## 🔄 Git Workflow

Built with a branch-based workflow:
- **`main`** - Production-ready code (deployed to GitHub Pages)
- **`development`** - Active development branch

## 📄 License

This repository is dual-licensed:

**Code & Technical Implementation:** [MIT License](LICENSE)
The HTML, CSS, JavaScript, and design system code are freely available for reference and use with attribution.

**Portfolio Content & Designs:** All Rights Reserved
Case studies, images, designs, and creative work are protected and may not be reproduced without permission.

See the [LICENSE](LICENSE) file for complete details.

## 🤝 Contributing

This is a personal portfolio project. While the code is open source under MIT, please note:
- **Code improvements and bug fixes** are welcome via pull requests
- **Portfolio content** (case studies, designs, images) is not open for contribution
- Issues and feature suggestions are appreciated on the [issues page](https://github.com/jer1my/jerimybrown-2025/issues)

## 🙏 Acknowledgments

- **IBM Plex Sans** - IBM's excellent open-source typeface
- **Glassmorphism** - Modern design trend inspiration
- **WebGL** - Hardware-accelerated graphics for particle system
- **CSS Grid** - Powerful layout system enabling flexible designs

---

**Built with ❤️ for the design community**

*Portfolio showcasing modern UX design work with sophisticated interactive features and glassmorphism effects.*
