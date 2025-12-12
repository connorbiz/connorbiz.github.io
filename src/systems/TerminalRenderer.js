import { TextureRenderer } from './TextureRenderer.js';

/**
 * Terminal Renderer
 * Specialized renderer for cyberpunk-style terminal interface on 3D tablet
 */
export class TerminalRenderer {
    constructor(width = 1024, height = 640) {
        this.renderer = new TextureRenderer(width, height);
        this.width = width;
        this.height = height;

        // Terminal styling
        this.bgColor = '#001a1a';
        this.primaryColor = '#00ffff';
        this.secondaryColor = '#00ff00';
        this.textColor = '#00ffff';
        this.glowColor = '#00ffff';

        // Layout
        this.padding = 40;
        this.lineHeight = 28;
        this.fontSize = 18;
        this.headerHeight = 80;

        // State
        this.lines = [];
        this.title = 'CaladOS';
        this.status = 'ONLINE';

        // Command input state
        this.inputBuffer = '';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.showCursor = true;
        this.cursorBlinkTime = 0;

        // Sword SVG for header
        this.swordSVG = `
            <svg width="400" height="40" viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg">
                <!-- Main blade (sleek tapered design) -->
                <path d="M 70 20 L 365 20" stroke="#00ffff" stroke-width="2.5" opacity="0.9" stroke-linecap="round"/>

                <!-- Blade highlights (top edge) -->
                <path d="M 70 19 L 360 19" stroke="#aaffff" stroke-width="0.8" opacity="0.7" stroke-linecap="round"/>

                <!-- Blade shadow (bottom edge) -->
                <path d="M 70 21 L 360 21" stroke="#006666" stroke-width="0.8" opacity="0.5" stroke-linecap="round"/>

                <!-- Point glow -->
                <circle cx="365" cy="20" r="3" fill="#00ffff" opacity="0.6"/>
                <circle cx="365" cy="20" r="1.5" fill="#ffffff" opacity="0.8"/>

                <!-- Crossguard (elegant swept design) -->
                <path d="M 70 20 Q 65 12 60 10" stroke="#00ffff" stroke-width="3" opacity="0.85" stroke-linecap="round"/>
                <path d="M 70 20 Q 65 28 60 30" stroke="#00ffff" stroke-width="3" opacity="0.85" stroke-linecap="round"/>

                <!-- Guard center piece -->
                <circle cx="70" cy="20" r="4" fill="#00ffff" opacity="0.7"/>
                <circle cx="70" cy="20" r="2" fill="#aaffff" opacity="0.9"/>

                <!-- Grip -->
                <rect x="45" y="18" width="20" height="4" fill="#00aaaa" opacity="0.75" rx="2"/>
                <line x1="50" y1="18" x2="50" y2="22" stroke="#006666" stroke-width="0.5" opacity="0.6"/>
                <line x1="55" y1="18" x2="55" y2="22" stroke="#006666" stroke-width="0.5" opacity="0.6"/>
                <line x1="60" y1="18" x2="60" y2="22" stroke="#006666" stroke-width="0.5" opacity="0.6"/>

                <!-- Pommel (gem-like) -->
                <circle cx="45" cy="20" r="5" fill="#00ffff" opacity="0.6"/>
                <circle cx="45" cy="20" r="3" fill="#00ffff" opacity="0.85"/>
                <circle cx="45" cy="20" r="1.5" fill="#aaffff" opacity="0.95"/>
                <path d="M 42 20 L 45 17 L 48 20 L 45 23 Z" fill="#ffffff" opacity="0.3"/>
            </svg>
        `;

        // Cache for sword image
        this.swordImage = null;
        this.swordImageLoaded = false;

        // Preload sword SVG
        this.preloadSword();

        // Initial render
        this.renderTerminal();
    }

    /**
     * Preload sword SVG image
     */
    async preloadSword() {
        const svgBlob = new Blob([this.swordSVG], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        this.swordImage = new Image();

        return new Promise((resolve) => {
            this.swordImage.onload = () => {
                this.swordImageLoaded = true;
                URL.revokeObjectURL(url);
                resolve();
            };
            this.swordImage.onerror = () => {
                console.warn('Sword SVG failed to load');
                URL.revokeObjectURL(url);
                resolve();
            };
            this.swordImage.src = url;
        });
    }

    /**
     * Clear and render the full terminal interface
     */
    renderTerminal() {
        const ctx = this.renderer.ctx;

        // Clear background
        this.renderer.clear(this.bgColor);

        // Draw CRT scanline effect
        this.drawScanlines();

        // Draw header section
        this.drawHeader();

        // Draw content area border
        this.drawBorder();

        // Draw content lines
        this.drawContent();

        // Draw input line
        this.drawInputLine();

        // Draw corner accents
        // this.drawCornerAccents();

        // Add screen flicker/glow effect
        this.drawScreenGlow();

        this.renderer.update();
    }

    /**
     * Draw CRT scanline effect
     */
    drawScanlines() {
        const ctx = this.renderer.ctx;
        ctx.globalAlpha = 0.15;

        for (let y = 0; y < this.height; y += 4) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, y, this.width, 2);
        }

        ctx.globalAlpha = 1.0;
    }

    /**
     * Draw terminal header
     */
    drawHeader() {
        const ctx = this.renderer.ctx;

        // Position elements higher in the header (near the top)
        const headerY = this.padding + 5;

        // Title font setup
        const titleFont = `bold ${this.fontSize + 4}px "Courier New", monospace`;
        ctx.font = titleFont;
        const titleWidth = ctx.measureText(this.title).width;

        // Title
        this.renderer.drawText(this.title, this.padding, headerY, {
            font: titleFont,
            color: this.primaryColor,
            glow: true,
            glowColor: this.primaryColor,
            glowBlur: 15
        });

        // Sword dimensions (much bigger!)
        const swordHeight = 50;
        const swordX = this.padding + titleWidth + 30;
        const swordWidth = this.width - swordX - this.padding - 120;
        const swordY = headerY - 15;  // Position sword to align with text

        // Draw cached sword image between title and status
        if (this.swordImageLoaded && this.swordImage) {
            // Apply glow effect
            ctx.shadowColor = this.primaryColor;
            ctx.shadowBlur = 10;

            ctx.drawImage(this.swordImage, swordX, swordY, swordWidth, swordHeight);

            // Reset shadow
            ctx.shadowBlur = 0;
        }

        // Status indicator
        const statusX = this.width - this.padding - 100;
        const statusFont = `${this.fontSize}px "Courier New", monospace`;

        this.renderer.drawText(this.status, statusX, headerY, {
            font: statusFont,
            color: this.secondaryColor,
            glow: true,
            glowColor: this.secondaryColor,
            glowBlur: 10
        });

        // Header divider line
        this.renderer.drawLine(
            this.padding,
            this.headerHeight - 10,
            this.width - this.padding,
            this.headerHeight - 10,
            {
                color: this.primaryColor,
                lineWidth: 2,
                glow: true,
                glowColor: this.primaryColor,
                glowBlur: 8
            }
        );
    }

    /**
     * Draw content area border
     */
    drawBorder() {
        this.renderer.drawRect(
            this.padding - 10,
            this.headerHeight,
            this.width - (this.padding * 2) + 20,
            this.height - this.headerHeight - this.padding + 10,
            {
                fillColor: null,
                strokeColor: this.primaryColor,
                lineWidth: 1,
                glow: true,
                glowColor: this.primaryColor,
                glowBlur: 5
            }
        );
    }

    /**
     * Draw content lines
     */
    drawContent() {
        // Calculate max viewable area (leave room for input line)
        const contentHeight = this.height - this.headerHeight - this.padding - 60;
        const maxVisibleLines = Math.floor(contentHeight / this.lineHeight);

        if (this.lines.length === 0) {
            // Default content
            this.renderer.drawText('Type "help" for available commands',
                this.padding + 10,
                this.headerHeight + 20,
                {
                    font: `${this.fontSize}px "Courier New", monospace`,
                    color: this.secondaryColor,
                    glow: false
                }
            );
        } else {
            // Only show the most recent lines that fit on screen
            const startIndex = Math.max(0, this.lines.length - maxVisibleLines);
            const visibleLines = this.lines.slice(startIndex);

            // Draw visible lines
            visibleLines.forEach((line, index) => {
                const y = this.headerHeight + 20 + (index * this.lineHeight);
                const color = line.color || this.textColor;

                this.renderer.drawText(line.text,
                    this.padding + 10,
                    y,
                    {
                        font: `${this.fontSize}px "Courier New", monospace`,
                        color: color,
                        glow: false
                    }
                );
            });
        }
    }

    /**
     * Draw input line at bottom of terminal
     */
    drawInputLine() {
        const inputY = this.height - this.padding - 30;

        // Draw prompt
        const promptText = '> ';
        this.renderer.drawText(promptText,
            this.padding + 10,
            inputY,
            {
                font: `${this.fontSize}px "Courier New", monospace`,
                color: this.secondaryColor,
                glow: true,
                glowColor: this.secondaryColor,
                glowBlur: 8
            }
        );

        // Draw input buffer
        const ctx = this.renderer.ctx;
        ctx.font = `${this.fontSize}px "Courier New", monospace`;
        const promptWidth = ctx.measureText(promptText).width;

        this.renderer.drawText(this.inputBuffer,
            this.padding + 10 + promptWidth,
            inputY,
            {
                font: `${this.fontSize}px "Courier New", monospace`,
                color: this.textColor,
                glow: false
            }
        );

        // Draw cursor (blinking)
        if (this.showCursor) {
            const inputWidth = ctx.measureText(this.inputBuffer).width;
            const cursorX = this.padding + 10 + promptWidth + inputWidth + 2;

            this.renderer.drawText('_',
                cursorX,
                inputY,
                {
                    font: `${this.fontSize}px "Courier New", monospace`,
                    color: this.textColor,
                    glow: false
                }
            );
        }
    }

    /**
     * Set terminal content (array of text lines)
     */
    setContent(lines) {
        if (typeof lines === 'string') {
            // If string provided, split into lines
            this.lines = lines.split('\n').map(text => ({ text, color: this.textColor }));
        } else if (Array.isArray(lines)) {
            // If array, use as-is (can include color per line)
            this.lines = lines;
        }

        this.renderTerminal();
    }

    /**
     * Add a single line to terminal
     */
    addLine(text, color = null) {
        this.lines.push({ text, color: color || this.textColor });

        // Limit lines to fit on screen (roughly)
        const maxLines = Math.floor((this.height - this.headerHeight - this.padding) / this.lineHeight);
        if (this.lines.length > maxLines) {
            this.lines.shift(); // Remove oldest line
        }

        this.renderTerminal();
    }

    /**
     * Clear all content lines
     */
    clearContent() {
        this.lines = [];
        this.renderTerminal();
    }

    /**
     * Display default system status
     */
    showSystemStatus() {
        this.setContent([
            { text: 'SYSTEM:     CaladOS v1.0', color: this.textColor },
            { text: 'STATUS:     READY', color: this.secondaryColor },
            { text: 'AMI CONNECTIONS: 0 ACTIVE', color: this.textColor },
            { text: '─────────────────────────────', color: this.primaryColor },
            { text: '> Awaiting input...', color: this.secondaryColor }
        ]);
    }

    /**
     * Get the THREE.js texture
     */
    getTexture() {
        return this.renderer.getTexture();
    }

    /**
     * Update texture (if manual updates needed)
     */
    update() {
        this.renderer.update();
    }

    /**
     * Handle character input
     */
    addChar(char) {
        this.inputBuffer += char;
        this.renderTerminal();
    }

    /**
     * Handle backspace
     */
    backspace() {
        if (this.inputBuffer.length > 0) {
            this.inputBuffer = this.inputBuffer.slice(0, -1);
            this.renderTerminal();
        }
    }

    /**
     * Get current input and clear buffer
     */
    getInput() {
        const input = this.inputBuffer;
        this.inputBuffer = '';
        if (input.trim()) {
            this.commandHistory.push(input);
        }
        this.historyIndex = -1;
        this.renderTerminal();
        return input;
    }

    /**
     * Navigate command history (up arrow)
     */
    historyUp() {
        if (this.commandHistory.length === 0) return;

        if (this.historyIndex === -1) {
            this.historyIndex = this.commandHistory.length - 1;
        } else if (this.historyIndex > 0) {
            this.historyIndex--;
        }

        this.inputBuffer = this.commandHistory[this.historyIndex];
        this.renderTerminal();
    }

    /**
     * Navigate command history (down arrow)
     */
    historyDown() {
        if (this.historyIndex === -1) return;

        if (this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.inputBuffer = this.commandHistory[this.historyIndex];
        } else {
            this.historyIndex = -1;
            this.inputBuffer = '';
        }

        this.renderTerminal();
    }

    /**
     * Update cursor blink animation
     */
    updateCursor(deltaTime) {
        this.cursorBlinkTime += deltaTime;
        if (this.cursorBlinkTime > 0.5) {
            this.showCursor = !this.showCursor;
            this.cursorBlinkTime = 0;
            this.renderTerminal();
        }
    }
    /**
     * Draw subtle screen glow effect (vignette)
     */
    drawScreenGlow() {
        const ctx = this.renderer.ctx;

        // Radial gradient for edge glow
        const gradient = ctx.createRadialGradient(
            this.width / 2, this.height / 2, this.height * 0.3,
            this.width / 2, this.height / 2, this.height * 0.8
        );

        gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0.05)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);
    }
}
