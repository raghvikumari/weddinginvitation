function initializeMeetCouple() {

    gsap.registerPlugin(ScrollTrigger);


    const section =
        document.querySelector("#meetCouple");


    if (!section) {
        console.log("Meet Couple section not found");
        return;
    }


    const container =
        section.querySelector(".burst-container");


    const intro =
        section.querySelector(".couple-intro");


    const coupleFinal =
        section.querySelector(".couple-final");


    const bride =
        section.querySelector(".bride");


    const groom =
        section.querySelector(".groom");


    const heart =
        section.querySelector(".heart-3d");


    const heartArea =
        section.querySelector(".heart-area");


    if (!container || !coupleFinal) {
        console.log("Meet Couple elements missing");
        return;
    }


    /* =========================================
       CLEAR OLD PHOTOS
    ========================================= */

    container.innerHTML = "";


    /* =========================================
       GALLERY
    ========================================= */

    const images = [

        "./public/images/gallery/1.jpeg",

        "./public/images/gallery/2.jpeg",

        "./public/images/gallery/3.jpeg",

        "./public/images/gallery/4.jpeg",

        "./public/images/gallery/5.jpeg",

        "./public/images/gallery/6.jpeg",

        "./public/images/gallery/7.jpeg",

        "./public/images/gallery/8.jpeg"

    ];


    /* =========================================
       CREATE BURST PHOTOS
    ========================================= */

    const TOTAL = 30;


    for (let i = 0; i < TOTAL; i++) {

        const img =
            document.createElement("img");


        img.src =
            images[
                Math.floor(
                    Math.random() *
                    images.length
                )
            ];


        img.classList.add("small-photo");


        container.appendChild(img);

    }


    const photos =
        container.querySelectorAll(".small-photo");


    /* =========================================
       PREPARE PHOTOS
    ========================================= */

    photos.forEach((photo, index) => {

        const angle =
            (Math.PI * 2 / photos.length) *
            index
            +
            gsap.utils.random(
                -.25,
                .25
            );


        /*
         * Smaller radius than your
         * previous version.
         *
         * This prevents photos from
         * disappearing completely.
         */

        const radius =
            gsap.utils.random(
                350,
                650
            );


        const x =
            Math.cos(angle) *
            radius;


        const y =
            Math.sin(angle) *
            radius;


        const rotation =
            gsap.utils.random(
                -28,
                28
            );


        const scale =
            gsap.utils.random(
                .65,
                1.15
            );


        gsap.set(photo, {

            x: 0,

            y: 0,

            scale: .2,

            rotation:
                gsap.utils.random(
                    -10,
                    10
                ),

            opacity: 0,

            zIndex:
                Math.floor(
                    Math.random() * 10
                )

        });


        photo.dataset.x = x;

        photo.dataset.y = y;

        photo.dataset.rotation =
            rotation;

        photo.dataset.scale =
            scale;

    });


    /* =========================================
       MAIN TIMELINE
    ========================================= */

    const tl =
        gsap.timeline({

            scrollTrigger: {

                trigger: section,

                start: "top top",

                end: "+=2200",

                scrub: 1.1,

                pin: true,

                anticipatePin: 1,

                invalidateOnRefresh: true

            }

        });


    /* =========================================
       1. MEET THE COUPLE APPEARS
    ========================================= */

    tl.fromTo(

        intro,

        {

            opacity: 0,

            scale: .8,

            y: 30

        },

        {

            opacity: 1,

            scale: 1,

            y: 0,

            duration: .8,

            ease: "power3.out"

        }

    );


    /* =========================================
       2. TITLE BREATH
    ========================================= */

    tl.to(

        intro,

        {

            scale: 1.03,

            duration: .4,

            ease: "sine.inOut"

        }

    );


    /* =========================================
       3. TITLE DISAPPEARS
    ========================================= */

    tl.to(

        intro,

        {

            opacity: 0,

            scale: 1.15,

            y: -25,

            duration: .6,

            ease: "power3.in"

        }

    );


    /* =========================================
       4. PHOTO BURST
    ========================================= */

    photos.forEach(
        (photo, index) => {

            const x =
                Number(
                    photo.dataset.x
                );


            const y =
                Number(
                    photo.dataset.y
                );


            const rotation =
                Number(
                    photo.dataset.rotation
                );


            const scale =
                Number(
                    photo.dataset.scale
                );


            const wave =
                Math.floor(
                    index / 10
                );


            const start =
                1.8
                +
                wave * .55
                +
                (index % 10) * .05;


            /* Appear */

            tl.to(

                photo,

                {

                    opacity: 1,

                    scale: .8,

                    duration: .3,

                    ease: "power2.out"

                },

                start

            );


            /* Move */

            tl.to(

                photo,

                {

                    x: x,

                    y: y,

                    rotation: rotation,

                    scale: scale,

                    duration: 1.7,

                    ease: "power3.out"

                },

                start + .1

            );

        }
    );


    /* =========================================
       5. HOLD THE COLLAGE
    ========================================= */

    tl.to(

        {},

        {

            duration: .7

        }

    );


    /* =========================================
       6. PHOTOS DISSOLVE
    ========================================= */

    tl.to(

        photos,

        {

            opacity: 0,

            scale: .8,

            filter: "blur(5px)",

            duration: .9,

            stagger: {

                each: .025,

                from: "random"

            },

            ease: "power2.inOut"

        }

    );


    /* =========================================
       7. FINAL COUPLE CONTAINER
    ========================================= */

    tl.to(

        coupleFinal,

        {

            opacity: 1,

            duration: .4,

            ease: "power2.out"

        }

    );


    /* =========================================
       8. BRIDE ENTERS FROM LEFT
    ========================================= */

    tl.fromTo(

        bride,

        {

            opacity: 0,

            x: -180,

            rotationY: -15,

            scale: .88

        },

        {

            opacity: 1,

            x: 0,

            rotationY: 0,

            scale: 1,

            duration: 1.2,

            ease: "power4.out"

        }

    );


    /* =========================================
       9. GROOM ENTERS FROM RIGHT
    ========================================= */

    tl.fromTo(

        groom,

        {

            opacity: 0,

            x: 180,

            rotationY: 15,

            scale: .88

        },

        {

            opacity: 1,

            x: 0,

            rotationY: 0,

            scale: 1,

            duration: 1.2,

            ease: "power4.out"

        },

        "<"

    );


    /* =========================================
       10. HEART POPS INTO CENTRE
    ========================================= */

    tl.fromTo(

        heartArea,

        {

            opacity: 0,

            scale: .2,

            y: 20

        },

        {

            opacity: 1,

            scale: 1,

            y: 0,

            duration: 1.1,

            ease: "back.out(1.8)"

        },

        "-=.6"

    );


    /* =========================================
       11. HEART EXTRA POP
    ========================================= */

    tl.fromTo(

        heart,

        {

            scale: .6,

            rotationY: -40

        },

        {

            scale: 1,

            rotationY: 0,

            duration: .7,

            ease: "elastic.out(1, .5)"

        }

    );


    /* =========================================
       12. SPARKLES
    ========================================= */

    tl.fromTo(

        ".sparkle",

        {

            opacity: 0,

            scale: 0

        },

        {

            opacity: 1,

            scale: 1,

            duration: .5,

            stagger: .08,

            ease: "back.out(2)"

        },

        "-=.5"

    );


    /* =========================================
       13. NAMES
    ========================================= */

    tl.fromTo(

        ".person-info",

        {

            opacity: 0,

            y: 25

        },

        {

            opacity: 1,

            y: 0,

            duration: .8,

            stagger: .15,

            ease: "power3.out"

        },

        "-=.3"

    );


    /* =========================================
       14. FINAL HOLD
    ========================================= */

    tl.to(

        {},

        {

            duration: 1

        }

    );


    /* =========================================
       HEART CONTINUOUS FLOAT
    ========================================= */

    gsap.to(

        ".heart-3d",

        {

            y: -8,

            duration: 2.2,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        }

    );


    /* =========================================
       SPARKLE FLOAT
    ========================================= */

    gsap.to(

        ".sparkle",

        {

            y: -8,

            opacity: .45,

            duration: 1.5,

            repeat: -1,

            yoyo: true,

            stagger: .2,

            ease: "sine.inOut"

        }

    );


    console.log(
        "Premium Meet Couple animation initialized"
    );

}