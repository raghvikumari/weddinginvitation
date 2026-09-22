/* =====================================================
   MEET THE COUPLE — scroll-driven cinematic sequence

   Act I   (0     → titleOut)  title breathes in, holds, lifts away
   Act II  (titleOut → burstOut) memories scatter outward, organically
   Act III (burstOut → end)    couple revealed, glass-framed, side by side
===================================================== */

function initializeMeetCouple() {

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(".meet-couple");
    const burstContainer = document.querySelector(".mc-burst");

    if (!section || !burstContainer) return;

    /* Clean up any previous instance (hot-reload / re-init safe) */
    ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
    });
    burstContainer.innerHTML = "";

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* If the visitor has asked for less motion, just show the
       final, resting state with no scroll-jacking. */
    if (prefersReducedMotion) {
        gsap.set(".mc-title-wrap", { opacity: 0 });
        gsap.set(".mc-burst", { opacity: 0 });
        gsap.set(".mc-final, .mc-person", { opacity: 1, y: 0, scale: 1 });
        return;
    }


    const PHOTO_COUNT = window.innerWidth < 768 ? 24 : 36;

    const gallery = [
        "./public/images/gallery/1.jpeg",
        "./public/images/gallery/2.jpeg",
        "./public/images/gallery/3.jpeg",
        "./public/images/gallery/4.jpeg",
        "./public/images/gallery/5.jpeg",
        "./public/images/gallery/6.jpeg",
        "./public/images/gallery/7.jpeg",
        "./public/images/gallery/8.jpeg"
    ];

    const photoData = [];

    for (let i = 0; i < PHOTO_COUNT; i++) {

        const img = document.createElement("img");

        img.src = gallery[Math.floor(Math.random() * gallery.length)];

        img.className = "mc-photo";

        burstContainer.appendChild(img);

        photoData.push({

            el: img,

            // start from a small cloud
            startX: gsap.utils.random(-60, 60),
            startY: gsap.utils.random(-60, 60),

            // completely random destination
            endX: gsap.utils.random(-3200, 3200),
            endY: gsap.utils.random(-2200, 2200),

            scale: gsap.utils.random(1.8, 3),

            delay: gsap.utils.random(0, 0.14)

        });

    }

    gsap.set(
        photoData.map(p => p.el),
        {
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0.15,
            force3D: true
        }
    );

    /* =========================================
       MASTER TIMELINE
    ========================================= */

    const tl = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=4200",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    /* ---------- ACT I — TITLE ---------- */

    gsap.set(".mc-title-wrap", { opacity: 0, scale: 0.92, y: 18 });

    tl.addLabel("titleIn")
        .to(".mc-title-wrap", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        })
        .addLabel("titleHold")
        .to({}, { duration: 0.55 }) /* a breath, so the words can be read */
        .addLabel("titleOut")
        .to(".mc-title-wrap", {
            opacity: 0,
            y: -90,
            scale: 0.96,
            duration: 1,
            ease: "power2.inOut"
        })
        .addLabel("titleGone");

    /* ---------- ACT II — PHOTO BURST ---------- */

    tl.addLabel("burstStart", "titleGone+=0.05");

    photoData.forEach((p) => {

        const start = "burstStart+=" + p.delay;

        // Appear almost instantly
        tl.to(
            p.el,
            {
                opacity: 1,
                duration: 0.12,
                ease: "none"
            },
            start
        );

        // Slowly move outward
        tl.fromTo(
            p.el,
            {
                x: p.startX,
                y: p.startY,
                scale: 0.15
            },
            {
                x: p.endX,
                y: p.endY,
                scale: p.scale,
                duration: 3.2,
                ease: "power2.out"
            },
            start
        );

    });
    tl.addLabel("burstPeak", "burstStart+=3.2");

    /* the scattered memories dissolve away together */
    tl.to(
        ".mc-burst",
        {
            opacity: 0,
            duration: 0.7,
            ease: "expo.out"
        },
        "burstPeak+=0.9"
    );

    tl.addLabel("burstGone", "burstPeak+=1.6");

    /* ---------- ACT III — FINAL COUPLE ---------- */

    gsap.set(".mc-final", { opacity: 0 });
    gsap.set(".mc-person", { opacity: 0, y: 55 });
    gsap.set(".mc-heart-area", { opacity: 0, y: 30 });

    tl.to(
        ".mc-final",
        { opacity: 1, duration: 0.5, ease: "power1.out" },
        "burstGone"
    );

    tl.fromTo(
        ".mc-bride",
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "burstGone+=0.1"
    );

    tl.fromTo(
        ".mc-heart-area",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "burstGone+=0.25"
    );

    tl.fromTo(
        ".mc-groom",
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "burstGone+=0.35"
    );

    tl.addLabel("reveal", "burstGone+=1.1")
        .to({}, { duration: 0.6 }); /* settle on the couple before releasing the pin */

    /* Recalculate on resize so pin distance / positions stay accurate */
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
}