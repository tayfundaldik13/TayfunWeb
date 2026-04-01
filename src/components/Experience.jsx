import useScrollAnimation from '../hooks/useScrollAnimation';
import { experiences, ui } from '../data/portfolioData';
import { useT } from '../contexts/LanguageContext';
import './Experience.css';

export default function Experience() {
    const sectionRef = useScrollAnimation();
    const t = useT();

    return (
        <section id="experience" className="experience" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title scroll-hidden">
                    {t(ui.experience.title)}
                </h2>
                <p className="section-subtitle scroll-hidden">
                    {t(ui.experience.subtitle)}
                </p>
                <div className="experience__timeline stagger-children">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience__item scroll-hidden">
                            <div className="experience__dot" />
                            <div className="experience__card">
                                <span className="experience__period">{t(exp.period)}</span>
                                <h3 className="experience__title">{t(exp.title)}</h3>
                                <h4 className="experience__company">{exp.company}</h4>
                                <p className="experience__location">{exp.location}</p>
                                <p className="experience__description">{t(exp.description)}</p>
                                <div className="experience__tags">
                                    {exp.tags.map((tag) => (
                                        <span key={tag} className="experience__tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
