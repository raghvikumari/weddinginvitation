function initializeEventSchedule() {

    const events =
        document.querySelectorAll(".reveal-event");

    if (!events.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    events.forEach((event) => {

        observer.observe(event);

    });

}