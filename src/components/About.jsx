import useScrollAnimation from '../hooks/useScrollAnimation';
import { personalInfo, ui } from '../data/portfolioData';
import { useT } from '../contexts/LanguageContext';
import './About.css';

export default function About() {
    const sectionRef = useScrollAnimation();
    const t = useT();

    return (
        <section id="about" className="about" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title scroll-hidden">
                    {t(ui.about.title)}
                </h2>
                <div className="about__grid">
                    <div className="about__photo-wrapper scroll-hidden">
                        <div className="about__photo-frame">
                            <img src="/profile.jpg" alt="Tayfun Daldık" className="about__photo" />
                        </div>
                    </div>
                    <div className="about__content">
                        <div className="about__text scroll-hidden">
                            <p>
                                <span dangerouslySetInnerHTML={{ __html: t(personalInfo.description) }} />
                                {' '}
                                <a href="https://youtu.be/ZjvW-_EiwPQ" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                    {t({ en: "Click to learn more", tr: "Daha fazla tanımak için tıklayın" })}
                                </a>
                            </p>
                            <p className="about__highlight" dangerouslySetInnerHTML={{ __html: t(ui.about.highlight) }} />
                        </div>
                        <div className="about__stats scroll-hidden">
                            <div className="about__stat">
                                <span className="about__stat-number">3</span>
                                <span className="about__stat-label">{t(ui.about.statProjects)}</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number">10+</span>
                                <span className="about__stat-label">{t(ui.about.statTech)}</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number">3</span>
                                <span className="about__stat-label">{t(ui.about.statCerts)}</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number">{t(ui.about.statDegreeLevel)}</span>
                                <span className="about__stat-label">{t(ui.about.statDegree)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
