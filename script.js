document.addEventListener("DOMContentLoaded", function() {
    const marquee = document.querySelector(".skills-marquee");

    // Pause animation when hovering over a skill card
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            marquee.style.animationPlayState = "paused";
        });

        card.addEventListener("mouseleave", () => {
            marquee.style.animationPlayState = "running";
        });
    });
});

window.addEventListener("scroll", function() {
    let header = document.getElementById("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// daynamically email has been sent to your(srujal)

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitBtn = document.querySelector('.submit-btn');

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_sar7qup', 'template_b6p9xsu', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully!');
            document.getElementById('contact-form').reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>';
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send your message. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>';
        });
});


//service_sar7qup

//template_b6p9xsu

//sjYID2NoLKtWOOqOt

document.addEventListener("DOMContentLoaded", function() {
    let menuIcon = document.querySelector("#menu-icon");
    let navbar = document.querySelector("#navbar");

    menuIcon.addEventListener("click", function() {
        navbar.classList.toggle("active");
        menuIcon.classList.toggle("fa-xmark"); // Change icon on click
    });
});


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('#navbar');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}