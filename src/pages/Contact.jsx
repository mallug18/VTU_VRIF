import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './Contact.css';
import { link } from 'framer-motion/client';

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [contentRef, contentVisible] = useScrollReveal(0.05);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: <MapPin size={20} />,
            title: 'Visit Us',
            lines: ['VTU Campus, Machhe', 'Belagavi, Karnataka 590018'],
            gradient: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15358.015129750704!2d74.45265374132876!3d15.777368407184277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf6f7d3da7f437%3A0x64791b475c2f2939!2sVisvesvaraya%20Technological%20University%2C%20Machhe%2C%20Belagavi%2C%20Karnataka%20590018!5e0!3m2!1sen!2sin!4v1771876783042!5m2!1sen!2sin"
        },
        {
            icon: <Phone size={20} />,
            title: 'Call Us',
            lines: ['+91 831 2498100', 'Mon – Fri, 9AM – 5PM IST'],
            gradient: 'linear-gradient(135deg, #7209b7, #b5179e)',
        },
        {
            icon: <Mail size={20} />,
            title: 'Email Us',
            lines: ['vrif@vtu.ac.in', 'info@vtu.ac.in'],
            gradient: 'linear-gradient(135deg, #06d6a0, #118ab2)',
        },
    ];

    return (
        <div className="contact-page">
            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero__bg" />
                <div className="container">
                    <div className={`contact-hero__content ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
                        <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Contact</span>
                        <h1>Let's Start a<br />Conversation</h1>
                        <p>Have a question, proposal, or collaboration idea? We'd love to hear from you.</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="contact-content-section" ref={contentRef}>
                <div className="container">
                    <div className={`contact-layout ${contentVisible ? 'visible' : ''}`}>
                        {/* Info Cards */}
                        <div className="contact-info">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="contact-info-card">
                                    <div className="contact-info-card__icon" style={{ background: info.gradient }}>
                                        {info.icon}
                                    </div>
                                    <div className="contact-info-card__body">
                                        <h4>{info.title}</h4>
                                        {info.lines.map((line, j) => (
                                            <p key={j}>{line}</p>
                                        ))}
                                        {info.mapEmbed && (
                                            <div className="contact-info-card__map">
                                                <iframe
                                                    src={info.mapEmbed}
                                                    width="100%"
                                                    height="180"
                                                    style={{ border: 0, borderRadius: '12px', marginTop: '1rem' }}
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title="Location Map"
                                                ></iframe>
                                            </div>
                                        )}
                                    </div>
                                    <ArrowUpRight size={16} className="contact-info-card__arrow" />
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="contact-form-card">
                            {submitted ? (
                                <div className="contact-success">
                                    <div className="contact-success__icon">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3>Message Sent Successfully</h3>
                                    <p>Thank you for reaching out. We'll respond within 24 hours.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="contact-form__header">
                                        <h2>Send a Message</h2>
                                        <p>Fill out the form and our team will get back to you promptly.</p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-field">
                                                <label htmlFor="name">Full Name</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="email">Email Address</label>
                                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@university.ac.in" required />
                                            </div>
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="subject">Subject</label>
                                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Research Collaboration" required />
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="message">Message</label>
                                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your inquiry..." rows={5} required />
                                        </div>
                                        <button type="submit" className="btn-primary contact-submit">
                                            <Send size={16} />
                                            Send Message
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
