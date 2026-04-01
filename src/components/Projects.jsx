import useScrollAnimation from '../hooks/useScrollAnimation';
import { useState } from 'react';
import AsciiModel from './AsciiModel';
import { myProjects, ui } from '../data/portfolioData';
import { useT, useLang } from '../contexts/LanguageContext';
import './Projects.css';

const ProjectCard = ({ project, t, lang }) => {
    const [isHovered, setIsHovered] = useState(false);
    const langColors = {
        'Jupyter Notebook': '#DA5B0B',
        Python: '#3572A5',
        Java: '#b07219',
        JavaScript: '#f1e05a',
        'C#': '#178600',
        ShaderLab: '#222c37',
        HTML: '#e34c26',
    };

    return (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projects__card scroll-hidden" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="projects__card-img-container" style={{ width: '100%', height: '280px', backgroundColor: project.ascii ? 'transparent' : (project.imageBg || '#2a2a35'), display: 'flex' }}>
                {project.ascii ? (
                    <AsciiModel type={project.ascii} isCardHovered={isHovered} />
                ) : Array.isArray(project.image) ? (
                    project.image.map((img, i) => (
                        <img key={i} src={img} alt={`${project.title} ${i}`} style={{ width: `${100 / project.image.length}%`, height: '100%', objectFit: project.imageFit || 'cover', objectPosition: project.imagePosition || 'center' }} />
                    ))
                ) : (
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: project.imageFit || 'cover', objectPosition: project.imagePosition || 'center' }} />
                )}
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>


                <h3 className="projects__card-title">{project.title.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                <p className="projects__card-desc" style={{ flex: 1 }}>
                    {project.description[lang] || project.description.en || t(ui.projects.noDesc)}
                </p>

                <div className="projects__card-footer">
                    {project.language && (
                        <span className="projects__card-lang">
                            <span className="projects__lang-dot" style={{ background: langColors[project.language] || '#888' }} />
                            {project.language}
                        </span>
                    )}
                </div>
                {project.topics && project.topics.length > 0 && (
                    <div className="projects__card-topics" style={{ marginTop: '1rem' }}>
                        {project.topics.slice(0, 4).map((topic) => (
                            <span key={topic} className="projects__topic">{topic}</span>
                        ))}
                    </div>
                )}
            </div>
        </a>
    );
};

export default function Projects() {
    const sectionRef = useScrollAnimation();
    const t = useT();
    const { lang } = useLang();

    return (
        <section id="projects" className="projects" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title scroll-hidden">
                    {t(ui.projects.title)}
                </h2>
                <p className="section-subtitle scroll-hidden">
                    {t(ui.projects.subtitle)}
                </p>

                <div className="projects__grid stagger-children">
                    {myProjects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} t={t} lang={lang} />
                    ))}
                </div>
            </div>
        </section>
    );
}
