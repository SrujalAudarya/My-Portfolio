/**
 * Responsive JavaScript for Srujal's Portfolio
 * Handles responsive behavior and interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle with improved animation
    const menuIcon = document.querySelector("#menu-icon")
    const navbar = document.querySelector("#navbar")

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", () => {
            navbar.classList.toggle("active")
            menuIcon.classList.toggle("fa-xmark")

            // Prevent scrolling when menu is open
            if (navbar.classList.contains("active")) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
        })

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!navbar.contains(event.target) && !menuIcon.contains(event.target) && navbar.classList.contains("active")) {
                navbar.classList.remove("active")
                menuIcon.classList.remove("fa-xmark")
                document.body.style.overflow = "auto"
            }
        })

        // Close menu when clicking on a nav link
        const navLinks = navbar.querySelectorAll("a")
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active")
                menuIcon.classList.remove("fa-xmark")
                document.body.style.overflow = "auto"
            })
        })
    }

    // Responsive skills marquee
    const skillsMarquee = document.querySelector(".skills-marquee")
    const skillCards = document.querySelectorAll(".skill-card")

    if (skillsMarquee && skillCards.length > 0) {
        // Pause animation when hovering over a skill card
        skillCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                skillsMarquee.style.animationPlayState = "paused"
            })

            card.addEventListener("mouseleave", () => {
                skillsMarquee.style.animationPlayState = "running"
            })
        })

        // Adjust marquee speed based on screen size
        function adjustMarqueeSpeed() {
            if (window.innerWidth < 768) {
                skillsMarquee.style.animation = "marquee 20s linear infinite"
            } else {
                skillsMarquee.style.animation = "marquee 15s linear infinite"
            }
        }

        // Call initially and on resize
        adjustMarqueeSpeed()
        window.addEventListener("resize", adjustMarqueeSpeed)
    }

    // Improved header scroll effect
    const header = document.getElementById("header")

    if (header) {
        const scrollThreshold = 50
        let lastScrollY = 0

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY

            // Add scrolled class for styling
            if (currentScrollY > scrollThreshold) {
                header.classList.add("scrolled")
            } else {
                header.classList.remove("scrolled")
            }

            // Hide header when scrolling down, show when scrolling up (for mobile)
            if (window.innerWidth < 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = "translateY(-100%)"
                } else {
                    header.style.transform = "translateY(0)"
                }
                lastScrollY = currentScrollY
            } else {
                header.style.transform = "translateY(0)"
            }
        })
    }

    // Responsive form handling
    const contactForm = document.getElementById("contact-form")

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault()

            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const message = document.getElementById("message").value
            const submitBtn = document.querySelector(".submit-btn")

            // Disable button and show loading state
            submitBtn.disabled = true
            submitBtn.innerHTML = "Sending..."

            // Check if EmailJS is available
            if (typeof emailjs !== "undefined") {
                // EmailJS is available, proceed to send the email
                try {
                    emailjs
                        .send("service_sar7qup", "template_b6p9xsu", {
                            from_name: name,
                            from_email: email,
                            message: message,
                        })
                        .then(
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
                } catch (error) {
                    console.error("EmailJS Error:", error)
                    showNotification("EmailJS failed to initialize. Please check your API key and internet connection.", "error")
                    submitBtn.disabled = false
                    submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>'
                }
            } else {
                // Fallback if EmailJS is not available
                console.warn("EmailJS is not available. Using fallback.") // Added warning
                setTimeout(() => {
                    showNotification("This is a demo. In a real environment, your message would be sent.", "info")
                    contactForm.reset()
                    submitBtn.disabled = false
                    submitBtn.innerHTML = 'Submit <i class="fa-regular fa-paper-plane"></i>'
                }, 1500)
            }
        })
    }

    // Create a notification system
    function showNotification(message, type) {
        // Check if notification container exists, create if not
        let notificationContainer = document.querySelector(".notification-container")

        if (!notificationContainer) {
            notificationContainer = document.createElement("div")
            notificationContainer.className = "notification-container"
            document.body.appendChild(notificationContainer)
        }

        // Create notification element
        const notification = document.createElement("div")
        notification.className = `notification ${type}`
        notification.innerHTML = message

        // Add to container
        notificationContainer.appendChild(notification)

        // Animate in
        notification.classList.add("notification-enter")

        // Remove after delay
        setTimeout(() => {
            notification.classList.replace("notification-enter", "notification-exit")

            setTimeout(() => {
                notification.remove()
            }, 300)
        }, 5000)
    }

    // Handle responsive images and lazy loading
    const images = document.querySelectorAll("img")

    if (images.length > 0 && "IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    const src = img.getAttribute("data-src")

                    if (src) {
                        img.src = src
                        img.removeAttribute("data-src")
                    }

                    imageObserver.unobserve(img)
                }
            })
        })

        images.forEach((img) => {
            if (!img.complete || img.naturalHeight === 0) {
                imageObserver.observe(img)
            }
        })
    }

    // Add smooth scrolling for anchor links
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

    // Detect device type for optimized interactions
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
        document.body.classList.add("mobile-device")
    }
})

// Add resize handler for responsive adjustments
window.addEventListener("resize", function() {
    // Throttle resize events for better performance
    if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout)
    }

    this.resizeTimeout = setTimeout(() => {
        // Check for orientation change
        const isLandscape = window.innerWidth > window.innerHeight

        // Adjust heights for mobile devices in landscape mode
        if (isLandscape && window.innerWidth < 992) {
            const sections = document.querySelectorAll("section")
            sections.forEach((section) => {
                section.style.minHeight = "auto"
            })
        } else {
            const sections = document.querySelectorAll("section")
            sections.forEach((section) => {
                section.style.minHeight = "100vh"
            })
        }
    }, 250)
})