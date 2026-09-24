// let lenis;

// function initializeLenis() {
//     if (lenis) return; // Prevent creating multiple instances

//     lenis = new Lenis({
//         autoRaf: true,
//         duration: 1.2,
//         smoothWheel: true,
//         wheelMultiplier: 1,
//         touchMultiplier: 1,
//         infinite: false,
//     });
// }

// async function loadPage(page) {
//     const response = await fetch(`./pages/${page}.html`);
//     const html = await response.text();

//     document.getElementById("app").innerHTML = html;

//     initializePage(page);
// }

// async function loadHome() {


//     const welcome = await fetch("./pages/welcome.html").then(res => res.text());
//     const saveTheDate = await fetch("./pages/saveTheDate.html").then(res => res.text());
//     const meetCouple = await fetch("./pages/meetCouple.html").then(res => res.text());
//     const ourJourney = await fetch("./pages/ourJourney.html").then(res => res.text());
//     const capturedMoments = await fetch("./pages/capturedMoments.html").then(res => res.text());
//     const eventSchedule = await fetch("./pages/event-schedule.html").then(res => res.text());
//     const ourVenues = await fetch("./pages/our-venues.html").then(res => res.text());
//     const family = await fetch("./pages/family.html").then(res => res.text());
//     const contact = await fetch("./pages/contact.html").then(res => res.text());
//     const footer = await fetch("./pages/footer.html").then(res => res.text());

//     document.getElementById("app").innerHTML =
//         welcome +
//         saveTheDate +
//         meetCouple +
//         ourJourney +
//         capturedMoments +
//         eventSchedule +
//         ourVenues +
//         family +
//         contact +
//         footer;

//     initializePetals();
//     initializeMeetCouple();
//     initializeScratchCard();
//     initializeCapturedMoments();
//     initializeOurVenues();
//     initializeOurJourney();
//     initializeCalendarButton();
//     initializeLoveButton();
//     initializeHorizontalScroll();
//     initializeContactForm()
//     initializeLenis();
// }

// function initializePage(page) {

//     if (page === "opening") {

//         const video = document.querySelector(".opening-video");
//         const button = document.querySelector(".tap-button");

//         button.addEventListener("click", () => {

//             video.play();

//             button.style.display = "none";

//         });

//         video.addEventListener("ended", () => {

//             loadHome();

//         });

//     }

// }

// loadPage("opening");

let lenis;

// Fragments that make up the home page, in the order they're stitched together.
const HOME_PAGES = [
    "welcome",
    "saveTheDate",
    "meetCouple",
    "ourJourney",
    "capturedMoments",
    "event-schedule",
    "our-venues",
    "family",
    "contact",
    "footer",
];

// Kicks off all the fetches for the home page in parallel (instead of one
// after another) and caches the in-flight promise so calling this more than
// once (e.g. once on load to prefetch, once when the video ends) doesn't
// re-fetch anything.
let homePagesPromise = null;

function prefetchHomePages() {
    if (homePagesPromise) return homePagesPromise;

    homePagesPromise = Promise.all(
        HOME_PAGES.map((page) =>
            fetch(`./pages/${page}.html`).then((res) => res.text())
        )
    );

    return homePagesPromise;
}

function initializeLenis() {
    if (lenis) return; // Prevent creating multiple instances

    lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
    });
}

async function loadPage(page) {
    const response = await fetch(`./pages/${page}.html`);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    initializePage(page);
}

async function loadHome() {

    // If prefetchHomePages() was already triggered while the video was
    // playing, this resolves instantly (or much sooner) instead of starting
    // 10 fresh sequential requests only now.
    const htmlParts = await prefetchHomePages();

    document.getElementById("app").innerHTML = htmlParts.join("");

    initializePetals();
    initializeMeetCouple();
    initializeScratchCard();
    initializeCapturedMoments();
    initializeOurVenues();
    initializeOurJourney();
    initializeCalendarButton();
    initializeLoveButton();
    initializeHorizontalScroll();
    initializeContactForm()
    initializeLenis();
}

function initializePage(page) {

    if (page === "opening") {

        const video = document.querySelector(".opening-video");
        const button = document.querySelector(".tap-button");

        // Start loading the home page content now, in the background,
        // instead of waiting until the video ends to begin fetching it.
        prefetchHomePages();

        button.addEventListener("click", () => {

            video.play();

            button.style.display = "none";

        });

        video.addEventListener("ended", () => {

            loadHome();

        });

    }

}

loadPage("opening");