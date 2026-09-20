function initializeScratchCard() {

    const canvas = document.getElementById("scratchCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const card = canvas.parentElement;

    let revealed = false;

    /* ==============================
       CREATE GOLD COVER
    ============================== */

    function resizeCanvas() {

        const rect = card.getBoundingClientRect();

        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        createScratchLayer();
    }


    function createScratchLayer() {

        const width = card.clientWidth;
        const height = card.clientHeight;

        ctx.globalCompositeOperation = "source-over";

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        /* Golden cover */

        const gradient = ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );

        gradient.addColorStop(
            0,
            "#cba86d"
        );

        gradient.addColorStop(
            0.5,
            "#e7c991"
        );

        gradient.addColorStop(
            1,
            "#c7a363"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* Slight inner border */

        ctx.strokeStyle =
            "rgba(255,255,255,0.45)";

        ctx.lineWidth = 2;

        ctx.strokeRect(
            5,
            5,
            width - 10,
            height - 10
        );


        /* Decorative dots */

        ctx.fillStyle =
            "rgba(255,255,255,0.18)";

        for (
            let x = 15;
            x < width;
            x += 25
        ) {

            for (
                let y = 15;
                y < height;
                y += 25
            ) {

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    1.5,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }


        /* Center logo/text */

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle =
            "rgba(255,255,255,0.95)";

        ctx.font =
            "italic 26px Georgia";

        ctx.fillText(
            "Tap to reveal",
            width / 2,
            height / 2
        );
    }


    /* ==============================
       CLICK / TAP
    ============================== */

function revealCard() {

    canvas.style.opacity = "0";

    scratchInstruction.classList.add("hide");

    showCelebration();

    const countdown = document.getElementById("countdownContainer");

    if (countdown) {
        countdown.classList.add("show");
        initializeCountdown();
    }
}


    /* ==============================
       CLICK
    ============================== */

    canvas.addEventListener(
        "click",
        revealCard
    );


    /* ==============================
       TOUCH
    ============================== */

    canvas.addEventListener(
        "touchend",
        function (event) {

            event.preventDefault();

            revealCard(event);

        },
        {
            passive: false
        }
    );


    /* ==============================
       CELEBRATION
    ============================== */

    function createCelebration() {

        const container =
            document.getElementById(
                "celebrationContainer"
            );

        if (!container) return;


        container.innerHTML = "";

        container.style.display = "block";


        /* =================================
           CONFETTI
        ================================= */

        for (let i = 0; i < 120; i++) {

            const piece =
                document.createElement("span");

            piece.className =
                "confetti";


            /* Random horizontal position */

            piece.style.left =
                Math.random() * 100 + "%";


            /* Start above viewport */

            piece.style.top =
                "-30px";


            /* Random size */

            const width =
                4 + Math.random() * 7;

            const height =
                8 + Math.random() * 10;

            piece.style.width =
                width + "px";

            piece.style.height =
                height + "px";


            /* Random rotation */

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            /* Random animation duration */

            piece.style.animationDuration =
                (2.5 + Math.random() * 2) + "s";


            piece.style.animationDelay =
                (Math.random() * 0.8) + "s";


            container.appendChild(
                piece
            );
        }


        /* =================================
           FLOWERS / PETALS
        ================================= */

        const flowers = [
            "🌸",
            "🌼",
            "🌺",
            "🌷",
            "🌹"
        ];


        for (let i = 0; i < 30; i++) {

            const flower =
                document.createElement("span");

            flower.className =
                "flower";


            flower.innerText =
                flowers[
                Math.floor(
                    Math.random() *
                    flowers.length
                )
                ];


            flower.style.left =
                Math.random() * 100 + "%";


            flower.style.top =
                "-40px";


            flower.style.fontSize =
                (15 + Math.random() * 15) + "px";


            flower.style.animationDuration =
                (3 + Math.random() * 2) + "s";


            flower.style.animationDelay =
                (Math.random() * 0.8) + "s";


            container.appendChild(
                flower
            );
        }
    }


    /* ==============================
       INITIALIZE
    ============================== */

    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );
}
function initializeCountdown() {

    const weddingDate =
        new Date("December 31, 2026 00:00:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();

        const difference = weddingDate - now;

        if (difference <= 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}

function showCelebration() {

    // Left side burst
    confetti({
        particleCount: 80,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 }
    });

    // Right side burst
    confetti({
        particleCount: 80,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 }
    });

    // Top center burst
    confetti({
        particleCount: 120,
        spread: 140,
        origin: { x: 0.5, y: 0.3 }
    });

}