import { ArrowRight, Rocket, Brain, Target, Lightbulb, GraduationCap, Globe } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './Initiatives.css';
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";

const initiatives = [
    {
        title: 'Smart Campus Initiative',
        desc: 'Developing IoT-based solutions for energy management, waste monitoring, and campus safety across VTU-affiliated colleges.',
        icon: <Globe size={24} />,
        gradient: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
        tag: 'Ongoing',
    },
    {
        title: 'AI Research Hub',
        desc: 'A dedicated center for AI/ML research focusing on healthcare, agriculture, and environmental sustainability.',
        icon: <Brain size={24} />,
        gradient: 'linear-gradient(135deg, #7209b7, #b5179e)',
        tag: 'Active',
    },
    {
        title: 'Industry Connect Program',
        desc: 'Bridging academia and industry through internship pipelines, joint projects, and expert mentorship programs.',
        icon: <Target size={24} />,
        gradient: 'linear-gradient(135deg, #06d6a0, #118ab2)',
        tag: 'Ongoing',
    },
    {
        title: 'SamShoDhana',
        desc: 'Providing cutting-edge labs and makerspaces for students to prototype, build, and test innovative products.',
        icon: <Rocket size={24} />,
        gradient: 'linear-gradient(135deg, #f4a261, #e76f51)',
        tag: 'New',
        link: "https://samshodhana.netlify.app/"
    },
    {
        title: 'Research Fellowship Program',
        desc: 'Annual fellowship for top researchers across VTU, offering funding, mentorship, and publication support.',
        icon: <GraduationCap size={24} />,
        gradient: 'linear-gradient(135deg, #f72585, #b5179e)',
        tag: 'Annual',
    },
    {
        title: 'Tech Hackathon Series',
        desc: '24-hour hackathons held quarterly, encouraging cross-disciplinary teams to solve real-world challenges.',
        icon: <Lightbulb size={24} />,
        gradient: 'linear-gradient(135deg, #ffd166, #f4a261)',
        tag: 'Quarterly',
    },
];

function Initiatives() {
    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [stackRef, stackVisible] = useScrollReveal(0.05);



    return (
        <div className="initiatives-page">
            {/* Hero */}
            <section className="init-hero">
                <div className="init-hero__bg" />
                <div className="container">
                    <div className={`init-hero__content ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
                        <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>What We Do</span>
                        <h1>Driving Innovation<br />Across Disciplines</h1>
                        <p>Programs and projects that push the boundaries of what's possible in tech education.</p>
                    </div>
                </div>
            </section>

            {/* Stacked Initiatives */}
            <section className="init-stack-section">
                <div className="container">
                    <ScrollStack>
                        {initiatives.map((item, i) => (
                            <ScrollStackItem key={i}>
                                <div className="init-stack-card">
                                    <span className="init-stack-card__number">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <div
                                        className="init-stack-card__icon"
                                        style={{ background: item.gradient }}
                                    >
                                        {item.icon}
                                    </div>

                                    <div className="init-stack-card__body">
                                        <div className="init-stack-card__header">
                                            <h3 className="init-stack-card__title">
                                                {item.title}
                                            </h3>
                                            <span className="init-stack-card__tag">
                                                {item.tag}
                                            </span>
                                        </div>

                                        <p className="init-stack-card__desc">
                                            {item.desc}
                                        </p>

                                        {/* RESTORED BLUE LINK */}
                                        <a href={item.link} className="init-stack-card__link">
                                            Learn more →
                                        </a>
                                    </div>

                                    <div
                                        className="init-stack-card__accent"
                                        style={{ background: item.gradient }}
                                    />
                                </div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </section>
        </div>
    );
}

export default Initiatives;
