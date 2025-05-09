/**
 * Active Navigation Highlighting
 * This script ensures the correct navigation link is highlighted based on scroll position
 */

document.addEventListener("DOMContentLoaded", () => {
    // Function to update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section")
        const navLinks = document.querySelectorAll("header nav ul li a")

        // Get current scroll position with some offset for better UX
        const scrollPosition = window.scrollY + 100 // Add offset to trigger earlier

        // Find the current section
        let currentSection = ""

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150 // Offset to trigger earlier
            const sectionHeight = section.offsetHeight
            const sectionId = section.getAttribute("id")

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId
            }
        })

        // Update active class on navigation links
        navLinks.forEach((link) => {
            link.classList.remove("active")

            const href = link.getAttribute("href").substring(1) // Remove the # from href
            if (href === currentSection) {
                link.classList.add("active")
            }
        })
    }

    // Call the function on scroll and on page load
    window.addEventListener("scroll", updateActiveNavLink)

    // Initial call after a slight delay to ensure all elements are loaded
    setTimeout(updateActiveNavLink, 100)
})