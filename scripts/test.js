function initializeWelcome() {

    const welcome =
        document.getElementById("welcome");

    if (!welcome) {
        return;
    }

    if (welcome.dataset.initialized === "true") {
        return;
    }

    welcome.dataset.initialized = "true";


    const button =
        document.getElementById("grandOpenButton");

    if (!button) {
        return;
    }


    let opened = false;


    button.addEventListener("click", function (event) {

        event.preventDefault();

        event.stopPropagation();


        if (opened) {
            return;
        }

        opened = true;


        /*
         * Start cinematic opening.
         */

        welcome.classList.add("opened");

    });


    /*
     * Keyboard support
     */

    button.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            button.click();

        }

    });

}