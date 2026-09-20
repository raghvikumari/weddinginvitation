async function loadPage(page) {

    const response = await fetch(`./pages/${page}.html`);

    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    initializePage(page);
}

function initializePage(page){

    if(page === "opening"){

        const video = document.querySelector(".opening-video");
        const button = document.querySelector(".tap-button");

        button.addEventListener("click",()=>{

            video.play();

            button.style.display = "none";

        });

        video.addEventListener("ended",()=>{

            loadPage("welcome");

        });

    }

}

loadPage("opening");