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