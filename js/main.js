/* ==========================================================================
   WEBB$ BARBER SHOP — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Sticky Navbar ----------
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---------- Mobile Navigation ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    const toggleMobileNav = () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', toggleMobileNav);

    // Close mobile nav on link click
    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMobileNav();
            }
        });
    });

    // ---------- Active Nav Link on Scroll ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ---------- Scroll Animations ----------
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    animatedElements.forEach(el => observer.observe(el));
});
