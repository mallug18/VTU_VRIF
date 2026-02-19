import { useLayoutEffect, useRef } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children }) => {
    return <div className="scroll-stack-card">{children}</div>;
};

const ScrollStack = ({ children }) => {
    const wrapperRef = useRef(null);

    useLayoutEffect(() => {
        const cards = wrapperRef.current.querySelectorAll(
            ".scroll-stack-card"
        );

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;

            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                const offset = rect.top;

                // progress when card reaches 30% of viewport
                const progress = Math.max(
                    0,
                    Math.min(1, (vh * 0.3 - offset) / vh)
                );

                const scale = 1 - progress * 0.08;

                card.style.transform = `
          scale(${scale})
        `;

                // Higher index → higher zIndex (next card above previous)
                card.style.zIndex = i + 1;
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="scroll-stack-wrapper" ref={wrapperRef}>
            {children}
        </div>
    );
};

export default ScrollStack;
