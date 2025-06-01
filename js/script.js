// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentPath = window.location.pathname.split("/").pop(); // Get current HTML file name

    // Mobile menu toggle
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close mobile menu when a link is clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Dynamic year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Navigation link highlighting
    const navLinks = document.querySelectorAll('nav a.nav-link, #mobile-menu a.nav-link');

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('main section[id]');
        let currentSectionId = 'home'; // Default to home

        // Determine current section if on index.html and scrolling
        if (currentPath === 'index.html' || currentPath === '') { // Check if on homepage
            let index = sections.length;
            while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100px offset
            if (sections[index]) {
                currentSectionId = sections[index].id;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active', 'bg-blue-100', 'text-primary');
            const dataNav = link.getAttribute('data-nav');
            const dataPage = link.getAttribute('data-page');

            if (dataNav) { // For in-page section links (index.html)
                if ((currentPath === 'index.html' || currentPath === '') && dataNav === currentSectionId) {
                    link.classList.add('active', 'bg-blue-100', 'text-primary');
                }
            } else if (dataPage) { // For page links (e.g., publications.html)
                 // Check if the link's href matches the current page filename
                const linkHrefPage = link.getAttribute('href').split("/").pop();
                if (linkHrefPage === currentPath) {
                    link.classList.add('active', 'bg-blue-100', 'text-primary');
                }
            }
        });
         // Special case for home link on index.html when at the very top or no specific section is matched
        if ((currentPath === 'index.html' || currentPath === '') && window.scrollY < sections[0]?.offsetTop - 100) {
             navLinks.forEach(link => {
                if (link.getAttribute('data-nav') === 'home') {
                    link.classList.add('active', 'bg-blue-100', 'text-primary');
                } else if (!link.getAttribute('data-page')) { // Avoid deactivating page links like "Publications"
                    link.classList.remove('active', 'bg-blue-100', 'text-primary');
                }
            });
        }
    }
    
    // Initial call and on scroll/load
    updateActiveNavLink();
    if (currentPath === 'index.html' || currentPath === '') {
        window.addEventListener('scroll', updateActiveNavLink);
    }

    // Ensure nav links correctly set active state on click, especially for same-page anchors
    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(link => {
        link.addEventListener('click', function() {
            // Timeout to allow scroll to finish before updating active link, helps with accuracy
            setTimeout(updateActiveNavLink, 50);
        });
    });
});
