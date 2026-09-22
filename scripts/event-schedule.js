// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function initializeHorizontalScroll() {
    const pinnedContainer = document.querySelector(".pinned-container");
    const slider = document.querySelector(".event-slider");

    if (!pinnedContainer || !slider) return;

    // Refresh ScrollTrigger in case dynamically loaded elements shifted layout height
    ScrollTrigger.refresh();

    // Calculate the horizontal distance the slider needs to translate
    const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

    gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: pinnedContainer,
            pin: true,
            scrub: 1, // Smooth scrubbing effect
            start: "top top",
            end: () => `+=${slider.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true, // Recalculates dynamically on window resize
        }
    });
}