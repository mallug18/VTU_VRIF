import { useState } from 'react';
import { Linkedin, Github, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './Team.css';

const teamMembers = [
    { name: 'Aarav Sharma', role: 'Lead Researcher', dept: 'AI & ML', intro: 'Passionate about using artificial intelligence to solve complex real-world problems. Leads the core ML research team and mentors junior researchers across VTU.', gradient: 'linear-gradient(135deg, #4361ee, #7209b7)', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Priya Patel', role: 'Project Manager', dept: 'Operations', intro: 'Strategic thinker with expertise in agile project management. Coordinates multi-campus research initiatives and ensures seamless delivery of key programs.', gradient: 'linear-gradient(135deg, #f72585, #b5179e)', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Rohan Gupta', role: 'ML Engineer', dept: 'Data Science', intro: 'Specializes in deep learning and NLP models. Published 5 papers on transformer architectures and their applications in regional language processing.', gradient: 'linear-gradient(135deg, #7209b7, #560bad)', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
    { name: 'Sneha Nair', role: 'Full Stack Dev', dept: 'Engineering', intro: 'Full-stack developer skilled in React, Node.js, and cloud architectures. Built the core VRIF digital platform used across 200+ affiliated colleges.', gradient: 'linear-gradient(135deg, #4cc9f0, #4361ee)', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'Karthik Reddy', role: 'Data Analyst', dept: 'Analytics', intro: 'Data-driven problem solver with deep expertise in statistical modeling. Manages the analytics pipeline that tracks research outcomes across VTU.', gradient: 'linear-gradient(135deg, #f4a261, #e76f51)', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
    { name: 'Ananya Das', role: 'UI/UX Designer', dept: 'Design', intro: 'Award-winning designer focused on creating accessible and beautiful digital experiences. Champions user-centered design across all VRIF platforms.', gradient: 'linear-gradient(135deg, #f72585, #ff6b6b)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
    { name: 'Vikram Singh', role: 'IoT Specialist', dept: 'Hardware', intro: 'Expert in embedded systems and sensor networks. Leads the Smart Campus Initiative deploying IoT devices across university infrastructure.', gradient: 'linear-gradient(135deg, #06d6a0, #118ab2)', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Meera Joshi', role: 'Content Strategist', dept: 'Marketing', intro: 'Storyteller and communications expert who shapes VRIF\'s public image. Manages content strategy across digital channels and media relations.', gradient: 'linear-gradient(135deg, #ffd166, #f4a261)', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop' },
    { name: 'Arjun Menon', role: 'Backend Dev', dept: 'Engineering', intro: 'Backend architect specializing in distributed systems and microservices. Designed VRIF\'s scalable API infrastructure serving 100k+ requests daily.', gradient: 'linear-gradient(135deg, #4361ee, #3a0ca3)', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
    { name: 'Divya Iyer', role: 'QA Engineer', dept: 'Quality', intro: 'Quality champion with deep expertise in automated testing frameworks. Ensures every VRIF release meets the highest standards of reliability.', gradient: 'linear-gradient(135deg, #7209b7, #f72585)', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
    { name: 'Raj Kumar', role: 'DevOps Engineer', dept: 'Infrastructure', intro: 'Cloud infrastructure expert managing CI/CD pipelines and deployment automation. Reduced deployment time by 80% across all VRIF projects.', gradient: 'linear-gradient(135deg, #4cc9f0, #06d6a0)', photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
    { name: 'Kavitha Rao', role: 'Research Intern', dept: 'Research', intro: 'Ambitious researcher exploring the intersection of quantum computing and cryptography. Recipient of the VTU Young Scholar Fellowship 2025.', gradient: 'linear-gradient(135deg, #f4a261, #f72585)', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
];

function TeamFlipCard({ member }) {
    const [flipped, setFlipped] = useState(false);
    const [locked, setLocked] = useState(false);

    const handleHover = () => { if (!locked) setFlipped(true); };
    const handleLeave = () => { if (!locked) setFlipped(false); };
    const handleTap = () => {
        if (locked) {
            setLocked(false);
            setFlipped(false);
        } else {
            setLocked(true);
            setFlipped(true);
        }
    };

    return (
        <div
            className={`team-flip ${flipped ? 'team-flip--flipped' : ''} ${locked ? 'team-flip--locked' : ''}`}
            onClick={handleTap}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="team-flip__inner">
                {/* Front */}
                <div className="team-flip__front">
                    <div className="team-flip__avatar" >
                        <img className='team-front-img' src={member.photo} alt={member.name} />
                    </div>
                    <h3>{member.name}</h3>
                    <span className="team-flip__role" style={{ color: 'var(--accent-bright)' }}>{member.role}</span>
                    <span className="team-flip__dept">{member.dept}</span>
                    <span className="team-flip__hint">{locked ? 'Tap to close' : 'Hover or tap'}</span>
                </div>

                {/* Back */}
                <div className="team-flip__back" style={{ background: member.gradient }}>
                    <div className="team-flip__back-photo">
                        <img src={member.photo} alt={member.name} />
                    </div>
                    <div className="team-flip__back-info">
                        <h4>{member.name}</h4>
                        <span className="team-flip__back-role">{member.role} — {member.dept}</span>
                        <p className="team-flip__back-intro">{member.intro}</p>
                        <div className="team-flip__back-links">
                            <a href="#" aria-label="LinkedIn" onClick={(e) => e.stopPropagation()}><Linkedin size={14} /></a>
                            <a href="#" aria-label="GitHub" onClick={(e) => e.stopPropagation()}><Github size={14} /></a>
                            <a href="#" aria-label="Portfolio" onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Team() {
    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [gridRef, gridVisible] = useScrollReveal(0.05);

    return (
        <div className="team-page">
            <section className="team-hero">
                <div className="team-hero__bg" />
                <div className="container">
                    <div className={`team-hero__content ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
                        <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Our People</span>
                        <h1>The Team Behind<br />the Innovation</h1>
                        <p>12 passionate minds driving VTU-VRIF's mission forward.</p>
                    </div>
                </div>
            </section>

            <section className="team-grid-section">
                <div className="container">
                    <div className={`team-grid stagger-children ${gridVisible ? 'visible' : ''}`} ref={gridRef}>
                        {teamMembers.map((member, i) => (
                            <TeamFlipCard key={i} member={member} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Team;
