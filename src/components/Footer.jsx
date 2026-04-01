import { personalInfo, ui } from '../data/portfolioData';
import { useT } from '../contexts/LanguageContext';
import './Footer.css';

export default function Footer() {
    const t = useT();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <p className="footer__text">
                        <span className="footer__code">&lt;</span>
                        {t(ui.footer.designed)} <strong>{personalInfo.shortName}</strong>
                        <span className="footer__code"> /&gt;</span>
                    </p>
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} — All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
