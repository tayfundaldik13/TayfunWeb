import useScrollAnimation from '../hooks/useScrollAnimation';
import { education, certificates, ui } from '../data/portfolioData';
import { useT } from '../contexts/LanguageContext';
import './Education.css';

const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rocket-takeoff" viewBox="0 0 16 16">
        <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532" />
        <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z" />
        <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z" />
    </svg>
);

const JoystickIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-joystick" viewBox="0 0 16 16">
        <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2" />
        <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23" />
    </svg>
);

const BracesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-braces" viewBox="0 0 16 16">
        <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6" />
    </svg>
);

function renderCertIcon(iconName) {
    if (iconName === 'rocket') return <RocketIcon />;
    if (iconName === 'joystick') return <JoystickIcon />;
    if (iconName === 'braces') return <BracesIcon />;
    return iconName;
}

export default function Education() {
    const sectionRef = useScrollAnimation();
    const t = useT();

    return (
        <section id="education" className="education" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title scroll-hidden">
                    {t(ui.education.title)}
                </h2>

                <div className="education__grid">
                    <div className="education__degrees">
                        {education.map((edu, index) => (
                            <div key={index} className="education__card scroll-hidden">
                                <span className="education__icon">{edu.icon}</span>
                                <div>
                                    <h3 className="education__degree">{t(edu.degree)}</h3>
                                    <p className="education__school">{edu.school}</p>
                                    <span className="education__period">{t(edu.period)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="education__certificates">
                        <h3 className="education__cert-title scroll-hidden">{t(ui.education.certTitle)}</h3>
                        <div className="education__cert-list stagger-children">
                            {certificates.map((cert, index) => {
                                const content = (
                                    <>
                                        {cert.icon && <span className="education__cert-icon">{renderCertIcon(cert.icon)}</span>}
                                        <span className="education__cert-name">{cert.name}</span>
                                    </>
                                );

                                if (cert.link) {
                                    return (
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" key={index} className="education__cert scroll-hidden" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                            {content}
                                        </a>
                                    );
                                }

                                return (
                                    <div key={index} className="education__cert scroll-hidden">
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
