function initializeEventSchedule() {

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const eventItems =
        document.querySelectorAll(".timeline-item");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

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

        eventItems.forEach(item => {
            observer.observe(item);
        });

    } else {

        eventItems.forEach(item => {
            item.classList.add("show");
        });

    }


    /* =====================================================
       GOOGLE CALENDAR
    ===================================================== */

    const calendarButtons =
        document.querySelectorAll(".calendar-button");


    calendarButtons.forEach(button => {

        button.addEventListener("click", () => {

            const title =
                button.dataset.title;

            const date =
                button.dataset.date;

            const start =
                button.dataset.start;

            const end =
                button.dataset.end;

            const location =
                button.dataset.location;

            const description =
                button.dataset.description;


            /*
             * Convert:
             *
             * 2026-12-25 + 10:00
             *
             * into:
             *
             * 20261225T100000
             */

            const formatDateTime = (date, time) => {

                const cleanTime =
                    time.replace(":", "");

                return `${date.replace(/-/g, "")}T${cleanTime}00`;
            };


            const startDate =
                formatDateTime(date, start);

            const endDate =
                formatDateTime(date, end);


            const googleCalendarURL =
                "https://calendar.google.com/calendar/render?action=TEMPLATE" +
                `&text=${encodeURIComponent(title)}` +
                `&dates=${startDate}/${endDate}` +
                `&details=${encodeURIComponent(description)}` +
                `&location=${encodeURIComponent(location)}`;


            window.open(
                googleCalendarURL,
                "_blank"
            );

        });

    });

}