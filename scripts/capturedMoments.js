// const swiperElement = document.querySelector(".capturedSwiper");

// if (swiperElement) {

//     new Swiper(".capturedSwiper", {

//         effect: "coverflow",

//         grabCursor: true,

//         centeredSlides: true,

//         loop: true,

//         slidesPerView: "auto",

//         speed: 800,

//         autoplay: {
//             delay: 3000,
//             disableOnInteraction: false,
//         },

//         coverflowEffect: {

//             rotate: 0,

//             stretch: 0,

//             depth: 250,

//             modifier: 1.8,

//             scale: 0.85,

//             slideShadows: false,

//         },

//         navigation: {

//             nextEl: ".swiper-button-next",

//             prevEl: ".swiper-button-prev",

//         },

//         pagination: {

//             el: ".swiper-pagination",

//             clickable: true,

//         },

//         breakpoints: {

//             0: {

//                 spaceBetween: -60,

//             },

//             768: {

//                 spaceBetween: -100,

//             },

//             1200: {

//                 spaceBetween: -140,

//             }

//         }

//     });

// }

function initializeCapturedMoments() {

    const swiper = document.querySelector(".capturedSwiper");

    if (!swiper) return;

    new Swiper(".capturedSwiper", {

        effect: "coverflow",

        grabCursor: true,

        centeredSlides: true,

        slidesPerView: "auto",

        loop: true,

        speed: 800,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        coverflowEffect: {
            rotate: 0,
            stretch: -80,
            depth: 350,
            modifier: 2,
            scale: 0.8,
            slideShadows: false,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }

    });

}