// async function loadPage(page) {

//     const response = await fetch(`./pages/${page}.html`);

//     const html = await response.text();

//     document.getElementById("app").innerHTML = html;

//     initializePage(page);
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
//             loadPage("/");
//         });

//     }

// }

// loadPage("opening");

async function loadPage(page) {
    const response = await fetch(`./pages/${page}.html`);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    initializePage(page);
}

async function loadHome() {
    const welcome = await fetch("./pages/welcome.html").then(res => res.text());
    const meetCouple = await fetch("./pages/meetCouple.html").then(res => res.text());
    const ourJourney = await fetch("./pages/ourJourney.html").then(res => res.text());
    const capturedMoments = await fetch("./pages/capturedMoments.html").then(res => res.text());

    document.getElementById("app").innerHTML =
        welcome +
        meetCouple +
        ourJourney +
        capturedMoments;

        initializeCapturedMoments();
}

function initializePage(page) {

    if (page === "opening") {

        const video = document.querySelector(".opening-video");
        const button = document.querySelector(".tap-button");

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