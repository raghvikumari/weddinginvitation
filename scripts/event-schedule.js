// // Register GSAP ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// function initializeHorizontalScroll() {
//     const pinnedContainer = document.querySelector(".pinned-container");
//     const slider = document.querySelector(".event-slider");

//     if (!pinnedContainer || !slider) return;

//     // Refresh ScrollTrigger in case dynamically loaded elements shifted layout height
//     ScrollTrigger.refresh();

//     // Calculate the horizontal distance the slider needs to translate
//     const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

//     gsap.to(slider, {
//         x: getScrollAmount,
//         ease: "none",
//         scrollTrigger: {
//             trigger: pinnedContainer,
//             pin: true,
//             scrub: 1, // Smooth scrubbing effect
//             start: "top top",
//             end: () => `+=${slider.scrollWidth - window.innerWidth}`,
//             invalidateOnRefresh: true, // Recalculates dynamically on window resize
//         }
//     });
// }

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function initializeHorizontalScroll() {
    const pinnedContainer = document.querySelector(".pinned-container");
    const slider = document.querySelector(".event-slider");
    const cards = gsap.utils.toArray(".event-card", slider);

    if (!pinnedContainer || !slider || !cards.length) return;

    // Refresh ScrollTrigger in case dynamically loaded elements shifted layout height
    ScrollTrigger.refresh();

    // Calculate the horizontal distance the slider needs to translate
    const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

    // For a given raw scroll progress (0-1), find the nearest progress value
    // that centers one of the cards in the viewport, and return that instead.
    // Recomputed live (using current offsetLeft/offsetWidth) so it stays
    // correct after resize/invalidateOnRefresh.
    const getSnapProgress = (rawProgress) => {
        const maxScroll = -getScrollAmount(); // total scrollable distance, positive
        if (maxScroll <= 0) return 0;

        const viewportCenter = window.innerWidth / 2;

        const cardProgressPoints = cards.map((card) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            let x = viewportCenter - cardCenter; // translateX needed to center this card
            x = Math.min(0, Math.max(-maxScroll, x)); // clamp to valid scroll range
            return -x / maxScroll; // convert to a 0-1 progress value
        });

        return cardProgressPoints.reduce((closest, point) =>
            Math.abs(point - rawProgress) < Math.abs(closest - rawProgress) ? point : closest
        );
    };

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
            snap: {
                snapTo: (value) => getSnapProgress(value),
                duration: { min: 0.001, max: 0.001 },
                ease: "power1.inOut",
            },
        }
    });
}