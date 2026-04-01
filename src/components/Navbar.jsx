import { useState, useEffect } from 'react';
import { ui } from '../data/portfolioData';
import { useLang, useT } from '../contexts/LanguageContext';
import './Navbar.css';

export default function Navbar() {
    const { lang, toggle } = useLang();
    const t = useT();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: t(ui.nav.home), href: '#hero' },
        { label: t(ui.nav.about), href: '#about' },
        { label: t(ui.nav.experience), href: '#experience' },
        { label: t(ui.nav.projects), href: '#projects' },
        { label: t(ui.nav.skills), href: '#skills' },
        { label: t(ui.nav.contact), href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <a href="#hero" className="navbar__logo"><span className="navbar__logo-bracket">&lt;</span>TD<span className="navbar__logo-bracket">/&gt;</span></a>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="navbar__link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="navbar__actions">
                    <button className="navbar__lang-toggle" onClick={toggle} aria-label="Toggle language">
                        <span className={`navbar__lang-option ${lang === 'tr' ? 'navbar__lang-option--active' : ''}`}>TR</span>
                        <span className="navbar__lang-separator">/</span>
                        <span className={`navbar__lang-option ${lang === 'en' ? 'navbar__lang-option--active' : ''}`}>EN</span>
                    </button>

                    <button
                        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
