import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react'; // Added motion imports
import { ArrowRight, ArrowDown, Award, BookOpen, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal, useCountUp } from '../hooks/useAnimations';
import entrance from '../assets/entrance.png';
import whitehouse from '../assets/whitehouse.png';
import meetinghall from '../assets/meeting-hall.png';
import bootcampvrif from '../assets/bootcampvrif.png';
import './Home.css';
/* =========================================
   DATA
   ========================================= */

/* Hero carousel images */
const heroImages = [
    { url: { entrance }, alt: 'Vtu-Entrance' },
    { url: { whitehouse }, alt: 'University Campus' },
    { url: { meetinghall }, alt: 'Students Collaborating' },
    { url: { bootcampvrif }, alt: 'Innovation Workshop' },
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

/* Mission Pillars Data for Carousel */
const MISSION_ITEMS = [
    {
        title: 'Research Excellence',
        description: 'Advancing knowledge through rigorous programs',
        id: 1,
        icon: <Zap size={24} />,
        iconClass: ''
    },
    {
        title: 'Collaborative Networks',
        description: 'Building cross-campus teams',
        id: 2,
        icon: <Users size={24} />,
        iconClass: 'mission__pillar-icon--alt'
    },
    {
        title: 'Innovation Impact',
        description: 'Translating ideas into real-world applications',
        id: 3,
        icon: <Award size={24} />,
        iconClass: 'mission__pillar-icon--warm'
    }
];


/* =========================================
   COMPONENTS
   ========================================= */

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
        e.stopPropagation();
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
            <div className="chief-pop-placeholder" />
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
                <div className="chief-pop__details">
                    <div className="chief-pop__speech">
                        <blockquote>"{chief.speech}"</blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* --- MISSION CAROUSEL COMPONENTS --- */
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];

    const outputRange = [45, 0, -45];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    const zOutputRange = [-150, 0, -150];
    const z = useTransform(x, range, zOutputRange, { clamp: false });

    const opacityOutputRange = [0.5, 1, 0.5];
    const opacity = useTransform(x, range, opacityOutputRange, { clamp: false });

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className={`carousel-item ${round ? 'round' : ''}`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                rotateY: rotateY,
                z: z,
                opacity: opacity,
                ...(round && { borderRadius: '50%' })
            }}
            transition={transition}
        >
            <div className="mission__pillar" style={{ width: '100%', height: '100%', margin: 0, border: 'none', boxShadow: 'none' }}>
                <div className={`mission__pillar-icon ${item.iconClass}`}>
                    {item.icon}
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
            </div>
        </motion.div>
    );
}

function MissionCarousel({
    items = MISSION_ITEMS,
    defaultBaseWidth = 340, // Renamed so we can switch it on mobile
    autoplay = true,
    autoplayDelay = 3000,
    pauseOnHover = true,
    loop = true,
    round = false
}) {
    // 1. ADDED: Mobile detection to shrink card width on small screens
    const [baseWidth, setBaseWidth] = useState(defaultBaseWidth);

    useEffect(() => {
        const handleResize = () => {
            // If screen is smaller than 768px, use 260px wide cards. Otherwise use default.
            if (window.innerWidth < 768) {
                setBaseWidth(260);
            } else {
                setBaseWidth(defaultBaseWidth);
            }
        };

        handleResize(); // Run once on load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [defaultBaseWidth]);

    const itemWidth = baseWidth;
    const trackItemOffset = itemWidth + GAP;

    const itemsForRender = useMemo(() => {
        if (!loop || items.length === 0) return items;
        return [...items, ...items, ...items];
    }, [items, loop]);

    const [position, setPosition] = useState(loop ? items.length : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;
        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);
        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    // Added baseWidth to dependency array so it recalculates position when screen size changes
    useEffect(() => {
        const startingPosition = loop ? items.length : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x, baseWidth]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => setIsAnimating(true);

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }

        if (position >= items.length * 2) {
            setIsJumping(true);
            const target = position - items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position < items.length) {
            setIsJumping(true);
            const target = position + items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }
        setIsAnimating(false);
    };

    const handleDragEnd = (_, info) => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop ? {} : {
        dragConstraints: {
            left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
            right: 0
        }
    };

    const activeIndex = items.length === 0 ? 0 : loop ? position % items.length : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? 'round' : ''}`}
            style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                border: 'none',
                background: 'transparent',
                perspective: 1200,
                overflow: 'hidden',
                padding: '2rem 0',
                ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
            }}
        >
            <motion.div
                className="carousel-track"
                drag={isAnimating ? false : 'x'}
                {...dragProps}
                style={{
                    width: 'max-content',
                    gap: `${GAP}px`,
                    paddingLeft: `calc(50% - ${itemWidth / 2}px)`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item, index) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        index={index}
                        itemWidth={itemWidth} // This will now automatically shrink on mobile!
                        round={round}
                        trackItemOffset={trackItemOffset}
                        x={x}
                        transition={effectiveTransition}
                    />
                ))}
            </motion.div>

            <div className={`carousel-indicators-container ${round ? 'round' : ''}`} style={{ marginTop: '1.5rem' }}>
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
                            animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                            onClick={() => {
                                // Calculate the target position based on our current cloned chunk
                                const currentChunk = Math.floor(position / items.length);
                                setPosition(currentChunk * items.length + index);
                            }}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* =========================================
   MAIN HOME COMPONENT
   ========================================= */

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

                        {/* This is where the new 3D Carousel is injected, 
                            replacing the static .mission__pillars grid 
                        */}
                        <div className={`stagger-children ${missionVisible ? 'visible' : ''}`} style={{ paddingBottom: '2rem' }}>
                            <MissionCarousel baseWidth={340} />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;