emailjs.init("YOUR_PUBLIC_KEY");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const status = document.getElementById("status");

    try{

        await emailjs.send(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            {
                name:document.getElementById("name").value,
                email:document.getElementById("email").value,
                message:document.getElementById("message").value
            }
        );

        status.innerHTML="❤️ Thank you for your wishes!";

        form.reset();

    }catch(err){

        status.innerHTML="Something went wrong.";
    }

});