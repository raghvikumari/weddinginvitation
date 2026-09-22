// function initializeMeetCouple() {

//     gsap.registerPlugin(ScrollTrigger);

//     const container = document.querySelector(".burst-container");

//     if (!container) {
//         console.log("Burst container not found");
//         return;
//     }

//     // Prevent duplicates
//     container.innerHTML = "";

//     const images = [
//         "./public/images/gallery/1.jpeg",
//         "./public/images/gallery/2.jpeg",
//         "./public/images/gallery/3.jpeg",
//         "./public/images/gallery/4.jpeg",
//         "./public/images/gallery/5.jpeg",
//         "./public/images/gallery/6.jpeg",
//         "./public/images/gallery/7.jpeg",
//         "./public/images/gallery/8.jpeg",
//     ];

//     // Create Photos
//     for (let i = 0; i < 40; i++) {

//         const img = document.createElement("img");

//         img.src = images[Math.floor(Math.random() * images.length)];

//         img.classList.add("small-photo");

//         img.style.opacity = "0";

//         img.style.scale = "0.35";

//         container.appendChild(img);

//     }

//     const photos = container.querySelectorAll(".small-photo");

//     const tl = gsap.timeline({

//         scrollTrigger: {

//             trigger: ".meet-couple",

//             start: "top top",

//             end: "+=1000",

//             scrub: 1,

//             pin: true

//         }

//     });

//     photos.forEach((photo, index) => {

//         const angle = Math.random() * Math.PI * 2;

//         const distance = gsap.utils.random(900, 1500);

//         const x = Math.cos(angle) * distance;

//         const y = Math.sin(angle) * distance;

//         const startTime = index * 0.03;

//         // Fade In + Small -> Normal
//         tl.to(photo, {

//             opacity: 1,

//             scale: 0.8,

//             duration: 0.4,

//             ease: "power1.out"

//         }, startTime);

//         // Fly Out + Grow Bigger
//         tl.to(photo, {

//             x: x,

//             y: y,

//             scale: gsap.utils.random(2.5, 3.5),

//             duration: 2.8,

//             ease: "power2.out"

//         }, startTime + 0.15);

//     });

//     // Hide burst photos
//     tl.to(".burst-container", {

//         opacity: 0,

//         duration: 0.4

//     });

//     // Show couple section
//     tl.to(".couple-final", {

//         opacity: 1,

//         duration: 0.5

//     });

//     tl.to(".bride", {

//         opacity: 1,

//         y: 0,

//         duration: 0.8

//     });

//     tl.to(".groom", {

//         opacity: 1,

//         y: 0,

//         duration: 0.8

//     });

// }


function initializeMeetCouple() {

    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector(".burst-container");

    if (!container) return;

    container.innerHTML = "";

    const images = [
        "./public/images/gallery/1.jpeg",
        "./public/images/gallery/2.jpeg",
        "./public/images/gallery/3.jpeg",
        "./public/images/gallery/4.jpeg",
        "./public/images/gallery/5.jpeg",
        "./public/images/gallery/6.jpeg",
        "./public/images/gallery/7.jpeg",
        "./public/images/gallery/8.jpeg",
    ];

    // Create photos
    for (let i = 0; i < 40; i++) {

        const img = document.createElement("img");

        img.src = images[Math.floor(Math.random() * images.length)];

        img.classList.add("small-photo");

        gsap.set(img, {
            opacity: 0,
            scale: 0.25,
            x: gsap.utils.random(-60, 60),
            y: gsap.utils.random(-60, 60),
            force3D: true
        });

        container.appendChild(img);
    }

    const photos = container.querySelectorAll(".small-photo");

    const tl = gsap.timeline({
        defaults: {
            ease: "sine.out"
        },
        scrollTrigger: {
            trigger: ".meet-couple",
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    photos.forEach((photo) => {

        // Completely random destination
        const x = gsap.utils.random(-1800, 1800);
        const y = gsap.utils.random(-1200, 1200);

        // Small random delay so all photos don't move at exactly the same time
        const start = gsap.utils.random(0, 0.15);

        // Fade in & grow
        tl.to(photo, {
            opacity: 1,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.out"
        }, start);

        // Fly in a random direction
        tl.to(photo, {
            x: x,
            y: y,
            scale: gsap.utils.random(2.5, 3.2),
            duration: 3,
            ease: "none"
        }, start + 0.05);

    });

    tl.to(".burst-container", {
        opacity: 0,
        duration: 0.6,
        ease: "expo.out"
    });

    tl.to(".couple-final", {
        opacity: 1,
        duration: 0.8,
        ease: "expo.out"
    }, "-=0.25");

    tl.fromTo(".bride",
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }
    );

    tl.fromTo(".groom",
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        },
        "-=0.7"
    );

}