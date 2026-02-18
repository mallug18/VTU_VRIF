import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Award, BookOpen, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal, useCountUp } from '../hooks/useAnimations';
import './Home.css';

/* Hero carousel images */
const heroImages = [
    { url: './src/assets/entrance.png', alt: 'Vtu-Entrance' },
    { url: "./src/assets/whitehouse.png", alt: 'University Campus' },
    { url: './src/assets/meeting-hall.png', alt: 'Students Collaborating' },
    { url: './src/assets/bootcampvrif.png', alt: 'Innovation Workshop' },
    // { url: './src/assets/whitehouse.png', alt: 'Graduation Ceremony' },
    // { url: './src/assets/whitehouse.png', alt: 'Library and Knowledge' },
];

/* Chiefs data */
const chiefs = [
    {
        name: 'Dr. S. Vidyashankar',
        title: 'Vice Chancellor, VTU',
        speech: 'Innovation is the bridge between knowledge and impact. VTU-VRIF empowers students to become the architects of tomorrow\'s solutions. Our commitment is to build a world-class research ecosystem that transforms academic potential into groundbreaking discoveries.',
        photo: './src/assets/Dr_S_Vidyashankar.png',
        initials: 'SV',
    },
    {
        name: 'Santosh Ittangi.',
        title: 'HEO, VTU-VRIF',
        speech: 'Research is not just about discovery — it\'s about transforming discoveries into real-world value. VRIF is committed to nurturing the spirit of inquiry among our youth, fostering an environment where brilliant minds can thrive and contribute to national development.',
        photo: './src/assets/santoshittangi2.png',
        initials: 'SI',
    },
];

const statsData = [
    { end: 50, suffix: '+', label: 'Research Projects', icon: <Zap size={22} /> },
    { end: 200, suffix: '+', label: 'Publications', icon: <BookOpen size={22} /> },
    { end: 12, suffix: '', label: 'Team Members', icon: <Users size={22} /> },
    { end: 30, suffix: '+', label: 'Active Initiatives', icon: <Award size={22} /> },
];

function StatCard({ end, suffix, label, icon, index }) {
    const [ref, count] = useCountUp(end, 2000, true);
    return (
        <div className="stat" ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
            <div className="stat__icon">{icon}</div>
            <span className="stat__number">{count}{suffix}</span>
            <span className="stat__label">{label}</span>
        </div>
    );
}

function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = () => setCurrent((prev) => (prev + 1) % heroImages.length);
    const prev = () => setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    const goTo = (index) => {
        setCurrent(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    return (
        <div className="hero-carousel">
            {heroImages.map((img, i) => (
                <div
                    key={i}
                    className={`hero-carousel__slide ${i === current ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                />
            ))}
            <div className="hero-carousel__overlay" />
            <button className="hero-carousel__btn hero-carousel__btn--prev" onClick={() => { prev(); setIsAutoPlaying(false); }}><ChevronLeft /></button>
            <button className="hero-carousel__btn hero-carousel__btn--next" onClick={() => { next(); setIsAutoPlaying(false); }}><ChevronRight /></button>
            <div className="hero-carousel__dots">
                {heroImages.map((_, i) => (
                    <button key={i} className={`hero-carousel__dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
                ))}
            </div>
        </div>
    );
}

function ChiefPopCard({ chief, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const handleHover = () => { if (!isLocked) setIsExpanded(true); };
    const handleLeave = () => { if (!isLocked) setIsExpanded(false); };
    const handleClick = (e) => {
        e.stopPropagation(); // prevent document click handling if any
        if (isLocked) {
            setIsLocked(false);
            setIsExpanded(false);
        } else {
            setIsLocked(true);
            setIsExpanded(true);
        }
    };

    return (
        <div
            className={`chief-pop-wrapper ${isExpanded ? 'active' : ''} ${index === 0 ? 'pop-right' : 'pop-left'}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
        >
            {/* Placeholder to reserve space in grid (180px height) */}
            <div className="chief-pop-placeholder" />

            {/* Actual Card (Absolute for pop-out effect) */}
            <div className="chief-pop-card">
                <div className="chief-pop__front">
                    <div className="chief-pop__main-image">
                        <img src={chief.photo} alt={chief.name} />
                    </div>
                    <div className="chief-pop__front-info">
                        <h3>{chief.name}</h3>
                        <span className="chief-pop__title">{chief.title}</span>
                    </div>
                    <span className="chief-pop__hint">{isLocked ? 'Tap to close' : 'Hover / Tap'}</span>
                </div>

                {/* Expanded Content (Revealed on Pop) */}
                <div className="chief-pop__details">
                    <div className="chief-pop__speech">
                        <blockquote>"{chief.speech}"</blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Home() {
    const [heroRef, heroVisible] = useScrollReveal(0.1);
    const [statsRef, statsVisible] = useScrollReveal(0.2);
    const [chiefsRef, chiefsVisible] = useScrollReveal(0.1);
    const [missionRef, missionVisible] = useScrollReveal(0.15);

    return (
        <div className="home">
            <section className="hero">
                <HeroCarousel />
                <div className={`hero__content ${heroVisible ? 'visible' : ''}`} ref={heroRef}>
                    <div className="hero__label section-label"><span>Visvesvaraya Technological University</span></div>
                    <h1 className="hero__title">
                        <span className="hero__title-line">Visvesvaraya Research &</span>
                        <span className="hero__title-line hero__title-accent">Innovation Foundation</span>
                    </h1>
                    <p className="hero__subtitle">Pioneering the future of technology education through cutting-edge research and innovation.</p>
                    <div className="hero__actions">
                        <a href="/initiatives" className="btn-primary">Explore Our Work <ArrowRight size={18} /></a>
                        <a href="/team" className="btn-secondary">Meet the Team</a>
                    </div>
                </div>
                <div className="hero__scroll-hint"><ArrowDown size={18} /><span>Scroll to explore</span></div>
            </section>

            <section className={`stats ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
                <div className="stats__container container">
                    {statsData.map((s, i) => <StatCard key={i} {...s} index={i} />)}
                </div>
            </section>

            <section className="chiefs" ref={chiefsRef}>
                <div className="container">
                    <div className={`chiefs__header ${chiefsVisible ? 'visible' : ''}`}>
                        <span className="section-label">Leadership</span>
                        <h2 className="section-title">Words from Our Visionaries</h2>
                    </div>
                    <div className={`chiefs__grid ${chiefsVisible ? 'visible' : ''}`}>
                        {chiefs.map((chief, i) => (
                            <ChiefPopCard key={i} chief={chief} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="mission" ref={missionRef}>
                <div className="container">
                    <div className={`mission__content ${missionVisible ? 'visible' : ''}`}>
                        <span className="section-label">Our Mission</span>
                        <h2 className="section-title">Building Tomorrow's Innovation Ecosystem</h2>
                        <p className="mission__desc">
                            VTU-VRIF is dedicated to fostering a culture of innovation and research across
                            affiliated institutions. We bridge the gap between academic excellence and
                            industry-ready skills.
                        </p>
                        <div className={`mission__pillars stagger-children ${missionVisible ? 'visible' : ''}`}>
                            <div className="mission__pillar"><div className="mission__pillar-icon"><Zap size={24} /></div><h4>Research Excellence</h4><p>Advancing knowledge through rigorous programs</p></div>
                            <div className="mission__pillar"><div className="mission__pillar-icon mission__pillar-icon--alt"><Users size={24} /></div><h4>Collaborative Networks</h4><p>Building cross-campus teams</p></div>
                            <div className="mission__pillar"><div className="mission__pillar-icon mission__pillar-icon--warm"><Award size={24} /></div><h4>Innovation Impact</h4><p>Translating ideas into real-world applications</p></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
