/* =========================================================
   OUR JOURNEY
   StPageFlip based diary
========================================================= */

function initializeOurJourney() {

    const diaryEntrance = document.getElementById("diaryEntrance");
    const diaryBook = document.getElementById("diaryBook");

    if (!diaryEntrance || !diaryBook) {
        console.warn("Our Journey elements not found.");
        return;
    }

    /* Prevent duplicate initialization */
    if (diaryBook.dataset.initialized === "true") {
        return;
    }

    diaryBook.dataset.initialized = "true";


    /* =====================================================
       CHECK LIBRARY
    ===================================================== */

    if (typeof St === "undefined" || typeof St.PageFlip === "undefined") {

        console.error(
            "StPageFlip library was not loaded. " +
            "Make sure page-flip.browser.js is loaded before script.js."
        );

        return;
    }


    /* =====================================================
       GET ALL PAGES
    ===================================================== */

    const pages = diaryBook.querySelectorAll(".diary-page");

    if (!pages.length) {
        console.error("No diary pages found.");
        return;
    }


    /* =====================================================
       CREATE PAGE FLIP
    ===================================================== */

const pageFlip = new St.PageFlip(
    diaryBook,
    {
        /*
         * ONE page dimensions
         */
        width: 560,
        height: 440,

        /*
         * Keep the book fixed.
         */
        size: "fixed",

        /*
         * IMPORTANT:
         * Always use two-page landscape mode
         * on desktop.
         */
        usePortrait: false,

        /*
         * First and last pages are hard covers.
         */
        showCover: true,

        /*
         * Realistic page shadow.
         */
        drawShadow: true,

        maxShadowOpacity: 0.45,

        /*
         * Page animation.
         */
        flippingTime: 1200,

        startPage: 0,

        /*
         * Don't let mobile scrolling
         * fight with page dragging.
         */
        mobileScrollSupport: false,

        swipeDistance: 30,

        useMouseEvents: true,

        /*
         * Allow clicking to turn pages.
         */
        disableFlipByClick: false,

        /*
         * Keep generated book size
         * independent of parent layout.
         */
        autoSize: false
    }
);

    /* =====================================================
       LOAD HTML PAGES
    ===================================================== */

    pageFlip.loadFromHTML(pages);


    /* =====================================================
       VARIABLES
    ===================================================== */

    let autoFlipTimer = null;

    let entranceStarted = false;

    let userHasTakenControl = false;


    /* =====================================================
       CLEAR AUTO FLIP
    ===================================================== */

    function stopAutomaticFlipping() {

        if (autoFlipTimer) {

            clearTimeout(autoFlipTimer);

            autoFlipTimer = null;
        }
    }


    /* =====================================================
       AUTOMATIC NEXT PAGE
    ===================================================== */

   function scheduleNextFlip(delay = 2600) {

    stopAutomaticFlipping();

    autoFlipTimer = setTimeout(function () {

        if (userHasTakenControl) {
            return;
        }

        if (isFlipping) {
            return;
        }

        const current =
            pageFlip.getCurrentPageIndex();

        const total =
            pageFlip.getPageCount();

        if (current >= total - 1) {
            return;
        }

        isFlipping = true;

        pageFlip.flipNext("bottom");

    }, delay);
}


    /* =====================================================
       PAGE FLIP EVENT
    ===================================================== */

   pageFlip.on("flip", function (event) {

    console.log(
        "Current diary page:",
        event.data
    );

    isFlipping = false;

    if (!userHasTakenControl) {

        scheduleNextFlip(2600);
    }
});


    /* =====================================================
       USER INTERACTION DETECTION
    ===================================================== */

    pageFlip.on("changeState", function (event) {

        /*
         * These states are produced while
         * the user physically interacts
         * with the page.
         */
        if (
            event.data === "user_fold" ||
            event.data === "fold_corner"
        ) {

            userHasTakenControl = true;

            stopAutomaticFlipping();
        }

    });


    /* =====================================================
       POINTER INTERACTION
    ===================================================== */

    // diaryBook.addEventListener(
    //     "pointerdown",
    //     function () {

    //         /*
    //          * Once the diary has arrived,
    //          * let the user control it.
    //          */
    //         if (
    //             diaryEntrance.classList.contains("is-settled")
    //         ) {

    //             userHasTakenControl = true;

    //             stopAutomaticFlipping();
    //         }

    //     },
    //     {
    //         passive: true
    //     }
    // );


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

const previousButton =
    document.getElementById("diaryPrev");

const nextButton =
    document.getElementById("diaryNext");


if (previousButton) {

    previousButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            userHasTakenControl = true;

            stopAutomaticFlipping();

            if (!isFlipping) {

                pageFlip.flipPrev("top");
            }

        }
    );
}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            userHasTakenControl = true;

            stopAutomaticFlipping();

            if (!isFlipping) {

                pageFlip.flipNext("bottom");
            }

        }
    );
}


    /* =====================================================
       KEYBOARD CONTROL
    ===================================================== */

    diaryBook.setAttribute("tabindex", "0");

    diaryBook.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowRight") {

                userHasTakenControl = true;

                stopAutomaticFlipping();

                pageFlip.flipNext("bottom");
            }


            if (event.key === "ArrowLeft") {

                userHasTakenControl = true;

                stopAutomaticFlipping();

                pageFlip.flipPrev("top");
            }

        }
    );


    /* =====================================================
       START DIARY ENTRANCE
    ===================================================== */

  function startDiaryAnimation() {

    if (entranceStarted) {
        return;
    }

    entranceStarted = true;


    /* ==========================================
       STEP 1
       Diary appears from bottom-right corner
    ========================================== */

    requestAnimationFrame(function () {

        diaryEntrance.classList.add("is-arrived");

    });


    /* ==========================================
       STEP 2
       Diary settles in the centre
    ========================================== */

    setTimeout(function () {

        diaryEntrance.classList.add("is-settled");

    }, 2400);


    /* ==========================================
       STEP 3
       Open the diary
    ========================================== */

    setTimeout(function () {

        if (userHasTakenControl) {
            return;
        }

        pageFlip.flipNext("bottom");

    }, 3500);
}


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio > 0.25
                    ) {

                        startDiaryAnimation();

                        observer.disconnect();
                    }

                });

            },
            {
                threshold: 0.25
            }
        );


    observer.observe(
        diaryEntrance
    );


    /* =====================================================
       FALLBACK
       Useful if the section is already visible
       when the page loads.
    ===================================================== */

    setTimeout(function () {

        if (!entranceStarted) {

            const rect =
                diaryEntrance.getBoundingClientRect();

            const visible =
                rect.top < window.innerHeight &&
                rect.bottom > 0;


            if (visible) {

                startDiaryAnimation();

                observer.disconnect();
            }

        }

    }, 500);


    /* =====================================================
       DEBUG HELPER
    ===================================================== */

    window.ourJourneyPageFlip = pageFlip;

}