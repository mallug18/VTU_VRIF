import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Grid3x3, ZoomIn } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './Gallery.css';

const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop', title: 'Campus Vista', category: 'Campus' },
    { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=600&fit=crop', title: 'Research Wing', category: 'Research' },
    { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop', title: 'Student Workshop', category: 'Events' },
    { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop', title: 'Innovation Lab', category: 'Research' },
    { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop', title: 'Convocation Day', category: 'Events' },
    { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop', title: 'Central Library', category: 'Campus' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop', title: 'Team Brainstorm', category: 'Events' },
    { url: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop', title: 'AI Research Lab', category: 'Research' },
    { url: 'https://images.unsplash.com/photo-1588580261295-32ea1fc63f67?w=800&h=600&fit=crop', title: 'Science Expo Hall', category: 'Events' },
    { url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop', title: 'Green Campus Walk', category: 'Campus' },
    { url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop', title: 'Robotics Cell', category: 'Research' },
    { url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop', title: 'Award Ceremony', category: 'Events' },
];

const categories = ['All', 'Campus', 'Research', 'Events'];

function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [gridRef, gridVisible] = useScrollReveal(0.05);

    const filtered = selectedCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    };

    const nextImage = () => setLightboxIndex((prev) => (prev + 1) % filtered.length);
    const prevImage = () => setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);

    return (
        <div className="gallery-page">
            {/* Hero */}
            <section className="gallery-hero">
                <div className="gallery-hero__bg" />
                <div className="container">
                    <div className={`gallery-hero__content ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
                        <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Visual Stories</span>
                        <h1>The VRIF<br />Chronicles</h1>
                        <p>A curated collection of moments that define our journey of innovation and excellence.</p>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="gallery-filter">
                <div className="container">
                    <div className="gallery-filter__bar">
                        <Grid3x3 size={18} className="gallery-filter__icon" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`gallery-filter__btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="gallery-grid-section">
                <div className="container">
                    <div className={`gallery-grid stagger-children ${gridVisible ? 'visible' : ''}`} ref={gridRef}>
                        {filtered.map((img, i) => (
                            <div
                                key={`${img.title}-${i}`}
                                className="gallery-item"
                                onClick={() => openLightbox(i)}
                            >
                                <img src={img.url} alt={img.title} loading="lazy" />
                                <div className="gallery-item__overlay">
                                    <ZoomIn size={20} />
                                    <span className="gallery-item__title">{img.title}</span>
                                    <span className="gallery-item__cat">{img.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox__close" onClick={closeLightbox}><X size={24} /></button>
                        <button className="lightbox__nav lightbox__nav--prev" onClick={prevImage}><ChevronLeft size={28} /></button>
                        <button className="lightbox__nav lightbox__nav--next" onClick={nextImage}><ChevronRight size={28} /></button>
                        <img src={filtered[lightboxIndex]?.url?.replace('w=800&h=600', 'w=1400&h=900')} alt={filtered[lightboxIndex]?.title} />
                        <div className="lightbox__info">
                            <h3>{filtered[lightboxIndex]?.title}</h3>
                            <span>{filtered[lightboxIndex]?.category}</span>
                        </div>
                        <div className="lightbox__counter">
                            {lightboxIndex + 1} / {filtered.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
