document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuIcon = document.querySelector("#menu-icon")
    const navbar = document.querySelector("#navbar")

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", () => {
            navbar.classList.toggle("active")
            menuIcon.classList.toggle("fa-xmark") // Toggle between hamburger and X icon
        })

        // Close menu when clicking on a nav link
        const navLinks = navbar.querySelectorAll("a")
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active")
                menuIcon.classList.remove("fa-xmark")
            })
        })
    }

    // Skills marquee animation control
    const marquee = document.querySelector(".skills-marquee")
    if (marquee) {
        // Pause animation when hovering over a skill card
        document.querySelectorAll(".skill-card").forEach((card) => {
            card.addEventListener("mouseenter", () => {
                marquee.style.animationPlayState = "paused"
            })

            card.addEventListener("mouseleave", () => {
                marquee.style.animationPlayState = "running"
            })
        })
    }

    // Header scroll effect
    const header = document.getElementById("header")
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled")
            } else {
                header.classList.remove("scrolled")
            }
        })
    }

    // Active navigation highlighting based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section")
        const navLinks = document.querySelectorAll("header nav ul li a")

        // Get current scroll position with some offset for better UX
        const scrollPosition = window.scrollY + window.innerHeight / 3

        // Check which section is in view
        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight
            const sectionId = section.getAttribute("id")

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach((link) => {
                    link.classList.remove("active")
                })

                // Add active class to the corresponding link
                const activeLink = document.querySelector(`header nav ul li a[href="#${sectionId}"]`)
                if (activeLink) {
                    activeLink.classList.add("active")
                }
            }
        })
    }

    // Call the function on scroll and on page load
    window.addEventListener("scroll", updateActiveNavLink)
    window.addEventListener("load", updateActiveNavLink)

    // Contact form handling
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault()

            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const message = document.getElementById("message").value
            const submitBtn = document.querySelector(".submit-btn")

            submitBtn.disabled = true
            submitBtn.innerHTML = "Sending..."

            // Check if EmailJS is available
            if (typeof emailjs !== "undefined") {
                emailjs.init("YOUR_PUBLIC_KEY") // Replace with your actual EmailJS public key
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                }

                emailjs.send("service_sar7qup", "template_b6p9xsu", templateParams).then(
                    (response) => {
                        console.log("SUCCESS!", response.status, response.text)
                        showNotification("Your message has been sent successfully!", "success")
                        contactForm.reset()
                        submitBtn.disabled = false
                        submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>'
                    },
                    (error) => {
                        console.log("FAILED...", error)
                        showNotification("Failed to send your message. Please try again.", "error")
                        submitBtn.disabled = false
                        submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>'
                    },
                )
            } else {
                // Fallback for demo/development
                setTimeout(() => {
                    showNotification("Message sent successfully (demo mode)", "success")
                    contactForm.reset()
                    submitBtn.disabled = false
                    submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>'
                }, 1500)
            }
        })
    }

    // Notification system
    function showNotification(message, type) {
        // Create notification container if it doesn't exist
        let container = document.querySelector(".notification-container")
        if (!container) {
            container = document.createElement("div")
            container.className = "notification-container"
            document.body.appendChild(container)
        }

        // Create notification element
        const notification = document.createElement("div")
        notification.className = `notification ${type} notification-enter`
        notification.textContent = message

        // Add to container
        container.appendChild(notification)

        // Remove after delay
        setTimeout(() => {
            notification.classList.replace("notification-enter", "notification-exit")
            setTimeout(() => {
                notification.remove()
            }, 300)
        }, 5000)
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.getElementById("header").offsetHeight
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })
})