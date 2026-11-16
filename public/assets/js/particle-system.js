// Particle Network System
// Interactive particle animation for hero section background

// Version tracking for forcing demo animations on updates
const PARTICLE_SYSTEM_VERSION = '2.0'; // Orbital motion update

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isActive = false;
        this.previousBlackHoleStrength = 110; // Track for redistribution

        // Mouse activity tracking
        this.lastMouseMove = Date.now();
        this.isMouseActive = false;
        this.mouseIdleTimeout = 800; // ms of inactivity before releasing
        this.mouseActivityCheckInterval = null;

        // Default configuration with responsive particle count
        const isMobile = window.innerWidth <= 768;
        this.config = {
            particleCount: isMobile ? 200 : 300, // 200 on mobile, 300 on desktop
            connectionDistance: 150,
            mouseRadius: 150,
            colorScheme: 'greys', // 'accent' or 'greys'
            colorStrength: 1.0, // 0.3 to 1.5
            interactionMode: 'attract', // 'attract', 'repel', or 'static'
            speed: 1.0,
            mode: 'blackhole', // 'deepspace' or 'blackhole'
            blackHoleStrength: 110, // radius for black hole mode
            rememberMe: false
        };

        this.previousBlackHoleStrength = this.config.blackHoleStrength;

        // Color palettes
        this.colors = {
            light: {
                accent: { particle: 'rgba(21, 181, 255, 0.8)', connection: 'rgba(21, 181, 255, 0.5)' },
                greys: { particle: 'rgba(185, 185, 185, 0.85)', connection: 'rgba(185, 185, 185, 0.55)' }
            },
            dark: {
                accent: { particle: 'rgba(234, 88, 12, 0.8)', connection: 'rgba(234, 88, 12, 0.5)' },
                greys: { particle: 'rgba(64, 64, 64, 0.8)', connection: 'rgba(64, 64, 64, 0.5)' }
            }
        };

        this.init();
    }

    init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.canvas.style.display = 'none';
            return;
        }

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Mouse tracking with activity detection
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY - rect.top;

            // Update activity state
            this.lastMouseMove = Date.now();
            this.isMouseActive = true;
        });

        // Touch tracking, so Attract/Repel also work with a finger on phones
        const onTouch = (e) => {
            const touch = e.touches[0];
            if (!touch) return;
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY - rect.top;
            this.lastMouseMove = Date.now();
            this.isMouseActive = true;
        };
        window.addEventListener('touchstart', onTouch, { passive: true });
        window.addEventListener('touchmove', onTouch, { passive: true });
        window.addEventListener('touchend', () => {
            this.isMouseActive = false;
        }, { passive: true });

        // Deactivate when mouse leaves viewport
        window.addEventListener('mouseleave', () => {
            this.isMouseActive = false;
        });

        // Reactivate when mouse enters viewport
        window.addEventListener('mouseenter', () => {
            this.lastMouseMove = Date.now();
            this.isMouseActive = true;
        });

        // Set up "connects" word boundary circle
        this.updateConnectsCircle();

        // Start checking for mouse inactivity
        this.mouseActivityCheckInterval = setInterval(() => {
            const timeSinceLastMove = Date.now() - this.lastMouseMove;
            if (timeSinceLastMove > this.mouseIdleTimeout && this.isMouseActive) {
                this.isMouseActive = false;
            }
        }, 100); // Check every 100ms

        // Initialize particles
        this.createParticles();

        // Start animation
        this.start();
    }

    updateConnectsCircle() {
        const connectsWord = document.getElementById('rotatingWord');
        if (connectsWord) {
            const rect = connectsWord.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();

            // Use larger radius on mobile for better visual effect
            const isMobile = window.innerWidth <= 768;
            const radiusMultiplier = isMobile ? 1.15 : 0.8;

            // Keep the circle at least as big as the original design's word ("connects",
            // about 3.86em wide), so shorter highlighted words don't shrink the black hole
            const fontSize = parseFloat(getComputedStyle(connectsWord).fontSize) || 0;
            const size = Math.max(rect.width, rect.height, fontSize * 3.86);

            // On mobile the heading is stacked, so centre the circle on the heading
            // (as the original's word sat on its own centred line); desktop follows the word
            const title = connectsWord.closest('.hero-title');
            const centerRect = isMobile && title ? title.getBoundingClientRect() : rect;

            // On desktop, nudge the circle a little to the left of the word
            const xOffset = isMobile ? 0 : fontSize * 0.75;

            this.connectsCircle = {
                x: centerRect.left + centerRect.width / 2 - canvasRect.left - xOffset,
                y: rect.top + rect.height / 2 - canvasRect.top,
                radius: size * radiusMultiplier
            };
        }
    }

    resizeCanvas() {
        const heroSection = this.canvas.closest('.hero');
        if (heroSection) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = heroSection.offsetHeight;
            this.updateConnectsCircle();
            this.createParticles(); // Reset particles on resize
        }
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.config.speed, this.config.mode, this.connectsCircle));
        }
    }

    updateParticleCount(count) {
        this.config.particleCount = count;
        const diff = count - this.particles.length;

        if (diff > 0) {
            // Add particles
            for (let i = 0; i < diff; i++) {
                this.particles.push(new Particle(this.canvas, this.config.speed, this.config.mode, this.connectsCircle));
            }
        } else if (diff < 0) {
            // Remove particles
            this.particles = this.particles.slice(0, count);
        }

        this.savePreferences();
    }

    updateMode(mode) {
        this.config.mode = mode;
        this.createParticles(); // Recreate particles for new mode
        this.savePreferences();
    }

    updateBlackHoleStrength(strength) {
        this.previousBlackHoleStrength = this.config.blackHoleStrength;
        this.config.blackHoleStrength = strength;
        this.savePreferences();
    }

    updateColorScheme(scheme) {
        this.config.colorScheme = scheme;
        this.savePreferences();
    }

    updateColorStrength(strength) {
        this.config.colorStrength = strength;
        this.savePreferences();
    }

    updateInteractionMode(mode) {
        this.config.interactionMode = mode;
        this.savePreferences();
    }

    updateConnectionDistance(distance) {
        this.config.connectionDistance = distance;
        this.savePreferences();
    }

    updateSpeed(speed) {
        this.config.speed = speed;
        this.particles.forEach(p => p.speedMultiplier = speed);
        this.savePreferences();
    }

    getCurrentColors() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const theme = isDark ? 'dark' : 'light';
        const baseColors = this.config.colorScheme === 'accent'
            ? this.getAccentColors(theme)
            : this.colors[theme][this.config.colorScheme];

        // Apply color strength multiplier
        const strength = this.config.colorStrength;

        return {
            particle: this.adjustColorOpacity(baseColors.particle, strength),
            connection: this.adjustColorOpacity(baseColors.connection, strength)
        };
    }

    // Accent particles follow the --color-accent CSS variable, cached per theme.
    getAccentColors(theme) {
        if (!this.accentCache || this.accentCache.theme !== theme) {
            const value = getComputedStyle(document.body).getPropertyValue('--color-accent').trim();
            const rgb = this.hexToRgb(value) || (theme === 'dark' ? [52, 211, 153] : [4, 120, 87]);
            this.accentCache = {
                theme,
                colors: {
                    particle: `rgba(${rgb.join(', ')}, 0.8)`,
                    connection: `rgba(${rgb.join(', ')}, 0.5)`
                }
            };
        }
        return this.accentCache.colors;
    }

    hexToRgb(hex) {
        const match = hex.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (!match) return null;
        let digits = match[1];
        if (digits.length === 3) digits = digits.split('').map(d => d + d).join('');
        return [0, 2, 4].map(i => parseInt(digits.slice(i, i + 2), 16));
    }

    adjustColorOpacity(colorString, multiplier) {
        // Extract the opacity value from rgba() string and multiply it
        const match = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
            const [, r, g, b, a] = match;
            const newOpacity = Math.min(1, parseFloat(a) * multiplier);
            return `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
        }
        return colorString;
    }

    drawConnections() {
        const colors = this.getCurrentColors();

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    // Get base opacity from the color string and multiply by distance factor
                    const baseOpacity = this.extractOpacity(colors.connection);
                    const distanceFactor = (1 - distance / this.config.connectionDistance);
                    const finalOpacity = baseOpacity * distanceFactor;

                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.replaceOpacity(colors.connection, finalOpacity);
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    extractOpacity(colorString) {
        const match = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        return match ? parseFloat(match[4]) : 1;
    }

    replaceOpacity(colorString, newOpacity) {
        return colorString.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
            (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${newOpacity})`);
    }

    drawConnectsCircleConnections(colors) {
        if (!this.connectsCircle) return;

        const circle = this.connectsCircle;

        this.particles.forEach(particle => {
            const dx = circle.x - particle.x;
            const dy = circle.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only draw connections to particles within connection distance from circle edge
            const distanceFromEdge = Math.abs(distance - circle.radius);

            if (distanceFromEdge < this.config.connectionDistance && distance > circle.radius) {
                // Get base opacity from the color string and multiply by distance factor
                const baseOpacity = this.extractOpacity(colors.connection);
                const distanceFactor = (1 - distanceFromEdge / this.config.connectionDistance);
                const finalOpacity = baseOpacity * distanceFactor;

                // Calculate point on circle edge closest to particle
                const angle = Math.atan2(dy, dx);
                const edgeX = circle.x - Math.cos(angle) * circle.radius;
                const edgeY = circle.y - Math.sin(angle) * circle.radius;

                this.ctx.beginPath();
                this.ctx.strokeStyle = this.replaceOpacity(colors.connection, finalOpacity);
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(edgeX, edgeY);
                this.ctx.stroke();
            }
        });
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const colors = this.getCurrentColors();

        // Update and draw particles
        this.particles.forEach(particle => {
            if (this.config.mode === 'blackhole' && this.connectsCircle) {
                // Black hole mode: gravity-based particle distribution with mass

                // Mouse interaction still works in black hole mode
                // Stronger mouse effect at higher black hole strength
                // Only apply when mouse is actively moving
                if (this.config.interactionMode !== 'static' && this.isMouseActive) {
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.config.mouseRadius) {
                        const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                        const angle = Math.atan2(dy, dx);
                        // Scale mouse force based on black hole strength (80-300 range)
                        const strengthFactor = this.config.blackHoleStrength / 50; // 1.6 to 6.0
                        const baseMultiplier = this.config.interactionMode === 'attract' ? 0.2 : -0.2;
                        const multiplier = baseMultiplier * strengthFactor;

                        particle.vx += Math.cos(angle) * force * multiplier;
                        particle.vy += Math.sin(angle) * force * multiplier;
                    }
                }

                // Apply gravity-based constraints
                const dx = this.connectsCircle.x - particle.x;
                const dy = this.connectsCircle.y - particle.y;
                const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                const innerRadius = this.connectsCircle.radius;
                // Massively amplify the range at low strength - extreme dramatic spread
                const maxOuterDistance = (380 - this.config.blackHoleStrength) * 2.5;

                // Strong repulsion from inside the circle - maintain clear boundary
                if (distanceFromCenter < innerRadius) {
                    const force = (innerRadius - distanceFromCenter) / innerRadius;
                    // Much stronger repulsion to keep clean circular boundary
                    particle.vx -= Math.cos(angle) * force * 1.5;
                    particle.vy -= Math.sin(angle) * force * 1.5;

                    // If particle is deep inside, push it out immediately
                    if (distanceFromCenter < innerRadius * 0.9) {
                        const pushOut = (innerRadius - distanceFromCenter) * 0.1;
                        particle.x -= Math.cos(angle) * pushOut;
                        particle.y -= Math.sin(angle) * pushOut;
                    }
                }

                const distanceFromCircumference = distanceFromCenter - innerRadius;

                // Each particle has its own equilibrium distance based on mass
                // Light particles naturally settle further out, heavy ones closer in
                // At HIGH strength: range compressed, everyone pulled tight together
                // At LOW strength: range MASSIVELY expanded, particles spread with extreme variation
                const baseDistance = maxOuterDistance * 0.25;
                const massVariation = (1.0 - particle.mass) * maxOuterDistance * 1.1; // Maximum variation
                const particleTargetDistance = baseDistance + massVariation;

                // Pull/push particle toward its individual target distance
                const distanceFromTarget = distanceFromCircumference - particleTargetDistance;

                if (Math.abs(distanceFromTarget) > 5) {
                    // Strength determines how strongly particles are pulled to their targets
                    // Extremely gentle force for ultra-smooth, non-bouncy movement
                    const forceStrength = this.config.blackHoleStrength / 15000;
                    const force = distanceFromTarget * forceStrength;

                    particle.vx += Math.cos(angle) * force;
                    particle.vy += Math.sin(angle) * force;
                }

                // Mass-based random drift - very gentle for smoothness
                const randomFactor = (360 - this.config.blackHoleStrength) * (1.6 - particle.mass);
                const randomDrift = randomFactor / 3000; // Much reduced for smoothness
                particle.vx += (Math.random() - 0.5) * randomDrift;
                particle.vy += (Math.random() - 0.5) * randomDrift;

                // Add orbital motion that scales with black hole strength
                // Starts very subtle at ~90, slow at 110 (default), increases to max at 300
                if (this.config.blackHoleStrength > 90) {
                    const strengthRange = 300 - 90; // 210
                    const strengthPosition = (this.config.blackHoleStrength - 90) / strengthRange; // 0 to 1

                    // Use power curve to make it slow at low values, faster at high values
                    // At 110: (110-90)/210 = 0.095 -> 0.095^0.75 = 0.146 (14.6% of max speed)
                    const orbitStrength = Math.pow(strengthPosition, 0.75);
                    const orbitalSpeed = 0.3 * orbitStrength; // Max 0.3 at strength 300

                    // Tangential velocity (perpendicular to radial direction)
                    particle.vx += -Math.sin(angle) * orbitalSpeed;
                    particle.vy += Math.cos(angle) * orbitalSpeed;
                }

                // Apply very strong damping in black hole mode for buttery-smooth motion
                particle.vx *= 0.92; // Very strong friction
                particle.vy *= 0.92;

                // Soft outer boundary
                if (distanceFromCircumference > maxOuterDistance) {
                    const excess = distanceFromCircumference - maxOuterDistance;
                    const constrainForce = excess / 50;
                    particle.vx += Math.cos(angle) * constrainForce;
                    particle.vy += Math.sin(angle) * constrainForce;
                }
            } else {
                // Deep space mode: mouse interaction
                // Only apply when mouse is actively moving
                if (this.config.interactionMode !== 'static' && this.isMouseActive) {
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.config.mouseRadius) {
                        const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                        const angle = Math.atan2(dy, dx);
                        const multiplier = this.config.interactionMode === 'attract' ? 0.2 : -0.2;

                        particle.vx += Math.cos(angle) * force * multiplier;
                        particle.vy += Math.sin(angle) * force * multiplier;
                    }
                }

                // Handle "connects" word circle repulsion in deep space mode
                if (this.connectsCircle) {
                    const dx = this.connectsCircle.x - particle.x;
                    const dy = this.connectsCircle.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectsCircle.radius) {
                        // Repel particles from inside the circle
                        const force = (this.connectsCircle.radius - distance) / this.connectsCircle.radius;
                        const angle = Math.atan2(dy, dx);

                        particle.vx -= Math.cos(angle) * force * 0.5;
                        particle.vy -= Math.sin(angle) * force * 0.5;
                    }
                }
            }

            particle.update();
            particle.draw(this.ctx, colors.particle);
        });

        // Draw connections
        this.drawConnections();

        // Draw connections to "connects" word circle (both modes)
        this.drawConnectsCircleConnections(colors);

        // Update previous strength for next frame
        this.previousBlackHoleStrength = this.config.blackHoleStrength;

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.mouseActivityCheckInterval) {
            clearInterval(this.mouseActivityCheckInterval);
        }
    }

    reset() {
        const isMobile = window.innerWidth <= 768;
        this.config = {
            particleCount: isMobile ? 200 : 300, // 200 on mobile, 300 on desktop
            connectionDistance: 150,
            mouseRadius: 150,
            colorScheme: 'greys',
            colorStrength: 1.0,
            interactionMode: 'attract',
            speed: 1.0,
            mode: 'blackhole',
            blackHoleStrength: 110
        };
        this.createParticles();
        this.savePreferences();
    }

    savePreferences() {
        // Only save preferences if rememberMe is enabled
        if (!this.config.rememberMe) {
            return;
        }

        localStorage.setItem('particlePreferences', JSON.stringify({
            particleCount: this.config.particleCount,
            connectionDistance: this.config.connectionDistance,
            colorScheme: this.config.colorScheme,
            colorStrength: this.config.colorStrength,
            interactionMode: this.config.interactionMode,
            speed: this.config.speed,
            mode: this.config.mode,
            blackHoleStrength: this.config.blackHoleStrength,
            rememberMe: this.config.rememberMe,
            version: PARTICLE_SYSTEM_VERSION
        }));
    }

    loadPreferences() {
        // Only load preferences if rememberMe is enabled
        const saved = localStorage.getItem('particlePreferences');
        if (!saved) {
            return {};
        }

        const preferences = JSON.parse(saved);

        // Only load if rememberMe was enabled
        if (!preferences.rememberMe) {
            return { rememberMe: false };
        }

        return preferences;
    }

    updateRememberMe(enabled) {
        this.config.rememberMe = enabled;
        if (enabled) {
            // Save current settings when turning on
            this.savePreferences();
        } else {
            // Clear saved settings when turning off
            localStorage.removeItem('particlePreferences');
        }
    }
}

// Particle class
class Particle {
    constructor(canvas, speedMultiplier = 1.0, mode = 'deepspace', connectsCircle = null) {
        this.canvas = canvas;
        this.speedMultiplier = speedMultiplier;
        this.mode = mode;
        this.radius = Math.random() * 2 + 1;

        // Give each particle a random "mass" - affects how it responds to gravity
        // Heavier particles (higher mass) stay closer to circumference
        // Lighter particles (lower mass) float away more easily
        this.mass = 0.6 + Math.random() * 0.8; // Range: 0.6 to 1.4

        if (mode === 'blackhole' && connectsCircle) {
            // Black hole mode: spawn outside the circle at varying distances
            const angle = Math.random() * Math.PI * 2;
            const randomOffset = Math.random() * 250; // Random distance outside circumference
            const spawnRadius = connectsCircle.radius + randomOffset + 10; // Always outside

            this.x = connectsCircle.x + Math.cos(angle) * spawnRadius;
            this.y = connectsCircle.y + Math.sin(angle) * spawnRadius;

            // Small random initial velocity
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        } else {
            // Deep space mode: spawn randomly
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }
    }

    update() {
        // Move particle
        this.x += this.vx * this.speedMultiplier;
        this.y += this.vy * this.speedMultiplier;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Wrap-around boundaries only in Deep Space mode
        // In Black Hole mode, gravitational constraints handle boundaries
        if (this.mode === 'deepspace') {
            // Allow particles to move beyond visible canvas without bouncing
            const buffer = 200; // Buffer zone beyond canvas edges

            // Wrap horizontally
            if (this.x < -buffer) {
                this.x = this.canvas.width + buffer;
            } else if (this.x > this.canvas.width + buffer) {
                this.x = -buffer;
            }

            // Wrap vertically
            if (this.y < -buffer) {
                this.y = this.canvas.height + buffer;
            } else if (this.y > this.canvas.height + buffer) {
                this.y = -buffer;
            }
        }
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// Initialize particle system
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return null;

    // The settings panel was removed: forget settings visitors saved with it
    try {
        localStorage.removeItem('particlePreferences');
        localStorage.removeItem('particleControlsExpanded');
        sessionStorage.removeItem('particleControlsExpanded');
        sessionStorage.removeItem('particleDemoPlayed');
    } catch (e) {
        // Storage unavailable (private mode); nothing to clear
    }

    const system = new ParticleSystem('particleCanvas');

    return system;
}

// Make available globally
window.initParticleSystem = initParticleSystem;
