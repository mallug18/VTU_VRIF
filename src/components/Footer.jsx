import { ArrowUpRight, Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <div className="footer__logo-mark">V</div>
                            <span className="footer__logo-text">VTU-VRIF</span>
                        </div>
                        <p className="footer__tagline">
                            Vision & Research Innovation Foundation — pioneering the future of
                            technology education and research excellence.
                        </p>
                    </div>

                    <div className="footer__nav-group">
                        <div className="footer__nav-col">
                            <h4 className="footer__nav-title">Navigation</h4>
                            <ul className="footer__nav-list">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/team">Our Team</NavLink></li>
                                <li><NavLink to="/initiatives">Initiatives</NavLink></li>
                                <li><NavLink to="/gallery">The VRIF Chronicles</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer__nav-col">
                            <h4 className="footer__nav-title">Resources</h4>
                            <ul className="footer__nav-list">
                                <li><a href="#">Research Papers</a></li>
                                <li><a href="#">Publications</a></li>
                                <li><a href="#">Annual Report</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer__connect">
                        <h4 className="footer__nav-title">Stay Connected</h4>
                        <div className="footer__socials">
                            <a href="#" aria-label="LinkedIn" className="footer__social-link">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" aria-label="Twitter" className="footer__social-link">
                                <Twitter size={18} />
                            </a>
                            <a href="#" aria-label="GitHub" className="footer__social-link">
                                <Github size={18} />
                            </a>
                            <a href="#" aria-label="Email" className="footer__social-link">
                                <Mail size={18} />
                            </a>
                        </div>
                        <a href="/contact" className="footer__cta">
                            Get in Touch <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {currentYear} VTU-VRIF. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
