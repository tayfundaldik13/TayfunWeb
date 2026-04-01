import useScrollAnimation from '../hooks/useScrollAnimation';
import { skillCategories, ui } from '../data/portfolioData';
import { useT } from '../contexts/LanguageContext';
import './Skills.css';

const CodeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
    </svg>
);

const AiAtomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
        <ellipse cx="32" cy="32" rx="28" ry="11" />
        <ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(120 32 32)" />
        <circle cx="32" cy="21" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="22.5" cy="48" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="51" cy="38" r="2.5" fill="currentColor" stroke="none" />
        <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif" fill="currentColor" stroke="none">AI</text>
    </svg>
);

const ChartLineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="20" x2="21" y2="20" />
        <line x1="3" y1="20" x2="3" y2="4" />
        <polyline points="6 17 10 11 14 14 20 6" fill="none" />
        <circle cx="6" cy="17" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="10" cy="11" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
);

const GearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
    </svg>
);

const WrenchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1 3.11v7.78c0 .61.492 1.11 1.1 1.11h11.8c.608 0 1.1-.5 1.1-1.11V3.11C15 2.5 14.508 2 13.9 2H2.1C1.492 2 1 2.5 1 3.11zM2.1 3h11.8a.11.11 0 0 1 .1.11v7.78a.11.11 0 0 1-.1.11H2.1a.11.11 0 0 1-.1-.11V3.11A.11.11 0 0 1 2.1 3z" />
        <path d="M11.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
        <path d="M3.5 13h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1z" />
    </svg>
);

function renderIcon(icon) {
    if (icon === 'code-slash') return <CodeSlashIcon />;
    if (icon === 'ai-atom') return <AiAtomIcon />;
    if (icon === 'chart-line') return <ChartLineIcon />;
    if (icon === 'gear') return <GearIcon />;
    if (icon === 'wrench') return <WrenchIcon />;
    return icon;
}

export default function Skills() {
    const sectionRef = useScrollAnimation();
    const t = useT();

    return (
        <section id="skills" className="skills" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title scroll-hidden">
                    {t(ui.skills.title)}
                </h2>
                <p className="section-subtitle scroll-hidden">
                    {t(ui.skills.subtitle)}
                </p>
                <div className="skills__grid stagger-children">
                    {skillCategories.map((cat, index) => (
                        <div key={index} className="skills__category scroll-hidden">
                            <div className="skills__category-header">
                                <span className="skills__category-icon">{renderIcon(cat.icon)}</span>
                                <h3 className="skills__category-title">{t(cat.title)}</h3>
                            </div>
                            <div className="skills__pills">
                                {cat.skills.map((skill) => (
                                    <span key={skill} className="skills__pill">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
