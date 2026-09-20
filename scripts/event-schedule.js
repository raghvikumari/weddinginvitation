/* =========================================
   WEDDING EVENT SCHEDULE
   ========================================= */


/*
   This function is called from script.js
   AFTER event-schedule.html is loaded.
*/

function initializeEventSchedule() {

    const eventRows = document.querySelectorAll(".event-row");

    /*
       If Event Schedule is not loaded yet,
       simply stop.
    */

    if (!eventRows.length) {
        return;
    }


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    eventRows.forEach((row, index) => {

        /*
           Each card appears slightly after
           the previous one.
        */

        row.style.transitionDelay =
            `${index * 120}ms`;

        observer.observe(row);

    });


    /* =========================================
       LOCATION BUTTON
       =========================================

       Location URLs are already written directly
       inside event-schedule.html.

       Therefore no extra JavaScript is needed
       for Google Maps.
    */

}