import { useState, useEffect, useRef } from 'react';
import { personalInfo, ui } from '../data/portfolioData';
import { useLang, useT } from '../contexts/LanguageContext';
import './Hero.css';

export default function Hero() {
    const { lang } = useLang();
    const t = useT();
    const titles = personalInfo.titles[lang] || personalInfo.titles.en;
    const [currentTitle, setCurrentTitle] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const canvasRef = useRef(null);

    // Reset typing on language change
    useEffect(() => {
        setCurrentTitle('');
        setCharIndex(0);
        setTitleIndex(0);
        setIsDeleting(false);
    }, [lang]);

    // Typing effect
    useEffect(() => {
        const currentFullTitle = titles[titleIndex];
        const speed = isDeleting ? 40 : 80;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentTitle(currentFullTitle.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
                if (charIndex + 1 === currentFullTitle.length) {
                    setTimeout(() => setIsDeleting(true), 1800);
                }
            } else {
                setCurrentTitle(currentFullTitle.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
                if (charIndex - 1 === 0) {
                    setIsDeleting(false);
                    setTitleIndex((prev) => (prev + 1) % titles.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex, titles]);

    // ASCII Globe Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let angleY = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Generate sphere points
        const spherePoints = [];
        const R = 1;

        // Latitude lines
        for (let lat = -80; lat <= 80; lat += 20) {
            const radLat = (lat * Math.PI) / 180;
            const r = R * Math.cos(radLat);
            const y = R * Math.sin(radLat);
            for (let lon = 0; lon < 360; lon += 6) {
                const radLon = (lon * Math.PI) / 180;
                spherePoints.push({ x: r * Math.cos(radLon), y, z: r * Math.sin(radLon) });
            }
        }

        // Longitude lines
        for (let lon = 0; lon < 360; lon += 30) {
            const radLon = (lon * Math.PI) / 180;
            for (let lat = -90; lat <= 90; lat += 5) {
                const radLat = (lat * Math.PI) / 180;
                const r = R * Math.cos(radLat);
                const y = R * Math.sin(radLat);
                spherePoints.push({ x: r * Math.cos(radLon), y, z: r * Math.sin(radLon) });
            }
        }

        // Background stars
        const bgStars = [];
        for (let i = 0; i < 100; i++) {
            bgStars.push({
                x: Math.random(), y: Math.random(),
                size: Math.random() * 1.4 + 0.3,
                alpha: Math.random() * 0.4 + 0.08,
                speed: Math.random() * 0.015 + 0.005,
                offset: Math.random() * Math.PI * 2,
            });
        }

        function rotY(p, a) {
            const c = Math.cos(a), s = Math.sin(a);
            return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
        }
        function rotX(p, a) {
            const c = Math.cos(a), s = Math.sin(a);
            return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
        }

        const asciiChars = '.:-=+*#%@';
        let time = 0;

        function animate() {
            const w = canvas.width, h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            time++;

            // Background stars
            bgStars.forEach((s) => {
                const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed + s.offset);
                ctx.beginPath();
                ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 240, ${s.alpha * twinkle})`;
                ctx.fill();
            });

            const cx = w * 0.72;
            const cy = h * 0.48;
            const scale = Math.min(w, h) * 0.28;
            angleY += 0.004;
            const angleX = 0.3;

            // Draw globe
            ctx.font = '14px Consolas, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const rotated = spherePoints.map((p) => rotX(rotY(p, angleY), angleX));
            rotated.sort((a, b) => a.z - b.z);

            rotated.forEach((p) => {
                const sx = cx + p.x * scale;
                const sy = cy - p.y * scale;
                const depth = (p.z + 1) / 2;
                const char = asciiChars[Math.floor(depth * (asciiChars.length - 1))];
                const alpha = 0.15 + depth * 0.75;
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
    }, []);

    return (
        <section id="hero" className="hero">
            <canvas ref={canvasRef} className="hero__canvas" />
            <div className="hero__content container">
                <p className="hero__greeting">
                    <span className="hero__greeting-wave"></span> {t(ui.hero.greeting)}
                </p>
                <h1 className="hero__name">{personalInfo.shortName}</h1>
                <div className="hero__title-wrapper">
                    <span className="hero__title-prefix">&gt; </span>
                    <span className="hero__title">{currentTitle}</span>
                    <span className="hero__cursor">|</span>
                </div>
                <p className="hero__description">
                    {t(personalInfo.bio)}
                </p>
                <div className="hero__cta">
                    <a href="#projects" className="hero__btn hero__btn--primary">
                        {t(ui.hero.viewProjects)}
                    </a>
                    <a href="#contact" className="hero__btn hero__btn--secondary">
                        {t(ui.hero.contactMe)}
                    </a>
                </div>

            </div>
        </section>
    );
}
