function initializeMeetCouple() {

    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector(".burst-container");

    if (!container) {
        console.log("Burst container not found");
        return;
    }

    // Prevent duplicates
    container.innerHTML = "";

    const images = [
        "./public/images/gallery/1.jpeg",
        "./public/images/gallery/2.jpeg",
        "./public/images/gallery/3.jpeg",
        "./public/images/gallery/4.jpeg",
        "./public/images/gallery/5.jpg",
        "./public/images/gallery/6.jpg",
        "./public/images/gallery/7.jpeg",
        "./public/images/gallery/8.jpeg",
    ];

    // Create Photos
    for (let i = 0; i < 40; i++) {

        const img = document.createElement("img");

        img.src = images[Math.floor(Math.random() * images.length)];

        img.classList.add("small-photo");

        img.style.opacity = "0";

        img.style.scale = "0.35";

        container.appendChild(img);

    }

    const photos = container.querySelectorAll(".small-photo");

    const tl = gsap.timeline({

        scrollTrigger: {

            trigger: ".meet-couple",

            start: "top top",

            end: "+=1000",

            scrub: 1,

            pin: true

        }

    });

    photos.forEach((photo, index) => {

        const angle = Math.random() * Math.PI * 2;

        const distance = gsap.utils.random(900, 1500);

        const x = Math.cos(angle) * distance;

        const y = Math.sin(angle) * distance;

        const startTime = index * 0.03;

        // Fade In + Small -> Normal
        tl.to(photo, {

            opacity: 1,

            scale: 0.8,

            duration: 0.4,

            ease: "power1.out"

        }, startTime);

        // Fly Out + Grow Bigger
        tl.to(photo, {

            x: x,

            y: y,

            scale: gsap.utils.random(2.5, 3.5),

            duration: 2.8,

            ease: "power2.out"

        }, startTime + 0.15);

    });

    // Hide burst photos
    tl.to(".burst-container", {

        opacity: 0,

        duration: 0.4

    });

    // Show couple section
    tl.to(".couple-final", {

        opacity: 1,

        duration: 0.5

    });

    tl.to(".bride", {

        opacity: 1,

        y: 0,

        duration: 0.8

    });

    tl.to(".groom", {

        opacity: 1,

        y: 0,

        duration: 0.8

    });

}