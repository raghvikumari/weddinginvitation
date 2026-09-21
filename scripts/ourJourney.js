function initializeOurJourney() {

    const diary = document.getElementById("ourDiary");
    const section = document.getElementById("our-journey");

    if (!diary || !section) {

        console.log("Our Journey elements not found");

        return;
    }

    console.log("OUR JOURNEY ANIMATION READY");


    let animationStarted = false;


    const observer = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (
                    entry.isIntersecting &&
                    !animationStarted
                ) {

                    animationStarted = true;

                    observer.disconnect();

                    playDiaryAnimation();

                }

            });

        },
        {
            threshold: 0.35
        }
    );


    observer.observe(section);


    function playDiaryAnimation() {

        console.log("Diary animation started");


        /* =================================
           STEP 1
           Force browser to recognise
           the starting corner position
        ================================= */

        diary.classList.add("diary-ready");


        /*
         * This is VERY important.
         * It forces the browser to render
         * the starting position first.
         */

        void diary.offsetWidth;


        /* =================================
           STEP 2
           Move diary from corner
           to centre
        ================================= */

        requestAnimationFrame(function() {

            setTimeout(function() {

                diary.classList.remove("diary-ready");

                diary.classList.add("diary-arrived");

            }, 100);

        });


        /* =================================
           STEP 3
           Straighten diary
        ================================= */

        setTimeout(function() {

            diary.classList.remove("diary-arrived");

            diary.classList.add("diary-settled");

        }, 2500);


        /* =================================
           STEP 4
           Open cover
        ================================= */

        setTimeout(function() {

            diary.classList.add("diary-open");

        }, 3700);


        /* =================================
           STEP 5
           Turn page
        ================================= */

        setTimeout(function() {

            const page =
                document.getElementById("turningPage");

            if (page) {

                page.classList.add("turn");

            }

        }, 6200);

    }

}