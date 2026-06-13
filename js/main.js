/* ─── Typed text animation ─────────────────────────────────────────── */
(function () {
    const phrases = [
        'Native Android Apps',
        'KMP Shared Libraries',
        'Compose Multiplatform',
        'Offline-First Systems',
        'Real-Time Backends',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const el = document.getElementById('typed-text');
    if (!el) return;

    function type() {
        const current = phrases[phraseIndex];
        if (deleting) {
            el.textContent = current.substring(0, charIndex--);
        } else {
            el.textContent = current.substring(0, charIndex++);
        }

        let delay = deleting ? 40 : 80;

        if (!deleting && charIndex > current.length) {
            delay = 1800;
            deleting = true;
        } else if (deleting && charIndex < 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            delay = 300;
        }
        setTimeout(type, delay);
    }
    type();
})();

/* ─── Scroll reveal observer ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.classList.contains('reveal-item')) {
                    entry.target.classList.add('visible');
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll, .reveal-item').forEach(el => observer.observe(el));
});

/* ─── Active nav link highlighting ────────────────────────────────── */
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav .desktop-nav a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
})();

/* ─── Hamburger mobile menu ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
    });

    // Close when a link is clicked
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
        });
    });
});

/* ─── Scroll-to-top button ─────────────────────────────────────────── */
(function () {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


