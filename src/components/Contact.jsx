import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { personalInfo, ui } from '../data/portfolioData';
import { useT } from '../contexts/LanguageContext';
import './Contact.css';

export default function Contact() {
    const sectionRef = useScrollAnimation();
    const t = useT();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="contact" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title scroll-hidden">
                    {t(ui.contact.title)}
                </h2>
                <p className="section-subtitle scroll-hidden">
                    {t(ui.contact.subtitle)}
                </p>

                <div className="contact__grid">
                    <div className="contact__info scroll-hidden">
                        <div className="contact__info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="contact__info-icon bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                            <div>
                                <span className="contact__info-label">EMAIL</span>
                                <a href={`mailto:${personalInfo.email}`} className="contact__info-value">
                                    {personalInfo.email}
                                </a>
                            </div>
                        </div>
                        <div className="contact__info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="contact__info-icon bi bi-phone" viewBox="0 0 16 16">
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                            <div>
                                <span className="contact__info-label">{t({ en: "Phone", tr: "Telefon" })}</span>
                                <a href={`tel:${personalInfo.phone}`} className="contact__info-value">
                                    {personalInfo.phone}
                                </a>
                            </div>
                        </div>
                        <div className="contact__info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="contact__info-icon bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                            <div>
                                <span className="contact__info-label">{t({ en: "LOCATION", tr: "Konum" })}</span>
                                <span className="contact__info-value">{personalInfo.location}</span>
                            </div>
                        </div>

                        <div className="contact__socials">
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact__social-link">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-link">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <form className="contact__form scroll-hidden" onSubmit={handleSubmit}>
                        <div className="contact__form-group">
                            <label htmlFor="contact-name">{t(ui.contact.name)}</label>
                            <input
                                id="contact-name"
                                type="text"
                                placeholder={t(ui.contact.namePh)}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="contact__form-group">
                            <label htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                placeholder={t(ui.contact.emailPh)}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="contact__form-group">
                            <label htmlFor="contact-message">{t(ui.contact.message)}</label>
                            <textarea
                                id="contact-message"
                                placeholder={t(ui.contact.messagePh)}
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="contact__submit" disabled={submitted}>
                            {submitted ? t(ui.contact.sent) : t(ui.contact.send)}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
