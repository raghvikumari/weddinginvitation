function initializeOurVenues() {

    const venuePanels =
        document.querySelectorAll(".venue-panel");

    if (!venuePanels.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "venue-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    venuePanels.forEach((panel, index) => {

        panel.style.transitionDelay =
            `${index * 200}ms`;

        observer.observe(panel);

    });

}