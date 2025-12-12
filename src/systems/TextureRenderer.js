import * as THREE from 'three';

/**
 * Canvas Texture Renderer
 * Utility for rendering text, SVG, and graphics onto 3D surface textures
 */

export class TextureRenderer {
    constructor(width = 512, height = 512) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.texture = new THREE.CanvasTexture(this.canvas);
        this.texture.needsUpdate = true;
    }

    /**
     * Clear the canvas with background color
     */
    clear(color = 'rgba(0, 0, 0, 0)') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw text on canvas
     */
    drawText(text, x, y, options = {}) {
        const {
            font = '16px Courier New',
            color = '#00ffff',
            align = 'left',
            baseline = 'top',
            glow = true,
            glowColor = '#00ffff',
            glowBlur = 10
        } = options;

        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;

        if (glow) {
            this.ctx.shadowColor = glowColor;
            this.ctx.shadowBlur = glowBlur;
        }

        this.ctx.fillText(text, x, y);

        if (glow) {
            this.ctx.shadowBlur = 0;
        }

        this.texture.needsUpdate = true;
    }

    /**
     * Draw multiple lines of text
     */
    drawTextLines(lines, startX, startY, lineHeight, options = {}) {
        lines.forEach((line, index) => {
            this.drawText(line, startX, startY + (index * lineHeight), options);
        });
    }

    /**
     * Draw SVG onto canvas
     */
    async drawSVG(svgString, x, y, width, height, options = {}) {
        const {
            glow = true,
            glowColor = '#00ffff',
            glowBlur = 20
        } = options;

        return new Promise((resolve, reject) => {
            // Create a data URL from SVG string
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
                if (glow) {
                    this.ctx.shadowColor = glowColor;
                    this.ctx.shadowBlur = glowBlur;
                }

                this.ctx.drawImage(img, x, y, width, height);

                if (glow) {
                    this.ctx.shadowBlur = 0;
                }

                URL.revokeObjectURL(url);
                this.texture.needsUpdate = true;
                resolve();
            };
            img.onerror = (err) => {
                URL.revokeObjectURL(url);
                reject(err);
            };
            img.src = url;
        });
    }

    /**
     * Draw a rectangle
     */
    drawRect(x, y, width, height, options = {}) {
        const {
            fillColor = null,
            strokeColor = '#00ffff',
            lineWidth = 2,
            glow = true,
            glowColor = '#00ffff',
            glowBlur = 5
        } = options;

        if (glow && strokeColor) {
            this.ctx.shadowColor = glowColor;
            this.ctx.shadowBlur = glowBlur;
        }

        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fillRect(x, y, width, height);
        }

        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeRect(x, y, width, height);
        }

        if (glow) {
            this.ctx.shadowBlur = 0;
        }

        this.texture.needsUpdate = true;
    }

    /**
     * Draw a line
     */
    drawLine(x1, y1, x2, y2, options = {}) {
        const {
            color = '#00ffff',
            lineWidth = 2,
            glow = true,
            glowColor = '#00ffff',
            glowBlur = 5
        } = options;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;

        if (glow) {
            this.ctx.shadowColor = glowColor;
            this.ctx.shadowBlur = glowBlur;
        }

        this.ctx.stroke();

        if (glow) {
            this.ctx.shadowBlur = 0;
        }

        this.texture.needsUpdate = true;
    }

    /**
     * Draw corner fold effect (for paper artifact)
     */
    drawCornerFold(width, height, foldSize = 40) {
        const x = width - foldSize;
        const y = 0;

        // Draw fold triangle
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.lineTo(width, foldSize);
        this.ctx.closePath();

        // Darker fill for fold
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fill();

        // Fold edge line
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, foldSize);
        this.ctx.stroke();

        this.texture.needsUpdate = true;
    }

    /**
     * Get the THREE.js texture
     */
    getTexture() {
        return this.texture;
    }

    /**
     * Update texture (call after making changes)
     */
    update() {
        this.texture.needsUpdate = true;
    }

    /**
     * Resize canvas
     */
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.texture.needsUpdate = true;
    }
}

/**
 * SVG Icon Library for File Types
 */
export const SVGIcons = {
    dat: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Circuit board pattern -->
            <circle cx="100" cy="100" r="8" fill="#00ff00" opacity="0.8"/>
            <circle cx="60" cy="60" r="6" fill="#00ff00" opacity="0.8"/>
            <circle cx="140" cy="60" r="6" fill="#00ff00" opacity="0.8"/>
            <circle cx="60" cy="140" r="6" fill="#00ff00" opacity="0.8"/>
            <circle cx="140" cy="140" r="6" fill="#00ff00" opacity="0.8"/>

            <line x1="60" y1="60" x2="100" y2="100" stroke="#00ff00" stroke-width="3" opacity="0.6"/>
            <line x1="140" y1="60" x2="100" y2="100" stroke="#00ff00" stroke-width="3" opacity="0.6"/>
            <line x1="60" y1="140" x2="100" y2="100" stroke="#00ff00" stroke-width="3" opacity="0.6"/>
            <line x1="140" y1="140" x2="100" y2="100" stroke="#00ff00" stroke-width="3" opacity="0.6"/>

            <rect x="40" y="40" width="120" height="120" fill="none" stroke="#00ff00" stroke-width="2" opacity="0.4"/>
        </svg>
    `,

    log: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Waveform pattern -->
            <path d="M 30 100 L 50 80 L 70 120 L 90 60 L 110 140 L 130 80 L 150 100 L 170 90"
                  fill="none" stroke="#00ffff" stroke-width="4" opacity="0.8"/>
            <path d="M 30 110 L 50 95 L 70 130 L 90 75 L 110 150 L 130 95 L 150 110 L 170 100"
                  fill="none" stroke="#00ffff" stroke-width="2" opacity="0.4"/>

            <line x1="30" y1="100" x2="30" y2="160" stroke="#00ffff" stroke-width="2" opacity="0.3"/>
            <line x1="170" y1="90" x2="170" y2="160" stroke="#00ffff" stroke-width="2" opacity="0.3"/>
            <line x1="30" y1="160" x2="170" y2="160" stroke="#00ffff" stroke-width="2" opacity="0.3"/>
        </svg>
    `,

    exe: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Triangle in circle -->
            <circle cx="100" cy="100" r="70" fill="none" stroke="#ff00ff" stroke-width="4" opacity="0.8"/>
            <polygon points="100,50 140,130 60,130"
                     fill="none" stroke="#ff00ff" stroke-width="4" opacity="0.8"/>
            <circle cx="100" cy="100" r="10" fill="#ff00ff" opacity="0.6"/>
        </svg>
    `,

    key: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Key symbol -->
            <circle cx="140" cy="100" r="35" fill="none" stroke="#ffaa00" stroke-width="4" opacity="0.8"/>
            <circle cx="140" cy="100" r="20" fill="none" stroke="#ffaa00" stroke-width="3" opacity="0.8"/>
            <line x1="105" y1="100" x2="50" y2="100" stroke="#ffaa00" stroke-width="8" opacity="0.8"/>
            <line x1="70" y1="100" x2="70" y2="85" stroke="#ffaa00" stroke-width="6" opacity="0.8"/>
            <line x1="85" y1="100" x2="85" y2="85" stroke="#ffaa00" stroke-width="6" opacity="0.8"/>
        </svg>
    `,

    txt: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Document lines -->
            <rect x="60" y="40" width="80" height="120" fill="none" stroke="#00ff00" stroke-width="3" opacity="0.6"/>
            <line x1="70" y1="60" x2="130" y2="60" stroke="#00ff00" stroke-width="2" opacity="0.8"/>
            <line x1="70" y1="80" x2="130" y2="80" stroke="#00ff00" stroke-width="2" opacity="0.8"/>
            <line x1="70" y1="100" x2="130" y2="100" stroke="#00ff00" stroke-width="2" opacity="0.8"/>
            <line x1="70" y1="120" x2="110" y2="120" stroke="#00ff00" stroke-width="2" opacity="0.8"/>
            <line x1="70" y1="140" x2="120" y2="140" stroke="#00ff00" stroke-width="2" opacity="0.8"/>
        </svg>
    `
};

/**
 * File Type Color Scheme
 */
export const FileColors = {
    dat: { edge: 0x00ff00, glow: '#00ff00', name: 'DATA' },      // Green
    log: { edge: 0x00ffff, glow: '#00ffff', name: 'LOG' },       // Cyan
    exe: { edge: 0xff00ff, glow: '#ff00ff', name: 'EXECUTABLE' },// Magenta
    key: { edge: 0xffaa00, glow: '#ffaa00', name: 'KEY' },       // Gold
    txt: { edge: 0x00ff00, glow: '#00ff00', name: 'TEXT' }       // Green
};
