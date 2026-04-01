import { useEffect, useRef, useState } from 'react';

const asciiChars = '.:-=+*#%@';

function rotX(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function rotY(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
}

export default function AsciiModel({ type, isCardHovered }) {
    const canvasRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let angleY = 0;
        let angleX = 0.2;
        let time = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let spherePoints = [];
        const step = 0.08;

        const addBox = (w, h, d, ox = 0, oy = 0, oz = 0) => {
            for (let x = -w / 2; x <= w / 2; x += step) {
                for (let y = -h / 2; y <= h / 2; y += step) {
                    spherePoints.push({ x: x + ox, y: y + oy, z: d / 2 + oz }, { x: x + ox, y: y + oy, z: -d / 2 + oz });
                }
                for (let z = -d / 2; z <= d / 2; z += step) {
                    spherePoints.push({ x: x + ox, y: h / 2 + oy, z: z + oz }, { x: x + ox, y: -h / 2 + oy, z: z + oz });
                }
            }
            for (let y = -h / 2; y <= h / 2; y += step) {
                for (let z = -d / 2; z <= d / 2; z += step) {
                    spherePoints.push({ x: w / 2 + ox, y: y + oy, z: z + oz }, { x: -w / 2 + ox, y: y + oy, z: z + oz });
                }
            }
        };

        if (type === 'shield') {
            for (let y = -0.6; y <= 0.7; y += step) {
                const wMax = 0.55;
                let w = 0;

                if (y < -0.4) {
                    // Top rounded corners
                    const ny = (y - (-0.4)) / 0.2;
                    if (ny >= -1) w = wMax * Math.sqrt(1 - ny * ny);
                } else if (y <= 0.1) {
                    // Straight middle section
                    w = wMax;
                } else {
                    // Pointy bottom!
                    const ny = (y - 0.1) / 0.6;
                    if (ny <= 1) w = wMax * (1 - Math.pow(ny, 1.2)); // 1.2 gives a nice swooping curve to a sharp point
                }

                if (w > 0) {
                    for (let x = -w; x <= w; x += step) {

                        // Convex rounded 3D front surface
                        const xNorm = x / w;
                        const zFront = 0.25 * Math.sqrt(1 - xNorm * xNorm);

                        spherePoints.push({ x, y, z: zFront });
                        spherePoints.push({ x, y, z: zFront - 0.15 });
                    }
                }
            }
        } else if (type === 'medical') {
            addBox(0.8, 0.25, 0.25);
            addBox(0.25, 0.8, 0.25);
        }

        // Background stars
        const bgStars = [];
        for (let i = 0; i < 60; i++) {
            bgStars.push({
                x: Math.random(), y: Math.random(),
                size: Math.random() * 1.4 + 0.3,
                alpha: Math.random() * 0.4 + 0.08,
                speed: Math.random() * 0.015 + 0.005,
                offset: Math.random() * Math.PI * 2,
            });
        }

        let currentHover = false;
        const setHover = (val) => { currentHover = val; };

        canvas.addEventListener('mouseenter', () => setHover(true));
        canvas.addEventListener('mouseleave', () => setHover(false));

        function animate() {
            const w = canvas.width, h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            time++;

            // Draw Background stars
            bgStars.forEach((s) => {
                const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed + s.offset);
                ctx.beginPath();
                ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 240, ${s.alpha * twinkle})`;
                ctx.fill();
            });

            // If the card is hovered OR the canvas itself is hovered, spin fast!
            if (currentHover || isCardHovered) {
                angleY += 0.025;
            } else {
                angleY += 0.003;
            }

            const cx = w / 2;
            const cy = h / 2;
            const scale = Math.min(w, h) * 0.45;

            ctx.font = '14px Consolas, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const rotated = spherePoints.map((p) => rotX(rotY(p, angleY), angleX));
            rotated.sort((a, b) => a.z - b.z);

            rotated.forEach((p) => {
                const sx = cx + p.x * scale;
                const sy = cy + p.y * scale;
                const depth = (p.z + 1) / 2;
                let charIndex = Math.floor(depth * asciiChars.length);
                if (charIndex < 0) charIndex = 0;
                if (charIndex >= asciiChars.length) charIndex = asciiChars.length - 1;

                const char = asciiChars[charIndex];
                const alpha = 0.2 + depth * 0.8;

                const r = Math.floor(90 + depth * 36);
                const g = Math.floor(170 + depth * 30);
                const b = Math.floor(195 + depth * 32);

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fillText(char, sx, sy);
            });

            animationId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, [type, isCardHovered]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
    );
}
